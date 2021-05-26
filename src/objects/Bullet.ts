export interface IBulletConstructor {
	pos: Phaser.Math.Vector2;
	dir: Phaser.Math.Vector2;
	dmg: number;
	speed?: number;
	size?: number;
	isCrit?: boolean;
}

export class Bullet extends Phaser.GameObjects.Graphics {
	body: Phaser.Physics.Arcade.Body;

	size: number;
	dmg: number;
	isCrit: boolean;

	tAlive: number;
	isDying: boolean;

	constructor(scene: Phaser.Scene, cfg: IBulletConstructor) {
		super(scene, { x: cfg.pos.x, y: cfg.pos.y });

		this.tAlive = 0;
		this.isDying = false;

		this.size = cfg.size || 6;
		this.isCrit = cfg.isCrit || false;
		this.dmg = cfg.dmg;

		this.initGraphics();
		this.initPhysics(cfg.dir, cfg.speed || 400);
		this.scene.add.existing(this);
	}

	private initGraphics(): void {
		this.fillStyle(this.isCrit ? 0xff0000 : 0xffffff);
		this.fillRect(0, 0, this.size, this.size / 3);
	}

	private initPhysics(dir: Phaser.Math.Vector2, spd: number): void {
		let vDirFinal = dir.normalize().scale(spd);
		this.scene.physics.world.enableBody(this);
		this.body.setSize(this.size, this.size / 3);
		this.body.setVelocity(vDirFinal.x, vDirFinal.y);
		this.body.setBounce(1, 1);
		this.body.setCollideWorldBounds(true);
	}

	update(_time: number, dt: number) {
		this.tAlive += dt;
		if (this.tAlive > 2000 && !this.isDying) {
			this.isDying = true;
			this.scene.tweens.add({
				targets: this,
				alpha: 0,
				duration: 100,
				onComplete: (_tween, targets) => targets[0].destroy()
			});

			this.scene.tweens.add({
				targets: this.body.velocity,
				x: 0,
				duration: 100
			});
		}
	}
}
