let x = 0;
let y = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(34, 39, 46);
  noStroke();
}

function draw() {
  background(34, 39, 46, 1);
  push();
  translate(width / 2, height / 2);
  let space = 200;
  for (x = 0; x < width + 1; x += space) {
    for (y = 0; y < height + 1; y += space) {
      rotate(frameCount / 20);
      fill(random(255), random(80), random(150));
      ellipse(random(x), random(y), random(1), random(150));
    }
  }

  pop();
}
