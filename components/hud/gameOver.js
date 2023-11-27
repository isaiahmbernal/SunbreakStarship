class GameOver extends ScreenOverlay {

  constructor(overlayText) {
    super(overlayText);
  }

  logic() {
    if (player.getHealth() <= 0) this.display();
  }
  
}