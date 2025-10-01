// This code was created using ChatGPT https://chatgpt.com/share/68cb094a-9a0c-800b-8448-fb713f797b33, Accessed: 2025-09-17
function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(0);
  noFill();

  let cols = 12; // number of squares per row
  let rows = 20; // number of rows
  let margin = 4;
  let gridW = width / 4 - 10 * margin;
  let gridH = height - 2 * margin;
  let cellW = gridW / cols;
  let cellH = gridH / rows;
  let squareSize = min(cellW, cellH) * 1;
  let offsetX = (width - gridW) / 2;

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

      push();
      translate(x + dx, y + dy);
      rotate(angle);

      // Neon glow effect
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color(57, 255, 20); // neon cyan
      stroke(57, 255, 20); // stroke same as glow
      strokeWeight(3);
      rect(0, 0, squareSize, squareSize);

      // reset shadow after drawing
      //   drawingContext.shadowBlur = 0;
      pop();
    }
  }
}
