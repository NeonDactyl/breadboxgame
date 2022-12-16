import {TextButton} from "../objects/buttons/text.button";
import { Hud } from '../objects/hud/hud';

export class GameOverScene extends Phaser.Scene {
  private wtf: Phaser.GameObjects.Image;
  private kyle: Phaser.GameObjects.Image;
  private roy: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.Image;
  private music: Phaser.Sound.BaseSound;
  playAgainButton: TextButton;
    constructor() {
        super({key: 'GameOverScene'});

    }

  create(hud: Hud): void {
    this.background = this.add.image(0, 0, 'menuBg');
    this.background.width = this.sys.canvas.width;
    this.background.height = this.sys.canvas.height;
    this.background.setOrigin(0,0);

    this.wtf = this.add.image(950, 550, 'wtf');
    this.kyle = this.add.image(950, 750, 'kyle');
    this.roy = this.add.image(250, 650, 'roy');
    this.roy.setScale(0.5);
    let levelText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `Level Reached: ${hud.getLevel()}`, { fontSize: '4em'} ).setOrigin(0.5, 0.5);
    this.scene.stop('MainScene');
    let scoreText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `Total Score: ${hud.getScore()}`, { fontSize: '4em'} ).setOrigin(0.5, 1.5);
    let gameOverText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "G A M E O V E R", { fontSize: '4em'} ).setOrigin(0.5, 2.5);

    this.music = this.sound.add('openingTheme');
    this.music.play();

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

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
      this.time.delayedCall(300, () => {
        this.scene.stop('GameOverScene');
        this.music.stop();
        this.scene.get('MainScene').scene.restart();
      });
    });
  }

  public playAgain() {
    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.tweens.add({
      targets: this.music,
      volume: 0,
      duration: 2000
    });
    //this.scene.get('MainScene').scene.restart();
    //this.scene.restart();
  }

  public update() {
    this.playAgainButton.update();
    this.wtf.setRotation(Math.PI * Math.sin(this.time.now / 500) / 7);
    this.roy.setRotation(Math.PI * Math.sin(this.time.now / 792) / 11);
    this.wtf.setScale(1 + (Math.sin(this.time.now / 622) / 7));
  }
}
