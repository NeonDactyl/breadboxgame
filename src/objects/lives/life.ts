import { IImageConstructor } from '../../interfaces/image.interface';

export class Life extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
      super(aParams.scene, aParams.x, aParams.y, "life", aParams.frame);
      this.initSprite();
      this.scene.add.existing(this);
  }

  private initSprite() {
    this.setOrigin(0, 0.0);
    this.setScale(0.5);
  }

}