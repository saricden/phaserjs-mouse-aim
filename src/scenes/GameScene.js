import { Scene } from 'phaser';
import Player from '../sprites/Player';

class GameScene extends Scene {
  constructor() {
    super('scene-game');
  }

  create() {
    this.player = new Player(this, 300, 300);

    this.cameras.main.setBackgroundColor(0x2299CC);
  }
}

export default GameScene;