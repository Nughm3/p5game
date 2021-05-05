var PLAYER, BACKGROUND, TILE1;
var game_size = [1264, 560];

var playerx = 0
var playery = 300

var playeryvel = 0
var gravity = 1

var touchingground = false

var allowjump = false
var movementspeed = 5

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var levels = []
var level0 = [0,1,2,3]
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

  for (repeat=0;repeat<20;repeat++)
  {
    image(TILE1, repeat*64, 496)
  }

  if (leftpressed == true && playerx > -12)
  {
    moveleft()
  }  

  if (rightpressed == true && playerx < 1210)
  {
    moveright()
  }

  if (playeryvel < -5)
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