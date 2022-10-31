import {IScoreBoardOptions} from "../../interfaces/scoreboard.interface";

export class Level extends Phaser.GameObjects.Text {
  public level: number;
  public levelString: string;

  constructor(aParams: IScoreBoardOptions) {
    super(aParams.scene, aParams.x, aParams.y, "Level: 1", {fontSize: '3em', color: '#fff'});
    this.level = 1;
    this.levelString = `Level: 1`
  }

  getLevel(){
    return this.level;
  }
  getLevelString(){
    return `Level: ${this.level}`;
  }
  setLevel(level: number){
    this.level = level;
    this.setLevelString(level);
    this.text = this.levelString;
  }
  setLevelString(level: number){
    this.levelString = `Level: ${level}`;
  }
  addLevel(){
    this.setLevel(this.level+=1)
  }
  resetLevel(){
    this.setLevel(0);
    this.setLevelString(0);
  }

  
}
