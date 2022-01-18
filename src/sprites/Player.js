import { GameObjects, Input } from "phaser";

const { Container } = GameObjects;

class Player extends Container {
  constructor(scene, x, y) {
    super(scene, x, y, []);

    // Create a reference to our Player instance's parent scene, and enable physics
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

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

    // Set the bounding box offset and size (this takes some fiddling)
    this.body.setOffset(-15, -52);
    this.body.setSize(this.legsTorso.displayWidth, this.legsTorso.displayHeight + this.head.displayHeight);

    // Create a helper object for W(S)AD keys, speed, and jump force variables
    this.cursors = this.scene.input.keyboard.addKeys({
      up: Input.Keyboard.KeyCodes.W,
      left: Input.Keyboard.KeyCodes.A,
      right: Input.Keyboard.KeyCodes.D
    });
    this.speed = 200;
    this.jumpForce = 450;
  }

  // The preUpdate function runs every frame
  preUpdate() {
    const {speed, jumpForce} = this;
    const {up, left, right} = this.cursors;
    const isGrounded = this.body.blocked.down;

    // Keyboard control logic
    if (left.isDown) {
      this.body.setVelocityX(-speed);
      this.setFlipX(true);
    }
    else if (right.isDown) {
      this.body.setVelocityX(speed);
      this.setFlipX(false);
    }
    else {
      this.body.setVelocityX(0);
    }

    if (isGrounded && up.isDown) {
      this.body.setVelocityY(-jumpForce);
    }

    // Animation logic
    if (this.body.velocity.x !== 0) {
      this.legsTorso.play('player-run', true);
    }
    else {
      this.legsTorso.play('player-idle', true);
    }
  }

  setFlipX(flip) {
    // Go over all sprites in the container and apply flip
    this.list.forEach((child) => {
      child.setFlipX(flip);
    });

    // Invert the body part x offsets depending on flip
    if (flip) {
      this.head.setPosition(-3, -23);
      
      this.leftArm.setPosition(2, -20);
      this.leftArm.setAngle(45);

      this.rightArm.setPosition(2, -19);
      this.rightArm.setAngle(45);
    }
    else {
      this.head.setPosition(3, -23);
      
      this.leftArm.setPosition(-2, -20);
      this.leftArm.setAngle(-45);

      this.rightArm.setPosition(-2, -19);
      this.rightArm.setAngle(-45);
    }
  }
}

export default Player;