import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Toad extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.hitPoints *= 0.85;
    aParams.totalVelocity *= 0.85;
    super({
      ...aParams,
      texture: 'toad'
    });
  }

}
