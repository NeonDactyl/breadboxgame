import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Puffer extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.damage *= 0.9;
    aParams.totalVelocity *= 0.9;
    super({
      ...aParams,
      texture: 'puffer'
    });
  }

}
