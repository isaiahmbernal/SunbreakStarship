class GameManager {

  constructor(levelLoadSong, levelLoadSound) {

    this.levelLoadSong = levelLoadSong;
    this.levelLoadSound = levelLoadSound;

    this.levelLoadTimeout;

    this.loadingLevel = false; // Used to render lines

    this.runLevelLogic = false;

    this.levelList = [];
    this.currLevelIdx = -1;

    // Level One
    this.levelOne = new Level(this, "Level One", levelOneSong, 4600, 4600);
    this.levelOne.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 350
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        1, // Direction
        1, // Points
        this.levelOne, // Level
      )
    );

    // Level Two
    this.levelTwo = new Level(this, "Level Two", levelTwoSong, 7000, 4500);
    this.levelTwo.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 350
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        1, // Direction
        1, // Points
        this.levelTwo, // Level
      )
    );
    this.levelTwo.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 350
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        -1, // Direction
        1, // Points
        this.levelTwo, // Level
      )
    );

    // Level Three
    this.levelThree = new Level(this, "Level Three", levelThreeSong, 5000, 4000);
    this.levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        1, // Direction
        1, // Points
        this.levelThree, // Level
      )
    );
    this.levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        -1, // Direction
        1, // Points
        this.levelThree, // Level
      )
    );
    this.levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 13}, // Position
        {width : 260 / 2, height : 210 / 2}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 4,
          fireIntervalTime : 1500
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        0, // Direction
        1, // Points
        this.levelThree, // Level
        color(255, 50, 255), // Tint
      )
    );

  }

  startGame() {
    this.levelList.push(this.levelOne, this.levelTwo, this.levelThree);
    this.loadNextLevel();
  }

  getLevelList() {
    return this.levelList;
  }

  getCurrLevelIdx() {
    return this.currLevelIdx;
  }

  getCurrLevel() {
    return this.currLevel;
  }

  getLoadingLevel() {
    return this.loadingLevel;
  }

  loadNextLevel() {

    this.loadingLevel = true;

    this.currLevelIdx += 1;

    this.levelLoadSound.play();
    this.levelLoadSong.play();

    projectiles.forEach((projectile) => {
      if (projectile instanceof EnemyProjectile) {
        projectiles.delete(projectile.getId());
      }
    });

    if (this.currLevelIdx >= this.levelList.length) {
      console.log(`All Levels Complete\nYou Win!`);
      return;
    }
    
    this.runLevelLogic = false;
    console.log(`Loading ${this.levelList[this.currLevelIdx].getName()}`);
    
    clearTimeout(this.levelLoadTimeout);
    this.levelLoadTimeout = setTimeout(() => {
      this.currLevel = this.levelList[this.currLevelIdx];
      this.runLevelLogic = true;
      this.loadingLevel = false;
      console.log(`Loaded ${this.levelList[this.currLevelIdx].getName()}`);
      setTimeout(() => {
        this.levelLoadSong.pause();
        this.currLevel.engageBattle()
      }, this.currLevel.getTimeBeforeBattle());
    }, this.levelList[this.currLevelIdx].getLoadTime());
  }

  logic() {
    if (this.runLevelLogic) this.currLevel.logic();
  }

}

