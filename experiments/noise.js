// This code was inspired by Garrit
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(15);
}

const size = 12;
const divider = 20;
const numRows = innerHeight / size;
const numCols = innerWidth / size;

let counter = 0;

function draw() {
  background(255, 145, 76);
  fill(87, 112, 245);
  noStroke();

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y, counter) * size;
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }

  counter += 0.1;
}
