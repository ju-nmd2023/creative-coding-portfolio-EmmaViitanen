// This code was adapted from ChatGPT https://chatgpt.com/share/68c3ea72-db3c-800b-a1ef-63fb6f2fb4f7 and modified by me. Accessed: 2025-06-12
let cols, rows;
let scl = 10;
let noiseScale = 0.005;
let t = 0; // time variable

function setup() {
  createCanvas(innerWidth, innerHeight);
  stroke(255, 255, 255, 150);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(0, 0, 355);
  //   background(240); // clear each frame

  cols = width / scl;
  rows = height / scl;

  for (let y = 0; y < height; y += scl / 2) {
    beginShape();
    for (let x = 0; x < width; x += scl / 2) {
      // add time (t) as third dimension to noise
      let angle = noise(x * noiseScale, y * noiseScale, t) * TWO_PI * 2;
      let off = sin(angle) * 10;
      let yy = y + cos(angle) * 10;
      vertex(x + off, yy);
    }
    endShape();
  }

  t += 0.01; // increase time for animation
}
