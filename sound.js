class AudioManager {

  constructor() {
    this.level1Music = loadSound("assets/Music_EnemyApproaching.mp3");
    this.level2Music = loadSound("assets/Music_StrongerMonsters.mp3");
    this.timeStopSound = loadSound("assets/SFX_TimeStop.mp3");
    this.gameOverMusic = loadSound("assets/Music_FallenDown.mp3");
  }

  sfxTimeStop() {
    this.timeStopSound.play();
  }

  musicLevelOne() {
    this.level1Music.loop();
  }

  musicLevelTwo() {
    this.level2Music.loop();
  }

  musicGameOver() {
    this.gameOverMusic.play();
  }

  stopAllMusic() {
    this.level1Music.stop();
    this.level2Music.stop();
    this.gameOverMusic.stop();
  }

}