class EnemyController {
	constructor(x, y, spriteName, configs) {
		this.sprite = Nakama.game.add.sprite(x, y, 'assets',spriteName);  
		Nakama.game.physics.arcade.enable(this.sprite);
		this.configs = configs;
	}

	update() {
		if (this.sprite.position.x<=this.configs.left) {
			this.sprite.body.velocity.x = this.configs.initialSpeed;
		}
		else if (this.sprite.position.x>=this.configs.right) {
			this.sprite.body.velocity.x = -this.configs.initialSpeed;
		}
		if (this.sprite.body.velocity.x==0) {
			this.sprite.body.velocity.x = this.configs.initialSpeed*((Math.random()>0.5)?1:-1);
		}
	}
}