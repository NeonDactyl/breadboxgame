import { Wave } from '../objects/wave';
import {Player} from '../objects/player/player';
import {Upgrade} from '../objects/upgrades/Upgrade';
import { Hud } from '../objects/hud/hud';
import {UpgradeTarget} from '../objects/upgrades/UpgradeEffect';
import { Lives } from '../objects/lives/lives';

export class GameScene extends Phaser.Scene {
  private player: Player;
  private hud: Hud;
  private background: Phaser.GameObjects.Image;
  private waveCount: number;
  private wave: Wave;
  private enemyCount: number;
  private hpText: Phaser.GameObjects.Text;
  private enemyUpgrades: Upgrade[];
  public static instanceCount: number = 1;
  public instanceId: number;
  private laserSound: Phaser.Sound.BaseSound;
  private popSound: Phaser.Sound.BaseSound;
  private music: Phaser.Sound.BaseSound;
  private lives: Lives;
  private gameOver: boolean = false;

  constructor() {
    super({ key: 'MainScene' });
    this.instanceId = GameScene.instanceCount++;
  }

  preload(): void {
  }

  init(): void {
    this.events.on('resume', this.resume.bind(this));
    this.gameOver = false;
    this.enemyCount = 5;
    this.waveCount = 0;
    this.enemyCount = 5;
    this.enemyUpgrades = [];
    this.events.on('shutdown', () => { this.events.off('resume')});
  }

  create(): void {
    this.background = this.add.image(0, 0, "background").setOrigin(0,0).setScale(Phaser.ScaleModes.NEAREST);
    this.background.scaleX =  this.sys.canvas.width / this.background.width
    this.background.scaleY =  this.sys.canvas.height / this.background.height
    this.sound.volume = 0.2;

    this.music = this.sound.add('theme');

    this.laserSound = this.sound.add('laser');
    this.popSound = this.sound.add('pop');
    
    this.player = new Player ({
      scene: this, x: this.game.canvas.width / 2, y: this.game.canvas.height - 30
    });

    this.hud = new Hud({
      scene: this, x: 10, y: 10
    });
    this.hud.setDepth(15);
    

    this.wave = new Wave({
      scene: this,
      enemyCount: this.enemyCount,
      waveNumber: this.waveCount,
      basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30),
      upgrades: this.enemyUpgrades
    });

    this.lives = new Lives({
      scene: this,
      x: 1080,
      y: 10
    })


    this.add.existing(this.player);
    this.add.existing(this.hud);
    this.add.existing(this.lives);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
      this.scene.launch('GameOverScene', this.hud);
    });
    this.music.play({ loop: true});

  }
  
  update(): void {
    if (this.gameOver) return;
    if (!this.scene.isActive()) return;
    this.player.update(this.wave);
    this.wave.update(this.player.getBullets());
    this.hud.update({
      hpText: this.getHpText(), 
      damageDealt: this.wave.damageDealt/10
    });

    let playerDead: boolean = this.player.isDead();
    let waveOver: boolean = this.wave.isWaveOver();

    if (playerDead) {
      this.player.lives -= 1;
      this.lives.lostLife(this.player.lives);
      if(this.player.lives > 0){
        this.scene.pause();
        this.restartWave();
        this.scene.launch('LostLifeScene', this.lives);
      }
      else{
        this.gameOver = true;
        let audioTween = this.tweens.add({
          targets: this.music,
          volume: 0,
          duration: 500
        });
        this.cameras.main.fadeOut(500, 0, 0, 0);
        audioTween.on('complete', (a:any) => {
          this.music.stop();
        });
      }
    }

    if (waveOver)
    {
      this.player.clearBullets();
      this.scene.pause();
      this.scene.launch('SelectUpgradeScene');
      this.player.levelUp();
      this.waveCount++;
      this.hud.nextLevel();
    }
    
  }

  private restartWave(){
    this.player.clearBullets();
    this.player.resetHitPoints();
    this.wave.clearEnemies();
    //this.wave = new Wave({
      //scene: this,
      //enemyCount: this.enemyCount,
      //waveNumber: this.waveCount,
      //upgrades: this.enemyUpgrades,
      //basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30)});
  }

  private getHpText(): string {
    return `HP: ${this.player.getHpString()}`;
  }


  public resume(scene: Phaser.Scene, upgrade: Upgrade) {
    if (upgrade) {
      switch (upgrade.upgradeEffect.Target) {
        case UpgradeTarget.Player:
          this.player.applyUpgrade(upgrade);
          break;
        case UpgradeTarget.Enemy:
          this.enemyUpgrades.push(upgrade);
          break;
        default:
          break;
        }
    }
    this.enemyCount++;
    this.wave = new Wave({
      scene: this,
      enemyCount: this.enemyCount,
      waveNumber: this.waveCount,
      basePosition: new Phaser.Geom.Point(this.game.canvas.width / 2, this.game.canvas.height - 30),
      upgrades: this.enemyUpgrades
    });
  }
}
