class Clock {

  constructor(position, gameManager) {

    // Position
    this.xPos = position.xPos;
    this.yPos = position.yPos;

    // Tracked Game Manager
    this.gameManager = gameManager;

  }

  display() {
    imageMode(CENTER);

    // If we're not allowed to use the rewind
    // ability, make the clock transparent
    if (this.gameManager.getCurrLevel() != null 
        && !this.gameManager.getCurrLevel().getCanRewind()) {
      tint(255, 255, 255, 100);
      image(clockArt, this.xPos, this.yPos, 50, 50);
      tint("white");
    } else {
      image(clockArt, this.xPos, this.yPos, 50, 50);
    }
    
  }

  // Logic to run every frame in sketch.js
  logic() {
    this.display();
  }
}