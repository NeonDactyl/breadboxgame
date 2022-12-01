import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Dog2 extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    super({
      ...aParams,
      texture: 'dog_2'
    });
  }

}
