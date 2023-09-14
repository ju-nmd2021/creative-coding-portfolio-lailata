let button;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(34, 39, 46);
  button = createButton("Play");
  button.position(width / 2, height / 2);
  button.mousePressed(playTone);
}

function playTone() {
  const synth = new Tone.Synth();

  const feedbackDelay = new Tone.FeedbackDelay("16n", 0.9);
  synth.connect(feedbackDelay);
  feedbackDelay.toDestination();
}

// button.addEventListener("click", () => {
//   if (Tone.context.state != "running") {
//     Tone.start();
//   }
//   synth.triggerAttackRelease("C2", "2n");
// });
