import { IImageConstructor } from '../../interfaces/image.interface';

export class Gun extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
      super(aParams.scene, aParams.x, aParams.y, "arm", aParams.frame);

      this.initSprite();
      this.scene.add.existing(this);

  }

  private initSprite() {
    this.setOrigin(0.1, 0.5);
    this.setScale(0.5);
    this.rotation = 0;
    this.setInteractive();
  }

}
