class HealthBar {

  constructor(position, player) {
    this.xPos = position.xPos;
    this.yPos = position.yPos;
    this.player = player;
    this.health = player.getHealth();

    this.damageTimeout;
    this.damageTime = 100; // ms
    this.damaged = false;
  }

  updateHealthBar(newHealth) {
    this.health = newHealth;
    this.damaged = true;
    clearTimeout(this.damageTimeout);
    this.damageTimeout = setTimeout(() => {
      this.damaged = false;
    }, this.damageTime);
  }

  display() {
    imageMode(CENTER);
    let currPos = 0
    for (let i = 0; i < this.health; i++) {
      if (i == this.health - 1 && this.damaged == true) {
        image(heartArt, this.xPos + currPos, this.yPos - 10, 25, 25);  
      } else {
        image(heartArt, this.xPos + currPos, this.yPos, 25, 25);
      }
      currPos += 35;
    }
  }

  logic() {
    this.display();
  }

}