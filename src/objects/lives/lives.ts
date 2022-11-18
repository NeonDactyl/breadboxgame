import {ILivesOptions} from "../../interfaces/lives.interface";
import { Life } from "./life";

export class Lives extends Phaser.GameObjects.Container {
  public lives: Life[] = [];
  public startLives: number = 3;
  
  constructor(aParams: ILivesOptions) {
    super(aParams.scene, aParams.x, aParams.y);
    this.setLives();
  }

  setLives(): void{
    for(let i = 0; i< this.startLives; i++ ){
        this.lives.push(new Life({
          scene: this.scene,
          x: (40*i),
          y: 0
        }))
        this.add(this.lives[i]);
      }
  }

    lostLife(index : number): void{
      this.lives[index].destroy();
      this.lives.pop();
    }
}