import { Bullet } from './Bullet';

export class Weapon {
	rof: number;
	onCooldown: boolean;

	constructor() {
		this.rof = 5;
		this.onCooldown = false;
	}

	public shoot(
		scene: Phaser.Scene,
		bulletGroup: Phaser.GameObjects.Group,
		pos: Phaser.Math.Vector2,
		dir: Phaser.Math.Vector2
	) {
		if (!this.onCooldown) {
			bulletGroup.add(
				new Bullet(scene, {
					pos,
					dir: dir.subtract(pos),
					dmg: 10,
					size: 6
				})
			);
			this.onCooldown = true;
			scene.time.delayedCall(
				(1000 * 1) / this.rof,
				() => (this.onCooldown = false)
			);
		}
	}
}
