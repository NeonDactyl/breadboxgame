import { Wave } from '../objects/wave';
import {Player} from '../objects/player/player';
import {Upgrade} from '../objects/upgrades/Upgrade';

export class GameScene extends Phaser.Scene {
  private player: Player;
  private background: Phaser.GameObjects.Image;
  private waveCount: number;
  private wave: Wave;
  private enemyCount: number;
  private hpText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
    this.waveCount = 0;
    this.enemyCount = 5;
  }

  preload(): void {
    this.load.image('bgImage', '../public/parallax-mountain-bg_all.png');
    this.load.image('homebase', '../public/Dome1.png');
    this.load.image('gun', '../public/lasergun.png');
    this.load.image('background', '../public/parallax-mountain-bg_all.png');
    this.load.image('e01', '../public/enemy-sprites/e01.png');
    this.load.image('e02', '../public/enemy-sprites/e02.png');
    this.load.image('e03', '../public/enemy-sprites/e03.png');
    this.load.image('e04', '../public/enemy-sprites/e04.png');
  }

  create(): void {
    this.waveCount = 0;
    this.enemyCount = 5;
    this.background = this.add.image(0, 0, "background").setOrigin(0,0).setScale(Phaser.ScaleModes.NEAREST);
    this.background.scaleX =  this.sys.canvas.width / this.background.width
    this.background.scaleY =  this.sys.canvas.height / this.background.height
    
    this.player = new Player ({
      scene: this, x: this.game.canvas.width / 2, y: this.game.canvas.height - 30
    });
    this.hpText = new Phaser.GameObjects.Text(this, 10, 10, this.getHpText(), {
      fontSize: '3em',
      color: '#fff'
    })
    
    
    this.wave = new Wave({
      scene: this,
      enemyCount: this.enemyCount,
      waveNumber: this.waveCount,
      basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)
    });

    this.add.existing(this.hpText);
    this.add.existing(this.player);
    this.events.on('resume', this.resumeScene);
  }
  
  update(): void {
    this.player.update(this.wave);
    this.wave.update(this.player.getBullets());
    this.setHpText()

    if (this.player.isDead()) {
      this.scene.pause();
      this.scene.launch('GameOverScene');
    }

    if (this.wave.isWaveOver())
    {
      this.scene.pause();
      this.scene.launch('SelectUpgradeScene');
      this.wave = new Wave({
        scene: this,
        enemyCount: ++this.enemyCount,
        waveNumber: ++this.waveCount,
        basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)});

      this.player.levelUp();
    }
  }

  private setHpText(): void {
    this.hpText.text = this.getHpText();
  }

  private getHpText(): string {
    return `HP: ${this.player.getHpString()}`;
  }

  resumeScene(fromScene: Phaser.Scene, data: Upgrade) {
    //this.player.applyUpgrade(data);
  }
}
