import { IImageConstructor } from '../../interfaces/image.interface';

export class homeBase extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;


  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, 'homebase', aParams.frame);

    this.initSprite();
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setScale(0.5);
  }
}
