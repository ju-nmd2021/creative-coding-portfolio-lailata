let particles = [];
const num = 500;

const noiseScale = 0.01;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  background(0);
  stroke(270, 0, 0);
  strokeWeight(1);
  angleMode(DEGREES);
}

function draw() {
  background(0, 5);
  for (let i = 0; i < num; i++) {
    let position = particles[i];
    point(position.x, position.y);

    let pointValue = (position.x * noiseScale, position.y * noiseScale);
    let angle = 15 * pointValue;
    position.x += cos(angle);
    position.y += sin(angle);

    if (!onScreen(position)) {
      position.x = random(width);
      position.y = random(height);
    }
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
