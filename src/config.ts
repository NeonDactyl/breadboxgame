import Phaser from 'phaser';
import { GameScene } from './scenes/game-scene';
import { GameOverScene } from './scenes/gameover-scene';
import { MainMenuScene } from './scenes/mainmenu-scene';
import {SelectUpgradeScene} from './scenes/select-upgrade-scene';
import {LostLifeScene} from './scenes/lostlife-scene';


export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Webpack-Boilerplate',
  // url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 1200,
  height: 900,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [MainMenuScene, GameScene, GameOverScene, SelectUpgradeScene, LostLifeScene],
  input: {
    keyboard: false,
    mouse: true,
    touch: false,
    gamepad: false
  },
  disableContextMenu: true,
};
