import { Weapon } from './Weapon';

export class Player extends Phaser.GameObjects.Graphics {
	body: Phaser.Physics.Arcade.Body;
	radius: number;
	cursors: any;
	bullets: Phaser.GameObjects.Group;
	color: number;
	weapon: Weapon;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, { x, y });

		this.radius = 8;
		this.color = 0x0055ff;

		this.weapon = new Weapon();

		this.initGraphics();
		this.initPhysics();
		this.initInput();
		this.scene.add.existing(this);

		this.bullets = this.scene.add.group({ runChildUpdate: true });
	}

	private initInput(): void {
		const keyCodes = Phaser.Input.Keyboard.KeyCodes;
		this.cursors = this.scene.input.keyboard.addKeys({
			up: keyCodes.W,
			down: keyCodes.S,
			left: keyCodes.A,
			right: keyCodes.D
		});
		// this.cursors.down.onDown = () => this.flash(250);
	}

	private initGraphics(): void {
		this.fillStyle(this.color);
		this.fillCircle(0, 0, this.radius);
	}

	private initPhysics(): void {
		this.scene.physics.world.enableBody(this);
		this.body.setCircle(this.radius);
		this.body.setOffset(-this.radius, -this.radius);
		this.body.setBounce(1, 1);
		this.body.setCollideWorldBounds(true);
	}

	update(_dt: number): void {
		// X direction
		if (this.cursors.left.isDown) this.body.setVelocityX(-100);
		else if (this.cursors.right.isDown) this.body.setVelocityX(100);
		else this.body.setVelocityX(0);

		// Y direction
		if (this.cursors.up.isDown) this.body.setVelocityY(-100);
		else if (this.cursors.down.isDown) this.body.setVelocityY(100);
		else this.body.setVelocityY(0);

		if (this.scene.input.mousePointer.leftButtonDown()) {
			this.weapon.shoot(
				this.scene,
				this.bullets,
				new Phaser.Math.Vector2(this.x, this.y),
				this.scene.input.mousePointer.position.clone()
			);
		}
	}

	private flash(t: number) {
		this.scene.tweens.add({
			targets: this,
			duration: t,
			color: { from: this.color, to: this.color }, // not used, but tween needs a parameter to tween
			onUpdate: (tween, target) => {
				let perc = tween.progress;
				target.clear();
				target.fillStyle(this.color);
				target.fillCircle(0, 0, target.radius);
				if (perc < 1) {
					target.fillStyle(0xffffff, 1 - perc);
					target.fillCircle(0, 0, target.radius);
				}
			}
		});
	}
}
