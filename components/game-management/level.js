class Level {

  constructor(gameManager, name, music, loadTime, timeBeforeBattle) {

    this.gameManager = gameManager;
    this.name = name;
    this.music = music;
    this.enemyMap = new Map();
    this.inBattle = false;
    this.loadTime = loadTime;
    this.timeBeforeBattle = timeBeforeBattle // ms

    this.canRewind = true;
    this.isRewinding = false;
    this.rewindInterval;
    this.rewindIdx = 8;
    this.rewindJumpTime = 980; // ms
    this.rewindCircleSize = 0;

    this.timeBetweenUpdates = 500; // ms
    this.positionUpdateInterval = setInterval(() => {
      this.updateEntityStates();
    }, this.timeBetweenUpdates);

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
    console.log("Stop Music");
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

  getCanRewind() {
    return this.canRewind;
  }

  getIsRewinding() {
    return this.isRewinding;
  }

  updateEntityStates() {
    if (!this.inBattle || this.isRewinding) return;
    projectiles.forEach((projectile) => {
      projectile.updatePositionList();
    });
    this.enemyMap.forEach((enemy) => {
      enemy.updatePositionList();
    });
    player.updateHealthHistory();
  }

  rewind() {

    console.log("Za Warudo");

    this.canRewind = false;
    this.isRewinding = true;
    player.setSpeedMult(.5);

    rewindSFX.play();
    this.music.pause();

    clearInterval(this.rewindInterval);
    setTimeout(() => {
      this.rewindInterval = setInterval(() => {
        this.rewindLogic();
      }, this.rewindJumpTime);
    }, 4500);
    
  }

  rewindLogic() {
    
    if (this.rewindIdx == -1) {
      clearInterval(this.rewindInterval);
      this.rewindIdx = 4;
      this.isRewinding = false;
      player.setSpeedMult(1);
      this.music.play();
      return;
    }

    projectiles.forEach((projectile) => {
      let positionList = projectile.getPositionList();
      let newXPos = positionList[this.rewindIdx].xPos;
      let newYPos = positionList[this.rewindIdx].yPos;
      if (newYPos == projectile.getStartingYPos()) {
        projectiles.delete(projectile.getId());
        return;
      }
      projectile.setPosition(newXPos, newYPos);
      // let printString = "";
      // projectile.getPositionList().forEach((position) => {
      //   printString += `{xPos : ${position.xPos}, yPos : ${position.yPos}}, `;
      // });
      // console.log(`Projectile [${projectile.getId()}]: ${printString}`);
    });

    this.enemyMap.forEach((enemy) => {
      let positionList = enemy.getPositionList();
      let newXPos = positionList[this.rewindIdx].xPos;
      let newYPos = positionList[this.rewindIdx].yPos;
      enemy.setPosition(newXPos, newYPos);
    });

    let playerHealthHistory = player.getHealthHistory();
    player.setHealth(playerHealthHistory[this.rewindIdx]);

    this.rewindIdx -= 1;

  }

  levelComplete() {
    this.inBattle = false;
    this.stopMusic();
    console.log(`${this.name}: All Enemies Defeated`);
    gameManager.loadNextLevel();
  }

  logic() {
    this.enemyMap.forEach((enemy) => {enemy.logic();});
    if (this.isRewinding) {
      fill(0, 0, 0, 50);
      stroke(255);
      circle(player.getPosition().xPos, player.getPosition().yPos, this.rewindCircleSize);
      fill("white");
      noStroke();
      // colorMode(HSB, 360, 0, 50);
      filter(GRAY);
      this.rewindCircleSize += 150;
    } else {
      this.rewindCircleSize = 0;
    }
  }
  
}