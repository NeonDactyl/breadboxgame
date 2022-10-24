import { IImageConstructor } from '../interfaces/image.interface';
import { Bullet } from './bullet';

export class Gun extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    public static maxRotation: number = Math.PI / 2;
    public static minRotation: number = Gun.maxRotation * -1;
    private bullets: Bullet[];
    private pointer: Phaser.Input.Pointer;
    private cooldownRemaining: number;
    private cooldown: number;
    private damage: number;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        this.bullets = [];
        this.pointer = this.scene.input.activePointer;
        this.cooldownRemaining = 0;

        this.cooldown = 15;
        this.damage = 100;

        this.initSprite();
        this.scene.add.existing(this);

    }

    public getBullets(): Bullet[] {
      return this.bullets;
    }

    private initSprite() {
        this.setOrigin(-0.5, 0.5);
        this.setScale(0.5);
        this.rotation = 0;
        this.setInteractive();
    }

    update() {
        if (this.active) {
            this.handleInput();
        } else {

        }
        this.updateBullets();
    }

    private handleInput(): void {
      this.cooldownRemaining = Math.max(0, this.cooldownRemaining - 1);
      
      let deltaX = this.scene.input.x - this.x;
      let deltaY = this.scene.input.y - this.y;
      let angle = Math.atan2(deltaY, deltaX) + (Math.PI / 2);
      if (angle >= Gun.maxRotation) {
        angle = (deltaX < 0 ? Gun.minRotation : Gun.maxRotation);
      }
      if (angle <= Gun.minRotation) angle = Gun.minRotation;
      this.rotation = angle - (Math.PI / 2);

      if (this.pointer.primaryDown && this.cooldownRemaining == 0) {
          this.shoot();
      }
    }

    private updateBullets(): void {
        for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].active) {
            this.bullets[i].update();
        } else {
            this.bullets[i].destroy();
            this.bullets.splice(i, 1);
        }
        }
    }
    

  private shoot(): void {
    let r = this.rotation + Math.PI / 2;
    let offset = 0.7;
    this.bullets.push(
      new Bullet({
        scene: this.scene,
        rotation: this.rotation,
        options: {
          x: this.x + (this.width * Math.sin(r) * offset),
          y: this.y - (this.width * Math.cos(r) * offset)
        },
        size: 10,
        damage: this.damage,
        speed: 15
      })
    );
    this.cooldownRemaining = this.cooldown;
  }

  public levelUp(): void {
    this.cooldown *= 0.9;
    this.damage *= 1.1;
  }
}