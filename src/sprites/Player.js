import { GameObjects, Input, Math as pMath } from "phaser";

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
    this.leftArm.setOrigin(0.5, 0.17);
    this.leftArm.play('gun-arm-idle');

    // Add, position, and angle his right arm
    this.rightArm = this.scene.add.sprite(-2, -19, 'player-arm');
    this.rightArm.setOrigin(0.5, 0.17);

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

    // Mouse controls
    this.aimAngle = 0;

    // Hook into the scene's pointermove event
    this.scene.input.on('pointermove', ({worldX, worldY}) => {
      // Calculate the angle between the player and the world x/y of the mouse, and offset it by Pi/2
      this.aimAngle = (pMath.Angle.Between(this.x, this.y, worldX, worldY) - Math.PI / 2);

      // Assign the rotation (in radians) to arms
      this.leftArm.setRotation(this.aimAngle);
      this.rightArm.setRotation(this.aimAngle);

      // If the mouse is to the left of the player...
      if (worldX < this.x) {
        // Flip the player to face left
        this.setFlipX(true);

        // Offset the head's angle and divide it by 2 to lessen the "strength" of rotation
        let headAngle = (this.aimAngle - Math.PI / 2) / 2;
        if (headAngle <= -2) {
          headAngle += 3.1; // No idea why we need to do this, sorry. Try commenting it out to see what happens lol
        }
        this.head.setRotation(headAngle);
      }
      // If the mouse is to the right of the player...
      else {
        // Flip the player to face right
        this.setFlipX(false);

        // Same as above but without the weird broken angle to account for ¯\_(ツ)_/¯
        this.head.setRotation((this.aimAngle + Math.PI / 2) / 2);
      }
    });

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
    }
    else if (right.isDown) {
      this.body.setVelocityX(speed);
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
      this.rightArm.setPosition(2, -19);
    }
    else {
      this.head.setPosition(3, -23);
      this.leftArm.setPosition(-2, -20);
      this.rightArm.setPosition(-2, -19);
    }
  }
}

export default Player;