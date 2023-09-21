let points = [];
let angleControl;

let red1;
let red2;
let blue1;
let blue2;
let green1;
let green2;

function soundOne() {
  const synth = new Tone.Synth();

  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.6);
  synth.connect(feedbackDelay);
  feedbackDelay.toDestination();

  synth.triggerAttackRelease("C3", "2n");
}

function soundTwo() {
  const polySynth = new Tone.PolySynth();
  const delay = new Tone.FeedbackDelay("8n", 0.8);
  polySynth.connect(delay);
  delay.toDestination();

  polySynth.triggerAttackRelease(["D2","A3", "F4"], "2n");
}

function flowField() {
  let density = 90;
  let distance = width / density;

  points == null;

  for (var x = 0; x < width; x += distance) {
    for (var y = 0; y < height; y += distance) {
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

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  noiseDetail(1);
  angleMode(DEGREES);

  flowField();
}

function draw() {
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

    ellipse(points[i].x, points[i].y, 1);
  }
}

function mousePressed() {
  // ellipse(mouseX, mouseY, 50, 50);
  flowField();
  soundTwo();
  // prevent default
  return false;
}
