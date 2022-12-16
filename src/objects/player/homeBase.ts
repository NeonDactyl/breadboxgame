import { IImageConstructor } from '../../interfaces/image.interface';

export class homeBase extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;


  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, 'bryce', aParams.frame);

    this.initSprite();
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);
    this.setOrigin(0.75, 0.2)
  }

  private initSprite() {
    this.setScale(0.5);
  }
}
