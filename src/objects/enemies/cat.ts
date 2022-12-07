import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Cat extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.totalVelocity *= 1.3;
    super({
      ...aParams,
      texture: 'cat'
    });
  }

}
