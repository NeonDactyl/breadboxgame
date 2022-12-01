import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Sloth extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.totalVelocity *= 0.6;
    super({
      ...aParams,
      texture: 'sloth'
    });
  }

}
