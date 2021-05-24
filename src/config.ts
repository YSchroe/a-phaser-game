import { MainScene } from './scenes/main-scene';

const SCREEN_W = 1300;

const RENDER_W = 480;
const RENDER_H = 270;

export const GameConfig: Phaser.Types.Core.GameConfig = {
	title: 'A GAME',
	version: '0.1',
	width: RENDER_W,
	height: RENDER_H,
	backgroundColor: 0x3a404d,
	type: Phaser.AUTO,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 50 }
			// debug: true
		}
	},
	zoom: SCREEN_W / RENDER_W,
	render: {
		pixelArt: true
	},
	scene: [MainScene]
};
