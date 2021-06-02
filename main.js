// # P5GAME by AdminTroller and ToxicFscyther

// [Comment Style] Better Comments (Visual Studio Code)
// [Formatter Style] Prettier (Visual Studio Code)

/* VARIABLE DEFINITIONS */

/*
TODO more levels
TODO secret levels
TODO implement switches
TODO boss levels/boss dialogue
*/

/*
? Instructions for adding levels
* Add level<level#> array
* Add spikes<level#> and spikes<level#>directions arrays
* Add a spawnpoint (default 420) into the levelspanwnpoints array
! Make sure to increase var levelcount by 1
TODO add switches
*/

var game_size = [1216, 576];

var dashamount = 0;
var dashtouchingleft = false;

// Game toggle
var rungame = false;

var debugmode = false;
var debugx = 0;
var debugy = 0;
var debugtile = 0;
var debugrow = 0;

var allowgravity = true;

var allowrespawn = true;
var allowdeath = true;
var endscreen = false;
var menuoption = 0;
var menuscreen = true;
var playermoved = false;

if (localStorage.getItem("level")) {
  var level = parseInt(localStorage.getItem("level"));
  var playedbefore = true;
  if (level == 0) verified = true;
} else {
  var level = 0;
  var playedbefore = false;
}

if (localStorage.getItem("deaths"))
  var deathcount = parseInt(localStorage.getItem("deaths"));
else var deathcount = 0;

frameCount = localStorage.getItem("frame");

var levelspawnpoints = [420, 420, 190, 420, 129, 184, 420, 420, 420];
var levelbiomes = [0, 0, 1, 1, 1, 2, 2, 2, 2];

var levels = [];
var level0 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 26, 27, 34
];
levels.push(level0);
var level1 = [
  0, 1, 2, 3, 6, 7, 10, 11, 14, 17, 18, 26, 27, 30, 31, 34, 37, 38, 50, 51, 54,
  57, 58, 74, 77, 78, 97, 98
];
levels.push(level1);
var level2 = [
  80, 81, 60, 61, 40, 41, 20, 21, 0, 1, 2, 3, 4, 10, 11, 12, 17, 18, 137, 138,
  155, 156, 157, 158, 172, 173, 174, 175, 176, 177, 178, 179
];
levels.push(level2);
var level3 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 46, 47, 48, 49,
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 69, 70, 71, 72, 73, 74, 75, 76, 77,
  78, 79, 92, 93, 94, 95, 96, 97, 98, 99, 115, 116, 117, 118, 119, 100, 101,
  102, 120, 121, 122, 123, 124, 125, 140, 141, 142, 143, 144, 145, 146, 147,
  148, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173,
  174, 175, 176, 177, 178, 179
];
levels.push(level3);
var level4 = [
  0, 1, 2, 3, 4, 5, 6, 7, 100, 101, 102, 62, 63, 64, 20, 21, 22, 23, 24, 25, 26,
  27, 65, 66, 85, 86, 105, 106, 125, 126, 145, 146, 160, 161, 162, 163, 164,
  165, 166, 17, 18, 37, 38, 57, 58, 77, 78, 97, 98, 117, 118, 14, 15, 16, 36,
  56, 91, 92, 111, 131
];
levels.push(level4);
var level5 = [
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 58, 78, 98,
  118, 138, 158, 178, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17,
  18, 40, 41, 42, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 20, 21, 22
];
levels.push(level5);
var level6 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 104,
  107, 108, 13, 33, 53, 73, 93, 113, 133, 32, 70, 140, 141, 134, 118, 98, 77, 78
];
levels.push(level6);
var level7 = [
  0, 1, 2, 3, 4, 24, 40, 44, 60, 64, 80, 84, 43, 81, 123, 140, 160, 120, 100,
  162, 163, 164, 124, 104, 165, 166, 167, 168, 148, 128, 108, 88, 68, 87, 5, 9,
  10, 69, 33, 113, 133, 153, 173, 13, 55, 17, 37, 77, 57, 157, 177
];
levels.push(level7);

var level8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 160, 161,
  162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176,
  177, 178, 48, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 98, 118, 138, 158
];
levels.push(level8);

const levelcount = 7; // * levels - 1

var secrets = []; // secret rooms
var secret1 = [];
secrets.push(secret1);
var secret2 = [];
secrets.push(secret2);
var secret3 = [];
secrets.push(secret3);

var secspikes = []; // secrets spikes
var secspike1 = [];
secspikes.push(secspike1);
var secspike2 = [];
secspikes.push(secspike2);
var secspike3 = [];
secspikes.push(secspike3);

var spikes = [];
var spikesdirections = [];

var spikes0 = [13];
var spikes0directions = [1]; // 1=up 2=left 3=right 4=down
spikes.push(spikes0);
spikesdirections.push(spikes0directions);

var spikes1 = [4, 5, 8, 9, 12, 13, 15, 16];
var spikes1directions = [1, 1, 1, 1, 1, 1, 1, 1];
spikes.push(spikes1);
spikesdirections.push(spikes1directions);

