var PLAYER, BACKGROUND, TILE1;
var game_size = [1216, 576];

var playerx = 0
var playery = 300

var playeryvel = 0
var gravity = 1

var touchingground = false

var allowjump = false
var movementspeed = 6

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var levels = []
var level = 0
var level0 = [0,1,2,3,4,5,6,7,10,11,12,14,16,17,18,19,26,27,34,54]
levels.push(level0)

function preload() {
  PLAYER = loadImage('media/player.png');
  BACKGROUND = loadImage('media/background.png');
  TILE1 = loadImage('media/tile1.png');
}

function moveleft() {
  playerx -= movementspeed
}

function moveright() {
  playerx += movementspeed
}

function jump() {
  playeryvel = 17
  touchingground = false
  allowjump = false
  uppressed = false
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
}

function draw() {
  
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

  if (leftpressed == true && playerx > -12)
  {
    moveleft()
  }  

  if (rightpressed == true && playerx < 1210)
  {
    moveright()
  }

  if (playeryvel < -3)
    allowjump = true

  if (uppressed == true && allowjump == true)
    jump()

  if (playeryvel > -15)
    playeryvel -= gravity
  else
    playeryvel = -15

  playery -= playeryvel
  
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
}