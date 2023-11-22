class GameManager {

  constructor() {

    this.levelLoadTimeout;
    this.levelLoadTime = 2000;
    
    this.level1Enemies = new Map();
    this.level1Enemies.set("Level Name", "Level One");

    this.level2Enemies = new Map();
    this.level2Enemies.set("Level Name", "Level Two");

    this.enemyMaps = [
      this.level1Enemies,
      this.level2Enemies
    ];

    this.currentEnemyMapIdx = 0;
    this.currentEnemyMap = this.enemyMaps[this.currentEnemyMapIdx];

    for (let i = 0; i < 2; i++) {
      let enemyDirection;
      i % 2 == 1 ? enemyDirection = 1 : enemyDirection = -1;
      new AlienBasic({
        xPos : width / 2,
        yPos : height / 5,
        width : 260 / 3,
        height : 210 / 3,
        health : 5,
        speed : 5,
        projectileSpeed : 5,
        fireIntervalTime : 400,
        direction : enemyDirection,
        assetLocation : "assets/Alien_01_Alive.gif",
        enemyMap : this.level1Enemies,
      });
    }
    
    for (let i = 0; i < 2; i++) {
      let enemyDirection;
      i % 2 == 1 ? enemyDirection = 1 : enemyDirection = -1;
      new AlienBasic({
        xPos : width / 2,
        yPos : height / 5,
        width : 260 / 3,
        height : 210 / 3,
        health : 5,
        speed : 5,
        projectileSpeed : 10,
        fireIntervalTime : 400,
        direction : enemyDirection,
        assetLocation : "assets/Alien_01_Alive.gif",
        enemyMap : this.level2Enemies,
      });
    }

    new AlienBasic({
      xPos : width / 2,
      yPos : height / 12,
      width : 260 / 2,
      height : 210 / 2,
      health : 10,
      speed : 5,
      projectileSpeed : 10,
      fireIntervalTime : 800,
      direction : 0,
      assetLocation : "assets/Alien_01_Alive.gif",
      enemyMap : this.level2Enemies,
    });

  }

  getCurrentEnemyMap() {
    return this.currentEnemyMap;
  }

  deleteEnemy(id) {
    this.currentEnemyMap.delete(id);
    console.log(`${this.currentEnemyMap.get("Level Name")}: ${this.currentEnemyMap.size - 1} Enemies Left`);
    if (this.currentEnemyMap.size == 1) {
      console.log(`${this.currentEnemyMap.get("Level Name")}: All Enemies Dead`);
      this.currentEnemyMapIdx += 1;
      if (this.currentEnemyMapIdx >= this.enemyMaps.length) {
        console.log("You Win!");
        return;
      }
      console.log(`Moving To: ${this.enemyMaps[this.currentEnemyMapIdx].get("Level Name")}`);
      clearTimeout(this.levelLoadTimeout);
      this.levelLoadTimeout = setTimeout(() => {
        this.loadNextLevel();
      }, this.levelLoadTime);
    }
  }

  loadNextLevel() {
    this.currentEnemyMap = this.enemyMaps[this.currentEnemyMapIdx];
  }

  logic() {
    this.currentEnemyMap.forEach((enemy, id) => {
      if (!(enemy instanceof Enemy)) return;
      enemy.logic();
    });
  }

}