var spikes2 = [
  117, 118, 135, 136, 152, 153, 154, 5, 6, 7, 8, 9, 13, 14, 15, 16
];
var spikes2directions = [4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1];
spikes.push(spikes2);
spikesdirections.push(spikes2directions);

var spikes3 = [];
var spikes3directions = [];
spikes.push(spikes3);
spikesdirections.push(spikes3directions);

var spikes4 = [107, 127, 147, 167, 93, 8, 9, 10, 11, 12, 13];
var spikes4directions = [3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1];
spikes.push(spikes4);
spikesdirections.push(spikes4directions);

var spikes5 = [
  103, 104, 105, 106, 111, 112, 165, 166, 171, 172, 43, 23, 47, 77, 97, 117,
  137, 157, 177
];
var spikes5directions = [
  1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2
];
spikes.push(spikes5);
spikesdirections.push(spikes5directions);

var spikes6 = [
  23, 45, 27, 84, 87, 88, 28, 127, 120, 121, 50, 112, 132, 167, 76, 97, 117,
  138, 158, 178, 34, 54, 74, 94, 114, 135
];
var spikes6directions = [
  1, 1, 1, 4, 4, 4, 1, 1, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3
];
spikes.push(spikes6);
spikesdirections.push(spikes6directions);

var spikes7 = [23, 61, 103, 107, 86, 25, 6, 7, 8, 161, 53, 93, 89, 137, 97];
var spikes7directions = [2, 4, 4, 1, 2, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1];
spikes.push(spikes7);
spikesdirections.push(spikes7directions);

var spikes8 = [];
var spikes8directions = [];
spikes.push(spikes8);
spikesdirections.push(spikes8directions);

var switches = [];

// ? [switch location, door location 1, 2, 3, etc.]

// var switches8 = [96, 58];
// switches.push(switches8);

var switches9 = [];
switches.push(switches9);

var switches10 = [];
switches.push(switches10);

var switches11 = [];
switches.push(switches11);

var switches12 = [];
switches.push(switches12);

var switches13 = [];
switches.push(switches13);

var switches14 = [];
switches.push(switches14);

var bossmsg = [
  "hi!",
  "how are you doing?",
  "hey, im just here for debug purposes.",
  "kinda sad :(",
  "what are you here for?",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "", // up to level 15 (index 14) before boss starts
  "That is enough, fool! Adventurers! Be careful of who you are messing with. Before I have to deal with you myself.", // Phase 1
  "Get back here!", // Phase 2
  "ANOTHER TRAP!! YOUR TRICKS ARE FUTILE!", // Phase 3
  'Can"t you just explode already! Some decency!', // Phase 4
  "All this, for nothing, I understand your words now, my master. The Catacombs, are no more." // Final Phase
];

if (level == 0) var playerx = 92;
else var playerx = 0;
var playery = levelspawnpoints[level];
var playerdirection = 1;

var playerxvel = 0;

var playeryvel = 0;
var gravity = 1;

var bobbing = false;

var touchingground = false;

var allowmove = true;
var allowdash = true;
var dashing = false;

var movementspeed = 6;

var leftpressed = false;
var rightpressed = false;
var uppressed = false;

var musicplaying = false;

var dashindicator = false;

var tilehitboxes = [];
var spikehitboxes = [];

var topoftile = false;
var leftoftile = false;
var rightoftile = false;
var bottomoftile = false;

var allowtophitdetection = true;
var allowlefthitdetection = true;
var allowrighthitdetection = true;
var allowbottomhitdetection = true;

var randchars = []; // * Random characters for text rendering
var torender = []; // ? String, posx/posy

var respawnframe = 0;
var deathframe = 0;

/* ASSET LOADING */

/*
TODO change tile texture
TODO add particle effects
TODO add sounds
*/

