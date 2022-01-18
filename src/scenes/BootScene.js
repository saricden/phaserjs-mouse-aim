import { Scene } from 'phaser';

// Files to preload
import playerBodyPNG from '../assets/player-body.png';
import playerBodyJSON from '../assets/player-body.json';
import playerGunArmPNG from '../assets/player-gun-arm.png';
import playerGunArmJSON from '../assets/player-gun-arm.json';
import playerArm from '../assets/player-arm.png';
import playerHead from '../assets/player-head.png';

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
  }

  create() {
    // Create our animations
    this.anims.createFromAseprite('player-body');
    this.anims.createFromAseprite('player-gun-arm');
    
    this.scene.start('scene-game');
  }
}

export default BootScene;