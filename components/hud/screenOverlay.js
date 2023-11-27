class ScreenOverlay {

  constructor(overlayText) {
    this.overlayText = overlayText;
  }

  display() {
    rectMode(CENTER);
    fill(0, 0, 0, 150);
    rect(width / 2, height / 2, width, height);

    fill("white");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(`${this.overlayText}`, width / 2, height / 2);
  }

}