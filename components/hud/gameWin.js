class GameWin extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  logic() {
    if (gameManager.getCurrLevelIdx() >= 
        gameManager.getLevelList().length) {
      this.display();
    } 
  }
  
}