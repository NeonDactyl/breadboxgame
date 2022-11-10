import {IHudUpdate} from "../../interfaces/IHudUpdate";
import { IHudOptions } from "../../interfaces/hud.interface";
import { Level } from "./level";
import { Score } from "./score";
import { Lives } from "./lives";



export class Hud  extends Phaser.GameObjects.Container {
  private level: Level;
  private score: Score;
  private hpText: Phaser.GameObjects.Text;
  private lives: Lives;
  
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
    this.lives = new Lives({
      scene: this.scene,
      x: 0,
      y: 90
    })
    
    this.add([this.hpText, this.level, this.score, this.lives])
  }

  reset(): void{
    this.level.resetLevel();
    this.score.resetScore();
    this.lives.resetLives();
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

  setLives(lives: number): void {
    this.lives.setLives(lives);
  }

  getLives(): number {
    return this.lives.getLives();
  }

  update(updateParams: IHudUpdate) : void {

    this.hpText.text = updateParams.hpText;
    console.log(updateParams.hpText);
    this.addScore(updateParams.damageDealt);
  }

  
}
