// This code was aapted from https://chatgpt.com/share/68dd0bee-ec6c-800b-a09c-8ba632856948 Accessed: 01-10-2025
// Guitar open string notes (standard tuning low to high)
let notes = ["E2", "A2", "D3", "G3", "B3", "E4"];

// Tone.js synth
let synth;

// String positions and wiggle data
let strings = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Tone.js poly synth (so multiple notes can play at once)
  synth = new Tone.PolySynth(Tone.Synth).toDestination();

  // Create 6 strings with Y-positions and wiggle state
  for (let i = 0; i < 6; i++) {
    strings.push({
      y: innerHeight / 4 + i * 90,
      amp: 0, // amplitude of wave
      decay: 0.95, // how fast vibration dies
      freq: 8, // wave frequency (visual only)
      phase: 0, // phase shift
    });
  }
}

function draw() {
  background(20, 20, 20);
  // Neon glow effect
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(255, 0, 0);
  strokeWeight(10);
  stroke(255, 0, 0);

  // Draw all strings
  for (let s of strings) {
    beginShape();
    for (let x = 50; x <= width - 50; x += 5) {
      let offset = sin(x * 0.05 + s.phase) * s.amp;
      vertex(x, s.y + offset);
    }
    endShape();

    // Update vibration
    s.amp *= s.decay; // amplitude fades
    s.phase += 0.2; // move the wave forward
  }
}

function mousePressed() {
  pluckString(mouseY);
}

function mouseDragged() {
  pluckString(mouseY);
}

function pluckString(yPos) {
  for (let i = 0; i < strings.length; i++) {
    let s = strings[i];
    if (abs(yPos - s.y) < 12) {
      // Play sound
      synth.triggerAttackRelease(notes[i], "2n");

      // Start vibration
      s.amp = 15; // reset amplitude
    }
  }
}
