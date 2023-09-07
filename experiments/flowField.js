let particles = [];
const num = 5000;

const noiseScale = 0.01;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  background(34, 39, 46);
  stroke(0, 255, 255);
  strokeWeight(1.5);
  angleMode(DEGREES);
}

function draw() {
  background(0, 10);
  for (let i = 0; i < num; i++) {
    let position = particles[i];
    point(position.x, position.y);

    let pointValue = (position.x * noiseScale, position.y * noiseScale);
    let angle = 360 * pointValue;
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
