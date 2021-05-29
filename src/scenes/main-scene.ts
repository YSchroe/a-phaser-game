import { Player } from '../objects/player';

export class MainScene extends Phaser.Scene {
	private player: Player;
	// private mouseDebug: Phaser.GameObjects.Sprite;

	constructor() {
		super({ key: 'MainScene' });
	}

	preload(): void {
		this.load.image('redParticle', '../assets/red.png');
	}

	create(): void {
		// const particles = this.add.particles("redParticle");

		// const emitter = particles.createEmitter({
		// 	speed: 50,
		// 	scale: { start: 0.03, end: 0 },
		// 	blendMode: "ADD",
		// });
		//this.mouseDebug = this.add.sprite(0, 0, 'redParticle');

		this.player = new Player(this, 100, 50);

		// emitter.startFollow(this.player);
	}

	update(_time: number, dt: number): void {
		// this.mouseDebug.setPosition(
		// 	this.input.mousePointer.x,
		// 	this.input.mousePointer.y
		// );
		this.player.update(dt);
	}
}
