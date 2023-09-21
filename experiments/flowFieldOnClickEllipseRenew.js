let points = [];
let angleControl;

let fields = [];

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
  const fmSynth = new Tone.FMSynth();
  const delay = new Tone.FeedbackDelay("4n", 0.5);
  fmSynth.connect(delay);
  delay.toDestination();

  fmSynth.triggerAttackRelease("C1", "4n");
}

function flowField() {
  let density = 90;
  let distance = width / density;

  points.length = 0;
  background(30);

  for (var mouseX = 0; mouseX < width; mouseX += distance) {
    for (var mouseY = 0; mouseY < height; mouseY += distance) {
      let p = createVector(mouseX + random(-20, 10), mouseY + random(-30, +5));
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

  return points;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  noiseDetail(1);
  angleMode(DEGREES);
  background(30);
  // flowField();
}

function draw() {
  noStroke();

  //Mapping the colours and angle taken from Colourful Coding: How to make a flow field in p5.js | Coding Project #9
  //https://www.youtube.com/watch?v=1-QXuR-XX_s&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm&index=11

  for (let k = 0; k < fields.length; k++) {
    let points = fields[k].points;
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

      let sizeEllipse = random(150);
      if (
        dist(fields[k].x, fields[k].y, points[i].x, points[i].y) < sizeEllipse
      ) {
        ellipse(points[i].x, points[i].y, 1);
      }
    }
  }
}

function mousePressed() {
  noiseSeed(millis());
  flowField();
  fields = [];
  // ellipse(mouseX, mouseY, 50, 50);
  let obj = {
    x: mouseX,
    y: mouseY,
    points: flowField(),
  };
  fields.push(obj);
  soundTwo();
}
