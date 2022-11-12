export class UpgradeEffect {
  public Effect: string;
  public Target: UpgradeTarget;

  constructor(effect: string, target: UpgradeTarget) {
    if (!UpgradeEffect.Effects.includes(effect) || target == null) throw "Invalid effect parameters";
    this.Effect = effect;
    this.Target = target;
  }
  public static Effects: string[] = [
    "PlayerHealth",
    "PlayerRestoreHealth",
    "PlayerDamage",
    "PlayerCriticalChance",
    "PlayerCriticalDamage",
    "PlayerFireRate",
    "PlayerProjectileSpeed",
    "EnemySpeed",
    "EnemyDamage",
    "EnemyHealth"
  ];

  public static GetRandomUpgradeEffect(): UpgradeEffect {
    const randEffect = UpgradeEffect.Effects[Math.floor(Math.random() * UpgradeEffect.Effects.length)];
    let upgradeTarget: UpgradeTarget;
    if (randEffect.startsWith('Player')) {
      upgradeTarget = UpgradeTarget.Player;
    } else if (randEffect.startsWith('Enemy')) {
      upgradeTarget = UpgradeTarget.Enemy;
    } else {
      throw "something broke";
    }
    return new UpgradeEffect(randEffect, upgradeTarget);
  }
}

export enum UpgradeTarget {
  Player,
  Enemy
}

