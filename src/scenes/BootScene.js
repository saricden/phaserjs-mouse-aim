import { Scene } from 'phaser';

// Files to preload
import playerBodyPNG from '../assets/player-body.png';
import playerBodyJSON from '../assets/player-body.json';
import playerGunArmPNG from '../assets/player-gun-arm.png';
import playerGunArmJSON from '../assets/player-gun-arm.json';
import playerArm from '../assets/player-arm.png';
import playerHead from '../assets/player-head.png';
import map from '../assets/map.json';
import tiles from '../assets/tiles-ex.png';
import sparkPNG from '../assets/spark.png';
import sparkJSON from '../assets/spark.json';

class BootScene extends Scene {
  constructor() {
    super('scene-boot');
  }

  preload() {
    // Preload our assets
    this.load.aseprite('player-body', playerBodyPNG, playerBodyJSON);
    this.load.aseprite('player-gun-arm', playerGunArmPNG, playerGunArmJSON);
    this.load.image('player-arm', playerArm);
    this.load.image('player-head', playerHead);
    this.load.tilemapTiledJSON('map', map);
    this.load.image('tiles', tiles);
    this.load.aseprite('spark', sparkPNG, sparkJSON);
  }

  create() {
    // Create our animations
    this.anims.createFromAseprite('player-body');
    this.anims.createFromAseprite('player-gun-arm');
    this.anims.createFromAseprite('spark');

    this.scene.start('scene-game');
  }
}

export default BootScene;