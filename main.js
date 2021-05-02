var game_size = [1264, 560];

function preload() {
  PLAYER = loadImage('media/player.png')
  BACKGROUND = loadImage('media/background.png')
}

function setup() {
  createCanvas(game_size[0], game_size[1]);
  square(30, 20, 55);
  frameRate(60);
}

function draw() {
  background(220);
}

setup()