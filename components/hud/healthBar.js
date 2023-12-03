class HealthBar {

  constructor(position, player) {

    // Position
    this.xPos = position.xPos;
    this.yPos = position.yPos;

    // Tracked Player
    this.player = player;
    this.health = player.getHealth();

    // Visual Update Effects
    this.updateTimeout;
    this.updateTime = 100; // ms
    this.updated = false;

  }

  // Update the health
  updateHealth(newHealth) {

    // Set the new health
    this.health = newHealth;

    // Set updated to true
    this.updated = true;

    // Reset the visual update 
    // effects after the timeout
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => {
      this.updated = false;
    }, this.updateTime);

  }

  display() {

    imageMode(CENTER);

    // Display every heart in a row
    let currPos = 0
    for (let i = 0; i < this.health; i++) {
      // If the health is being updated, visually
      // pop up the last health in the row
      if (i == this.health - 1 && this.updated == true) {
        image(heartArt, this.xPos + currPos, this.yPos - 10, 25, 25);  
      } else {
        image(heartArt, this.xPos + currPos, this.yPos, 25, 25);
      }
      currPos += 35;
    }
  }

  // Logic to be run every frame in sketch.js
  logic() {
    this.display();
  }

}