import Phaser from "phaser";
import { IEnemyConstructor } from "../interfaces/enemy.interface";
import { Bullet } from "./bullet";

export class Enemy extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  private readonly maxHeight = 100;
  private readonly maxWidth = 100;

  private velocity: Phaser.Math.Vector2;
  private hp: number;
  private attack: number;

  public getBody(): any {
      return this.body;
  }

  constructor(aParams: IEnemyConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    this.x = aParams.x;
    this.y = aParams.y;

    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.allowDrag = false;
    
    let widthRatio = this.maxWidth / this.texture.getSourceImage().width;
    let heightRatio = this.maxHeight / this.texture.getSourceImage().height;
    let interactiveArea = this.scene.cache.json.get('shapes')[aParams.texture][0].shape;
    let cacheObject = this.scene.cache.json.get('shapes');
    this.setInteractive(new Phaser.Geom.Polygon(interactiveArea), Phaser.Geom.Polygon.Contains);

    this.scale = Math.min(widthRatio, heightRatio);

    this.hp = aParams.hitPoints;
    this.attack = aParams.damage;


    this.setVelocity(aParams.baseX, aParams.baseY, aParams.totalVelocity);

    this.scene.add.existing(this);
  }

  public takeDamageFromBullet(bullet: Bullet) {
    this.hp = this.hp - bullet.damage;
  }

  public isDead(): boolean { 
    return this.hp <= 0;
  }

  update(): void {
    this.applyForces();
  }

  public getAttack(): number {
    return this.attack;
  }

  private applyForces(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  private setVelocity(baseX: number, baseY: number, totalVelocity: number)
  {
    let xDelta = baseX - this.x;
    let yDelta = baseY - this.y;
    let angle = Math.atan2(yDelta, xDelta);
    this.velocity = this.scene.physics.velocityFromRotation(angle, totalVelocity);
  }
}
