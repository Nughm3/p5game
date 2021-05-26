// P5GAME by AdminTroller and ToxicFscyther

/* VARIABLE DEFINITIONS */

var game_size = [1216, 576]

var dashamount = 0
var dashtouchingleft = false

var rungame = true

var allowrespawn = true
var allowdeath = true
var endscreen = false
var playermoved = false

if (localStorage.getItem("level"))
  var level = parseInt(localStorage.getItem("level"))
else
  var level = 0

if (localStorage.getItem("deaths"))
  var deathcount = parseInt(localStorage.getItem("deaths"))
else
  var deathcount = 0

frameCount = localStorage.getItem("frame")

var levelspawnpoints = [420,420,190,420,129,184]

var levels = []
var level0 = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,26,27,34]
levels.push(level0)
var level1 = [0,1,2,3,6,7,10,11,14,17,18,26,27,30,31,34,37,38,50,51,54,57,58,74,77,78,97,98]
levels.push(level1)
var level2 = [80,81,60,61,40,41,20,21,0,1,2,3,4,10,11,12,17,18,137,138,155,156,157,158,172,173,174,175,176,177,178,179]
levels.push(level2)
var level3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,46,47,48,49,50,51,52,53,54,55,56,57,58,59,69,70,71,72,73,74,75,76,77,78,79,92,93,94,95,96,97,98,99,115,116,117,118,119,100,101,102,120,121,122,123,124,125,140,141,142,143,144,145,146,147,148,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179]
levels.push(level3)
var level4 = [0,1,2,3,4,5,6,7,100,101,102,62,63,64,20,21,22,23,24,25,26,27,65,66,85,86,105,106,125,126,145,146,160,161,162,163,164,165,166,17,18,37,38,57,58,77,78,97,98,117,118,14,15,16,36,56,91,92,111,131]
levels.push(level4)
var level5 = [80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,58,78,98,118,138,158,178,0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,40,41,42,48,49,50,51,52,53,54,55,56,57,20,21,22]
levels.push(level5)

const levelcount = 4 // update this upon adding new levels, used for game complete detection [levels - 1]

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

var switches = []

// [switch location, door location 1, door location 2, 3, etc.]

var switches6 = []
switches.push(switches6)

var switches7 = []
switches.push(switches7)

var switches8 = []
switches.push(switches8)

var switches9 = []
switches.push(switches9)

var switches10 = []
switches.push(switches10)

var switches11 = []
switches.push(switches11)

var switches12 = []
switches.push(switches12)

var switches13 = []
switches.push(switches13)

var switches14 = []
switches.push(switches14)

var bossmsg = [
  '','','','','','','','','','','','','','','', // up to level 15 (index 14) before boss starts
  'That is enough, fool! Adventurers! Be careful of who you are messing with. Before I have to deal with you myself.', // Phase 1
  'Get back here!', // Phase 2
  'ANOTHER TRAP!! YOUR TRICKS ARE FUTILE!', // Phase 3
  'Can"t you just explode already! Some decency!', // Phase 4
  'All this, for nothing, I understand your words now, my master. The Catacombs, are no more.'  // Final Phase
]

if (level == 0)
  var playerx = 92
else
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

/* ASSET LOADING */

