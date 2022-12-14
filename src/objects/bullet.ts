import { IBulletConstructor } from '../interfaces/bullet.interface';
export class Bullet extends Phaser.GameObjects.Sprite {
  declare body : Phaser.Physics.Arcade.Body;

  private selectedColor: number;
  private isCritical: boolean;
  private velocity: Phaser.Math.Vector2;
  private isOffScreen: boolean;
  damage: number;

  public getBody(): any {
    return this.body;
  }

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.options.x || 0, aParams.options.y || 0, "bread");

    this.selectedColor = this.generateColor();
    this.isOffScreen = false;
    this.setRotation(aParams.rotation + Math.PI / 2);

    this.damage = aParams.damage;
    this.isCritical = aParams.isCritical;

    this.x = aParams.options.x ?? 0;
    this.y = aParams.options.y ?? 0;
    this.velocity = new Phaser.Math.Vector2(
      -aParams.speed * Math.cos(aParams.rotation + Math.PI ),
      -aParams.speed * Math.sin(aParams.rotation + Math.PI )
    );

    if (this.isCritical) {
     this.setTint(0xFFD700);
      console.log('critical shot');
    }

    this.scene.physics.world.enable(this);
    this.body.allowDrag = false;
    this.body.setAllowGravity(false);
    this.body.setCircle(aParams.size);
    this.body.setOffset(-1 * aParams.size, -1 * aParams.size);
    this.scene.add.existing(this);
  }


  update(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.isOffScreen) {
      this.setActive(false);
    }
    
    this.checkIfOffScreen();
  }

  private checkIfOffScreen(): void {
    if (
      this.x > this.scene.sys.canvas.width + 1 ||
      this.y > this.scene.sys.canvas.height + 1 ||
      this.x < 0 ||
      this.y < 0
    ) {
      this.isOffScreen = true;
    }
  }

  private generateColor(): number {
    let red = Phaser.Math.RND.between(0x60, 0xff) * 0x10000;
    let green = Phaser.Math.RND.between(0x60, 0xff) * 0x100;
    let blue = Phaser.Math.RND.between(0x60, 0xff);

    return red+green+blue;
  }
}
