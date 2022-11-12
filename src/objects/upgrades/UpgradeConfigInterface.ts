export interface IUpgradeConfig {
  "PlayerHealth": IUpgradeEffectConfig;
  "PlayerRestoreHealth": IUpgradeEffectConfig;
  "PlayerDamage": IUpgradeEffectConfig;
  "PlayerCriticalChance": IUpgradeEffectConfig;
  "PlayerCriticalDamage": IUpgradeEffectConfig;
  "PlayerFireRate": IUpgradeEffectConfig;
  "PlayerProjectileSpeed": IUpgradeEffectConfig;
  "EnemySpeed": IUpgradeEffectConfig;
  "EnemyDamage": IUpgradeEffectConfig;
  "EnemyHealth": IUpgradeEffectConfig;
}

export interface IUpgradeTierConfig {
  display: string;
  modifier: number;
}

export interface IUpgradeEffectConfig {
  common: IUpgradeTierConfig;
  uncommon: IUpgradeTierConfig;
  rare: IUpgradeTierConfig;
  mythic: IUpgradeTierConfig;
  spriteName: string;
}
