import {IHudOptions} from "../../interfaces/hud.interface";

export class Lives extends Phaser.GameObjects.Text {
  public lives: number;
  public livesString: string;

  constructor(aParams: IHudOptions) {
    super(aParams.scene, aParams.x, aParams.y, "Live(s): 3", {fontSize: '3em', color: '#fff'});
    this.lives = 3;
    this.livesString = `Live(s): 3`
  }

  getLives(){
    return this.lives;
  }
  getLivesString(){
    return `Live(s): ${this.lives}`;
  }
  setLives(lives: number){
    this.lives = lives;
    this.setLivesString(lives);
    this.text = this.livesString;
  }
  setLivesString(lives: number){
    this.livesString = `Live(s): ${lives}`;
  }
  addLife(){
    this.setLives(this.lives+=1)
  }
  resetLives(){
    this.setLives(3);
  }

  
}
