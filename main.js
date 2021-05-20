// var PLAYER, BACKGROUND, TILE1;
var game_size = [1216, 576];

var dashamount = 0
var dashtouchingleft = false

var allowdeath = true

var levelspawnpoints = [420,420,190,420,129,184]

if (localStorage.getItem("level"))
  var level = parseInt(localStorage.getItem("level"))
else
  var level = 0

var levels = []
var level0 = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,26,27,34]
levels.push(level0)
var level1 = [0,1,2,3,6,7,10,11,14,17,18,26,27,30,31,34,37,38,50,51,54,57,58,74,77,78,97,98]
levels.push(level1)
var level2 = [80,81,60,61,40,41,20,21,0,1,2,3,4,10,11,12,17,18,137,138,155,156,157,158,172,173,174,175,176,177,178,179]
levels.push(level2)
var level3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,46,47,48,49,50,51,52,53,54,55,56,57,58,59,69,70,71,72,73,74,75,76,77,78,79,92,93,94,95,96,97,98,99,115,116,117,118,119,100,101,102,120,121,122,123,124,125,140,141,142,143,144,145,146,147,148,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179]
levels.push(level3)
var level4 = [0,1,2,3,4,5,6,7,100,101,102,62,63,64,20,21,22,23,24,25,26,27,65,66,85,86,105,106,125,126,145,146,160,161,162,163,164,165,166,17,18,37,38,57,58,77,78,97,98,117,118,14,15,16,36,56,91,92]
levels.push(level4)
var level5 = [80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,58,78,98,118,138,158,178,0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,40,41,42,48,49,50,51,52,53,54,55,56,57,20,21,22]
levels.push(level5)

const levelcount = 5 // update this upon adding new levels, used for game complete detection

var spikes = []
var spikesdirections = []

var spikes0 = [13]
var spikes0directions = [1] // 1=up 2=left 3=right 4=down
spikes.push(spikes0)
spikesdirections.push(spikes0directions)

var spikes1 = [4,5,8,9,12,13,15,16]
var spikes1directions = [1,1,1,1,1,1,1,1]
spikes.push(spikes1)
spikesdirections.push(spikes1directions)

var spikes2 = [117,118,135,136,152,153,154,5,6,7,8,9,13,14,15,16]
var spikes2directions = [4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1]
spikes.push(spikes2)
spikesdirections.push(spikes2directions)

var spikes3 = []
var spikes3directions = []
spikes.push(spikes3)
spikesdirections.push(spikes3directions)

var spikes4 = [107,127,147,167,93,8,9,10,11,12,13]
var spikes4directions = [3,3,3,3,3,1,1,1,1,1,1]
spikes.push(spikes4)
spikesdirections.push(spikes4directions)

var spikes5 = [103,104,105,106,111,112,165,166,171,172,43,23,47,77,97,117,137,157,177]
var spikes5directions = [1,1,1,1,1,1,4,4,4,4,3,3,2,2,2,2,2,2,2]
spikes.push(spikes5)
spikesdirections.push(spikes5directions)

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

var dashindicator = false;

var tilehitboxes = []
var spikehitboxes = []

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
  SPIKEDOWN = loadImage('media/spikedown.png');
  SPIKELEFT = loadImage('media/spikeleft.png');
  SPIKERIGHT = loadImage('media/spikeright.png');
  OVERWORLD1 = loadSound('media/music/overworld1.mp3');
  DASH = loadImage('media/dashindicator.png');
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
  playeryvel = 18
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
  playeryvel = 0
  waitdash()
}

function waitdash() {
  setTimeout(() => {stopdash()}, 125)
}

function stopdash() {
  playerxvel = 0
  playeryvel = 0
  allowmove = true
  dashing = false
  allowtophitdetection = true
  allowbottomhitdetection = true
}

function nextlevel() {
  if (level > levelcount) {
    alert('Game Complete!')
    // temp
  } else {
    level += 1
    playerx = 0
    playery = levelspawnpoints[level]
    playerxvel = 0
    playeryvel = 0
    playerdirection = 1
    stopdash()
    tilehitboxes = []
    spikehitboxes = []
    if (level > 1)
      allowdash = true
    localStorage.setItem("level",level)
  }
}

function previouslevel() {
  level -= 1
  playerx = 0
  playery = levelspawnpoints[level]
  playerxvel = 0
  playeryvel = 0
  playerdirection = 1
  stopdash()
  tilehitboxes = []
  spikehitboxes = []
  if (level < 2)
    allowdash = false
  localStorage.setItem("level",level)
}

function death() {
  allowtophitdetection = false
  allowbottomhitdetection = false
  allowlefthitdetection = false
  allowrighthitdetection = false
  allowdeath = false
  playeryvel = 15

  playerx = 0
  playery = levelspawnpoints[level]
  playeryvel = 0
  playerdirection = 1
  stopdash()
  if (level == 2) {
    dashindicator = true
  }
  
  allowtophitdetection = true
  allowbottomhitdetection = true
  allowlefthitdetection = true
  allowrighthitdetection = true
  allowdeath = true
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

  document.addEventListener("keypress", function(event) {
    if (event.key === 'r') {
      level = -1
      nextlevel()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === ']') {
      nextlevel()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === '[') {
      previouslevel()
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

  for (repeat = 0; repeat < spikes[level].length; repeat++)
  {
    var spike = spikes[level][repeat]
    var spikex = 0
    var spikey = 512
    var spikerow = 0
    while (spike >= 20)
    {
      spike -= 20
      spikerow += 1
      spikey = game_size[1] - 64 - (spikerow * 64)
    }
    spikex = spike*64
    if (spikesdirections[level][repeat] == 1)
      image(SPIKEUP, spikex, spikey)
    else if (spikesdirections[level][repeat] == 2)
      image(SPIKELEFT, spikex, spikey)
    else if (spikesdirections[level][repeat] == 3)
      image(SPIKERIGHT, spikex, spikey)
    else if (spikesdirections[level][repeat] == 4)
      image(SPIKEDOWN, spikex, spikey)
    spikehitboxes.push([spikex,spikey])
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
    nextlevel()
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
    playeryvel = abs(playeryvel) * -1
  }
  
  if (level < 2)
  {
    allowdash = false 
  }

  if (touchingground == true && allowdash == false && level > 1)
    allowdash = true

  for (repeat = 0; repeat < spikehitboxes.length; repeat++)
  {
    if (allowdeath == true && playerx > spikehitboxes[repeat][0] - 32 && playerx < spikehitboxes[repeat][0] + 32 && playery > spikehitboxes[repeat][1] - 48 && playery < spikehitboxes[repeat][1] + 48)
    {
      death()
    }
  }

  if (playery > 576 && allowdeath == true) {
      death()
  }

  if (dashing == true)
  {
    for (repeat = 0; repeat < tilehitboxes.length; repeat++)
    {
      if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx > tilehitboxes[repeat][0] - 64 && playerx < tilehitboxes[repeat][0] - 32 && allowlefthitdetection == true)
      {
        dashtouchingleft = true
        break
      }
    }
    if (dashtouchingleft == false)
    {
      if (playerdirection == 1)
        playerxvel = 30
      else
        playerxvel = -30
    }
  }

  if (dashindicator == true && level == 2) {
      image(DASH, 450, 400)
  }
    
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
}