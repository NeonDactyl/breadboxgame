export class SelectUpgradeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectUpgradeScene' });
  }

  create() {
    this.add.rectangle(80, 80, this.sys.canvas.width - 160, this.sys.canvas.height - 160, 0xbbbbbb, 1).setOrigin(0, 0);
    this.add.text( 100, 100, 'right click to pick upgrade');
    this.add.text( 100, 200, 'upgrades are a work in progress, none are made yet');
  }

  update() {
    this.handleInput();
  }

  handleInput() {
    //console.log('handling input');
    // console.log(this.input.activePointer.primaryDown);
    if (this.input.activePointer.rightButtonDown()) {
      this.scene.stop('SelectUpgradeScene');
      this.scene.resume('MainScene', {upgrade: 'hi'});
    }
  }
}
