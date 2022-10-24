import { IButtonOptions } from './button.interface';
export interface ITextButtonOptions extends IButtonOptions {
    text: string;
    textColor: string;
    textFont: string;
    fontSize: string;
}