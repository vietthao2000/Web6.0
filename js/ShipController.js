class ShipController {
	constructor(x, y, spriteName, configs) {
		this.sprite = Nakama.game.add.sprite(x, y, 'assets',spriteName);  
		Nakama.game.physics.arcade.enable(this.sprite);
		this.configs = configs;
		this.bulletConfigs = {
			asset 	: ["BulletType1.png","BulletType2.png","BulletType3.png"],
			speed 	: [400,400,4000],
			fireRate 	: [60,60,500],
			x 		: [40,40,40],
			y 		: [0,0,-400],
		}
		this.createBullet();
	}

	update() {
		if (Nakama.keyboard.isDown(this.configs.UP)) {
			this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
		}
		else if (Nakama.keyboard.isDown(this.configs.DOWN)) {
			this.sprite.body.velocity.y = +ShipController.SHIP_SPEED;
		}
		else {
			this.sprite.body.velocity.y = 0;
		}

		if (Nakama.keyboard.isDown(this.configs.LEFT)) {
			this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
		}
		else if (Nakama.keyboard.isDown(this.configs.RIGHT)) {
			this.sprite.body.velocity.x = +ShipController.SHIP_SPEED;
		}
		else {
			this.sprite.body.velocity.x = 0;
		}

		if (Nakama.keyboard.isDown(this.configs.SPACEBAR)) {
			this.bullet.fire();
		}

		if (Nakama.keyboard.isDown(this.configs.E)) {
			createBullet();
		}
	}

	createBullet () {
		//Load the bullet asset image
		this.bullet = Nakama.game.add.weapon(100,'assets',this.bulletConfigs.asset[this.i]);
		this.bullet.i=0;
		//Kill the bullet when it goes out of the map
		this.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		//Set firing speed
		this.bullet.bulletSpeed = this.bulletConfigs.speed[this.bullet.i];
		//Set firing rate, 1 bullet per x milisecs
		this.bullet.fireRate = this.bulletConfigs.fireRate[this.bullet.i];
		//Rotate the bullet to make it point upward
		this.bullet.bulletAngleOffset = 90;
		//Track the Sprite and center it by horizontal offset
		this.bullet.trackSprite(this, this.bulletConfigs.x[this.bullet.i], this.bulletConfigs.y[this.bullet.i]);
		this.bullet.i=(this.i+1)%3;
	}
}

ShipController.SHIP_SPEED=400;