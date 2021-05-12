// var PLAYER, BACKGROUND, TILE1;
var game_size = [1216, 576];

var dashamount = 0

var levelspawnpoints = [420,420,420,420,129]
var level = 0
var levels = []
var level0 = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,26,27,34]
levels.push(level0)
var level1 = [0,1,2,3,6,7,10,11,14,17,18,26,27,30,31,34,37,38,50,51,54,57,58,74,77,78,97,98]
levels.push(level1)
var level2 = [0,1,2,3,4,10,11,12,17,18,137,138,155,156,157,158,172,173,174,175,176,177,178,179]
levels.push(level2)
var level3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,46,47,48,49,50,51,52,53,54,55,56,57,58,59,69,70,71,72,73,74,75,76,77,78,79,92,93,94,95,96,97,98,99,115,116,117,118,119,100,101,102,120,121,122,123,124,125,140,141,142,143,144,145,146,147,148,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179]
levels.push(level3)
var level4 = [100,101,102,62,63,64,20,21,22,23,24,25,26,27,28,65,66,85,86,105,106,125,126,145,146,160,161,162,163,164,165,166,17,18,37,38,57,58,77,78,97,98,117,118,14,15,16,56,92]
levels.push(level4)

var spikes = []
var spikes0 = []

var playerx = 0
var playery = levelspawnpoints[level]
var playerdirection = 1

var playerxvel = 0

var playeryvel = 0
var gravity = 1

var touchingground = false

var allowmove = true
var allowdash = true
var dashing = false

var movementspeed = 6

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var musicplaying = false;

var tilehitboxes = []

var topoftile = false
var leftoftile = false
var rightoftile = false
var bottomoftile = false

var allowtophitdetection = true
var allowlefthitdetection = true
var allowrighthitdetection = true
var allowbottomhitdetection = true

function preload() {
  // PLAYER = loadImage('media/player.png');
  // player ready means not dashed, player dash means dash is on cd
  PLAYER_READY_R = loadImage('media/players/rready.png');
  PLAYER_DASH_R = loadImage('media/players/rdash.png');
  PLAYER_READY_L = loadImage('media/players/lready.png');
  PLAYER_DASH_L = loadImage('media/players/ldash.png');
  BACKGROUND = loadImage('media/bg2.png');
  BACKGROUND2 = loadImage('media/bg1.png');
  MENU = loadImage('media/menu.png');
  TILE1 = loadImage('media/tile1.png');
  SPIKEUP = loadImage('media/spikeup.png');
  OVERWORLD1 = loadSound('media/music/overworld1.mp3');
}

function moveleft() {
  playerxvel = movementspeed * -1
  playerdirection = 0
}

function moveright() {
  playerxvel = movementspeed
  playerdirection = 1
}

function jump() {
  playeryvel = 17
  touchingground = false
  uppressed = false
}

function dash()
{
  dashing = true
  allowmove = false
  allowdash = false
  allowtophitdetection = false
  allowbottomhitdetection = false
  if (playerdirection == 1)
    playerxvel = 30
  else
    playerxvel = -30
  playeryvel = 0
  waitdash()
}

function waitdash() {
  setTimeout(() => {stopdash()}, 100)
}

function stopdash() {
  playerxvel = 0
  playeryvel = 0
  allowmove = true
  dashing = false
  allowtophitdetection = true
  allowbottomhitdetection = true
}


function death() {
  playerx = 0
  playery = levelspawnpoints[level]
  playeryvel = 0
}

function overworld1() {
    OVERWORLD1.play();
    setTimeout(() => {overworld1()}, 25000)
}

function setup() {

  setTimeout(() => {overworld1()}, 100)

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
      playerxvel = 0
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
      playerxvel = 0
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowUp' && touchingground == true) {
      uppressed = true
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'z' && allowdash == true && allowmove == true) {
      dash()
    }
  });
}

function draw() {

  if (playerx > -12 || playerxvel > 0)
    playerx += playerxvel

  if (level < 2)
    allowdash = false

  image(BACKGROUND, 0,0);

  // Change the sprite of the character based on its direction and whether dash is ready
  if (dashing == true)
  {
    if (playerdirection == 1)
      image(PLAYER_DASH_R, playerx, playery)
    else
      image(PLAYER_DASH_L, playerx, playery)
  }
  else
  {
    if (playerdirection == 1)
      image(PLAYER_READY_R, playerx, playery)
    else
      image(PLAYER_READY_L, playerx, playery)
  }

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
    tilehitboxes.push([tilex,tiley])
  }

  if (leftpressed == true && allowmove == true)
  {
    moveleft()
  }  

  if (rightpressed == true && allowmove == true)
  {
    moveright()
  }

  if (leftpressed == true && rightpressed == true && allowmove == true)
    playerxvel = 0

  if (playerx > 1190)
  {
    level += 1
    playerx = 0
    playery = levelspawnpoints[level]
    playerxvel = 0
    playeryvel = 0
    tilehitboxes = []
    if (level > 1)
      allowdash = true
  }

  if (uppressed == true && touchingground == true && allowmove == true)
    jump()

  if (playeryvel > -15)
    playeryvel -= gravity
  else
    playeryvel = -15

  if (allowmove == true)
    playery -= playeryvel
  else
    playeryvel = 0

  for (repeat = 0; repeat < tilehitboxes.length; repeat++)
  {
    if (playerx > tilehitboxes[repeat][0] - 48 && playerx < tilehitboxes[repeat][0] + 48 && playery > tilehitboxes[repeat][1] - 56 && playery < tilehitboxes[repeat][1] - 32 && allowtophitdetection == true)
    {
      topoftile = true
      playery = tilehitboxes[repeat][1] - 48
      break
    }
    else
      topoftile = false
  }

  if (topoftile == true)
  {
    playery += playeryvel
    touchingground = true
  }
  else
  {
    touchingground = false
  }

  for (repeat = 0; repeat < tilehitboxes.length; repeat++)
  {
    if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx > tilehitboxes[repeat][0] - 64 && playerx < tilehitboxes[repeat][0] - 32 && allowlefthitdetection == true)
    {
      leftoftile = true
      break
    }
    else
      leftoftile = false
  }

  if (leftoftile == true && playerxvel > 0)
  {
    playerx -= playerxvel
  }

  for (repeat = 0; repeat < tilehitboxes.length; repeat++)
  {
    if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx < tilehitboxes[repeat][0] + 64 && playerx > tilehitboxes[repeat][0] + 32 && allowrighthitdetection == true)
    {
      rightoftile = true
      break
    }
    else
      rightoftile = false
  }

  if (rightoftile == true && playerxvel < 0)
  {
    playerx -= playerxvel
  }

  for (repeat = 0; repeat < tilehitboxes.length; repeat++)
  {
    if (playerx > tilehitboxes[repeat][0] - 50 && playerx < tilehitboxes[repeat][0] + 50 && playery < tilehitboxes[repeat][1] + 64 && playery > tilehitboxes[repeat][1] + 32 && allowbottomhitdetection == true)
    {
      bottomoftile = true
      break
    }
    else
      bottomoftile = false
  }

  if (bottomoftile == true)
  {
    playeryvel *= -1
  }
  
  if (level < 2)
  {
    allowdash = false 
  }

  if (touchingground == true && allowdash == false && level > 1)
    allowdash = true

  if (playery > 576)
    death()
  
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
}