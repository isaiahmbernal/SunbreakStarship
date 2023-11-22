class GameManager {

  constructor() {

    this.levelLoadTimeout;
    this.levelLoadTime = 2000; // ms
    this.levelList = [];
    this.currLevelIdx = 0;

    // Level One
    let levelOne = new Level(this, "Level One", levelOneSong);
    levelOne.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        1, // Direction
        1, // Points
        levelOne, // Level
      )
    );

    // Level Two
    let levelTwo = new Level(this, "Level Two", levelTwoSong);
    levelTwo.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        1, // Direction
        1, // Points
        levelTwo, // Level
      )
    );
    levelTwo.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        -1, // Direction
        1, // Points
        levelTwo, // Level
      )
    );

    // Level Three
    let levelThree = new Level(this, "Level Three", levelThreeSong);
    levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        1, // Direction
        1, // Points
        levelThree, // Level
      )
    );
    levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 260 / 3, height : 210 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 300
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        -1, // Direction
        1, // Points
        levelThree, // Level
      )
    );
    levelThree.addEnemy(
      new AlienBasic(
        {xPos : width / 2, yPos : height / 13}, // Position
        {width : 260 / 2, height : 210 / 2}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          fireIntervalTime : 600
        }, 
        { // Assets
          charArt : alienBasicArt, 
          // fireSFX : "",
          // dmgSFX: "",
          // deathSFX : ""
        }, 
        0, // Direction
        1, // Points
        levelThree, // Level
      )
    );

    this.levelList.push(levelOne, levelTwo, levelThree);
    this.currLevel = this.levelList[this.currLevelIdx];

    // setTimeout(() => {
    //   this.currLevel.playMusic();
    // }, 2000);

  }

  getCurrLevel() {
    return this.currLevel;
  }

  loadNextLevel() {

    this.currLevelIdx += 1;

    if (this.currLevelIdx >= this.levelList.length) {
      console.log(`All Levels Complete\nYou Win!`);
      return;
    }
    
    clearTimeout(this.levelLoadTimeout);
    console.log(`Loading ${this.levelList[this.currLevelIdx].getName()}`);
    this.levelLoadTimeout = setTimeout(() => {
      this.currLevel.stopMusic();
      this.currLevel = this.levelList[this.currLevelIdx];
      this.currLevel.playMusic();
    }, this.levelLoadTime);
  }

  logic() {
    this.currLevel.logic();
  }

}

