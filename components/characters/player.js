class Player extends Character {

  constructor(position, scale, stats, assets, score) {

    super(position, scale, stats, assets);

    // Player Score
    this.score = 0;

    // Timeout for shooting
    this.fireTimeout;

    // Player Speed Multiplier
    this.speedMult = 1;

    // Player Health History
    this.healthHistory = [5, 5, 5, 5, 5, 5, 5, 5, 5];

  }

  getHealthHistory() {
    return this.healthHistory;
  }

  // Update the player's health history
  updateHealthHistory() {
    let newHealth = this.health;
    this.healthHistory.shift();
    this.healthHistory.push(newHealth);
  }

  // Called by projectiles when colliding
  takeDamage(damage) {

    // If we're invincible
    if (this.isInvincible) return;

    // If we're already dead (お前はもう死んでいる)
    if (this.health <= 0) return;

    // Set our new health
    this.setHealth(this.health - damage);

    // Play the damage sond
    this.dmgSFX.play();

    // Start the red tint cycle
    this.tintCycle();

    console.log(`Sunbreak Starship was hit for [${damage}] damage!\n[${this.health}] Health Left!`);

    // Check to see if we're dead
    this.deathCheck();

  }

  setHealth(newHealth) {
    this.health = newHealth;
    healthBar.updateHealth(this.health);
  }

  addHealth(addedHealth) {
    this.health += addedHealth;
    healthBar.updateHealth(this.health);
  }

  getScore() {
    return this.score;
  }

  increaseScore(points) {
    this.score += points;
    scoreText.updateScore(this.score);
  }

  setSpeedMult(newMult) {
    this.speedMult = newMult;
  }

  movement() {
    // A - Move Left
    if (keyIsDown(65) && this.xPos > 80) this.xPos -= this.speed * this.speedMult;
    // D - Move Right
    if (keyIsDown(68) && this.xPos < width - 80) this.xPos += this.speed * this.speedMult;
    // W - Move Up
    if (keyIsDown(87) && this.yPos > 220) this.yPos -= this.speed * this.speedMult;
    // S - Move Down
    if (keyIsDown(83) && this.yPos < height - 80) this.yPos += this.speed * this.speedMult;
  }

  abilities() {

    // If we're dead
    if (this.health <= 0) return;

    // Spacebar to Fire
    if (keyCode == 32 && this.canFire) this.fire();

    // R to Rewind
    if (keyCode == 82 && gameManager.getCurrLevel().getCanRewind()) {
      gameManager.getCurrLevel().rewind();
    }

  }

  // Method called when shooting
  fire() {

    // Now we can't fire
    this.canFire = false;

    // Create a new player projectile
    new PlayerProjectile(
      {xPos : this.xPos, yPos : this.yPos}, // Position
      { // Scale
        width : 25 * this.projectileScaleMult,
        height : 25 * this.projectileScaleMult},
      { // Stats
        damage : this.projectileDamage,
        ySpeed : this.projectileSpeed,
      }, 
      {art : playerProjectileArt}, // Assets
      player, // Player
    );

    // this.fireSFX.play();

    // Timeout to reset when
    // we can fire again
    clearTimeout(this.fireTimeout);
    this.fireTimeout = setTimeout(() => {
      this.canFire = true;
    }, this.fireIntervalTime * this.fireIntervalTimeMult);

  }

  // Check to see if we're dead
  deathCheck() {

    // If we're dead
    if (this.health <= 0) {

      // this.deathSFX.play();

      console.log("Sunbreak Starship has been destroyed!");

      // Move the player outside the screen
      this.xPos = -100;
      this.yPos = -100;

      // Stop the level music
      gameManager.getCurrLevel().stopMusic();

      // Loop the game over music
      gameOverMusic.loop();

      // Disable player input
      canInput = false;

    }
  }

  // Logic to be run every frame in sketch.js
  logic() {

    // If we're dead
    if (this.health <= 0) return;

    this.movement();
    this.display();
    
  }

}