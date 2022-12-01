export interface ISpecificEnemyConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  totalVelocity: number;
  hitPoints: number;
  frame?: string;
  options?: Phaser.Types.GameObjects.Graphics.Options;
  damage: number;
}
