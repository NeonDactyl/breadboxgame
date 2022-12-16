import {IUpgradeConfig} from "./UpgradeConfigInterface";

export const UpgradeConfig:IUpgradeConfig = {
    "PlayerHealth": {
      spriteName: "PlayerHealth",
      "common": {
        "display": "Slightly increase maximum health",
        "modifier": 1.05
      },
      "uncommon": {
        "display": "Increase maximum health",
        "modifier": 1.10
      },
      "rare": {
        "display": "Substantially increase maximum health",
        "modifier": 1.20
      },
      "mythic": {
        "display": "Do you really need that much health?",
        "modifier": 1.60
      }
    },
    "PlayerRestoreHealth": {
      spriteName: "PlayerRestoreHealth",
      "common": {
        "display": "Regain a bit of health",
        "modifier": 0.1
      },
      "uncommon": {
        "display": "Regain 25% of your health",
        "modifier": 0.25
      },
      "rare": {
        "display": "Regain 60% of your health",
        "modifier": 0.6
      },
      "mythic": {
        "display": "Fully heal yourself",
        "modifier": 1
      }
    },
    "PlayerDamage": {
      spriteName: "PlayerDamage",
      "common": {
        "display": "Shots do a little more damage",
        "modifier": 1.05
      },
      "uncommon": {
        "display": "Shots do more damage",
        "modifier": 1.10
      },
      "rare": {
        "display": "Shots do even more damage",
        "modifier": 1.20
      },
      "mythic": {
        "display": "Shots do a lot more damage",
        "modifier": 1.40
      }
    },
    "PlayerCriticalChance": {
      spriteName: "PlayerCriticalChance",
      "common": {
        "display": "Increase your chance of a critical shot by 5%",
        "modifier": 0.05
      },
      "uncommon": {
        "display": "Increase your chance of a critical shot by 10%",
        "modifier": 0.10
      },
      "rare": {
        "display": "Increase your chance of a critical shot by 20%",
        "modifier": 0.20
      },
      "mythic": {
        "display": "Increase your chance of a critical shot by 40%",
        "modifier": 0.40
      }
    },
    "PlayerCriticalDamage": {
      spriteName: "PlayerCriticalDamage",
      "common": {
        "display": "Increase your critical shot damage a bit",
        "modifier": 1.05
      },
      "uncommon": {
        "display": "Increase your critical shot damage",
        "modifier": 1.10
      },
      "rare": {
        "display": "Increase your critical shot damage a lot",
        "modifier": 1.20
      },
      "mythic": {
        "display": "Increase your critical shot damage a super lot",
        "modifier": 1.40
      }
    },
    "PlayerFireRate": {
      spriteName: "PlayerFireRate",
      "common": {
        "display": "Fire a little faster",
        "modifier": 1.05
      },
      "uncommon": {
        "display": "Fire slightly faster",
        "modifier": 1.10
      },
      "rare": {
        "display": "Fire faster",
        "modifier": 1.20
      },
      "mythic": {
        "display": "Fire considerably faster",
        "modifier": 1.40
      }
    },
    "PlayerProjectileSpeed": {
      spriteName: "PlayerProjectileSpeed",
      "common": {
        "display": "Shots move a teensy bit faster",
        "modifier": 1.05
      },
      "uncommon": {
        "display": "Shots move a bit faster",
        "modifier": 1.10
      },
      "rare": {
        "display": "Shots move faster",
        "modifier": 1.20
      },
      "mythic": {
        "display": "Shots move a lot faster",
        "modifier": 1.40
      }
    },
    "EnemySpeed": {
      spriteName: "EnemySpeed",
      "common": {
        "display": "Enemies move a little slower",
        "modifier": 0.95
      },
      "uncommon": {
        "display": "Enemies move slower",
        "modifier": 0.90
      },
      "rare": {
        "display": "Enemies move significantly slower",
        "modifier": 0.80
      },
      "mythic": {
        "display": "Enemies move substantially slower",
        "modifier": 0.60
      }
    },
    "EnemyDamage": {
      spriteName: "EnemyDamage",
      "common": {
        "display": "Enemies do a little less damage",
        "modifier": 0.95
      },
      "uncommon": {
        "display": "Enemies do less damage",
        "modifier": 0.90
      },
      "rare": {
        "display": "Enemies do significantly less damage",
        "modifier": 0.80
      },
      "mythic": {
        "display": "Enemies do substantially less damage",
        "modifier": 0.60
      }
    },
    "EnemyHealth": {
      spriteName: "EnemyHealth",
      "common": {
        "display": "Enemies have a little less health",
        "modifier": 0.95
      },
      "uncommon": {
        "display": "Enemies have less health",
        "modifier": 0.90
      },
      "rare": {
        "display": "Enemies have significantly less health",
        "modifier": 0.80
      },
      "mythic": {
        "display": "Enemies have substantially less health",
        "modifier": 0.60
      }
    }
}
