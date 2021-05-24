export class Bullet extends Phaser.GameObjects.Graphics {
	body: Phaser.Physics.Arcade.Body;
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	time_alive: number;
	isDying: boolean;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, { x, y });

		this.time_alive = 0;
		this.isDying = false;

		this.initGraphics();
		this.initPhysics();
		this.scene.add.existing(this);
	}

	private initGraphics(): void {
		this.fillStyle(Phaser.Math.RND.between(0, 16777215));
		this.fillRect(0, 0, 6, 2);
	}

	private initPhysics(): void {
		this.scene.physics.world.enableBody(this);
		this.body.setSize(6, 2);
		// this.body.setOffset(-this.radius, -this.radius);
		this.body.setVelocity(400, 0);
		this.body.setBounce(1, 1);
		this.body.setCollideWorldBounds(true);
	}

	update(time: number, dt: number) {
		this.time_alive += dt;
		if (this.time_alive > 2000 && !this.isDying) {
			this.isDying = true;
			this.scene.tweens.add({
				targets: this,
				alpha: 0,
				duration: 100,
				onComplete: (tween, targets) => targets[0].destroy()
			});

			this.scene.tweens.add({
				targets: this.body.velocity,
				x: 0,
				duration: 100
			});
		}
	}
}
