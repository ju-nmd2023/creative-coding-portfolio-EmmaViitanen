// This code is inspired by Garrit's Force example 02 https://codepen.io/pixelkind/pen/PoXGEpW
class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 5);
    this.acceleration = createVector(1, 2);
    this.size = 200;
    this.mass = 80;
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  draw() {
    fill(26, 35, 114);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }
}

let element;
let gravity;
let synth;
let bounce = false;
// let bgColor;
const c = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  element = new Element(innerWidth / 4, 10);
  grativy = createVector(0, 5);
  synth = new Tone.Synth().toDestination();
}

function draw() {
  background(60, 78, 225);
  if (bounce) {
    let friction = element.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);

    element.applyForce(friction);
    element.applyForce(grativy);
    element.update();
  }
  element.draw();

  // Check for the walls
  if (element.position.x < 0) {
    element.position.x = 0;
    element.velocity.x *= -2;
    playBounceSound();
  } else if (element.position.x > width) {
    element.position.x = width;
    element.velocity.x *= -1;
    playBounceSound();
  }
  if (element.position.y < 0) {
    element.position.y = 0;
    element.velocity.y *= -1;
    playBounceSound();
  } else if (element.position.y > height) {
    element.position.y = height;
    element.velocity.y *= -1;
    playBounceSound();
  }
}

function mouseClicked() {
  T