function preload() {
  // Players
  PLAYER_IDLE_R = loadImage('media/players/idleR.png');
  PLAYER_IDLE_L = loadImage('media/players/idleL.png');
  PLAYER_ANIM_R = loadImage('media/players/animR.png');
  PLAYER_ANIM_L = loadImage('media/players/animL.png');
  PLAYER_DASH_R = loadImage('media/players/dashingR.png');
  PLAYER_DASH_L = loadImage('media/players/dashingL.png');
  // Backgrounds
  BACKGROUND = loadImage('media/bg/sunset.png'); // Orange
  BACKGROUND1 = loadImage('media/bg/city.png'); // Deep blue
  BACKGROUND2 = loadImage('media/bg/neon.png'); // Green
  ENDSCREEN = loadImage('media/bg/endscreen.png'); // Dimmed background to show stats
  // Tiles: Stage 1 tiles are ORANGE, 2 are BLUE, 3 are GREEN
  TILE1 = loadImage('media/tile/tile/tile1.png');
  // TILE2 = loadImage('media/tile/tile/tile2.png');
  // TILE3 = loadImage('media/tile/tile/tile3.png');
  // Misc tiles
  DASH = loadImage('media/tile/misc/dash.png'); // Helps the player know to press Z to dash
  ARROWS = loadImage('media/tile/misc/arrows.png'); // Helps the player know to use arrow keys
  // Effects
  DASHRIGHT = loadImage('media/fx/dash/dashR.png');
  DASHLEFT = loadImage('media/fx/dash/dashL.png');
  DUST1 = loadImage('media/fx/dust/dust1.png')
  DUST2 = loadImage('media/fx/dust/dust2.png')
  DUST3 = loadImage('media/fx/dust/dust3.png')
  DUST4 = loadImage('media/fx/dust/dust4.png')
  CLOUD1 = loadImage('media/fx/dust/dustcloud1.png')
  CLOUD2 = loadImage('media/fx/dust/dustcloud2.png')
  // Spikes: Stage 1 spikes are ORANGE, 2 are BLUE, 3 are GREEN
  SPIKEUP1 = loadImage('media/tile/spikes1/spikeup.png');
  SPIKEDOWN1 = loadImage('media/tile/spikes1/spikedown.png');
  SPIKELEFT1 = loadImage('media/tile/spikes1/spikeleft.png');
  SPIKERIGHT1 = loadImage('media/tile/spikes1/spikeright.png');
  SPIKEUP2 = loadImage('media/tile/spikes2/spikeup.png');
  SPIKEDOWN2 = loadImage('media/tile/spikes2/spikedown.png');
  SPIKELEFT2 = loadImage('media/tile/spikes2/spikeleft.png');
  SPIKERIGHT2 = loadImage('media/tile/spikes2/spikeright.png');
  SPIKEUP3 = loadImage('media/tile/spikes3/spikeup.png');
  SPIKEDOWN3 = loadImage('media/tile/spikes3/spikedown.png');
  SPIKELEFT3 = loadImage('media/tile/spikes3/spikeleft.png');
  SPIKERIGHT3 = loadImage('media/tile/spikes3/spikeright.png');
  // Background music
  OVERWORLD1 = loadSound('media/music/overworld1.mp3');
  // OVERWORLD2 = loadSound('media/music/overworld2.mp3');
  // OVERWORLD3 = loadSound('media/music/overworld3.mp3');
  BOSS1 = loadSound('media/music/boss1.mp3');
  // VICTORY = loadSound('media/music/victory.mp3');
  // Sounds
  // DASH = loadSound('media/sounds/dash.mp3');
  // LAND = loadSound('media/sounds/land.mp3');
  DEATH = loadSound('media/sounds/death.mp3');
  // RESPAWN = loadSound('media/sounds/respawn.mp3');
  // TRANSITION = loadSound('media/sounds/transition.mp3');
  // BOSSATTACK = loadSound('media/sounds/bossattack.mp3');
  SWITCH = loadSound('media/sounds/switch.mp3');
  // Fonts
  FONT = loadFont('media/fonts/JetBrains Mono.ttf');
}

/* PLAYER FUNCTIONS */

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

function dash() {
  dashing = true
  allowmove = false
  allowdash = false
  allowbottomhitdetection = false
  playeryvel = 0
  waitdash()
}

function waitdash() {
  setTimeout(() => {stopdash()}, 125)
}

function stopdash() {
  if (allowdeath == true)
  {
    playerxvel = 0
    playeryvel = 0
    allowmove = true
    dashing = false
    allowdash = false
    allowbottomhitdetection = true
  }
}

function death() {
  allowtophitdetection = false
  allowbottomhitdetection = false
  allowlefthitdetection = false
  allowrighthitdetection = false
  allowdeath = false
  deathcount += 1
  localStorage.setItem("deaths",deathcount)
  
  playerxvel = 0
  playeryvel = 0
  dashing = false

  allowmove = false
  playeryvel = 20
  OVERWORLD1.stop()
  BOSS1.stop()
  
  DEATH.play()

  setTimeout(() => {
    respawn()
  }, 2500);
}

function respawn() {
    playerx = 0
    playery = levelspawnpoints[level]
    playeryvel = 0
    playerdirection = 1

    if (level == 2) {
      dashindicator = true
    }

    allowtophitdetection = true
    allowbottomhitdetection = true
    allowlefthitdetection = true
    allowrighthitdetection = true
    allowdeath = true
    allowmove = true
    OVERWORLD1.loop()
}

/* GAME FUNCTIONS */

// function menu() {
  
// }

function gameover() {
  endscreen = true;
  image(ENDSCREEN, 0, 0);
  fill(255, 255, 255);
  textSize(48);
  textFont(FONT);
  text('Game Complete!', 10, 50);
  textSize(24);
  if (deathcount == 0)
    text('No Deaths', 13, 77)
  else if (deathcount == 1)
    text('1 Death', 13, 77);
  else
    text(deathcount+' Deaths', 13, 77);
    text('Completed in ' + parseFloat(frameCount/60).toFixed(2) + ' seconds', 13, 103)
    text('Press R to reset... (for debugging purposes)', 13, 129)
  text('AdminTroller', 1035, 544);
  text('ToxicFscyther', 1020, 566);
}

