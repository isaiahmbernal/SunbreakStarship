class HealthBar {

  constructor({xPos, yPos, ship}={}) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ship = ship;
    this.heartArt = loadImage("assets/HUD_Heart.png");
  }

  display() {
    imageMode(CENTER);
    let currPos = 0
    for (let i = 0; i < this.ship.getHealth(); i++) {
      image(this.heartArt, this.xPos + currPos, this.yPos, 25, 25);
      currPos += 35;
    }
  }

  logic() {
    this.display();
  }

}

class Score {

  constructor() {
    this.points = 0;
  }

  addPoints(newPoints) {
    this.points += newPoints;
  }

  display() {
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(`SCORE: ${this.points}`, width - 70, height - 25);
  }

  logic() {
    this.display();
  }

}

class Overlay {

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
    if (ship.getHealth() <= 0) this.display();
    // this.display();
  }
}