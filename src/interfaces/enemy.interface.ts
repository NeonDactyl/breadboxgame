import {ISpecificEnemyConstructor} from "./specific_enemy.interface";

export interface IEnemyConstructor extends ISpecificEnemyConstructor{
  texture: string;
}
