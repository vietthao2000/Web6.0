var Nakama = {};
Nakama.configs = {};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.game.add.sprite(0,0,'background')
  Nakama.player = Nakama.game.add.sprite(200,200,'assets','Spaceship1-Player.png');
  Nakama.bullet = Nakama.game.add.weapon(1,'assets','BulletType2.png');
  //Kill the bullet when it goes out of the map
  Nakama.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Set firing speed
  Nakama.bullet.bulletSpeed = 400;
  //Rotate the bullet to make it point upward
  Nakama.bullet.bulletAngleOffset = 90;
  //Track the Sprite and center it by horizontal offset
  Nakama.bullet.trackSprite(Nakama.player, 40, 0);
}

// update game state each frame
var update = function(){
  if (Nakama.keyboard.isDown(Phaser.Keyboard.UP)) {
    if (Nakama.player.position.y-10>=0) {Nakama.player.position.y -= 10;}
  }

  if (Nakama.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //This works for me
    //if (Nakama.player.position.y+10<=880) {Nakama.player.position.y += 10;}

    //This is standard but does not work for me
    if (Nakama.player.position.y+10<=960) {Nakama.player.position.y += 10;}
  }

  if (Nakama.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    if (Nakama.player.position.x-10>=0) {Nakama.player.position.x -= 10;}
  }

  if (Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //This works for me
    //if (Nakama.player.position.x+10<=560) {Nakama.player.position.x += 10;}

    //This is standard but does not work for me
    if (Nakama.player.position.x+10<=640) {Nakama.player.position.x += 10;}
  }
  
  if (Nakama.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    Nakama.bullet.fire();
  }
}

// before camera render (mostly for debug)
var render = function(){}


//Bullet config refers to: https://github.com/photonstorm/phaser-examples/blob/master/examples/weapon/single%20bullet.js