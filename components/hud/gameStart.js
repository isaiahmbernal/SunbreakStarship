class GameStart extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  logic() {
    if (!startGame) this.display();
  }
  
}