import {TextButton} from "../objects/buttons/text.button";
import {UpgradeButton} from "../objects/buttons/upgrade-button";

export class MainMenuScene extends Phaser.Scene {
  startButton: TextButton;
  buttonPresses: number = 0;
  private bill: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.Image;
  private owen: Phaser.GameObjects.Image;
  private bryce: Phaser.GameObjects.Image;
  private wow: Phaser.GameObjects.Image;
  private music: Phaser.Sound.BaseSound;

  constructor() {
    super({key: 'MainMenuScene'});
  }

  preload(): void {
    this.load.image('button_text', '../ui/button.png');
    this.load.image('button_text_down', '../ui/button_down.png');
    this.load.image('homebase', '../Dome1.png');
    this.load.image('bryce', 'bryce.png');
    this.load.image('roy', 'roy.png');
    this.load.image('bread', 'bread.png');
    this.load.image('bryce_shades', 'transparent_bryce_shades.png');
    this.load.image('gun', '../lasergun.png');
    this.load.image('arm', 'arm.png');
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
    this.load.image('alligator', 'enemy-sprites/alligator.png');
    this.load.image('bear', 'enemy-sprites/bear.png');
    this.load.image('cat', 'enemy-sprites/cat.png');
    this.load.image('dog', 'enemy-sprites/dog.png');
    this.load.image('dog_2', 'enemy-sprites/dog_2.png');
    this.load.image('frog', 'enemy-sprites/frog.png');
    this.load.image('frog_2', 'enemy-sprites/frog_2.png');
    this.load.image('frog_3', 'enemy-sprites/frog_3.png');
    this.load.image('ostrich', 'enemy-sprites/ostrich.png');
    this.load.image('owl', 'enemy-sprites/owl.png');
    this.load.image('owl_2', 'enemy-sprites/owl_2.png');
    this.load.image('puffer', 'enemy-sprites/puffer.png');
    this.load.image('shark', 'enemy-sprites/shark.png');
    this.load.image('sloth', 'enemy-sprites/sloth.png');
    this.load.image('toad', 'enemy-sprites/toad.png');
    this.load.image('background', '../bg.png');
    this.load.image('life', '../lives-sprites/life.png');
    this.load.json('shapes', '../sprite_matter.json');
    this.load.image('riskyChoice', 'riskyChoice.png');
    this.load.image('beans', 'beans.png');
    this.load.image('juice', 'juice.png');
    this.load.image('bill', 'bill.png');
    this.load.image('owen', 'owen.png');
    this.load.image('wow', 'wow.png');
    this.load.image('wtf', 'wtf.png');
    this.load.image('menuBg', 'forest-menu.jpg');
    this.load.image('kyle', 'kyle_on_bench.png');
    this.load.audio('laser', 'laser.wav');
    this.load.audio('pop', 'pop.ogg');
    this.load.audio('openingTheme', 'openingTheme.ogg');
    this.load.audio('theme', 'theme.ogg');
    this.load.audio('damage', 'damage.ogg');
  }

  create(): void {
    this.background = this.add.image(0, 0, 'menuBg');
    this.sound.pauseOnBlur = false;
    this.background.width = this.sys.canvas.width;
    this.background.height = this.sys.canvas.height;
    this.background.setOrigin(0,0);

    this.owen = this.add.image(900, 700, 'owen');
    this.sound.volume = 0.2;
    this.owen.setScale(0.6);

    this.wow = this.add.image(950, 350, 'wow');
    this.wow.setScale(0.3);

    this.bryce = this.add.image(250, 750, 'bryce_shades');

    this.bill = this.add.image(200, 300, 'bill');
    this.bill.setScale(1);

    this.music = this.sound.add('openingTheme');
    this.music.play({loop: true});

    let startButtonText = "BEGIN";
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 100, 'title');
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

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
      this.time.delayedCall(300, () => {
        this.scene.start('MainScene');
      });
    });
  }

  public update() {
    this.startButton.update();
    this.bill.angle += 0.5;
    this.wow.setRotation(Math.sin(this.time.now / 250) / 4);
    this.owen.setScale(0.4 + Math.cos(this.time.now / 589) / 15);
    this.owen.setRotation(Math.cos(this.time.now / 350) / 11);
    this.bryce.setScale(1.0 + Math.cos(this.time.now / 834) / 10);
    this.bryce.setRotation(5 * Math.cos(this.time.now / 492) / 17);
  }
      
  public startGame() {
    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.tweens.add({
      targets: this.music,
      volume: 0,
      duration: 2000
    });
  }

}
