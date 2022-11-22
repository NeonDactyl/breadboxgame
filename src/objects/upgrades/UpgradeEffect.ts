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

  public static GetRandomUpgradeEffects(count: number): UpgradeEffect[] {
    const randEffects = UpgradeEffect.Effects.sort((a, b) => Math.random() - 0.5).slice(0, count);
    let effects: UpgradeEffect[] = [];
    randEffects.forEach((randEffect) => {

      let upgradeTarget: UpgradeTarget;
      if (randEffect.startsWith('Player')) {
        upgradeTarget = UpgradeTarget.Player;
      } else if (randEffect.startsWith('Enemy')) {
        upgradeTarget = UpgradeTarget.Enemy;
      } else {
        throw "something broke";
      }
      effects.push(new UpgradeEffect(randEffect, upgradeTarget));
    });
 
    return effects;
  }
}

export enum UpgradeTarget {
  Player,
  Enemy
}

