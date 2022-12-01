import {ISpecificEnemyConstructor} from "../../interfaces/specific_enemy.interface";
import {Enemy} from "../enemy";

export class Owl extends Enemy {
  constructor(aParams: ISpecificEnemyConstructor) {
    aParams.totalVelocity *= 1.15;
    super({
      ...aParams,
      texture: 'owl'
    });
  }

}
