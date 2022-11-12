import {TextButton} from "../objects/buttons/text.button";
import {UpgradeButton} from "../objects/buttons/upgrade-button";
import {Upgrade} from "../objects/upgrades/Upgrade";

export class MainMenuScene extends Phaser.Scene {
  startButton: TextButton;
  buttonPresses: number = 0;

  constructor() {
    super({key: 'MainMenuScene'});
  }

  preload(): void {
    this.load.image('button_text', '../ui/button.png');
    this.load.image('button_text_down', '../ui/button_down.png');
    this.load.image('homebase', '../Dome1.png');
    this.load.image('gun', '../lasergun.png');
    this.load.image('title', '../title.png');
    this.load.image('PlayerHealth', '../ui/upgrades/max_health.png');
    this.load.image('PlayerRestoreHealth', '../ui/upgrades/restore_health.png');
    this.load.image('PlayerDamage', '../ui/upgrades/damage.png');
    this.load.image('PlayerCriticalChance', '../ui/upgrades/critical_chance.png');
    this.load.image('PlayerCriticalDamage', '../ui/upgrades/critical_damage.png');
    this.load.image('PlayerFireRate', '../ui/upgrades/fire_rate.png');
    this.load.image('PlayerProjectileSpeed', '../ui/upgrades/projectile_speed.png');
    this.load.image('EnemySpeed', '../ui/upgrades/enemy_speed.png');
    this.load.image('EnemyDamage', '../ui/upgrades/enemy_damage.png');
    this.load.image('EnemyHealth', '../ui/upgrades/enemy_health.png');
  }

  create(): void {
    let startButtonText = "BEGIN";
    // let title = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 100, 'title');
    // this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
    this.startButton = new TextButton({
      text: startButtonText,
      clickCallback: this.startGame.bind(this),
      scene: this,
      options: {
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
    this.scene.start('MainScene');
  }
}