function preload() {
  // Players
  PLAYER_IDLE_R = loadImage("media/players/idleR.png");
  PLAYER_IDLE_L = loadImage("media/players/idleL.png");
  PLAYER_ANIM_R = loadImage("media/players/bobbingR.png");
  PLAYER_ANIM_L = loadImage("media/players/bobbingL.png");
  PLAYER_DASH_R = loadImage("media/players/dashingR.png");
  PLAYER_DASH_L = loadImage("media/players/dashingL.png");
  // Backgrounds
  BACKGROUND = loadImage("media/bg/sunset.png"); // Orange
  BACKGROUND1 = loadImage("media/bg/city.png"); // Deep blue
  BACKGROUND2 = loadImage("media/bg/neon.png"); // Green
  BACKGROUND3 = loadImage("media/bg/purple.png"); // Purple
  ENDSCREEN = loadImage("media/bg/endscreen.png"); // Dimmed background to show stats
  // Tiles: Stage 1 tiles are ORANGE, 2 are BLUE, 3 are GREEN, 4 are PURPLE
  // TODO change the tile texture
  TILE1 = loadImage("media/tile/tile/tile1.png");
  TILE2 = loadImage("media/tile/tile/tile2.png");
  TILE3 = loadImage("media/tile/tile/tile3.png");
  TILE4 = loadImage("media/tile/tile/tile4.png");
  // Switch tiles
  SWITCHOFF = loadImage("media/tile/switch/default/switch_off.png");
  SWITCHON = loadImage("media/tile/switch/default/switch_on.png");
  SWITCHOFFSEL = loadImage("media/tile/switch/selected/switch_off_sel.png"); // When the player is touching a switch
  SWITCHONSEL = loadImage("media/tile/switch/selected/switch_on_sel.png");
  // Misc tiles
  DASH = loadImage("media/tile/misc/dash.png"); // Helps the player know to press Z to dash
  ARROWS = loadImage("media/tile/misc/arrows.png"); // Helps the player know to use arrow keys
  SWITCHINDICOFF = loadImage(
    "media/tile/switch/indicator/switch_off_indic.png"
  );
  SWITCHINDICON = loadImage("media/tile/switch/indicator/switch_on_indic.png");
  // Effects
  DASHRIGHT = loadImage("media/fx/dash/dashR.png");
  DASHLEFT = loadImage("media/fx/dash/dashL.png");
  // TODO particle effects
  DUST1 = loadImage("media/fx/dust/dust1.png");
  DUST2 = loadImage("media/fx/dust/dust2.png");
  DUST3 = loadImage("media/fx/dust/dust3.png");
  DUST4 = loadImage("media/fx/dust/dust4.png");
  // TODO dust clouds on land
  CLOUD1 = loadImage("media/fx/dust/dustcloud1.png");
  CLOUD2 = loadImage("media/fx/dust/dustcloud2.png");
  // TODO transition
  TRANSITION = loadImage("media/fx/transition/transition.png");
  // Spikes: Stage 1 spikes are ORANGE, 2 are BLUE, 3 are GREEN, 4 are PURPLE
  SPIKEUP1 = loadImage("media/tile/spikes1/spikeup.png");
  SPIKELEFT1 = loadImage("media/tile/spikes1/spikeleft.png");
  SPIKERIGHT1 = loadImage("media/tile/spikes1/spikeright.png");
  SPIKEDOWN1 = loadImage("media/tile/spikes1/spikedown.png");
  SPIKEUP2 = loadImage("media/tile/spikes2/spikeup.png");
  SPIKELEFT2 = loadImage("media/tile/spikes2/spikeleft.png");
  SPIKERIGHT2 = loadImage("media/tile/spikes2/spikeright.png");
  SPIKEDOWN2 = loadImage("media/tile/spikes2/spikedown.png");
  SPIKEUP3 = loadImage("media/tile/spikes3/spikeup.png");
  SPIKELEFT3 = loadImage("media/tile/spikes3/spikeleft.png");
  SPIKERIGHT3 = loadImage("media/tile/spikes3/spikeright.png");
  SPIKEDOWN3 = loadImage("media/tile/spikes3/spikedown.png");
  SPIKEUP4 = loadImage("media/tile/spikes4/spikeup.png");
  SPIKELEFT4 = loadImage("media/tile/spikes4/spikeleft.png");
  SPIKERIGHT4 = loadImage("media/tile/spikes4/spikeright.png");
  SPIKEDOWN4 = loadImage("media/tile/spikes4/spikedown.png");
  // Background music
  OVERWORLD1 = loadSound("media/music/overworld1.mp3");
  // OVERWORLD2 = loadSound('media/music/overworld2.mp3');
  // OVERWORLD3 = loadSound('media/music/overworld3.mp3');
  BOSS1 = loadSound("media/music/boss1.mp3");
  // VICTORY = loadSound('media/music/victory.mp3');
  // Sounds
  // DASH = loadSound('media/sounds/dash.mp3');
  // LAND = loadSound('media/sounds/land.mp3');
  DEATH = loadSound("media/sounds/death.mp3");
  // RESPAWN = loadSound('media/sounds/respawn.mp3');
  // TRANSITION = loadSound('media/sounds/transition.mp3');
  // BOSSATTACK = loadSound('media/sounds/bossattack.mp3');
  SWITCH = loadSound("media/sounds/switch.mp3");
  // Fonts
  FONT = loadFont("media/fonts/JetBrains Mono.ttf");
  // Animation sprites
  // We highly recommend you fold these arrays.
  RESPAWNRIGHT = [
    loadImage("media/players/respawnR/respawn1.png"),
    loadImage("media/players/respawnR/respawn2.png"),
    loadImage("media/players/respawnR/respawn3.png"),
    loadImage("media/players/respawnR/respawn4.png"),
    loadImage("media/players/respawnR/respawn5.png"),
    loadImage("media/players/respawnR/respawn6.png"),
    loadImage("media/players/respawnR/respawn7.png"),
    loadImage("media/players/respawnR/respawn8.png"),
    loadImage("media/players/respawnR/respawn9.png"),
    loadImage("media/players/respawnR/respawn10.png"),
    loadImage("media/players/respawnR/respawn11.png"),
    loadImage("media/players/respawnR/respawn12.png"),
    loadImage("media/players/respawnR/respawn13.png"),
    loadImage("media/players/respawnR/respawn14.png"),
    loadImage("media/players/respawnR/respawn15.png"),
    loadImage("media/players/respawnR/respawn16.png"),
    loadImage("media/players/respawnR/respawn17.png"),
    loadImage("media/players/respawnR/respawn18.png"),
    loadImage("media/players/respawnR/respawn19.png"),
    loadImage("media/players/respawnR/respawn20.png"),
    loadImage("media/players/respawnR/respawn21.png"),
    loadImage("media/players/respawnR/respawn22.png"),
    loadImage("media/players/respawnR/respawn23.png"),
    loadImage("media/players/respawnR/respawn24.png"),
    loadImage("media/players/respawnR/respawn25.png"),
    loadImage("media/players/respawnR/respawn26.png"),
    loadImage("media/players/respawnR/respawn27.png"),
    loadImage("media/players/respawnR/respawn28.png"),
    loadImage("media/players/respawnR/respawn29.png"),
    loadImage("media/players/respawnR/respawn30.png"),
    loadImage("media/players/respawnR/respawn31.png"),
    loadImage("media/players/respawnR/respawn32.png"),
    loadImage("media/players/respawnR/respawn33.png"),
    loadImage("media/players/respawnR/respawn34.png"),
    loadImage("media/players/respawnR/respawn35.png"),
    loadImage("media/players/respawnR/respawn36.png"),
    loadImage("media/players/respawnR/respawn37.png"),
    loadImage("media/players/respawnR/respawn38.png")
  ];
  RESPAWNLEFT = [
    loadImage("media/players/respawnL/respawn1.png"),
    loadImage("media/players/respawnL/respawn2.png"),
    loadImage("media/players/respawnL/respawn3.png"),
    loadImage("media/players/respawnL/respawn4.png"),
    loadImage("media/players/respawnL/respawn5.png"),
    loadImage("media/players/respawnL/respawn6.png"),
    loadImage("media/players/respawnL/respawn7.png"),
    loadImage("media/players/respawnL/respawn8.png"),
    loadImage("media/players/respawnL/respawn9.png"),
    loadImage("media/players/respawnL/respawn10.png"),
    loadImage("media/players/respawnL/respawn11.png"),
    loadImage("media/players/respawnL/respawn12.png"),
    loadImage("media/players/respawnL/respawn13.png"),
    loadImage("media/players/respawnL/respawn14.png"),
    loadImage("media/players/respawnL/respawn15.png"),
    loadImage("media/players/respawnL/respawn16.png"),
    loadImage("media/players/respawnL/respawn17.png"),
    loadImage("media/players/respawnL/respawn18.png"),
    loadImage("media/players/respawnL/respawn19.png"),
    loadImage("media/players/respawnL/respawn20.png"),
    loadImage("media/players/respawnL/respawn21.png"),
    loadImage("media/players/respawnL/respawn22.png"),
    loadImage("media/players/respawnL/respawn23.png"),
    loadImage("media/players/respawnL/respawn24.png"),
    loadImage("media/players/respawnL/respawn25.png"),
    loadImage("media/players/respawnL/respawn26.png"),
    loadImage("media/players/respawnL/respawn27.png"),
    loadImage("media/players/respawnL/respawn28.png"),
    loadImage("media/players/respawnL/respawn29.png"),
    loadImage("media/players/respawnL/respawn30.png"),
    loadImage("media/players/respawnL/respawn31.png"),
    loadImage("media/players/respawnL/respawn32.png"),
    loadImage("media/players/respawnL/respawn33.png"),
    loadImage("media/players/respawnL/respawn34.png"),
    loadImage("media/players/respawnL/respawn35.png"),
    loadImage("media/players/respawnL/respawn36.png"),
    loadImage("media/players/respawnL/respawn37.png"),
    loadImage("media/players/respawnL/respawn38.png")
  ];
  DEATHRIGHT = [
    loadImage("media/players/deathR/death1.png"),
    loadImage("media/players/deathR/death2.png"),
    loadImage("media/players/deathR/death3.png"),
    loadImage("media/players/deathR/death4.png"),
    loadImage("media/players/deathR/death5.png"),
    loadImage("media/players/deathR/death6.png"),
    loadImage("media/players/deathR/death7.png"),
    loadImage("media/players/deathR/death8.png"),
    loadImage("media/players/deathR/death9.png"),
    loadImage("media/players/deathR/death10.png"),
    loadImage("media/players/deathR/death11.png"),
    loadImage("media/players/deathR/death12.png"),
    loadImage("media/players/deathR/death13.png"),
    loadImage("media/players/deathR/death14.png"),
    loadImage("media/players/deathR/death15.png"),
    loadImage("media/players/deathR/death16.png"),
    loadImage("media/players/deathR/death17.png"),
    loadImage("media/players/deathR/death18.png")
  ];
  DEATHLEFT = [
    loadImage("media/players/deathL/death1.png"),
    loadImage("media/players/deathL/death2.png"),
    loadImage("media/players/deathL/death3.png"),
    loadImage("media/players/deathL/death4.png"),
    loadImage("media/players/deathL/death5.png"),
    loadImage("media/players/deathL/death6.png"),
    loadImage("media/players/deathL/death7.png"),
    loadImage("media/players/deathL/death8.png"),
    loadImage("media/players/deathL/death9.png"),
    loadImage("media/players/deathL/death10.png"),
    loadImage("media/players/deathL/death11.png"),
    loadImage("media/players/deathL/death12.png"),
    loadImage("media/players/deathL/death13.png"),
    loadImage("media/players/deathL/death14.png"),
    loadImage("media/players/deathL/death15.png"),
    loadImage("media/players/deathL/death16.png"),
    loadImage("media/players/deathL/death17.png"),
    loadImage("media/players/deathL/death18.png")
  ];
}

