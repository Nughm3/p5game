var PLAYER, BACKGROUND, TILE1;
var game_size = [1216, 576];

var tick = 0
var dashtick
var dashamount = 0

var playerx = 0
var playery = 300
var playerdirection = 1

var playeryvel = 0
var gravity = 1

var touchingground = false

var allowmove = true
var allowdash = true

var allowjump = false
var movementspeed = 6

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var levels = []
var level = 0
var level0 = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,26,27,34]
levels.push(level0)
var level1 = [0,1,2,3,6,7,10,11,14,17,18,26,27,30,31,34,37,38,50,51,54,57,58,74,77,78,97,98]
levels.push(level1)
var level2 = [0,1,2,3,4,10,11,12,13,18]
levels.push(level2)

function preload() {
  PLAYER = loadImage('media/player.png');
  PLAYER_READY_R = loadImage('media/players/player1.png');
  PLAYER_DASH_R = loadImage('media/players/player2');
  PLAYER_READY_L = loadImage('media/players/player3');
  PLAYER_DASH_L = loadImage('media/players/player4');
  BACKGROUND = loadImage('media/background.png');
  TILE1 = loadImage('media/tile1.png');
}

function moveleft() {
  playerx -= movementspeed
  playerdirection = 0
}

function moveright() {
  playerx += movementspeed
  playerdirection = 1
}

function jump() {
  playeryvel = 17
  touchingground = false
  allowjump = false
  uppressed = false
}

function dash()
{
  allowmove = false
  allowdash = false
  playeryvel = 0
  dashamount = 0
  dashtick = tick
  waitdash()
}

function waitdash() {
  setTimeout(() => {movedash()}, 5)
}

function movedash() {
  dashamount += 1
  if (playerx > -12)
  {
    if (playerdirection == 1)
      playerx += 15
    else
      playerx -= 15
    if (dashamount < 14)
      waitdash()
    else
    {
      playeryvel = 0
      allowmove = true
    }
  }
}

function setup() {
  createCanvas(game_size[0], game_size[1]);

  BACKGROUND.resize(game_size[0], game_size[1]);
  frameRate(60);

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowLeft') {
      leftpressed = true
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowLeft') {
      leftpressed = false
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowRight') {
      rightpressed = true
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowRight') {
      rightpressed = false
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowUp' && allowjump == true) {
      uppressed = true
      allowjump = false
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'z' && allowdash == true) {
      dash()
    }
  });
}

function draw() {
  
  if (level < 2)
    allowdash = false
  else
    allowdash = true

  tick += 1

  image(BACKGROUND, 0,0);
  image(PLAYER, playerx, playery)

  for (repeat = 0; repeat < levels[level].length; repeat++)
  {
    var tile = levels[level][repeat]
    var tilex = 0
    var tiley = 512
    var row = 0
    while (tile >= 20)
    {
      tile -= 20
      row += 1
      tiley = game_size[1] - 64 - (row * 64)
    }
    tilex = tile*64
    image(TILE1, tilex, tiley)
  }

  if (leftpressed == true && playerx > -12 && allowmove == true)
  {
    moveleft()
  }  

  if (rightpressed == true && allowmove == true)
  {
    moveright()
  }

  if (playerx > 1200)
  {
    playerx = 0
    playery = 300
    level += 1
  }

  if (playeryvel < -1)
    allowjump = true

  if (uppressed == true && allowjump == true && allowmove == true)
    jump()

  if (playeryvel > -15)
    playeryvel -= gravity
  else
    playeryvel = -15

  playery -= playeryvel
  
  if (tick - 40 > dashtick)
    allowdash = true

  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
}