class HomingBulletController {
	constructor(position, direction, spriteName){
		this.sprite = Nakama.playerBulletGroup.create(position.x, position.y, 'assets', spriteName);
		Nakama.game.physics.arcade.enable(this.sprite);
		this.sprite.body.checkWorldBounds = true;
		this.sprite.body.outOfBoundsKill = true;
		this.sprite.anchor = new Phaser.Point(0.5,0.5);
		this.sprite.body.velocity = (new Phaser.Point(direction.x,direction.y)).setMagnitude(HomingBulletController.BULLET_SPEED);
		this.lastUpdate = 0;
		this.target = null;
	}

	update() {
			if (!this.target) {
				this.target = Nakama.enemyGroup.getFirstAlive();
			}

			if (this.target && this.target.alive) {
				let speed = HomingBulletController.BULLET_SPEED;
				let diffx = this.target.position.x-this.sprite.position.x;
				let diffy = this.target.position.y-this.sprite.position.y;
				let distance = Math.sqrt(diffx**2+diffy**2);
				let secondsUntilOverlap = distance/speed/1000;
				if (this.lastUpdate>=secondsUntilOverlap/10) {
					this.lastUpdate = 0;
					let vector = new Phaser.Point(this.sprite.body.velocity.x+diffx/secondsUntilOverlap/10,this.sprite.body.velocity.y+diffy/secondsUntilOverlap/10);
					let velocity = vector.setMagnitude(HomingBulletController.BULLET_SPEED);
					this.sprite.body.velocity = velocity;
					this.sprite.body.angularVelocity = Math.atan2(vector.x,-vector.y)/Math.PI*180/secondsUntilOverlap/1000;
				}
				this.lastUpdate += Nakama.game.time.physicsElapsed;
			}
	}

}

HomingBulletController.BULLET_SPEED = 1000;