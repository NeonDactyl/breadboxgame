import {TextButton} from "../objects/buttons/text.button";
import {Lives} from "../objects/lives/lives";
import { Wave } from "../objects/wave";

export class LostLifeScene extends Phaser.Scene {
  continueButton: TextButton;
    constructor() {
        super({key: 'LostLifeScene'});

    }

    create(lives: Lives): void {
      this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `Lives Left: ${lives.lives.length}`, { fontSize: '4em'} ).setOrigin(0.5, 2.5);
      let continueButtonText = "Continue";
      this.continueButton = new TextButton({
        text: continueButtonText,
        clickCallback: this.playAgain.bind(this),
        scene: this,
        options: { x: this.sys.canvas.width / 2, y: this.sys.canvas.height / 2 + 100},
        textColor: '#fff',
        textFont: 'sanserif',
        fontSize: '2em'
      });

      this.continueButton.setInteractive();
      this.add.existing(this.continueButton);
    }

  public playAgain() {
    this.scene.stop('LostLifeScene')
    this.scene.launch('SelectUpgradeScene');
  }

  public update() {
    this.continueButton.update();
  }
}