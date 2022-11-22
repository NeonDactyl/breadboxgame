import {UpgradeEffect} from "./UpgradeEffect";
import {UpgradeLevel} from "./UpgradeLevel";
import {UpgradeConfig} from "./UpgradeConfig";
import {IUpgradeEffectConfig, IUpgradeTierConfig} from "./UpgradeConfigInterface";

export class Upgrade {
  public displayText: string;
  public modifierValue: number;
  public upgradeEffect: UpgradeEffect;
  public upgradeLevel: UpgradeLevel;
  public spriteName: string;

  constructor(upgradeLevel: UpgradeLevel, upgradeEffect: UpgradeEffect) {
    this.upgradeEffect = upgradeEffect;
    this.upgradeLevel = upgradeLevel;
    this.setModifierAndText();
  }

  private setModifierAndText(): void {
    let effectSection: IUpgradeEffectConfig;
    switch (this.upgradeEffect.Effect) {
      case "PlayerHealth":
        effectSection = UpgradeConfig.PlayerHealth;
        break;
      case "PlayerRestoreHealth":
        effectSection = UpgradeConfig.PlayerRestoreHealth;
        break;
      case "PlayerDamage": 
        effectSection = UpgradeConfig.PlayerDamage;
        break;
      case "PlayerCriticalChance":
        effectSection = UpgradeConfig.PlayerCriticalChance;
        break;
      case "PlayerCriticalDamage":
        effectSection = UpgradeConfig.PlayerCriticalDamage;
        break;
      case "PlayerFireRate":
        effectSection = UpgradeConfig.PlayerFireRate;
        break;
      case "PlayerProjectileSpeed":
        effectSection = UpgradeConfig.PlayerProjectileSpeed;
        break;
      case "EnemySpeed":
        effectSection = UpgradeConfig.EnemySpeed;
        break;
      case "EnemyDamage":
        effectSection = UpgradeConfig.EnemyDamage;
        break;
      case "EnemyHealth":
        effectSection = UpgradeConfig.EnemyHealth;
        break;
      default:
        throw "Invalid Upgrade Config";
    }

    this.spriteName = effectSection.spriteName;
    this.setModifierAndTextBySection(effectSection);
  }

  private setModifierAndTextBySection(section: IUpgradeEffectConfig): void {
    let tierSection: IUpgradeTierConfig;
    switch (this.upgradeLevel) {
      case UpgradeLevel.Common:
        tierSection = section.common;
        break;
      case UpgradeLevel.Uncommon:
        tierSection = section.uncommon;
        break;
      case UpgradeLevel.Rare:
        tierSection = section.rare;
        break;
      case UpgradeLevel.Mythic:
        tierSection = section.mythic;
        break;
      default:
        throw "Invalid Upgrade Config";
    }
    this.displayText = tierSection.display;
    this.modifierValue = tierSection.modifier;
  }

  public static CreateRandomUpgrades(count: number): Upgrade[] {
    if (count > UpgradeEffect.Effects.length) throw "Requesting too many upgrades";
    let upgrades: Upgrade[] = [];
    let upgradeEffects = UpgradeEffect.GetRandomUpgradeEffects(count);
    for (let i = 0; i < count; i++) {
      let upgradeLevel = UpgradeLevel.GetRandomUpgradeLevel();
      upgrades.push(new Upgrade(upgradeLevel, upgradeEffects[i]));
    }
    const upgradeLevel: UpgradeLevel = UpgradeLevel.GetRandomUpgradeLevel();
    const upgradeEffect: UpgradeEffect = UpgradeEffect.GetRandomUpgradeEffect();
    
    return upgrades;
  }
}

