import {IScoreBoardOptions} from "../../interfaces/scoreboard.interface";
import { Level } from "./level";
import { Score } from "./score";



export class ScoreBoard extends Phaser.GameObjects.Container {
  public level: Level;
  public score: Score;
  
  constructor(aParams: IScoreBoardOptions) {
    super(aParams.scene, aParams.x, aParams.y);
    this.score = new Score({
      scene: this.scene,
      x: 0,
      y: 0
    }) 
    this.level = new Level({
      scene: this.scene,
      x: 0,
      y: 30
    })   
    
    this.add([this.level, this.score])
  }

  reset(): void{
    this.level.resetLevel();
    this.score.resetScore();
  }
  nextLevel(): void {
    this.level.addLevel();
    this.score.addScore(100 * this.level.getLevel());
  }

  
}
