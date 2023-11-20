class AudioManager {

  constructor() {
    this.timeStopSound = loadSound("assets/SFX_TimeStop.mp3");
    this.gameOverMusic = loadSound("assets/Music_FallenDown.mp3");
  }

  sfxTimeStop() {
    this.timeStopSound.play();
  }

  musicGameOver() {
    this.gameOverMusic.play();
  }

}