class Player extends Character {

  constructor(position, scale, stats, assets, score) {
    super(position, scale, stats, assets);
    this.score = 0;
    this.fireTimeout;
    this.speedMult = 1;

    this.healthHistory = [5, 5, 5, 5, 5, 5, 5, 5, 5];
  }

  getHealthHistory() {
    return this.healthHistory;
  }

  updateHealthHistory() {
    let newHealth = this.health;
    this.healthHistory.shift();
    this.healthHistory.push(newHealth);
  }

  setHealth(newHealth) {
    this.health = newHealth;
  }

  addHealth(addedHealth) {
    this.health += addedHealth;
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
    // A
    if (keyIsDown(65) && this.xPos > 80) this.xPos -= this.speed * this.speedMult;
    // D
    if (keyIsDown(68) && this.xPos < width - 80) this.xPos += this.speed * this.speedMult;
    // W
    if (keyIsDown(87) && this.yPos > 220) this.yPos -= this.speed * this.speedMult;
    // S
    if (keyIsDown(83) && this.yPos < height - 80) this.yPos += this.speed * this.speedMult;
  }

  abilities() {
    if (this.health <= 0) return;
    // Spacebar
    if (keyCode == 32 && this.canFire) this.fire();
    if (keyCode == 82 && gameManager.getCurrLevel().getCanRewind()) gameManager.getCurrLevel().rewind();
  }

  fire() {

    this.canFire = false;

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

    clearTimeout(this.fireTimeout);
    this.fireTimeout = setTimeout(() => {
      this.canFire = true;
    }, this.fireIntervalTime * this.fireIntervalTimeMult);

  }

  deathCheck() {
    if (this.health <= 0) {
      // this.deathSFX.play();
      console.log("Sunbreak Starship has been destroyed!");
      this.xPos = -100;
      this.yPos = -100;
      gameManager.getCurrLevel().stopMusic();
      gameOverMusic.loop();
      canInput = false;
    }
  }

  logic() {
    if (this.health <= 0) return;
    this.movement();
    this.display();
  }

}