function setup() {
  createCanvas(innerWidth, innerHeight);
  background(34, 39, 46);
  noStroke();
}

function draw() {
  push();
  translate(width / 2, height / 2);
  rectMode(CENTER);
  fill(random(255), random(255), random(255));
  rect(random(10, 200), random(1, 100), random(5, 90), random(2, 75));
  pop();
}
