import {TextButton} from "../objects/buttons/text.button";
import {Player} from "../objects/player/player";

export class MainMenuScene extends Phaser.Scene {
  startButton: TextButton;
  buttonPresses: number = 0;

  constructor() {
    super({key: 'MainMenuScene'});
    // this.setOrigin(0,0);
  }

  preload(): void {
    this.load.image('button_text', '../ui/button.png');
    this.load.image('button_text_down', '../ui/button_down.png');
    this.load.image('homebase', '../Dome1.png');
    this.load.image('gun', '../lasergun.png');
    this.load.image('title', '../title.png');
  }

  create(): void {
    let startButtonText = "BEGIN";
    let title = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 100, 'title');
    // this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
    this.startButton = new TextButton({
      text: startButtonText,
      clickCallback: this.startGame.bind(this),
      scene: this,
      options: {
        // x: 0,
        // y: 0
        x: this.sys.canvas.width / 2,
        y: this.sys.canvas.height / 2
      },
      textColor: '#fff',
      textFont: 'sansserif',
      fontSize: '2em',
    });

    this.startButton.setInteractive();
    this.add.existing(this.startButton);
  }

  public update() {
    this.startButton.update();
    //this.startGame();
  }
      
  public startGame() {
    this.scene.start('MainScene');
  }
}
