class Clock {

  constructor(position, gameManager) {
    this.xPos = position.xPos;
    this.yPos = position.yPos;
    this.gameManager = gameManager;
  }

  display() {
    imageMode(CENTER);
    if (this.gameManager.getCurrLevel() != null 
        && !this.gameManager.getCurrLevel().getCanRewind()) {
      tint(255, 255, 255, 100);
      image(clockArt, this.xPos, this.yPos, 50, 50);
      tint("white");
    } else {
      image(clockArt, this.xPos, this.yPos, 50, 50);
    }
    
  }

  logic() {
    this.display();
  }
}