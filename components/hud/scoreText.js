class ScoreText {

  constructor(position, player) {
    this.xPos = position.xPos;
    this.yPos = position.yPos;
    this.player = player;
    this.score = 0;

    this.highlight = false;
    this.sizeMult = 1;
    this.sizeMultTimeout;
    this.sizeMultTime = 150; // ms
  }

  updateScore(newScore) {
    this.score = newScore;
    this.sizeMult = 1.2;
    this.highlight = true;
    clearTimeout(this.sizeMultTimeout);
    this.sizeMultTimeout = setTimeout(() => {
      this.sizeMult = 1;
      this.highlight = false;
    }, this.sizeMultTime);
  }

  display() {
    if (this.highlight) fill(0, 255, 0);
    else fill("white");
    textAlign(CENTER, CENTER);
    textSize(16 * this.sizeMult);
    text(`SCORE: ${this.score}`, this.xPos, this.yPos);
  }

  logic() {
    this.display();
  }

}