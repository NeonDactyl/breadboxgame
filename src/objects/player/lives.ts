import {IScoreBoardOptions} from "../../interfaces/scoreboard.interface";
import { Life } from "./life";

export class Lives extends Phaser.GameObjects.Container {
  lives: Life[] = [];
  startLives: number = 3;
 
  constructor(aParams: IScoreBoardOptions) {
    super(aParams.scene, aParams.x, aParams.y);
    
  }
  setLives(): void {
    for(let i = 0; i< this.startLives; i++ ){
        this.lives.push(new Life({
          scene: this.scene,
          x: (20*i),
          y: 0
        }))
        this.add(this.lives[i]);
      }
  }
}