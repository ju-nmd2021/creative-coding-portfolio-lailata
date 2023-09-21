function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  noStroke(1);
}

function draw() {
  push();
  translate(width / 2.5, height / 2.5);
  // rectMode(CENTER);
  fill(random(0), random(255), random(255));
  rect(random(200), random(100), random(90, 200), random(75));
  pop();
}
