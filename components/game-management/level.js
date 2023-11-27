class Level {

  constructor(gameManager, name, music, loadTime, timeBeforeBattle) {
    this.gameManager = gameManager;
    this.name = name;
    this.music = music;
    this.enemyMap = new Map();
    this.inBattle = false;
    this.loadTime = loadTime;
    this.timeBeforeBattle = timeBeforeBattle // ms
  }

  getName() {
    return this.name;
  }

  getLoadTime() {
    return this.loadTime;
  }

  getInBattle() {
    return this.inBattle;
  }

  getTimeBeforeBattle() {
    return this.timeBeforeBattle;
  }

  playMusic() {
    console.log(`${this.name}: Play Music`);
    this.music.loop();
    // console.log(this.music.isPlaying());
  }

  stopMusic() {
    this.music.stop();
  }

  getEnemyMap() {
    return this.enemyMap;
  }

  addEnemy(enemy) {
    let id = Math.floor(Math.random() * 1000);
    while (this.enemyMap.has(id)) {
      id = Math.floor(Math.random() * 1000);
    }
    this.enemyMap.set(id, enemy);
    enemy.setId(id);
  }

  deleteEnemy(id) {
    this.enemyMap.delete(id);
    console.log(`${this.name}: ${this.enemyMap.size} Enemies Left`);
    if (this.enemyMap.size == 0) this.levelComplete();
  }

  engageBattle() {
    this.inBattle = true;
    this.enemyMap.forEach((enemy) => {enemy.setInBattle(true);});
    this.playMusic();
  }

  levelComplete() {
    this.inBattle = false;
    this.stopMusic();
    console.log(`${this.name}: All Enemies Defeated`);
    gameManager.loadNextLevel();
  }

  logic() {
    this.enemyMap.forEach((enemy) => {enemy.logic();});
  }
  
}