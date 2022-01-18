import { Scene } from 'phaser';
import Player from '../sprites/Player';

class GameScene extends Scene {
  constructor() {
    super('scene-game');
  }

  create() {
    // Add our loaded tilemap
    this.map = this.add.tilemap('map');

    // Assign tiles to a tileset image from map (accounting for default extrusion)
    const tiles = this.map.addTilesetImage('tiles', 'tiles', 32, 32, 1, 2);

    // Create a ground layer from our map, and set it's collision property
    this.ground = this.map.createLayer('ground', tiles);
    this.ground.setCollisionByProperty({ collides: true });

    // Loop through all the objects in our 'sprites' object layer
    this.map.getObjectLayer('sprites').objects.forEach(({x, y, name}) => {
      // When we find one named player, add the player at it's x, y
      if (name === 'player') {
        this.player = new Player(this, x, y);
      }
    });

    // Make it so the player collides with the ground / walls
    this.physics.add.collider(this.player, this.ground);

    // Configure the camera so it:
    //   - Follows the player
    //   - Is zoomed in by 200%
    //   - Is bounded by our map's real width and height
    //   - Has a blue background
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBackgroundColor(0x2299CC);
  }
}

export default GameScene;