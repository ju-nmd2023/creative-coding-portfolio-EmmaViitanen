// This code was created using ChatGPT https://chatgpt.com/share/68cbc65b-5078-800b-bad5-2e508020afed and modified by me, Accessed: 2025-09-18

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  angleMode(RADIANS);
}

function draw() {
  background(0);
  stroke(57, 255, 20, 180);
  noFill();

  let cols = 12;
  let rows = 20;
  let margin = 1;
  let gridW = width / 4 - 10 * margin;
  let gridH = height - 2 * margin;
  let cellW = gridW / cols;
  let cellH = gridH / rows;
  let ellipseW = min(cellW, cellH);
  let ellipseH = ellipseW; // slightly squashed look
  let offsetX = (width - gridW) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = offsetX + margin + c * cellW + cellW / 2;
      let y = margin + r * cellH + cellH / 2;

      // "Destruction factor" increases with row
      let destruction = map(r, 0, rows - 1, 0, 1.7);

      push();
      translate(x, y);

      stroke(255);
      strokeWeight(2);

      // Draw ellipse as broken arcs
      let segments = int(6 + destruction * 12); // more pieces further down
      let start = 0;
      let step = TWO_PI / segments;

      for (let i = 0; i < segments; i++) {
        // Randomly skip some arcs to simulate peeling/destroyed parts
        if (random() < destruction * 0.5) continue;

        let a1 = start + i * step;
        let a2 = a1 + step * random(0.7, 1.2); // irregular gaps

        arc(0, 0, ellipseW, ellipseH, a1, a2);
      }

      pop();
    }
  }
}
