import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Shark extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.damage *= 1.1;
    aParams.totalVelocity *= 1.05;
    super({
      ...aParams,
      texture: 'shark'
    });
  }

}
