import { IGraphicsOptions } from "./graphics.interface";

export interface IBulletConstructor extends IGraphicsOptions {
    rotation: number;
    size: number;
    speed: number;
    damage: number;
  }
  