function nextlevel() {
  if (level > levelcount) {
    localStorage.setItem("frame", frameCount)
    gameover()
  }
  else {
    level += 1
    if (level == 0 && playermoved == false)
      playerx = 92
    else
      playerx = 0
    if (level == 3)
      dashindicator = false
    playery = levelspawnpoints[level]
    playerxvel = 0
    playeryvel = 0
    playerdirection = 1
    stopdash()
    tilehitboxes = []
    spikehitboxes = []
    if (level > 1)
      allowdash = true
    localStorage.setItem("level", level)
    localStorage.setItem("deaths", deathcount)
    localStorage.setItem("frame", frameCount)
  }
}

function previouslevel() {
  if (level > 0) {
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
}

/* CANVAS & EVENT LISTENERS */

function setup() {
  // Music
  OVERWORLD1.stop()
  OVERWORLD1.loop()

  // Canvas
  createCanvas(game_size[0], game_size[1]);
  BACKGROUND.resize(game_size[0], game_size[1]);
  frameRate(60);

  // Listeners
  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowLeft') {
      leftpressed = true
      if (playermoved == false)
        playermoved = true
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowLeft') {
      leftpressed = false
      playerxvel = 0
      if (playermoved == false)
        playermoved = true
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowRight') {
      rightpressed = true
      if (playermoved == false)
        playermoved = true
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowRight') {
      rightpressed = false
      playerxvel = 0
      if (playermoved == false)
        playermoved = true
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowUp' && touchingground == true) {
      uppressed = true
      if (playermoved == false)
        playermoved = true
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === 'z' && allowdash == true && allowmove == true) {
      dash()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === 'r' && allowdeath == true) {
      level = -1
      nextlevel()
      deathcount = 0
      localStorage.setItem("deaths", 0)
      endscreen = false
      dashindicator = false
      frameCount = 0
      OVERWORLD1.stop()
      OVERWORLD1.loop()
      BOSS1.stop()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === ']' && allowdeath == true) {
      nextlevel()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === '[' && allowdeath == true) {
      previouslevel()
    }
  });

  document.addEventListener("keypress", function(event) {
    if (event.key === 'm' && allowdeath == true) {
      OVERWORLD1.pause()
      BOSS1.stop()
      BOSS1.loop()
    }
  });
}

/* RENDERER */

function draw() {
  if (rungame == true)
  {
    gameloop()
  }

}

