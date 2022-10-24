import { Button } from './button';
import { ITextButtonOptions } from '../../interfaces/buttons/text.button.interface';
export class TextButton extends Button {
  private textObject: Phaser.GameObjects.Text;
  private bgImage: Phaser.GameObjects.Image;
  private buttonText: string;
  private buttonOptions: Phaser.Types.GameObjects.Text.TextStyle;
  private textY: number;

  constructor(aParams: ITextButtonOptions) {
    super(aParams);

    this.buttonOptions = {
        fontFamily: aParams.textFont,
        fontSize: aParams.fontSize,
        color: aParams.textColor
      };

    this.buttonText = aParams.text;
    this.x = aParams.options.x ?? 0;
    this.y = aParams.options.y ?? 0;

    this.bgImage = this.scene.add.image(0, 0, 'button_text');
    this.textObject = this.scene.add.text(0,
      0,
      this.buttonText,
      this.buttonOptions);
    this.add([this.bgImage, this.textObject]);
    this.width = this.bgImage.width;
    this.height = this.bgImage.height;
    this.textObject.setOrigin(0.5, 0.5);
    this.textY = this.textObject.y;

    this.on('pointerover', this.onPointerOver);
    this.on('pointerout', this.onPointerOut);
  }

  public onPointerOver() {
    super.onPointerOver();
    this.bgImage.setTint(0x00ff00);
  }


  public onPointerOut() {
    super.onPointerOut();
    this.bgImage.clearTint();
  }

  public update() {
    this.bgImage.setTexture(this.isDown ? 'button_text_down' : 'button_text');
    this.textObject.y = this.textY + (this.isDown ? 2 : 0); 
  }

}
