import { Bullet } from './Bullet';

export class Weapon {
	rof: number;
	canShoot: boolean;

	constructor() {
		this.rof = 5;
		this.canShoot = true;
	}

	public shoot(
		scene: Phaser.Scene,
		bulletGroup: Phaser.GameObjects.Group,
		pos: Phaser.Math.Vector2,
		dir: Phaser.Math.Vector2
	) {
		if (this.canShoot) {
			bulletGroup.add(
				new Bullet(scene, {
					pos,
					dir: dir.subtract(pos),
					dmg: 10,
					size: 3
				})
			);
			this.canShoot = false;
			scene.time.delayedCall(
				(1000 * 1) / this.rof,
				() => (this.canShoot = true)
			);
		}
	}
}
