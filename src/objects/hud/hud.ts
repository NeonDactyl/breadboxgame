import {IHudUpdate} from "../../interfaces/IHudUpdate";
import { IHudOptions } from "../../interfaces/hud.interface";
import { Level } from "./level";
import { Score } from "./score";



export class Hud  extends Phaser.GameObjects.Container {
  private level: Level;
  private score: Score;
  private hpText: Phaser.GameObjects.Text;
  
  constructor(aParams: IHudOptions) {
    super(aParams.scene, aParams.x, aParams.y);
    this.hpText = new Phaser.GameObjects.Text(this.scene, 0, 0, '', {
      fontSize: '3em',
      color: '#fff'
    })
    this.score = new Score({
      scene: this.scene,
      x: 0,
      y: 30
    }) 
    this.level = new Level({
      scene: this.scene,
      x: 0,
      y: 60
    })   
    
    this.add([this.hpText, this.level, this.score])
  }

  reset(): void{
    this.level.resetLevel();
    this.score.resetScore();
  }
  addScore(score: number) {
    this.score.addScore(score);
  }
  nextLevel(): void {
    this.level.addLevel();
    this.score.addScore(100 * this.level.getLevel());
  }
  getScore(): number {
    return this.score.score;
  }
  getLevel(): number {
    return this.level.getLevel();
  }

  update(updateParams: IHudUpdate) : void {

    this.hpText.text = updateParams.hpText;
    this.addScore(updateParams.damageDealt);
  }

  
}
