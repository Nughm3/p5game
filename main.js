// var PLAYER, BACKGROUND, TILE1;
var game_size = [1216, 576];

var tick = 0
var dashtick
var dashamount = 0

var levelspawnpoints = [420,420,420]
var level = 0
var levels = []
var level0 = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,26,27,34]
levels.push(level0)
var level1 = [0,1,2,3,6,7,10,11,14,17,18,26,27,30,31,34,37,38,50,51,54,57,58,74,77,78,97,98]
levels.push(level1)
var level2 = [0,1,2,3,4,10,11,12,17,18]
levels.push(level2)

var playerx = 0
var playery = levelspawnpoints[level]
var playerdirection = 1

var playerxvel = 0

var playeryvel = 0
var gravity = 1

var touchingground = false

var allowmove = true
var allowdash = true

var movementspeed = 6

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var musicplaying = false;

var tilehitboxes = []

var topoftile = false
var leftoftile = false

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
    if (dashamount < 10)
      waitdash()
    else
    {
      playeryvel = 0
      allowmove = true
      dashamount = 0
    }
  }
  else
  {
    playeryvel = 0
    allowmove = true
    dashamount = 0
  }
}

function death() {
  playerx = 0
  playery = levelspawnpoints[level]
  playeryvel = 0
}

function overworld1() {
  if (musicplaying == false)
  {
    musicplaying = true
    OVERWORLD1.play();
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
    if (event.key === 'z' && allowdash == true) {
      dash()
    }
  });
}

function draw() {
  
  // overworld1()
  if (playerx > -12 || playerxvel > 0)
    playerx += playerxvel

  if (level < 2)
    allowdash = false
  else
    allowdash = true

  tick += 1

  image(BACKGROUND, 0,0);

  // Change the sprite of the character based on its direction and whether dash is ready
  if (dashamount > 0)
  {
    if (playerdirection == 1)
      image(PLAYER_DASH_L, playerx, playery)
    else
      image(PLAYER_DASH_R, playerx, playery)
  }
  else
  {
    if (playerdirection == 0)
      image(PLAYER_READY_L, playerx, playery)
    else
      image(PLAYER_READY_R, playerx, playery)
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
    if (playerx > tilehitboxes[repeat][0] - 48 && playerx < tilehitboxes[repeat][0] + 48 && playery > tilehitboxes[repeat][1] - 64 && playery < tilehitboxes[repeat][1] - 32)
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
  
  if (tick - 40 > dashtick)
    allowdash = true

  if (playery > 576)
    death()

  // if (playerxvel == -6)
  //   playerx += movementspeed
  
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);

  // alert(tilehitboxes)
}