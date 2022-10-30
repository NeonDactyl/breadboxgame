export class UpgradeEffect {
  public static ObjectAffected: string[] = [
    'Player',
    'Enemy'
  ];
  public static PlayerEffects: string[] = [
    "Health",
    "RestoreHealth",
    "Damage",
    "Armor",
    "CriticalChance",
    "CriticalDamage",
    "FireRate"
  ];
  public static EnemyEffects: string[] = [
    "Speed",
    "Damage",
    "Health"
  ];
}
