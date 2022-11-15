import { Enemy } from './enemy';
import { IWaveConstructor } from '../interfaces/wave.interface';
import { Bullet } from './bullet';
import {Upgrade} from './upgrades/Upgrade';
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
    this.enemyHp = Math.floor(100 * Math.pow(1.04, this.waveNumber) * this.enemyHealthUpgrades);
    this.enemyDamage = Math.floor(30 * Math.pow(1.04, this.waveNumber) * this.enemyDamageUpgrades);
    this.initWave();
  }

  public getEnemies(): Enemy[] {
    return this.enemies;
  }

  private initWave(): void {
    for (let i = 0; i < this.enemyCount ; i++) {
      this.spawnEnemy();
      this.enemies[this.enemies.length - 1 ].setTint(this.generateColor());
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
      texture: this.getRandomEnemyTexture(), 
      scene: this.scene,
      hitPoints: this.enemyHp,
      damage: this.enemyDamage
    }
    this.enemies.push(new Enemy(enemyOptions));
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
