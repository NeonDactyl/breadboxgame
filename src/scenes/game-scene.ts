import { Wave } from '../objects/wave';
import {Player} from '../objects/player/player';
import {Upgrade} from '../objects/upgrades/Upgrade';
import { ScoreBoard } from '../objects/scoreBoard/scoreboard';

export class GameScene extends Phaser.Scene {
  private player: Player;
  private scoreBoard: ScoreBoard;
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
    this.load.image('bgImage', '../parallax-mountain-bg_all.png');
    this.load.image('homebase', '../Dome1.png');
    this.load.image('gun', '../lasergun.png');
    this.load.image('background', '../parallax-mountain-bg_all.png');
    this.load.image('e01', '../enemy-sprites/e01.png');
    this.load.image('e02', '../enemy-sprites/e02.png');
    this.load.image('e03', '../enemy-sprites/e03.png');
    this.load.image('e04', '../enemy-sprites/e04.png');
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
    this.scoreBoard = new ScoreBoard({
      scene: this, x: 10, y: 40
    })
    
    this.wave = new Wave({
      scene: this,
      enemyCount: this.enemyCount,
      waveNumber: this.waveCount,
      basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)
    });


    this.add.existing(this.hpText);
    this.add.existing(this.player);
    this.add.existing(this.scoreBoard);

    this.events.on('resume', this.resumeScene);
  }
  
  update(): void {
    this.player.update(this.wave);
    this.wave.update(this.player.getBullets());
    this.scoreBoard.score.addScore(this.wave.damageDealt/10);
    this.setHpText()

    let playerDead: boolean = this.player.isDead();
    let waveOver: boolean = this.wave.isWaveOver();

    if (playerDead) {
      this.scene.pause();
      this.player.lives -= 1;
      if(this.player.lives > 0){
        this.scene.launch('LostLifeScene', this.player);
        this.player.clearBullets();
        this.player.resetHitPoints();
        this.wave.clearEnemies();
        this.wave = new Wave({
          scene: this,
          enemyCount: this.enemyCount,
          waveNumber: this.waveCount,
          basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)});
      }
      else{
        this.scene.launch('GameOverScene', this.scoreBoard);
      }
      
    }

    if (waveOver)
    {
      this.player.clearBullets();
      this.scene.pause();
      this.scene.launch('SelectUpgradeScene');
      this.wave = new Wave({
        scene: this,
        enemyCount: ++this.enemyCount,
        waveNumber: ++this.waveCount,
        basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)});
      this.player.levelUp();
      this.scoreBoard.nextLevel();
      

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
