var PLAYER, BACKGROUND, TILE1;
var game_size = [1264, 560];
var playerx = 0
var playery = 432

function preload() {
  PLAYER = loadImage('media/player.png');
  BACKGROUND = loadImage('media/background.png');
  TILE1 = loadImage('media/tile1.png');
}

function moveleft() {
  // context. clearRect(0, 0, game_size[0], game_size[1];
  playerx -= 5
}

function moveright() {
  playerx += 5
}

function jump() {
  // later
}

function setup() {
  createCanvas(game_size[0], game_size[1]);

  BACKGROUND.resize(game_size[0], game_size[1]);
  frameRate(60);

  document.addEventListener("keypress", function(event) {
    if (event.key === 'q') {
      moveleft()
      alert(playerx)
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

  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  // text('Game Title', game_size[0]/2, game_size[1]/3);        UNFINISHED
  // text('Game Subtitle', game_size[0]/2, game_size[1]*1/3+50);
}