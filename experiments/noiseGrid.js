// This code was inspired by Garrit's noise example code and modified using ChatGPT and my own brain

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(15);
}

const size = 7;
const divider = 20;
const cellCols = 4;
const cellRows = 4;
const cellPadding = 40;

let counter = 100;

function draw() {
  background(8, 71, 52);
  noStroke();

  // calculate size of each pattern cell
  let cellW = (width - (cellCols + 1) * cellPadding) / cellCols;
  let cellH = (height - (cellRows + 1) * cellPadding) / cellRows;

  for (let cy = 0; cy < cellRows; cy++) {
    for (let cx = 0; cx < cellCols; cx++) {
      let offsetX = cx * (cellW + cellPadding) + cellPadding;
      let offsetY = cy * (cellH + cellPadding) + cellPadding;

      // number of dots per cell
      let numCols = floor(cellW / size);
      let numRows = floor(cellH / size);

      for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
          const value = noise(x / divider, y / divider, counter + cx + cy) * size;
          if (value < size / 2) {
            fill(206, 241, 123);
          } else {
            fill(205, 237, 179);
          }
          ellipse(offsetX + x * size, offsetY + y * size, value);
        }
      }
    }
  }

  counter += 0.1;
}
