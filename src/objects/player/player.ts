import {IPlayerOptions} from "../../interfaces/player.interface";
import {Bullet} from "../bullet";
import {Enemy} from "../enemy";
import {Upgrade} from "../upgrades/Upgrade";
import {Wave} from "../wave";
import {Gun} from "./gun";
import {homeBase} from "./homeBase";

export class Player extends Phaser.GameObjects.Container {
  private dome: homeBase;
  private gun: Gun;
  private hitPoints: number;
  private maxHitPoints: number;
  private criticalMultiplier: number;
  private criticalChance: number;
  private projectileSpeed: number;
  private projectileSize: number;
  private bullets: Bullet[];
  private cooldownRemaining: number;
  private cooldown: number;
  private damage: number;
  private cooldownMultiplier: number;
  private damageMultiplier: number;
  private criticalChanceMultiplier: number;
  private criticalDamageMultiplier: number;
  public static maxRotation: number = Math.PI / 2;
  public static minRotation: number = Player.maxRotation * -1;
 
  
  constructor(aParams: IPlayerOptions) {
    super(aParams.scene, aParams.x, aParams.y);

    this.hitPoints = 300;
    this.maxHitPoints = 300;
    this.bullets = [];
    this.cooldownRemaining = 0;

    this.cooldown = 15;
    this.damage = 100;

    this.cooldownMultiplier = 1;
    this.damageMultiplier = 1;
    this.criticalChanceMultiplier = 1;
    this.criticalDamageMultiplier = 1;

    this.criticalChance = 0.05;
    this.criticalMultiplier = 1.5;
    this.projectileSpeed = 10;
    this.projectileSize = 10;

    this.gun = new Gun ({
      scene: this.scene,
      x: 0,
      y: 0
    });

    this.dome = new homeBase({
      scene: this.scene,
      x: 0,
      y: 0
    });

    this.add([this.gun, this.dome]);
    this.width = this.dome.width;
    this.height = this.gun.width;
  }

  applyUpgrade(upgrade: Upgrade): void {

  }

  update(wave: Wave): void {
    this.handleInput();
    this.updateBullets();
    this.checkEnemyCollisionsWithBase(wave);
  }

  private handleInput(): void {
    this.cooldownRemaining = Math.max(0, this.cooldownRemaining - 1);
    let deltaX = this.scene.input.x - this.x;
    let deltaY = this.scene.input.y - this.y;
    let angle = Math.atan2(deltaY, deltaX) + (Math.PI / 2);
    if (angle >= Player.maxRotation) {
      angle = (deltaX < 0 ? Player.minRotation : Player.maxRotation);
    }
    if (angle <= Player.minRotation) angle = Player.minRotation;
    this.gun.setRotation(angle - (Math.PI / 2));

    if (this.scene.input.activePointer.primaryDown && this.cooldownRemaining == 0) {
      this.shoot();
    }
  }

  private shoot(): void {
    let isCritical: boolean = Math.random() <= this.criticalChance * this.criticalChanceMultiplier;
    let r = this.gun.rotation + Math.PI / 2;
    let offset = 0.7;
    this.bullets.push(
      new Bullet({
        scene: this.scene,
        rotation: this.gun.rotation,
        options: {
          x: this.x + (this.gun.width * Math.sin(r) * offset),
          y: this.y - (this.gun.width * Math.cos(r) * offset)
        },
        size: this.projectileSize,
        damage: this.damage * (isCritical ? this.criticalMultiplier * this.criticalDamageMultiplier : this.damageMultiplier),
        speed: this.projectileSpeed,
        isCritical
      })
    );
    this.cooldownRemaining = this.cooldown;
  }

  private checkEnemyCollisionsWithBase(wave: Wave) {
    for (let i = 0; i < wave.enemies.length; i++) {
      if (this.scene.physics.collide(this.dome, wave.enemies[i]))
      {
        this.takeDamage(wave.enemies[i])
        wave.enemies[i].destroy();
        wave.enemies.splice(i, 1);
      }
    }
  }

  getBullets(): Bullet[] {
    return this.bullets;
  }

  public isDead(): boolean {
      return this.hitPoints <= 0;
  }

  levelUp(): void {
    this.cooldown *= 0.9;
    this.damage *= 1.1;
  }

  getHpString(): string {
    return `${this.hitPoints} / ${this.maxHitPoints}`;
  }

  public takeDamage(enemy: Enemy): void{
    this.hitPoints -= enemy.getAttack();
  }

  public clearBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].destroy();
    }
    this.bullets = [];
  }

  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update();
      } else {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}
