var PLAYER, BACKGROUND, TILE1;
var game_size = [1264, 560];
var playerx = 0
var playery = 432

function preload() {
  PLAYER = loadImage('media/player.png');
  BACKGROUND = loadImage('media/background.png');
  TILE1 = loadImage('media/tile1.png');
}

function setup() {
  createCanvas(game_size[0], game_size[1]);
  BACKGROUND.resize(game_size[0], game_size[1]);
  square(30, 20, 55);
  frameRate(60);
}

function draw() {
  image(BACKGROUND, 0,0);
  playerx+=1  
  image(PLAYER, playerx, playery)
    for (repeat=0;repeat<20;repeat++)
    {
      image(TILE1, repeat*64, 496)
    }
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  // text('Game Title', game_size[0]/2, game_size[1]/3);        UNFINISHED
  // text('Game Subtitle', game_size[0]/2, game_size[1]*1/3+50);

}