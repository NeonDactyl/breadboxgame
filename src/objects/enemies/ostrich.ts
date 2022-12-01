import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Ostrich extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.damage *= 1.05;
    aParams.totalVelocity *= 1.10;
    super({
      ...aParams,
      texture: 'ostrich'
    });
  }

}
