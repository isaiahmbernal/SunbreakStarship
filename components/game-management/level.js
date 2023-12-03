class Level {

  constructor(gameManager, name, music, loadTime, timeBeforeBattle) {

    // Parent Game Manager
    this.gameManager = gameManager;

    // Name of the level
    this.name = name;

    // Attached music to be 
    // played in the level
    this.music = music;

    // Map of enemy objects
    this.enemyMap = new Map();

    // Time to load the level
    this.loadTime = loadTime;

    // Time before battle is started
    this.timeBeforeBattle = timeBeforeBattle // ms

    // Whether we're in battle
    this.inBattle = false;

    // Rewind Ability
    this.canRewind = true;
    this.isRewinding = false;
    this.rewindInterval;
    this.rewindIdx = 8;
    this.rewindJumpTime = 980; // ms
    this.rewindCircleSize = 0;

    // Interval to update all entity states
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
    // console.log(`${this.name}: Play Music`);
    this.music.loop();
  }

  stopMusic() {
    this.music.stop();
    // console.log("Stop Music");
  }

  getEnemyMap() {
    return this.enemyMap;
  }

  // Add enemy to the enemy map
  addEnemy(enemy) {
    let id = Math.floor(Math.random() * 1000);
    while (this.enemyMap.has(id)) {
      id = Math.floor(Math.random() * 1000);
    }
    this.enemyMap.set(id, enemy);
    enemy.setId(id);
  }

  // Delete enemy from the enemy map
  deleteEnemy(id) {
    this.enemyMap.delete(id);
    console.log(`${this.name}: ${this.enemyMap.size} Enemies Left`);
    if (this.enemyMap.size == 0) this.levelComplete();
  }

  // Start the battle
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

  // Update states of all entities
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

  // Initiates the rewind ability
  rewind() {

    console.log("Za Warudo");

    // Make sure to update these
    this.canRewind = false;
    this.isRewinding = true;

    // Lower the player's speed by 50%
    player.setSpeedMult(.5);

    // Play the rewind SFX and pause music
    rewindSFX.play();
    this.music.pause();

    // After 4.5 seconds, start the rewind logic
    clearInterval(this.rewindInterval);
    setTimeout(() => {

      // Create an interval that runs
      // the rewind logic
      this.rewindInterval = setInterval(() => {
        this.rewindLogic();
      }, this.rewindJumpTime);

    }, 4500);
    
  }

  // Logic that actually handles
  // the rewind position updates, etc.
  rewindLogic() {
    
    // If we've finished rewinding
    if (this.rewindIdx == -1) {

      // Stop the rewind interval
      clearInterval(this.rewindInterval);

      // Reset the rewind index
      this.rewindIdx = 8;

      // Reset isRewinding
      this.isRewinding = false;

      // Reset the player's speed
      player.setSpeedMult(1);

      // Play the level music
      this.music.play();

      return;

    }

    // For every projectile in the scene
    projectiles.forEach((projectile) => {

      // Get the projectile's position history
      let positionList = projectile.getPositionList();

      // Get the the previous
      // position of the projectile
      let newXPos = positionList[this.rewindIdx].xPos;
      let newYPos = positionList[this.rewindIdx].yPos;

      // If the projectile's yPos is where it
      // started, delete the projectile
      if (newYPos == projectile.getStartingYPos()) {
        projectiles.delete(projectile.getId());
        return;
      }

      // Set the new position
      // of the projectile
      projectile.setPosition(newXPos, newYPos);
    
    });

    // For every enemy in this level
    this.enemyMap.forEach((enemy) => {

      // Get the enemy's position history
      let positionList = enemy.getPositionList();

      // Get the previous position
      let newXPos = positionList[this.rewindIdx].xPos;
      let newYPos = positionList[this.rewindIdx].yPos;

      // Set the new position
      enemy.setPosition(newXPos, newYPos);

    });

    // Get the player's health history (non-medical)
    let playerHealthHistory = player.getHealthHistory();

    // Set the player's health
    player.setHealth(playerHealthHistory[this.rewindIdx]);

    // Decrement our current rewind index
    this.rewindIdx -= 1;

  }

  // When all enemies are defeated
  levelComplete() {

    // End battle
    this.inBattle = false;

    // Stop the level music
    this.stopMusic();

    console.log(`${this.name}: All Enemies Defeated`);

    // Tell the game manager
    // to load the next level
    gameManager.loadNextLevel();

  }

  // Logic to be run every frame in sketch.js
  logic() {

    // Run the logic of every
    // enemy in the enemy map
    this.enemyMap.forEach((enemy) => {enemy.logic();});

    // If we're rewinding, create a
    // circle originating from the player
    // and set all rendering to grayscale
    if (this.isRewinding) {

      fill(0, 0, 0, 50);
      stroke(255);
      circle(player.getPosition().xPos, player.getPosition().yPos, this.rewindCircleSize);
      fill("white");
      noStroke();
      filter(GRAY);
      
      // Increase the size of the circle
      this.rewindCircleSize += 150;

    } 
    
    // Else, reset the size of the circle
    else this.rewindCircleSize = 0;

  }
  
}