import {IScoreBoardOptions} from "../../interfaces/scoreboard.interface";

export class Score extends Phaser.GameObjects.Text {
  public score: number;
  public scoreString: string;
  
  
  constructor(aParams: IScoreBoardOptions) {
    super(aParams.scene, aParams.x, aParams.y, "Score: 0", {fontSize: '3em', color: '#fff'});
    this.score = 0;
    this.scoreString = `Score: 0`
  }
  
  getScore(){
    return this.score;
  }
  getScoreString(){
    return this.scoreString;
  }
  setScore(score: number){
    score = Math.round(score)
    this.score = score;
    this.setScoreString(score);
    this.text = this.scoreString;

  }
  setScoreString(score: number){
    this.scoreString = `Score: ${score}`;
  }
  addScore(score: number){
    this.setScore(this.score+=score);    
  }
  resetScore(){
    this.setScore(0);
  }

  
}
