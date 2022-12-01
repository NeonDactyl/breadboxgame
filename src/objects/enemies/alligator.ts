import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Alligator extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.damage *= 1.2;
    super({
      ...aParams,
      texture: 'alligator'
    });
  }

}
