import { GameObjects } from "phaser";

const { Container } = GameObjects;

class Player extends Container {
  constructor(scene, x, y) {
    super(scene, x, y, []);

    // Create a reference to our Player instance's parent scene
    this.scene = scene;
    this.scene.add.existing(this);

    // Add his body
    this.legsTorso = this.scene.add.sprite(0, 0, 'player-body');

    // Add and position his head
    this.head = this.scene.add.sprite(3, -23, 'player-head');
    this.head.setOrigin(0.5, 1);

    // Add, position, and angle his left arm
    this.leftArm = this.scene.add.sprite(-2, -20, 'player-gun-arm');
    this.leftArm.setOrigin(0.5, 0);
    this.leftArm.setAngle(-45);
    this.leftArm.play('gun-arm-idle');

    // Add, position, and angle his right arm
    this.rightArm = this.scene.add.sprite(-2, -19, 'player-arm');
    this.rightArm.setOrigin(0.5, 0);
    this.rightArm.setAngle(-45);

    // Add all the body parts to this container
    this.add([
      this.leftArm,
      this.legsTorso,
      this.head,
      this.rightArm
    ]);

    // Scale him up to 200%
    this.setScale(2);
  }

  // The preUpdate function runs every frame
  preUpdate() {
    // Play his run animation (and ignore if already playing)
    this.legsTorso.play('player-run', true);
  }
}

export default Player;