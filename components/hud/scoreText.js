class ScoreText {

  constructor(position, player) {

    // Position
    this.xPos = position.xPos;
    this.yPos = position.yPos;

    // Tracked Player
    this.player = player;
    this.score = 0;

    // Visual Update Effects
    this.highlight = false;
    this.sizeMult = 1;
    this.sizeMultTimeout;
    this.sizeMultTime = 150; // ms

  }

  // Update the score
  updateScore(newScore) {

    // Set the new score
    this.score = newScore;

    // Increase the size
    // multiplier of the score text
    this.sizeMult = 1.2;

    // Highlight text is true
    this.highlight = true;

    // Reset the size multiplier and
    // text highlighting after timeout
    clearTimeout(this.sizeMultTimeout);
    this.sizeMultTimeout = setTimeout(() => {
      this.sizeMult = 1;
      this.highlight = false;
    }, this.sizeMultTime);

  }

  display() {
    // If highlight is true, set
    // the text color to green
    if (this.highlight) fill(0, 255, 0);
    else fill("white");
    textAlign(CENTER, CENTER);
    textSize(16 * this.sizeMult);
    text(`SCORE: ${this.score}`, this.xPos, this.yPos);
  }

  // Logic to run every frame in sketch.js
  logic() {
    this.display();
  }

}