/* PLAYER FUNCTIONS */

/*
TODO better death animation
TODO interact
*/

function moveleft() {
  playerxvel = movementspeed * -1;
  playerdirection = 0;
}

function moveright() {
  playerxvel = movementspeed;
  playerdirection = 1;
}

function jump() {
  playeryvel = 18;
  touchingground = false;
  uppressed = false;
}

function dash() {
  dashing = true;
  allowmove = false;
  allowdash = false;
  allowgravity = false;
  allowbottomhitdetection = false;
  playeryvel = 0;
  waitdash();
}

function waitdash() {
  setTimeout(() => {
    stopdash();
  }, 125);
}

function stopdash() {
  if (allowdeath == true) {
    playerxvel = 0;
    playeryvel = 0;
    allowmove = true;
    allowgravity = true;
    dashing = false;
    allowdash = false;
    allowbottomhitdetection = true;
  }
}

function death() {
  allowgravity = false;
  allowtophitdetection = false;
  allowbottomhitdetection = false;
  allowlefthitdetection = false;
  allowrighthitdetection = false;
  allowdeath = false;
  deathcount += 1;
  localStorage.setItem("deaths", deathcount);

  deathframe = 0;

  playerxvel = 0;
  playeryvel = 0;
  dashing = false;

  allowmove = false;
  // if (!debugmode) playeryvel = 20;
  OVERWORLD1.stop();
  BOSS1.stop();

  DEATH.play();
  if (debugmode) respawn();
  else {
    setTimeout(() => {
      respawn();
    }, 2500);
  }
}

