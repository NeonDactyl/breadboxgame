import { Enemy } from './enemy';
import { enemyConfig } from './enemies/enemyConfig';
import { IWaveConstructor } from '../interfaces/wave.interface';
import { Bullet } from './bullet';
import {Upgrade} from './upgrades/Upgrade';
import {Toad} from './enemies/toad';
import {Sloth} from './enemies/sloth';
import {Shark} from './enemies/shark';
import {Puffer} from './enemies/puffer';
import {Owl} from './enemies/owl';
import {Ostrich} from './enemies/ostrich';
import {Frog3} from './enemies/frog_3';
import {Frog2} from './enemies/frog_2';
import {Frog} from './enemies/frog';
import {Dog2} from './enemies/dog_2';
import {Dog} from './enemies/dog';
import {Cat} from './enemies/cat';
import {Bear} from './enemies/bear';
import {Alligator} from './enemies/alligator';
import {Owl2} from './enemies/owl2';
export class Wave {
  scene: Phaser.Scene;
  enemyCount: number;
  enemies: Enemy[];
  waveNumber: number;
  basePosition: Phaser.Geom.Point;
  damageDealt: number;
  enemyHp: number;
  enemySpeed: number;
  enemyDamage: number;
  enemySpeedUpgrades: number;
  enemyHealthUpgrades: number;
  enemyDamageUpgrades: number;

  constructor(aParams: IWaveConstructor) {
    this.scene = aParams.scene;
    this.enemyCount = aParams.enemyCount;
    this.enemySpeedUpgrades = 1;
    this.enemyHealthUpgrades = 1;
    this.enemyDamageUpgrades = 1;
    for (let i = 0; i < aParams.upgrades.length; i++) {
      this.applyUpgrade(aParams.upgrades[i]);
    }
    this.enemies = [];
    this.basePosition = aParams.basePosition;
    this.waveNumber = aParams.waveNumber;
    this.damageDealt = 0;
    this.enemySpeed = 0.5 * (1 + Math.pow(1.02, this.waveNumber)) * this.enemySpeedUpgrades;
    this.enemySpeed *= 0.05
    this.enemyHp = Math.floor(100 * Math.pow(1.04, this.waveNumber) * this.enemyHealthUpgrades);
    this.enemyDamage = Math.floor(30 * Math.pow(1.04, this.waveNumber) * this.enemyDamageUpgrades);
    this.initWave();
  }

  public getEnemies(): Enemy[] {
    return this.enemies;
  }

  public clearEnemies(): void {
    for(let i = 0; i< this.enemies.length; i++){
        this.enemies[i].destroy();
    }
    this.enemies = [];
}

  private initWave(): void {
    this.enemies = [];
    for (let i = 0; i < this.enemyCount ; i++) {
      this.spawnEnemy();
      this.enemies[this.enemies.length - 1].setDepth(2);
    }
  }

  public isWaveOver(): boolean {
    return this.enemies.length === 0;
  }

  public applyUpgrade(upgrade: Upgrade) {
    switch (upgrade.upgradeEffect.Effect) {
      case "EnemySpeed":
        this.enemySpeedUpgrades *= upgrade.modifierValue;
        break;
      case "EnemyDamage":
        this.enemyDamageUpgrades *= upgrade.modifierValue;
        break;
      case "EnemyHealth":
        this.enemyHealthUpgrades *= upgrade.modifierValue;
        break;
      default:
        break;
    }
  }

  private spawnEnemy(): void {
    let enemyPosition = this.generateEnemyPosition()
    let enemyOptions = {
      x: enemyPosition.x,
      y: enemyPosition.y,
      baseX: this.basePosition.x,
      baseY: this.basePosition.y,
      totalVelocity: this.enemySpeed,
      scene: this.scene,
      hitPoints: this.enemyHp,
      damage: this.enemyDamage
    }
    let enemy: Enemy;
    switch (this.getRandomEnemy()) {
      case "alligator":
        enemy = new Alligator(enemyOptions);
        break;
      case "bear":
        enemy = new Bear(enemyOptions);
        break;
      case "cat":
        enemy = new Cat(enemyOptions);
        break;
      case "dog":
        enemy = new Dog(enemyOptions);
        break;
      case "dog_2":
        enemy = new Dog2(enemyOptions);
        break;
      case "frog":
        enemy = new Frog(enemyOptions);
        break;
      case "frog_2":
        enemy = new Frog2(enemyOptions);
        break;
      case "frog_3":
        enemy = new Frog3(enemyOptions);
        break;
      case "ostrich":
        enemy = new Ostrich(enemyOptions);
        break;
      case "owl":
        enemy = new Owl(enemyOptions);
        break;
      case "owl_2":
        enemy = new Owl2(enemyOptions);
        break;
      case "puffer":
        enemy = new Puffer(enemyOptions);
        break;
      case "shark":
        enemy = new Shark(enemyOptions);
        break;
      case "sloth":
        enemy = new Sloth(enemyOptions);
        break;
      case "toad":
        enemy = new Toad(enemyOptions);
        break;
      default:
        throw "invalid enemy somehow";
    }

    this.enemies.push(enemy);
  }
  
  private getRandomEnemy(): string {
    let enemyWeights = enemyConfig.map((sum => value => sum += value.weight)(0));
    let randNum = Math.random() * Math.max(...enemyWeights);
    for (let i = 0; i < enemyWeights.length; i++) {
      if (randNum <= enemyWeights[i]) return enemyConfig[i].name;
    }
    return '';
  }

  private getRandomEnemyTexture(): string {
    let textures = ['e01', 'e02', 'e03', 'e04'];
    return textures[Math.floor(Math.random() * textures.length)];
  }

  private generateEnemyPosition() : Phaser.Geom.Point {
      let safeZoneRadius = Math.min(this.scene.sys.canvas.width, this.scene.sys.canvas.height) * 0.75;
      let enemyX = Math.random() * this.scene.sys.canvas.width;
      let yOffset = Math.sqrt(Math.abs(safeZoneRadius * safeZoneRadius - Math.pow(this.basePosition.x - enemyX, 2)))
      let enemyY = (Math.random() * (this.scene.sys.canvas.height - yOffset));

      return new Phaser.Geom.Point(enemyX, enemyY);
  }

  update(bullets: Bullet[]): void {
      this.damageDealt = 0;
      for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].update();
          for (let j = 0; j < bullets.length; j++) {
              let e = this.enemies[i];
              let b = bullets[j];
              if (this.enemies[i].active && this.scene.physics.collide(e, b))
              {
                  this.enemies[i].takeDamageFromBullet(bullets[j]);
                  this.damageDealt += bullets[j].damage;
                  bullets[j].destroy();
                  bullets.splice(j, 1);
                  if (this.enemies[i].isDead()) {
                      this.enemies[i].destroy();
                      this.enemies.splice(i, 1);
                      break;
                  }
              }
          }
      }
  }
  private generateColor(): number {
      let red = Phaser.Math.RND.between(0x60, 0xff) * 0x10000;
      let green = Phaser.Math.RND.between(0x60, 0xff) * 0x100;
      let blue = Phaser.Math.RND.between(0x60, 0xff);

      return red+green+blue;
  }
}
