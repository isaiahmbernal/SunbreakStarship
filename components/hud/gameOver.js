class GameOver {

  constructor() {}

  display() {
    rectMode(CENTER);
    fill(0, 0, 0, 150);
    rect(width / 2, height / 2, width, height);

    fill("white");
    textAlign(CENTER, CENTER);
    textSize(16);
    text("GAME OVER", width / 2, height / 2);
  }

  logic() {
    if (player.getHealth() <= 0) this.display();
  }
}