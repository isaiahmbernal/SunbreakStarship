class HealthBar {

  constructor(position, player) {
    this.xPos = position.xPos;
    this.yPos = position.yPos;
    this.player = player;
  }

  display() {
    imageMode(CENTER);
    let currPos = 0
    for (let i = 0; i < this.player.getHealth(); i++) {
      image(heartArt, this.xPos + currPos, this.yPos, 25, 25);
      currPos += 35;
    }
  }

  logic() {
    this.display();
  }

}