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
  
  constructor(aParams: IPlayerOptions) {
    super(aParams.scene, aParams.x, aParams.y);

    this.hitPoints = 30;
    this.maxHitPoints = 300;

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
    this.gun.update();
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
    return this.gun.getBullets();
  }

  public isDead(): boolean {
      return this.hitPoints <= 0;
  }

  levelUp(): void {
    this.gun.levelUp();
  }

  getHpString(): string {
    return `${this.hitPoints} / ${this.maxHitPoints}`;
  }

  public takeDamage(enemy: Enemy): void{
    this.hitPoints -= enemy.getAttack();
    console.log(`We have ${this.hitPoints} hp left`)
  }
}
