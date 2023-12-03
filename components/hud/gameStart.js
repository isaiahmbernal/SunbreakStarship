class GameStart extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  // Logic to be run every frame in sketch.js
  logic() {
    // If the game hasn't started
    if (!startGame) this.display();
  }
  
}