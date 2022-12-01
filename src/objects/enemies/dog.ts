import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Dog extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    super({
      ...aParams,
      texture: 'dog'
    });
  }

}
