function preload() {
  FONT = loadFont('media/fonts/mono.ttf');
}

function setup() {
  createCanvas(1216, 576);
  frameRate(60);
}

function dialogue(message, duration) {
  textFont(FONT);
  textSize(24);
  fill(237, 34, 93);
  var textx = 100
  var texty = 100
  text(message, textx, texty);
}

dialogue('testing', 5)