function respawn() {
  playerx = 0;
  playery = levelspawnpoints[level];
  playeryvel = 0;
  playerdirection = 1;
  respawnframe = 0;

  if (level == 2) dashindicator = true;

  allowtophitdetection = true;
  allowbottomhitdetection = true;
  allowlefthitdetection = true;
  allowrighthitdetection = true;
  allowdeath = true;
  allowmove = true;
  allowgravity = true;
  OVERWORLD1.loop();
}

/* GAME FUNCTIONS */

// TODO
/*
function rendertext(text, size, fill, pos, style, align) {
  textSize(size);
  fill(fill[0], fill[1], fill[2]);
  textFont(FONT);
  textStyle(style);
  textAlign(align);
  for (i = 0; i < text.length; i++) {
    text(
      text.slice(0, i) +
        randchars[Math.floor(Math.random() * (randchars.length - 1))]
    );
  }
}

*/

function menu() {
  menuscreen = true;
  image(ENDSCREEN, 0, 0);
  textAlign(LEFT);
  textFont(FONT);

  fill(255, 255, 255);
  textStyle(BOLD);
  textSize(48);
  text("P5GAME", 30, 288);

  textSize(24);
  fill(150, 150, 150);
  text("Press ENTER to select", 5, 566);

  fill(255, 255, 255);
  text("AdminTroller", 1035, 544);
  text("ToxicFscyther", 1020, 566);
  if (playedbefore == true) {
    if (menuoption == 0) {
      fill(255, 255, 0);
      textAlign(LEFT);
      text("> Continue", 33, 323);
      fill(255, 255, 255);
      text("  Restart", 33, 350);
    } else {
      fill(255, 255, 255);
      textAlign(LEFT);
      text("  Continue", 33, 323);
      fill(255, 255, 0);
      text("> Restart", 33, 350);
    }
  } else {
    fill(255, 255, 0);
    textAlign(LEFT);
    text("> New Game", 33, 323);
  }
}

function gameover() {
  endscreen = true;
  image(ENDSCREEN, 0, 0);
  if (verified == true) fill(255, 255, 255);
  else fill(237, 34, 93);
  textSize(48);
  textFont(FONT);
  textAlign(LEFT);
  text("Game Complete!", 10, 50);
  textSize(24);
  if (deathcount == 0) text("No Deaths", 13, 77);
  else if (deathcount == 1) text("1 Death", 13, 77);
  else text(deathcount + " Deaths", 13, 77);
  text(
    "Completed in " + parseFloat(frameCount / 60).toFixed(2) + " seconds",
    13,
    103
  );
  text("Press R to reset...", 13, 129);
  if (verified == false) text("Run Unverified", 13, 155);
  text("AdminTroller", 1035, 544);
  text("ToxicFscyther", 1020, 566);
}

