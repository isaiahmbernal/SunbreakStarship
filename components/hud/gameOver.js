class GameOver extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  // Logic to be run every frame in sketch.js
  logic() {
    // If the player is dead
    if (player.getHealth() <= 0) this.display();
  }
  
}