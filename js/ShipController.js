class ShipController {
	constructor(x, y, spriteName, configs) {
		this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;
    this.bullets = [];
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
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

		if(Nakama.keyboard.isDown(this.configs.FIRE)){
      this.tryFire();
    }
    this.bulletUpdate();
    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
	}

	tryFire(){
    if (this.timeSinceLastFire >= this.configs.COOLDOWN) {
    	this.createBullet(new Phaser.Point(0, -1));
	    /*this.createBullet(new Phaser.Point(1, -2));
	    this.createBullet(new Phaser.Point(-1, -5));
	    this.createBullet(new Phaser.Point(1, -4));
	    this.createBullet(new Phaser.Point(-1, -2));*/
      this.timeSinceLastFire = 0;
    }
  }

  createBullet(direction) {
  	this.bullets.push(
	  	new HomingBulletController(this.sprite.position, direction, "BulletType2.png")
  	);
  }

  bulletUpdate() {
  	this.bullets.forEach(function(bullet) {
  		bullet.update();
  	});
  }
}

ShipController.SHIP_SPEED=400;