import { Bullet } from './Bullet';

export class Player extends Phaser.GameObjects.Graphics {
	body: Phaser.Physics.Arcade.Body;
	radius: number;
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	bullets: Phaser.GameObjects.Group;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, { x, y });

		this.radius = 10;

		this.initGraphics();
		this.initPhysics();
		this.initInput();
		this.scene.add.existing(this);

		this.bullets = this.scene.add.group({ runChildUpdate: true });
	}

	private initInput(): void {
		this.cursors = this.scene.input.keyboard.createCursorKeys();
	}

	private initGraphics(): void {
		this.fillStyle(0x0055ff);
		this.fillCircle(0, 0, this.radius);
		this.lineStyle(2, 0x0055ff);
		this.strokeCircle(0, 0, this.radius);
	}

	private initPhysics(): void {
		this.scene.physics.world.enableBody(this);
		this.body.setSize(2 * this.radius, 2 * this.radius);
		this.body.setOffset(-this.radius, -this.radius);
		this.body.setVelocity(5, 5);
		this.body.setBounce(1, 1);
		this.body.setCollideWorldBounds(true);
	}

	update(): void {
		if (this.cursors.left.isDown) this.body.setVelocityX(-100);
		else if (this.cursors.right.isDown) this.body.setVelocityX(100);
		else this.body.setVelocityX(0);

		if (this.cursors.space.isDown)
			this.bullets.add(new Bullet(this.scene, this.x, this.y));
	}
}
