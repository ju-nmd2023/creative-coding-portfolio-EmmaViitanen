// This code was created using ChatGPT https://chatgpt.com/share/68cb1ab7-2f78-800b-a908-057b0aa0dc53, Accessed: 2025-09-17

// Gravity grid — row-by-row from bottom → top
let squares = [];
let cols = 12;
let rows = 20;
let margin = 4;
let gridW, gridH, cellW, cellH, squareSize, offsetX;
let gravity = 0.8;
let fall = false;
let rowDelay = 120; // ms between rows starting to fall

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  initGrid();
}

function initGrid() {
  squares = [];
  gridW = width / 4 - 10 * margin;
  gridH = height - 2 * margin;
  cellW = gridW / cols;
  cellH = gridH / rows;
  squareSize = min(cellW, cellH);
  offsetX = (width - gridW) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = offsetX + margin + c * cellW + cellW / 2;
      let y = margin + r * cellH + cellH / 2;

      // Disorder increases with row index
      let maxOffset = map(r, 0, rows - 1, 0, 20);
      let maxRotation = map(r, 0, rows - 1, 0, PI / 3);

      let dx = random(-maxOffset, maxOffset);
      let dy = random(-maxOffset, maxOffset);
      let angle = random(-maxRotation, maxRotation);

      squares.push({
        x: x + dx,
        y: y + dy,
        startY: y + dy,
        targetY: height - margin - squareSize / 2, // ground line
        angle: angle,
        vy: 0,
        row: r,
        active: false,
        activationTime: Infinity,
      });
    }
  }
}

function draw() {
  background(0);
  let t = millis();

  for (let s of squares) {
    // Activate when the scheduled time arrives
    if (!s.active && fall && t >= s.activationTime) {
      s.active = true;
    }

    // Physics for active squares
    if (s.active) {
      s.vy += gravity;
      s.y += s.vy;

      // stop at ground
      if (s.y > s.targetY) {
        s.y = s.targetY;
        s.vy = 0;
      }
    }

    push();
    translate(s.x, s.y);
    rotate(s.angle);
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, squareSize, squareSize);
    pop();
  }
}

// Click to start rows falling from bottom → top.
// Clicking again resets the grid.
function mousePressed() {
  if (!fall) {
    fall = true;
    let base = millis();
    for (let s of squares) {
      // row index counted from bottom (0 = bottom row)
      let rowIndexFromBottom = rows - 1 - s.row;
      // give each square a small jitter so it feels organic
      let jitter = random(0, rowDelay * 0.6);
      s.activationTime = base + rowIndexFromBottom * rowDelay + jitter;
    }
  } else {
    // reset
    fall = false;
    initGrid();
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  initGrid();
}
