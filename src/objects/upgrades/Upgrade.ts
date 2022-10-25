import {UpgradeLevel} from "./UpgradeLevel";

export class Upgrade {
  public static CreateRandomUpgrade(): UpgradeLevel {
    var upgradeLevel: UpgradeLevel = UpgradeLevel.GetRandomUpgradeLevel();
    return upgradeLevel;
  }
}