function nextlevel() {
  if (level > levelcount) {
    localStorage.setItem("frame", frameCount);
    gameover();
  } else {
    level += 1;
    if (level == 0 && playermoved == false) playerx = 92;
    else playerx = 0;
    if (level == 3) dashindicator = false;
    playery = levelspawnpoints[level];
    playerxvel = 0;
    playeryvel = 0;
    playerdirection = 1;
    stopdash();
    tilehitboxes = [];
    spikehitboxes = [];
    if (level > 1) allowdash = true;
    localStorage.setItem("level", level);
    localStorage.setItem("deaths", deathcount);
    localStorage.setItem("frame", frameCount);
  }
}

function previouslevel() {
  if (level > 0) {
    level -= 1;
    playerx = 0;
    playery = levelspawnpoints[level];
    playerxvel = 0;
    playeryvel = 0;
    playerdirection = 1;
    stopdash();
    tilehitboxes = [];
    spikehitboxes = [];
    if (level < 2) allowdash = false;
    localStorage.setItem("level", level);
  }
}

/* CANVAS & EVENT LISTENERS */

function setup() {
  // Music

  // Canvas
  createCanvas(game_size[0], game_size[1]);
  BACKGROUND.resize(game_size[0], game_size[1]);
  frameRate(60);
  textFont(FONT);

  // Listeners

  // Movements
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      leftpressed = true;
      if (!playermoved) playermoved = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
      leftpressed = false;
      playerxvel = 0;
      if (!playermoved) playermoved = true;
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      rightpressed = true;
      if (!playermoved) playermoved = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
      rightpressed = false;
      playerxvel = 0;
      if (!playermoved) playermoved = true;
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      if (rungame && touchingground) {
        uppressed = true;
        if (!playermoved) playermoved = true;
      }
      if (menuscreen && playedbefore) {
        menuoption = 0;
        SWITCH.play();
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" && menuscreen && playedbefore) {
      menuoption = 1;
      SWITCH.play();
    }
  });

  // Dash
  document.addEventListener("keydown", function (event) {
    if (event.key === "z" && allowdash && allowmove) {
      dash();
    }
  });

  // Open menu screen
  document.addEventListener("keypress", function (event) {
    if (event.key === "r" && allowdeath) {
      menuscreen = true;
      rungame = false;
    }
  });

  // TEMP [DEBUG] Skip level
  document.addEventListener("keypress", function (event) {
    if (event.key === "]" && allowdeath && !endscreen) {
      verified = false;
      nextlevel();
    }
  });

  // TEMP [DEBUG] Return to previous level
  document.addEventListener("keypress", function (event) {
    if (event.key === "[" && allowdeath && !endscreen) {
      verified = false;
      previouslevel();
    }
  });

  // TEMP [DEBUG] Enter level builder and debug mode
  // ? In debug mode, there is no death animation and block coords are shown on screen.
  document.addEventListener("keypress", function (event) {
    if (event.key === "k") {
      verified = false;
      debugmode = !debugmode;
    }
  });

  // TEMP [DEBUG] Temporarily sample AdminTroller's musical skills.
  document.addEventListener("keypress", function (event) {
    if (event.key === "m" && allowdeath) {
      OVERWORLD1.pause();
      BOSS1.stop();
      BOSS1.loop();
    }
  });

  // * Start the game
  // ! Only works in the menu screen.
  // FIXME there will be a bug where continuing will reset the time ;-;
  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !rungame) {
      if (menuoption == 0) {
      } else {
        level = -1;
        nextlevel();
        deathcount = 0;
        localStorage.setItem("deaths", 0);
        endscreen = false;
        menuscren = false;
        dashindicator = false;
        frameCount = 0;
        verified = true;
      }
      rungame = true;
      SWITCH.play();
      OVERWORLD1.stop();
      OVERWORLD1.loop();
      BOSS1.stop();
    }
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === "h") {
    }
  });
}

/* TIMERS */

setInterval(() => {
  bobbing = !bobbing;
}, 1250);

setInterval(() => {
  respawnframe += 1;
}, 35);

setInterval(() => {
  deathframe += 1;
}, 50);

/* RENDERER */

function draw() {
  if (rungame == true) gameloop();
  else menu();
}

