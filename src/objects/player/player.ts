import {IPlayerOptions} from "../../interfaces/player.interface";
import {Bullet} from "../bullet";
import {Upgrade} from "../upgrades/Upgrade";
import {Wave} from "../wave";
import {Gun} from "./gun";
import {homeBase} from "./homeBase";

export class Player extends Phaser.GameObjects.Container {
  private dome: homeBase;
  private gun: Gun;
  
  constructor(aParams: IPlayerOptions) {
    super(aParams.scene, aParams.x, aParams.y);

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
    //this.dome.setOrigin(0.5, 1);
    //this.gun.setOrigin(-0.70, 0.5);

  }

  applyUpgrade(upgrade: Upgrade): void {

  }

  update(wave: Wave): void {
    this.gun.update();
    this.dome.update(wave);
  }

  getBullets(): Bullet[] {
    return this.gun.getBullets();
  }

  isDead(): boolean {
    return this.dome.isDead();
  }

  levelUp(): void {
    this.gun.levelUp();
  }

  getHpString(): string {
    return `${this.dome.getCurrentHp()} / ${this.dome.getMaxHp()}`;
  }
}
