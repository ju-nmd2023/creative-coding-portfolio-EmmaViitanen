//This code was inspired by Garrit's molnar.js and modified by me
function setup() {
  createCanvas(600, 600);
}

const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function randomColor() {
  let r = random(180, 255);
  let g = random(180, 255);
  let b = random(180, 255);
  return color(r, g, b, 180);
}

function drawLayers(x, y, size, layers) {
  // const half = size / 2;
  const variance = size / 20;
  noFill();
  // rectMode(CENTER);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }
    stroke(randomColor());
    strokeWeight(5);
    const s = (size / layers) * i;
    const half = s / 2;
    beginShape();
    vertex(getRandomValue(x - half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y + half, variance));
    vertex(getRandomValue(x - half, variance), getRandomValue(y + half, variance));
    endShape(CLOSE);
    // rect(x - half, y - half, s, s);
  }
}

function draw() {
  background(255, 255, 255);

  // drawLayers(100, 100, size, layers);
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  noLoop();
}
