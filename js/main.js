var Nakama = {};
Nakama.configs = {
  GAME_WIDTH  : 640,
  GAME_HEIGHT : 960,
  MIN_WIDTH   : 320,
  MIN_HEIGHT  : 480,
  MAX_WIDTH   : 640,
  MAX_HEIGHT  : 960,
  PLAYER1_POS : {
    x: 200,
    y: 200,
  },
  PLAYER2_POS : {
    x: 400,
    y: 200,
  },
  ENEMY1  : {
    x: 170,
    y: 115,
    initialSpeed: 150,
    relativeLeft: 120,
    relativeRight: -160,
  },
  ENEMY2  : {
    x: 370,
    y: 35,
    initialSpeed: 100,
    relativeLeft: 140,
    relativeRight: -180
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(Nakama.configs.GAME_WIDTH,Nakama.configs.GAME_HEIGHT,Phaser.AUTO,'',
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
  Nakama.players = [];
  Nakama.enemies = [];
  Nakama.players.push(
    new ShipController(Nakama.configs.PLAYER1_POS.x,Nakama.configs.PLAYER1_POS.y,"Spaceship1-Player.png",
      {
        UP        : Phaser.Keyboard.UP,
        DOWN      : Phaser.Keyboard.DOWN,
        LEFT      : Phaser.Keyboard.LEFT,
        RIGHT     : Phaser.Keyboard.RIGHT,
        SPACEBAR  : Phaser.Keyboard.SPACEBAR,
        CHANGEBULLET: Phaser.Keyboard.L,
      }
    ));

  Nakama.players.push(
    new ShipController(Nakama.configs.PLAYER2_POS.x,Nakama.configs.PLAYER2_POS.y,"Spaceship1-Partner.png",
      {
        UP        : Phaser.Keyboard.W,
        DOWN      : Phaser.Keyboard.S,
        LEFT      : Phaser.Keyboard.A,
        RIGHT     : Phaser.Keyboard.D,
        SPACEBAR  : Phaser.Keyboard.F,
        CHANGEBULLET: Phaser.Keyboard.E,
      }
    ));

  Nakama.enemies.push(
    new EnemyController(Nakama.configs.ENEMY1.x,Nakama.configs.ENEMY1.y,"EnemyType1.png",
      {
        initialSpeed  : Nakama.configs.ENEMY1.initialSpeed,
        left          : Nakama.configs.ENEMY1.relativeLeft,
        right         : Nakama.configs.GAME_WIDTH+Nakama.configs.ENEMY1.relativeRight
      }));

  Nakama.enemies.push(
    new EnemyController(Nakama.configs.ENEMY2.x,Nakama.configs.ENEMY2.y,"EnemyType2.png",
      {
        initialSpeed  : Nakama.configs.ENEMY2.initialSpeed,
        left          : Nakama.configs.ENEMY2.relativeLeft,
        right         : Nakama.configs.GAME_WIDTH+Nakama.configs.ENEMY2.relativeRight
      }));
}

var update = function() {
  Nakama.players.forEach(function(ship) {
    ship.update();
  });

  Nakama.enemies.forEach(function(ship) {
    ship.update();
  });
}

// before camera render (mostly for debug)
var render = function(){}


//Bullet config refers to: https://github.com/photonstorm/phaser-examples/blob/master/examples/weapon/single%20bullet.js