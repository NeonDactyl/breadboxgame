import { IImageConstructor } from '../interfaces/image.interface';
import { Enemy } from './enemy';
import { Wave } from './wave';

export class homeBase extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  private hitPoints: number;
  private maxHitPoints: number;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, 'homebase', aParams.frame);

    this.hitPoints = 30;
    this.maxHitPoints = 300;

    this.initSprite();
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setScale(0.5);
  }
}
