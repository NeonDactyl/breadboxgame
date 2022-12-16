import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Bear extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.damage *= 1.3;
    aParams.hitPoints *= 1.5;
    super({
      ...aParams,
      texture: 'bear'
    });
  }

}
