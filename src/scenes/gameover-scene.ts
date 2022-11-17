import {TextButton} from "../objects/buttons/text.button";
import { Hud } from '../objects/hud/hud';

export class GameOverScene extends Phaser.Scene {
  playAgainButton: TextButton;
    constructor() {
        super({key: 'GameOverScene'});

    }

  create(hud: Hud): void {
    let levelText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `Level Reached: ${hud.getLevel()}`, { fontSize: '4em'} ).setOrigin(0.5, 0.5);
    this.scene.stop('MainScene');
    let scoreText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `Total Score: ${hud.getScore()}`, { fontSize: '4em'} ).setOrigin(0.5, 1.5);
    let gameOverText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "G A M E O V E R", { fontSize: '4em'} ).setOrigin(0.5, 2.5);

    let playAgainButtonText = "Play Again";
    this.playAgainButton = new TextButton({
      text: playAgainButtonText,
      clickCallback: this.playAgain.bind(this),
      scene: this,
      options: { x: this.sys.canvas.width / 2, y: this.sys.canvas.height / 2 + 100},
      textColor: '#fff',
      textFont: 'sanserif',
      fontSize: '2em'
    });

    this.playAgainButton.setInteractive();
    this.add.existing(this.playAgainButton);
  }

  public playAgain() {
    this.scene.stop('GameOverScene');
    this.scene.get('MainScene').scene.restart();
    //this.scene.restart();
  }

  public update() {
    this.playAgainButton.update();
  }
}
