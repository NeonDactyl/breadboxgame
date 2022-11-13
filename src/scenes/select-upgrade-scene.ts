import {UpgradeButton} from "../objects/buttons/upgrade-button";
import {Upgrade} from "../objects/upgrades/Upgrade";

export class SelectUpgradeScene extends Phaser.Scene {
  upgradeButtons: UpgradeButton[];
  private canSelect = false;
  constructor() {
    super({ key: 'SelectUpgradeScene' });
  }

  create() {
    this.canSelect = !this.input.activePointer.primaryDown;
    this.add.rectangle(80, 80, this.sys.canvas.width - 160, this.sys.canvas.height - 160, 0xbbbbbb, 1).setOrigin(0, 0);
    this.add.text( 100, 100, 'pick your upgrade');

    this.upgradeButtons = [];
    for (let i = 0; i < 5; i++) {
      let upgrade = Upgrade.CreateRandomUpgrade();
      this.upgradeButtons.push(new UpgradeButton(upgrade, {
        width: 0,
        height: 0,
        scene: this,
        clickCallback: () => {this.selectUpgrade(upgrade)},
        options: {
          x: this.sys.canvas.width / 2 - 400 + i * 200,
          y: this.sys.canvas.height / 2
        }
      }));
      if (this.canSelect) {
        this.upgradeButtons[i].setInteractive();
      }
      this.upgradeButtons[i].setDepth(3);
      this.add.existing(this.upgradeButtons[i]);
    }
    this.input.on('pointerup', this.primaryReleased.bind(this));
  }

  primaryReleased(pointer: Phaser.Input.Pointer) {
    this.canSelect = pointer.leftButtonReleased();
    for (let i = 0; i < this.upgradeButtons.length; i++)
    {
      this.upgradeButtons[i].setInteractive();
    }
  }

  update() {
    if (!this.canSelect) return;
    for (let i = 0; i < this.upgradeButtons.length; i++) {
      this.upgradeButtons[i].update();
    }
  }

  selectUpgrade(upgrade: Upgrade) {
    if (!this.canSelect) return;
    this.scene.stop('SelectUpgradeScene');
    this.scene.resume('MainScene', upgrade);
  }
}
