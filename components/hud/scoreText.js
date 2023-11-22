class ScoreText {

  constructor(position, player) {
    this.xPos = position.xPos;
    this.yPos = position.yPos;
    this.player = player;
  }

  display() {
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(`SCORE: ${this.player.getScore()}`, this.xPos, this.yPos);
  }

  logic() {
    this.display();
  }

}