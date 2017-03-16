class BulletController{
  constructor(position, direction, spriteName){
    this.sprite = Nakama.playerBulletGroup.create(position.x, position.y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.checkWorldBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.sprite.angle = Math.atan2(direction.x,-direction.y)/Math.PI*180;
    this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
  }
}

BulletController.BULLET_SPEED = 100;
