import {TextButton} from "../objects/buttons/text.button";
import {UpgradeButton} from "../objects/buttons/upgrade-button";
import {Upgrade} from "../objects/upgrades/Upgrade";

export class SelectUpgradeScene extends Phaser.Scene {
  upgradeButtons: UpgradeButton[];
  private canSelect = false;
  private skipButton: TextButton;
  private juice: Phaser.GameObjects.Image;
  private beans: Phaser.GameObjects.Image;
  constructor() {
    super({ key: 'SelectUpgradeScene' });
  }

  create() {
    this.canSelect = !this.input.activePointer.primaryDown;
    this.add.rectangle(80, 150, this.sys.canvas.width - 160, this.sys.canvas.height - 300, 0xaa2222, 1).setOrigin(0, 0);
    let text = this.add.text( this.sys.canvas.width / 2, 200, 'pick an upgrade', { fontSize: '4em'});
    text.setOrigin(0.5, 0.5);
    this.juice = this.add.image(800, 400, 'juice');
    this.juice.setTint(0xaaaaaa);

    this.beans = this.add.image(300, 600, 'beans');
    this.beans.setScale(0.5);
    this.beans.setTint(0xaaaaaa);

    this.juice.setRotation(1.2 + Math.cos(this.time.now / 700) / 7);
    this.beans.setRotation(0.9 + Math.cos(this.time.now / 399) / 15);
    this.juice.setScale(0.3 + Math.cos(this.time.now / 502) / 20);

    this.upgradeButtons = [];
    let upgrades = Upgrade.CreateRandomUpgrades(5);
    for (let i = 0; i < upgrades.length; i++) {
      this.upgradeButtons.push(new UpgradeButton(upgrades[i], {
        width: 0,
        height: 0,
        scene: this,
        clickCallback: () => {this.selectUpgrade(upgrades[i])},
        options: {
          x: this.sys.canvas.width / 2 - 400 + i * 200,
          y: this.sys.canvas.height / 2
        },
        tooltip: new Phaser.GameObjects.Text(this,
          0,
          0,
          upgrades[i].displayText,
          {
            backgroundColor: "#333333",
            padding: {
              left: 15,
              right: 15,
              top: 15,
              bottom: 15
            },
            align: 'center',
            wordWrap: {
              width: 150
            },
          })
      }));
      if (this.canSelect) {
        this.upgradeButtons[i].setInteractive();
      }
      this.upgradeButtons[i].setDepth(3);
      this.add.existing(this.upgradeButtons[i]);
    }
    let riskyChoice = new Phaser.GameObjects.Image(this, 0, 0, 'riskyChoice');
    riskyChoice.setOrigin(0, 0);
    this.skipButton = new TextButton({
      text: "Skip these upgrades",
      clickCallback: () => {this.selectUpgrade()},
      scene: this,
      options: {
       x: this.sys.canvas.width / 2,
       y: this.sys.canvas.height / 2 + 200
      },
      tooltip: riskyChoice,
      textColor: '#fff',
      textFont: 'sansserif',
      fontSize: '2em',
      }
    );

    this.skipButton.setInteractive();

    this.add.existing(this.skipButton);
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
    this.skipButton.update();
    this.juice.setRotation(1.2 + Math.cos(this.time.now / 700) / 7);
    this.beans.setRotation(0.9 + Math.cos(this.time.now / 399) / 15);
    this.juice.setScale(0.3 + Math.cos(this.time.now / 502) / 20);
  }

  selectUpgrade(upgrade?: Upgrade) {
    if (!this.canSelect) return;
    this.scene.stop('SelectUpgradeScene');
    this.scene.resume('MainScene', upgrade);
  }
}
