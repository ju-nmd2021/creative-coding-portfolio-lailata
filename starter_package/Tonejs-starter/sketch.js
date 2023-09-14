// function setup() {
//   createCanvas(innerWidth, innerHeight);
// }

// function draw() {}

const button = document.getElementById("btn-play");
const synth = new Tone.Synth();

const feedbackDelay = new Tone.FeedbackDelay("16n", 0.9);
synth.connect(feedbackDelay);
feedbackDelay.toDestination();

button.addEventListener("click", () => {
  if (Tone.context.state != "running") {
    Tone.start();
  }
  synth.triggerAttackRelease("C3", "2n");
});


