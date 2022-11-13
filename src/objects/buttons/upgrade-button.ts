import {IButtonOptions} from "../../interfaces/buttons/button.interface";
import {Upgrade} from "../upgrades/Upgrade";
import {Button} from "./button";

export class UpgradeButton extends Button {
  private upgrade: Upgrade;
  private upgradeImage: Phaser.GameObjects.Image;
  private tintHighlightAddition: number;
  private tintHighlightPercent: number;
  private tooltip: Phaser.GameObjects.Text;
  private highDepth = 10;
  private lowDepth = 2;

  constructor(upgrade: Upgrade, aParams: IButtonOptions) {
    super(aParams);
    this.tintHighlightPercent = 0.3;
    this.x = aParams.options.x ?? 0;
    this.y = aParams.options.y ?? 0;

    this.upgrade = upgrade;
    this.upgradeImage = this.scene.add.image(0, 0, upgrade.spriteName);
    this.upgradeImage.setTint(this.upgrade.upgradeLevel.tintColor);
    this.upgradeImage.setDepth(2);

    this.tooltip = new Phaser.GameObjects.Text(this.scene,
      0,
      0,
      this.upgrade.displayText,
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
      });
    this.tooltip.setVisible(false);
    this.tooltip.setDepth(10);

    this.tintHighlightAddition = this.calculateHighlight();

    this.width = 150;
    this.height = 150;

    this.upgradeImage.setScale(150 / this.upgradeImage.width);

    this.add([this.upgradeImage, this.tooltip]);
    this.on('pointerover', this.onPointerOver);
    this.on('pointerout', this.onPointerOut);
  }

  public update() {
    this.tooltip.setX(this.scene.input.activePointer.x - this.x - this.tooltip.width / 2);
    this.tooltip.setY(this.scene.input.activePointer.y - this.y - this.tooltip.height - 10);
  }

  public onPointerOver() {
    super.onPointerOver();
    this.upgradeImage.setTint(this.upgrade.upgradeLevel.tintColor + this.tintHighlightAddition);
    this.setDepth(this.highDepth);
    this.tooltip.setVisible(true);
  }

  public onPointerOut() {
    super.onPointerOut();
    this.upgradeImage.setTint(this.upgrade.upgradeLevel.tintColor);
    this.setDepth(this.lowDepth);
    this.tooltip.setVisible(false);
  }

  private calculateHighlight(): number {
    let tint = this.upgrade.upgradeLevel.tintColor;
    let red = Math.floor(tint / 0x10000 );
    let green = Math.floor((tint - red * 0x10000) / 0x100 );
    let blue = Math.floor((tint - red * 0x10000 - green * 0x100) / 0x1 );

    let redHighlight = Math.floor((0xff - red) * this.tintHighlightPercent);
    let greenHighlight = Math.floor((0xff - green) * this.tintHighlightPercent);
    let blueHighlight = Math.floor((0xff - blue) * this.tintHighlightPercent);
    let highlight = redHighlight * 0x10000 + greenHighlight * 0x100 + blueHighlight;
    return highlight;
  }
}
