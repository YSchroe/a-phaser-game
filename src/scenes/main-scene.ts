import { Player } from '../objects/Player';

export class MainScene extends Phaser.Scene {
	private player: Player;

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

		this.player = new Player(this, 100, 50);

		// emitter.startFollow(this.player);
	}

	update(_time: number, dt: number): void {
		this.player.update(dt);
	}
}