function gameloop() {
  if (endscreen == false) {
    if (playerx > -12 || playerxvel > 0) playerx += playerxvel;

    if (level < 2) allowdash = false;

    if (levelbiomes[level] == 0) image(BACKGROUND, 0, 0);
    else if (levelbiomes[level] == 1) image(BACKGROUND1, 0, 0);
    else if (levelbiomes[level] == 2) image(BACKGROUND2, 0, 0);
    else if (levelbiomes[level] == 3) image(BACKGROUND3, 0, 0);

    if (allowdeath == true) {
      if (respawnframe > 37) {
        if (dashing == true) {
          if (playerdirection == 1) {
            image(PLAYER_DASH_R, playerx, playery);
            image(DASHRIGHT, playerx - 64, playery);
          } else {
            image(PLAYER_DASH_L, playerx, playery);
            image(DASHLEFT, playerx + 64, playery);
          }
        } else if (bobbing == true && playerxvel == 0 && playeryvel == -15) {
          if (playerdirection == 1) image(PLAYER_ANIM_R, playerx, playery);
          else image(PLAYER_ANIM_L, playerx, playery);
        } else {
          if (playerdirection == 1) image(PLAYER_IDLE_R, playerx, playery);
          else image(PLAYER_IDLE_L, playerx, playery);
        }
      } else if (!debugmode) {
        if (playerdirection == 0)
          image(RESPAWNLEFT[respawnframe], playerx, playery);
        else image(RESPAWNRIGHT[respawnframe], playerx, playery);
      } else respawnframe = 38;
    } else if (deathframe < 18) {
      if (playerdirection == 0) image(DEATHLEFT[deathframe], playerx, playery);
      else image(DEATHRIGHT[deathframe], playerx, playery);
    }

    /* FIXME
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
      var tile = levels[level][repeat];
      var tilex = 0;
      var tiley = 512;
      var row = 0;
      while (tile >= 20) {
        tile -= 20;
        row += 1;
        tiley = game_size[1] - 64 - row * 64;
      }
      tilex = tile * 64;
      if (levelbiomes[level] == 0) image(TILE1, tilex, tiley);
      else if (levelbiomes[level] == 1) image(TILE2, tilex, tiley);
      else if (levelbiomes[level] == 2) image(TILE3, tilex, tiley);
      else if (levelbiomes[level] == 3) image(TILE4, tilex, tiley);
      tilehitboxes.push([tilex, tiley]);
    }

    // Started making doors for switches
    var doortile = switches[0][1];
    var doorx = 0;
    var doory = 512;
    var doorrow = 0;
    while (doortile >= 20) {
      doortile -= 20;
      doorrow += 1;
      doory = game_size[1] - 64 - doorrow * 64;
    }
    doorx = doortile * 64;
    if (levelbiomes[level] == 0) image(TILE1, doorx, doory);
    else if (levelbiomes[level] == 1) image(TILE2, doorx, doory);
    else if (levelbiomes[level] == 2) image(TILE3, doorx, doory);
    else if (levelbiomes[level] == 3) image(TILE4, doorx, doory);
    tilehitboxes.push([doorx, doory]);

    for (repeat = 0; repeat < spikes[level].length; repeat++) {
      var spike = spikes[level][repeat];
      var spikex = 0;
      var spikey = 512;
      var spikerow = 0;
      while (spike >= 20) {
        spike -= 20;
        spikerow += 1;
        spikey = game_size[1] - 64 - spikerow * 64;
      }
      spikex = spike * 64;
      if (spikesdirections[level][repeat] == 1) {
        if (levelbiomes[level] == 0) image(SPIKEUP1, spikex, spikey);
        else if (levelbiomes[level] == 1) image(SPIKEUP2, spikex, spikey);
        else if (levelbiomes[level] == 2) image(SPIKEUP3, spikex, spikey);
        else if (levelbiomes[level] == 3) image(SPIKEUP4, spikex, spikey);
      } else if (spikesdirections[level][repeat] == 2) {
        if (levelbiomes[level] == 0) image(SPIKELEFT1, spikex, spikey);
        else if (levelbiomes[level] == 1) image(SPIKELEFT2, spikex, spikey);
        else if (levelbiomes[level] == 2) image(SPIKELEFT3, spikex, spikey);
        else if (levelbiomes[level] == 3) image(SPIKELEFT4, spikex, spikey);
      } else if (spikesdirections[level][repeat] == 3) {
        if (levelbiomes[level] == 0) image(SPIKERIGHT1, spikex, spikey);
        else if (levelbiomes[level] == 1) image(SPIKERIGHT2, spikex, spikey);
        else if (levelbiomes[level] == 2) image(SPIKERIGHT3, spikex, spikey);
        else if (levelbiomes[level] == 3) image(SPIKERIGHT4, spikex, spikey);
      } else if (spikesdirections[level][repeat] == 4) {
        if (levelbiomes[level] == 0) image(SPIKEDOWN1, spikex, spikey);
        else if (levelbiomes[level] == 1) image(SPIKEDOWN2, spikex, spikey);
        else if (levelbiomes[level] == 2) image(SPIKEDOWN3, spikex, spikey);
        else if (levelbiomes[level] == 3) image(SPIKEDOWN4, spikex, spikey);
      }
      spikehitboxes.push([spikex, spikey]);
    }

    if (debugmode == true) {
      verified = false;
      for (repeat = 0; repeat < 180; repeat++) {
        debugrow = 0;
        debugtile = repeat;
        while (debugtile > 19) {
          debugtile -= 20;
          debugrow += 1;
        }
        debugx = debugtile * 64 + 28;
        debugy = 556 - debugrow * 64;
        textAlign(CENTER);
        textSize(30);
        fill(255, 255, 255);
        text(repeat, debugx, debugy);
      }
    }

    if (leftpressed == true && allowmove == true) moveleft();

    if (rightpressed == true && allowmove == true) moveright();

    if (leftpressed == true && rightpressed == true && allowmove == true)
      playerxvel = 0;

    if (playerx > 1190) nextlevel();

    if (uppressed == true && touchingground == true && allowmove == true)
      jump();

    if (playeryvel > -15) playeryvel -= gravity;
    else playeryvel = -15;

    if (allowgravity == true) playery -= playeryvel;

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (
        playerx > tilehitboxes[repeat][0] - 48 &&
        playerx < tilehitboxes[repeat][0] + 48 &&
        playery > tilehitboxes[repeat][1] - 56 &&
        playery < tilehitboxes[repeat][1] - 32 &&
        allowtophitdetection == true
      ) {
        topoftile = true;
        playery = tilehitboxes[repeat][1] - 48;
        // image(DUST1,playerx+24,playery+48,16,16)
        break;
      } else topoftile = false;
    }

    if (topoftile == true) {
      playery += playeryvel;
      touchingground = true;
    } else touchingground = false;

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (
        playery > tilehitboxes[repeat][1] - 48 &&
        playery < tilehitboxes[repeat][1] + 48 &&
        playerx > tilehitboxes[repeat][0] - 64 &&
        playerx < tilehitboxes[repeat][0] - 32 &&
        allowlefthitdetection == true
      ) {
        leftoftile = true;
        break;
      } else leftoftile = false;
    }

    if (leftoftile == true && playerxvel > 0) playerx -= playerxvel;

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (
        playery > tilehitboxes[repeat][1] - 48 &&
        playery < tilehitboxes[repeat][1] + 48 &&
        playerx < tilehitboxes[repeat][0] + 64 &&
        playerx > tilehitboxes[repeat][0] + 32 &&
        allowrighthitdetection == true
      ) {
        rightoftile = true;
        break;
      } else rightoftile = false;
    }

    if (rightoftile == true && playerxvel < 0) playerx -= playerxvel;

    for (repeat = 0; repeat < tilehitboxes.length; repeat++) {
      if (
        playerx > tilehitboxes[repeat][0] - 50 &&
        playerx < tilehitboxes[repeat][0] + 50 &&
        playery < tilehitboxes[repeat][1] + 64 &&
        playery > tilehitboxes[repeat][1] + 32 &&
        allowbottomhitdetection == true
      ) {
        bottomoftile = true;
        break;
      } else bottomoftile = false;
    }

    if (bottomoftile == true) playeryvel = abs(playeryvel) * -1;

    if (level < 2) allowdash = false;

    if (touchingground == true && allowdash == false && level > 1)
      allowdash = true;

    for (repeat = 0; repeat < spikehitboxes.length; repeat++) {
      if (
        allowdeath == true &&
        playerx > spikehitboxes[repeat][0] - 40 &&
        playerx < spikehitboxes[repeat][0] + 40 &&
        playery > spikehitboxes[repeat][1] - 40 &&
        playery < spikehitboxes[repeat][1] + 48
      )
        death();
    }

    if (playery > 576 && allowdeath == true) death();

    if (dashing == true) {
      if (playerdirection == 1) {
        if (
          playery > tilehitboxes[repeat][1] - 48 &&
          playery < tilehitboxes[repeat][1] + 48 &&
          playerx > tilehitboxes[repeat][0] - 128 &&
          playerx < tilehitboxes[repeat][0] - 32 &&
          allowlefthitdetection == true
        )
          playerxvel = 0;
        else playerxvel = 30;
      } else {
        if (
          playery > tilehitboxes[repeat][1] - 48 &&
          playery < tilehitboxes[repeat][1] + 48 &&
          playerx < tilehitboxes[repeat][0] + 128 &&
          playerx > tilehitboxes[repeat][0] + 32 &&
          allowrighthitdetection == true
        )
          playerxvel = 0;
        else playerxvel = -30;
      }
    }

    if (dashindicator == true && level == 2) {
      if (dashing == true) dashindicator = false;
      image(DASH, 400, 400);
      fill(255, 255, 255);
      textFont(FONT);
      textSize(40);
      textStyle(BOLD);
      textAlign(LEFT);
      text("DASH", 475, 447);
    }

    if (level == 0 && playermoved == false) image(ARROWS, 30, 380);

    textSize(24);
    textFont(FONT);
    textAlign(CENTER);
    fill(237, 34, 93);
    text(bossmsg[level], 608, 60);
    if (rungame && !endscreen) {
      textAlign(LEFT);
      if (verified) fill(255, 255, 0);
      text(
        parseFloat(frameCount / 60)
          .toFixed(2)
          .toString(),
        13,
        35
      );
    } else textAlign(LEFT);

    if (level == 4 && playery < -50 && playerx < 350) {
      document.write("woo a secret (reload page lol)");
      playerx = 500;
    }

    if (level == 5 && playery > 300 && playerx < 30) {
      document.write("woo a secret (reload page lol)");
      playerx = 500;
    }

    if (level == 6 && playery < 64 && playerx < 64) {
      document.write("woo a secret (reload page lol)");
      playery = 420;
    }
  }
}
