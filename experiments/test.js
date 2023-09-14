let points = [];
let angleControl;

let red1;
let red2;
let blue1;
let blue2;
let green1;
let green2;

class FlowField {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
  }

  draw() {
    push();
    noStroke();

    for (var i = 0; i < points.length; i++) {
      let red = map(points[i].x, 0, width, red1, red2);
      let green = map(points[i].y, 0, height, green1, green2);
      let blue = map(points[i].x, 0, width, blue1, blue2);

      fill(red, green, blue);

      let angle = map(
        noise(points[i].x * angleControl, points[i].y * angleControl),
        0,
        1,
        0,
        720
      );

      points[i].add(createVector(cos(angle), sin(angle)));

      let sizeEllipse = random(300);
      if (dist(width / 2, height / 2, points[i].x, points[i].y) < sizeEllipse) {
        ellipse(points[i].x, points[i].y, 1);
      }
    }
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(30);
  noiseDetail(1);
  angleMode(DEGREES);

  let density = 90;
  let space = width / density;

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      let p = createVector(x + random(-20, 10), y + random(-30, +5));
      points.push(p);
    }
  }

  red1 = random(255);
  red2 = random(255);
  green1 = random(255);
  green2 = random(255);
  blue1 = random(255);
  blue2 = random(255);

  angleControl = random(0.002, 0.05);
}

function generateFlowField(x, y) {
  for (let i = 0; i < 400; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const flowField = new FlowField(px, py);
    flowFields.push(flowField);
    flowField.draw();
  }
}

let flowFields = [];

function draw() {
  background(0, 0, 0);

  if (mouseIsPressed === true) {
    generateFlowField(mouseX, mouseY);
    const synth = new Tone.Synth();

    const feedbackDelay = new Tone.FeedbackDelay("16n", 0.9);
    synth.connect(feedbackDelay);
    feedbackDelay.toDestination();
  }
  // for (let flowField of flowFields) {
  //   flowField.draw();

  // if (flowFields.isDead()) {
  //   flowFields.splice(flowFields.indexOf(flowFields), 1);
  // }
  // }
}

function mouseClicked() {
  generateFlowField(mouseX, mouseY);
}
