import {IGraphicsOptions} from "../graphics.interface";

export interface IButtonOptions extends IGraphicsOptions {
    clickCallback: Function;
    width?: number;
    height?: number;
}
