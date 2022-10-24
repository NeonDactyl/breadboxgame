import {TextButton} from "../objects/buttons/text.button";

export class MainMenuScene extends Phaser.Scene {
  startButton: TextButton;

  constructor() {
    super({key: 'MainMenuScene'});
    // this.setOrigin(0,0);
  }

  preload(): void {
    this.load.image('button_text', '../public/ui/button.png');
    this.load.image('button_text_down', '../public/ui/button_down.png');
  }

  create(): void {
    let startButtonText = "Start Game";
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
  }
      
  public startGame() {
    console.log('starting game from menu scene');
    this.scene.start('MainScene');
  }
}
