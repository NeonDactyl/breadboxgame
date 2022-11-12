import {UpgradeButton} from "../objects/buttons/upgrade-button";
import {Upgrade} from "../objects/upgrades/Upgrade";

export class SelectUpgradeScene extends Phaser.Scene {
  upgradeButtons: UpgradeButton[];
  constructor() {
    super({ key: 'SelectUpgradeScene' });
  }

  create() {
    this.add.rectangle(80, 80, this.sys.canvas.width - 160, this.sys.canvas.height - 160, 0xbbbbbb, 1).setOrigin(0, 0);
    this.add.text( 100, 100, 'right click to pick upgrade');
    this.add.text( 100, 200, 'upgrades are a work in progress, none are made yet');

    this.upgradeButtons = [];
    for (let i = 0; i < 5; i++) {
      let upgrade = Upgrade.CreateRandomUpgrade();
      this.upgradeButtons.push(new UpgradeButton(upgrade, {
        width: 0,
        height: 0,
        scene: this,
        clickCallback: () => {},
        options: {
          x: this.sys.canvas.width / 2 - 400 + i * 200,
          y: this.sys.canvas.height / 2
        }
      }));
      this.upgradeButtons[i].setInteractive();
      this.add.existing(this.upgradeButtons[i]);

    }
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
