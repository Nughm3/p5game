var PLAYER, BACKGROUND, TILE1;
var game_size = [1264, 560];

var playerx = 0
var playery = 300

var playeryvel = 0
var gravity = 1


var jumping = false
var movementspeed = 5

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

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
  
  jumping = true
  uppressed = false
  playeryvel = 13
  if (playeryvel < -5)
    jumping = false
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
    if (event.key === 'ArrowUp' & jumping == false) {
      uppressed = true
      jumping = true
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowUp') {
      uppressed = false
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

  if (uppressed == true)
    jump()

  playeryvel -= gravity
  playery -= playeryvel
  
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  // text('Game Title', game_size[0]/2, game_size[1]/3);        UNFINISHED
  // text('Game Subtitle', game_size[0]/2, game_size[1]*1/3+50);
}