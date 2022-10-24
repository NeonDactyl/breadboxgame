export interface IWaveConstructor {
    scene: Phaser.Scene;
    enemyCount: number;
    waveNumber: number;
    basePosition: Phaser.Geom.Point;
}