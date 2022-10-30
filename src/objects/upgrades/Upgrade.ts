import {UpgradeLevel} from "./UpgradeLevel";

export class Upgrade {
  displayText: string;
  modifierValue: number;
  modifierAffects: string;
  upgradeLevel: UpgradeLevel;

  constructor() {
    this.displayText = '';
    this.modifierValue = 0;
    this.modifierAffects = '';
    this.upgradeLevel = UpgradeLevel.GetRandomUpgradeLevel();
  }
  
  public static CreateRandomUpgrade(): UpgradeLevel {
    const upgradeLevel: UpgradeLevel = UpgradeLevel.GetRandomUpgradeLevel();
    return upgradeLevel;
  }
}

