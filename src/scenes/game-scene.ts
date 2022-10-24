import { homeBase } from '../objects/homeBase';
import { Gun } from '../objects/gun';
import { Wave } from '../objects/wave';

export class GameScene extends Phaser.Scene {
  private dome: homeBase;
  private gun: Gun;
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
  }

  create(): void {
    this.waveCount = 0;
    this.enemyCount = 5;
    this.background = this.add.image(0, 0, "background").setOrigin(0,0).setScale(Phaser.ScaleModes.NEAREST);
    this.background.scaleX =  this.sys.canvas.width / this.background.width
    this.background.scaleY =  this.sys.canvas.height / this.background.height
    
    this.gun = new Gun({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - 30,
      texture: 'gun'
    })
    
    this.dome = new homeBase({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - 30,
      texture: 'homebase'
    })

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
  }
  
  update(): void {
    this.gun.update();
    this.wave.update(this.gun.getBullets(), this.dome);
    this.dome.update(this.wave);
    this.setHpText()

    if (this.dome.isDead()) {
      this.scene.pause();
      this.scene.launch('GameOverScene');
    }

    if (this.wave.isWaveOver())
    {
      this.wave = new Wave({
        scene: this,
        enemyCount: ++this.enemyCount,
        waveNumber: ++this.waveCount,
        basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)});

      this.gun.levelUp();
    }
  }

  private setHpText(): void {
    this.hpText.text = this.getHpText();
  }

  private getHpText(): string {
    return `HP: ${this.dome.getCurrentHp()} / ${this.dome.getMaxHp()}`;
  }
}
