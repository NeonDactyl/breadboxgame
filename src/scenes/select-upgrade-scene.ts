export class SelectUpgradeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectUpgradeScene' });
  }

  create() {
    this.add.text( 100, 100, 'pick upgrade');
  }

  update() {
    this.handleInput();
  }

  handleInput() {
    //console.log('handling input');
    // console.log(this.input.activePointer.primaryDown);
    if (this.input.activePointer.rightButtonDown()) {
      //this.scene.sendToBack('SelectUpgradeScene');
      this.scene.resume('MainScene', {upgrade: 'hi'});
    }
  }
}
