class GameManager {

  constructor(levelLoadSong, levelLoadSound) {

    // Sound
    this.levelLoadSong = levelLoadSong;
    this.levelLoadSound = levelLoadSound;

    // Timeout for loading levels
    this.levelLoadTimeout;

    // Check if we're loading a level
    this.loadingLevel = false; 

    // If we should be running
    // the current level logic
    this.runLevelLogic = false;

    // List of levels
    this.levelList = [];

    // The index of our current level
    this.currLevelIdx = -1;

    // Level One (4600, 4600)
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
          charArt : alienBasicGreenArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        1, // Direction
        1, // Points
        this.levelOne, // Level
      )
    );

    // Level Two (7000, 4500)
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
          charArt : alienBasicGreenArt, 
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
          charArt : alienBasicGreenArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        -1, // Direction
        1, // Points
        this.levelTwo, // Level
      )
    );

    // Level Three (5000, 4000)
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
          charArt : alienBasicGreenArt, 
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
          charArt : alienBasicGreenArt, 
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
          charArt : alienBasicBlueArt, 
          // fireSFX : "",
          dmgSFX: alienBasicDmgSFX,
          deathSFX : alienBasicDeathSFX
        }, 
        0, // Direction
        1, // Points
        this.levelThree, // Level
        // color(255, 50, 255), // Tint
      )
    );

    // Level Four (7000, 4500)
    this.levelFour = new Level(this, "Level Four", levelFourSong, 7000, 4500);
    this.levelFour.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 560 / 3, height : 260 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 400
        },
        { // Assets
          charArt : robotBasicGrayArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        1, // Direction
        1, // Points
        this.levelFour, // Level
      )
    );

    // Level Five (7000, 4500)
    this.levelFive = new Level(this, "Level Five", levelFiveSong, 7000, 4500);
    this.levelFive.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 560 / 3, height : 260 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 400
        },
        { // Assets
          charArt : robotBasicGrayArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        1, // Direction
        1, // Points
        this.levelFive, // Level
      )
    );
    this.levelFive.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 560 / 3, height : 260 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 400
        },
        { // Assets
          charArt : robotBasicGrayArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        -1, // Direction
        1, // Points
        this.levelFive, // Level
      )
    );

    // Level Six (7000, 4500)
    this.levelSix = new Level(this, "Level Six", levelSixSong, 7000, 4500);
    this.levelSix.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 560 / 3, height : 260 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 400
        },
        { // Assets
          charArt : robotBasicGrayArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        1, // Direction
        1, // Points
        this.levelSix, // Level
      )
    );
    this.levelSix.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 5}, // Position
        {width : 560 / 3, height : 260 / 3}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 1,
          fireIntervalTime : 400
        },
        { // Assets
          charArt : robotBasicGrayArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        -1, // Direction
        1, // Points
        this.levelSix, // Level
      )
    );
    this.levelSix.addEnemy(
      new RobotBasic(
        {xPos : width / 2, yPos : height / 13}, // Position
        {width : 560 / 2, height : 260 / 2}, // Scale
        { // Stats
          health : 10,
          speed : 5,
          projectileSpeed : 5,
          projectileDamage : 1,
          projectileScaleMult : 3,
          fireIntervalTime : 1500
        }, 
        
        { // Assets
          charArt : robotBasicWhiteArt, 
          // fireSFX : "",
          dmgSFX: robotBasicDmgSFX,
          deathSFX : robotBasicDeathSFX
        },
        0, // Direction
        1, // Points
        this.levelSix, // Level
      )
    );

  }

  // Method run when game starts
  startGame() {

    // Add all levels to the level list
    this.levelList.push(
      this.levelOne,
      this.levelTwo,
      this.levelThree,
      this.levelFour,
      this.levelFive,
      this.levelSix,
    );

    // Load the next level (Level One)
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

  // Load the next level 
  // in the level list
  loadNextLevel() {

    // Loading level is true
    this.loadingLevel = true;

    // Increase our current level index
    this.currLevelIdx += 1;

    // Play the corresponding sounds
    this.levelLoadSound.play();
    this.levelLoadSong.play();

    // Delete every projectile
    projectiles.forEach((projectile) => {
      if (projectile instanceof EnemyProjectile) {
        projectiles.delete(projectile.getId());
      }
    });

    // If we've exceeded the
    // level list, we win
    if (this.currLevelIdx >= this.levelList.length) {
      console.log(`All Levels Complete\nYou Win!`);
      return;
    }

    // Throw the player a bone
    player.addHealth(1);
    
    // Stop running level logic
    this.runLevelLogic = false;

    console.log(`Loading ${this.levelList[this.currLevelIdx].getName()}`);
    
    // Timeout for loading the next level
    clearTimeout(this.levelLoadTimeout);
    this.levelLoadTimeout = setTimeout(() => {

      // Set the current level
      // to the next in the list
      this.currLevel = this.levelList[this.currLevelIdx];

      // Start running the level logic
      this.runLevelLogic = true;

      // Stop loading level
      this.loadingLevel = false;

      console.log(`Loaded ${this.levelList[this.currLevelIdx].getName()}`);

      // Timeout for when battle should start
      setTimeout(() => {
        this.levelLoadSong.pause();
        this.currLevel.engageBattle()
      }, this.currLevel.getTimeBeforeBattle());

    }, this.levelList[this.currLevelIdx].getLoadTime());
  }

  // Logic to be run every frame in sketch.js
  logic() {
    if (this.runLevelLogic) this.currLevel.logic();
  }

}

