import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Frog2 extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.hitPoints *= 0.85;
    super({
      ...aParams,
      texture: 'frog_2'
    });
  }

}
