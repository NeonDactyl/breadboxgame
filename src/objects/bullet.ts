import { IBulletConstructor } from '../interfaces/bullet.interface';
export class Bullet extends Phaser.GameObjects.Graphics {
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
    super(aParams.scene, aParams.options);

    this.selectedColor = this.generateColor();
    this.isOffScreen = false;

    this.damage = aParams.damage;
    this.isCritical = aParams.isCritical;

    this.x = aParams.options.x ?? 0;
    this.y = aParams.options.y ?? 0;
    this.velocity = new Phaser.Math.Vector2(
      -aParams.speed * Math.cos(aParams.rotation + Math.PI ),
      -aParams.speed * Math.sin(aParams.rotation + Math.PI )
    );

    this.fillStyle(this.selectedColor, 1);
    this.lineStyle(1, 0x000000);
    if (this.isCritical) {
      this.drawCriticalTriangles(aParams.size + 5);
    }
    this.fillCircle(0, 0, aParams.size);
    this.strokeCircle(0, 0, aParams.size);

    this.scene.physics.world.enable(this);
    this.body.allowDrag = false;
    this.body.setAllowGravity(false);
    this.body.setCircle(aParams.size);
    this.body.setOffset(-1 * aParams.size, -1 * aParams.size);
    this.scene.add.existing(this);
  }

  drawCriticalTriangles(radius: number) {
    let x0 = radius;
    let y0 = 0;
    let x1 = (radius) * Math.cos(2 * Math.PI / 3);
    let y1 = (radius) * Math.sin(2 * Math.PI / 3);
    let x2 = (radius) * Math.cos(4 * Math.PI / 3);
    let y2 = (radius) * Math.sin(4 * Math.PI / 3);
    let x3 = x0 * -1;
    let y3 = y0 * -1;
    let x4 = x1 * -1;
    let y4 = y1 * -1;
    let x5 = x2 * -1;
    let y5 = y2 * -1;
    this.fillTriangle(x0, y0, x1, y1, x2, y2);
    this.strokeTriangle(x0, y0, x1, y1, x2, y2);
    this.fillTriangle(x3, y3, x4, y4, x5, y5);
    this.strokeTriangle(x3, y3, x4, y4, x5, y5);
  }

  update(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.isOffScreen) {
      this.setActive(false);
    }
    // if (this.isCritical) {
      // this.fillStyle(this.generateColor());
    // }
    
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