function gameloop() {

  if (endscreen == false) {
    if (playerx > -12 || playerxvel > 0)
      playerx += playerxvel

    if (level < 2)
      allowdash = false

    if (level <= 1) {
      image(BACKGROUND, 0, 0);
    } else {
      if (level < 5) {
        image(BACKGROUND1, 0, 0);
      } else {
        image(BACKGROUND2, 0, 0);
      }
    }

    if (dashing == true) {
      if (playerdirection == 1) {
        image(PLAYER_DASH_R, playerx, playery)
        image(DASHRIGHT, playerx - 64, playery)
      }
      else {
        image(PLAYER_DASH_L, playerx, playery)
        image(DASHLEFT, playerx + 64, playery)
      }
    }
    else {
      if (playerdirection == 1)
        image(PLAYER_IDLE_R, playerx, playery)
      else
        image(PLAYER_IDLE_L, playerx, playery)
    }
/*
    if (!playerxvel == 0) {
      var randdust = random(1, 5)
      if (randdust == 1)
        image(DUST1, )
      if (randdust == 2)
        image(DUST2, )
      if (randdust == 3)
        image(DUST3, )
      if (randdust == 4)
        image(DUST4, )
      if (randdust == 5)
        image(DUST5, )
    }
*/

    for (repeat = 0; repeat < levels[level].length; repeat++) {
      var tile = levels[level][repeat]
      var tilex = 0
      var tiley = 512
      var row = 0
      while (tile >= 20) {
        tile -= 20
        row += 1
        tiley = game_size[1] - 64 - (row * 64)
      }
      tilex = tile*64
      image(TILE1, tilex, tiley)
      tilehitboxes.push([tilex,tiley])
    }

    for (repeat = 0; repeat < spikes[level].length; repeat++) {
      var spike = spikes[level][repeat]
      var spikex = 0
      var spikey = 512
      var spikerow = 0
      while (spike >= 20) {
        spike -= 20
        spikerow += 1
        spikey = game_size[1] - 64 - (spikerow * 64)
      }
      spikex = spike*64
      if (spikesdirections[level][repeat] == 1) {
        if (level <= 1)
          image(SPIKEUP1, spikex, spikey)
        else if (level < 5)
          image(SPIKEUP2, spikex, spikey)
        else
          image(SPIKEUP3, spikex, spikey)
      }
      else if (spikesdirections[level][repeat] == 2) {
        if (level <= 1)
          image(SPIKELEFT1, spikex, spikey)
        else if (level < 5)
          image(SPIKELEFT2, spikex, spikey)
        else
          image(SPIKELEFT3, spikex, spikey)
      }
      else if (spikesdirections[level][repeat] == 3) {
        if (level <= 1)
          image(SPIKERIGHT1, spikex, spikey)
        else if (level < 5)
          image(SPIKERIGHT2, spikex, spikey)
        else
          image(SPIKERIGHT3, spikex, spikey)
      }
      else if (spikesdirections[level][repeat] == 4) {
        if (level <= 1)
          image(SPIKEDOWN1, spikex, spikey)
        else if (level < 5)
          image(SPIKEDOWN2, spikex, spikey)
        else
          image(SPIKEDOWN3, spikex, spikey)
      }
      spikehitboxes.push([spikex,spikey])
    }

    if (leftpressed == true && allowmove == true)
      moveleft()

    if (rightpressed == true && allowmove == true) 
      moveright()

    if (leftpressed == true && rightpressed == true && allowmove == true)
      playerxvel = 0

    if (playerx > 1190)
      nextlevel()

    if (uppressed == true && touchingground == true && allowmove == true)
      jump()

    if (playeryvel > -15)
      playeryvel -= gravity
    else
      playeryvel = -15

      playery -= playeryvel

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (playerx > tilehitboxes[repeat][0] - 48 && playerx < tilehitboxes[repeat][0] + 48 && playery > tilehitboxes[repeat][1] - 56 && playery < tilehitboxes[repeat][1] - 32 && allowtophitdetection == true) {
        topoftile = true
        playery = tilehitboxes[repeat][1] - 48
        // image(DUST1,playerx+24,playery+48,16,16)
        break
      }
      else
        topoftile = false
    }

    if (topoftile == true) {
      playery += playeryvel
      touchingground = true
    }
    else
      touchingground = false

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx > tilehitboxes[repeat][0] - 64 && playerx < tilehitboxes[repeat][0] - 32 && allowlefthitdetection == true)
      {
        leftoftile = true
        break
      }
      else
        leftoftile = false
    }

    if (leftoftile == true && playerxvel > 0)
      playerx -= playerxvel

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx < tilehitboxes[repeat][0] + 64 && playerx > tilehitboxes[repeat][0] + 32 && allowrighthitdetection == true) {
        rightoftile = true
        break
      }
      else
        rightoftile = false
    }

    if (rightoftile == true && playerxvel < 0)
      playerx -= playerxvel

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (playerx > tilehitboxes[repeat][0] - 50 && playerx < tilehitboxes[repeat][0] + 50 && playery < tilehitboxes[repeat][1] + 64 && playery > tilehitboxes[repeat][1] + 32 && allowbottomhitdetection == true) {
        bottomoftile = true
        break
      }
      else
        bottomoftile = false
    }

    if (bottomoftile == true)
      playeryvel = abs(playeryvel) * -1
    
    if (level < 2)
      allowdash = false 

    if (touchingground == true && allowdash == false && level > 1)
      allowdash = true

    for (repeat = 0; repeat < spikehitboxes.length; repeat++) {
      if (allowdeath == true && playerx > spikehitboxes[repeat][0] - 32 && playerx < spikehitboxes[repeat][0] + 32 && playery > spikehitboxes[repeat][1] - 48 && playery < spikehitboxes[repeat][1] + 48)
        death()
    }

    if (playery > 576 && allowdeath == true)
        death()

    if (dashing == true) {
        if (playerdirection == 1)
        {
          if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx > tilehitboxes[repeat][0] - 128 && playerx < tilehitboxes[repeat][0] - 32 && allowlefthitdetection == true)
            playerxvel = 0
          else
            playerxvel = 30
        }
        else
        {
          if (playery > tilehitboxes[repeat][1] - 48 && playery < tilehitboxes[repeat][1] + 48 && playerx < tilehitboxes[repeat][0] + 128 && playerx > tilehitboxes[repeat][0] + 32 && allowrighthitdetection == true)
            playerxvel = 0
          else
            playerxvel = -30
        }
    }

    if (dashindicator == true && level == 2) {
      if (dashing == true)
        dashindicator = false
      image(DASH, 400, 400);
      fill(255, 255, 255);
      textFont(FONT);
      textSize(40);
      textStyle(BOLD);
      text('DASH', 475, 447);
    }

    if (level == 0 && playermoved == false)
      image(ARROWS, 30, 380)
    
    if (!bossmsg[level] == '') {
      textSize(24)
      textFont(FONT)
      fill(237, 34, 93)
      text(bossmsg[level], 608, 60)
    }

    if (level == 4 && playery < -50 && playerx < 350)
    {
      document.write("woo a secret (reload page lol)")
      playerx = 500
    }

    if (level == 5 && playery > 300 && playerx < 30)
    {
      document.write("woo a secret (reload page lol)")
      playerx = 500
    }
  }
}