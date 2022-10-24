import { Enemy } from './enemy';
import { IWaveConstructor } from '../interfaces/wave.interface';
import { Bullet } from './bullet';
import { homeBase } from './homeBase';
export class Wave {
    scene: Phaser.Scene;
    enemyCount: number;
    enemies: Enemy[];
    waveNumber: number;
    basePosition: Phaser.Geom.Point;

    constructor(aParams: IWaveConstructor) {
        this.scene = aParams.scene;
        this.enemyCount = aParams.enemyCount;
        this.enemies = [];
        this.basePosition = aParams.basePosition;
        this.waveNumber = aParams.waveNumber;
        this.initWave();
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    private initWave(): void {
        for (let i = 0; i < this.enemyCount ; i++) {
            this.spawnEnemy();
            this.enemies[this.enemies.length - 1 ].setTint(this.generateColor());
        }
    }

    public isWaveOver(): boolean {
        return this.enemies.length === 0;
    }

    private spawnEnemy(): void {
        let enemyPosition = this.generateEnemyPosition()
        this.enemies.push(new Enemy(
            {
                x: enemyPosition.x,
                y: enemyPosition.y,
                baseX: this.basePosition.x,
                baseY: this.basePosition.y,
                totalVelocity: 1.5 * (1 + Math.pow(1.01, this.waveNumber)),
                texture: 'e01',
                scene: this.scene,
                hitPoints: 120 * Math.pow(1.05, this.waveNumber)
            }
        ))
    }

    private generateEnemyPosition() : Phaser.Geom.Point {
        let safeZoneRadius = Math.min(this.scene.sys.canvas.width, this.scene.sys.canvas.height) * 0.75;

        let enemyX = Math.random() * this.scene.sys.canvas.width;

        let yOffset = Math.sqrt(Math.abs(safeZoneRadius * safeZoneRadius - Math.pow(this.basePosition.x - enemyX, 2)))

        let enemyY = (Math.random() * (this.scene.sys.canvas.height - yOffset));

        return new Phaser.Geom.Point(enemyX, enemyY);
    }

    update(bullets: Bullet[], base: homeBase): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
            for (let j = 0; j < bullets.length; j++) {
                let e = this.enemies[i];
                let b = bullets[j];
                if (this.enemies[i].active && this.scene.physics.collide(e, b))
                {
                    this.enemies[i].takeDamageFromBullet(bullets[j]);
                    bullets[j].destroy();
                    bullets.splice(j, 1);
                    if (this.enemies[i].isDead()) {
                        this.enemies[i].destroy();
                        this.enemies.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    private generateColor(): number {
        let red = Phaser.Math.RND.between(0x60, 0xff) * 0x10000;
        let green = Phaser.Math.RND.between(0x60, 0xff) * 0x100;
        let blue = Phaser.Math.RND.between(0x60, 0xff);

        return red+green+blue;
    }
}