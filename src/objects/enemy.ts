import { IEnemyConstructor } from "../interfaces/enemy.interface";
import { Bullet } from "./bullet";

export class Enemy extends Phaser.GameObjects.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

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

        this.hp = aParams.hitPoints;
        this.attack = 30;

        this.scale = 2;

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
