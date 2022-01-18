import Phaser from 'phaser';
import PhaserRaycaster from 'phaser-raycaster/dist/phaser-raycaster';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1600,
    height: 840,
    // Enable and configure arcade physics engine
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    },
    scene: [
        BootScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
