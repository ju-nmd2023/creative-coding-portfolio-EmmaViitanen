// This code was inspired by Garrit's particle example 01 https://codepen.io/pixelkind/pen/VwqKyoP
// This code was modiefied with help from ChatGPT https://chatgpt.com/share/68ce7950-77b4-800b-850e-8a6ee625b963 Accessed: 20-09-2025
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
  }

  update() {
    this.lifespan--;

    this.velocity.mult(0.99);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();

    // Map lifespan to opacity (0–255)
    let alpha = map(this.lifespan, 0, 200, 0, 255);
    fill(254, 167, 117, alpha); // Yellow-ish with fading alpha

    ellipse(0, 0, 5);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

let synth;

function setup() {
  createCanvas(innerWidth, innerHeight);
  synth = new Tone.Synth().toDestination();
}
function generateParticles(x, y) {
  let angleStep = 10; // spacing between each particle in radians
  let radiusStep = 1.5; // how quickly the spiral expands
  let angle = 0;
  let radius = 0;

  for (let i = 0; i < 1000; i++) {
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;

    // Create the particle at the spiral position
    const particle = new Particle(px, py);

    const v = 5; // speed
    particle.velocity = createVector(Math.cos(angle) * v, Math.sin(angle) * v);

    // Add particle to the array
    particles.push(particle);

    // Move along the spiral for the next particle
    angle += angleStep;
    radius += radiusStep;
  }
}

let particles = [];

function draw() {
  background(0, 0, 0);

  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

function 