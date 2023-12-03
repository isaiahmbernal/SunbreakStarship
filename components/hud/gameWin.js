class GameWin extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  // Logic to be run every frame in sketch.js
  logic() {
    // If we've exceeded all the levels
    if (gameManager.getCurrLevelIdx() >= 
        gameManager.getLevelList().length) {
      this.display();
    } 
  }
  
}