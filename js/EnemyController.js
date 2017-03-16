class EnemyController {
	constructor(x, y, spriteName, configs) {
		this.sprite = Nakama.enemyGroup.create(x, y, 'assets',spriteName);  
		Nakama.game.physics.arcade.enable(this.sprite);
		this.configs = configs;
		this.sprite.body.velocity.x = this.configs.INITIALSPEED*((Math.random()>0.5)?1:-1);
		this.sprite.health = this.configs.HEALTH;
		this.timeSinceLastFire = 0;
		this.sprite.anchor = new Phaser.Point(0.5,0.5);
		this.bullets = [];
	}

	update() {
		if (this.sprite.position.x <= this.configs.LEFT) {
			this.sprite.body.velocity.x = this.configs.INITIALSPEED;
		}
		else if (this.sprite.position.x >= this.configs.RIGHT) {
			this.sprite.body.velocity.x = -this.configs.INITIALSPEED;
		}
	}
} 