//This code was inspired by Garrit's molnar.js and modified by me
function setup() {
  createCanvas(1000, 900);
}

const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  // const half = size / 2;
  const variance = size / 15;
  noFill();
  stroke(255, 3, 62);
  strokeWeight(random(0.5, 2));
  // rectMode(CENTER);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }

    // The following 9 lines of code was adapted from https://chatgpt.com/share/68c3e0df-e860-800b-af9c-fecc33c1663a Accessed: 2025-09-04
    const r = (size / 2 / layers) * i;
    // const half = s / 2;
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 10) {
      const px = getRandomValue(x + cos(a) * r, variance);
      const py = getRandomValue(y + sin(a) * r, variance);
      vertex(px, py);
    }
    endShape(CLOSE);
    // rect(x - half, y - half, s, s);
  }
}

function draw() {
  background(71, 10, 10);

  // drawLayers(100, 100, size, layers);
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  noLoop();
}
