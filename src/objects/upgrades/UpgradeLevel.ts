export class UpgradeLevel {
  public tintColor: number = 0;
  public rarityName: string = '';
  public rarityValue: number = 0;

  public static Common: UpgradeLevel = {
    tintColor: 0x888888,
    rarityName: "Common",
    rarityValue: 0.65
  }

  public static Uncommon: UpgradeLevel = {
    tintColor: 0x0000aa,
    rarityName: "Uncommon",
    rarityValue: 0.25
  }

  public static Rare: UpgradeLevel = {
    tintColor: 0xaa00aa,
    rarityName: "Rare",
    rarityValue: 0.09
  }

  public static Mythic: UpgradeLevel = {
    tintColor: 0xbe9800,
    rarityName: "Mythic",
    rarityValue: 0.01
  }

  public static GetRandomUpgradeLevel(): UpgradeLevel {
    var upgradeLevels = [
      UpgradeLevel.Common, 
      UpgradeLevel.Uncommon, 
      UpgradeLevel.Rare, 
      UpgradeLevel.Mythic
    ];
    var cumulativeWeights = upgradeLevels.map((sum => value => sum += value.rarityValue * 100)(0));
    var randNum = Math.ceil(Math.random()  * 100);
    for (let i = 0; i < upgradeLevels.length; i++) {
      if (randNum <= cumulativeWeights[i]) return upgradeLevels[i];
    }
    return new UpgradeLevel();
  }
} 
