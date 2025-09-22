// This code was inspired by Garrit's particle example 02 https://codepen.io/pixelkind/pen/gOZwoVX
// Modified by me and ChatGPT https://chatgpt.com/share/68d131d7-a09c-800b-9758-c28d495dea05 Accessed: 22-09-2025
class Particle {
  constructor(x, y, angle, speed, col) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.fromAngle(angle).mult(speed);
    this.lifespan = 120 + random(80);
    this.color = col;
  }

  update() {
    this.lifespan--;
    this.velocity.mult(0.98); // gentle slowdown
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    let alpha = map(this.lifespan, 0, 200, 0, 255);
    fill(this.color[0], this.color[1], this.color[2], alpha);
    ellipse(0, 0, 6);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

let particles = [];
let colors;

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(LIGHTEST);
  colorMode(RGB);
  // Flower-like palette
  colors = [
    [255, 194, 205],
    [255, 147, 172],
    [255, 98, 137],
  ];
}

function generateFlower(x, y) {
  const numPetals = random(6, 8); // number of petals
  const petalSpread = PI / random(9, 12); // angular spread per petal
  const particlesPerPetal = 50;

  for (let p = 0; p < numPetals; p++) {
    // Base angle for each petal
    let baseAngle = TWO_PI * (p / numPetals);
    let petalColor = random(colors);

    for (let i = 0; i < particlesPerPetal; i++) {
      // Add some random angle inside each petal’s spread
      let angle = baseAngle + random(-petalSpread, petalSpread);
      let speed = 1.5 + random(0.8);
      particles.push(new Particle(x, y, angle, speed, petalColor));
    }
  }
}

function draw() {
  background(20);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].isDead()) particles.splice(i, 1);
  }
}

function mouseClicked() {
  generateFlower(mouseX, mouseY);
}
