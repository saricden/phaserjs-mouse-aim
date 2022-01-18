import { Scene } from 'phaser';

class GameScene extends Scene {
  constructor() {
    super('scene-game');
  }

  create() {
    this.add.image(100, 100, 'player-head').setScale(2);

    this.cameras.main.setBackgroundColor(0x2299CC);
  }
}

export default GameScene;