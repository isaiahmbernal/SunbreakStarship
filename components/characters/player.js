class Player extends Character {

  constructor(position, scale, stats, assets, score) {
    super(position, scale, stats, assets);
    this.score = 0;
    this.fireTimeout;
  }

  getScore() {
    return this.score;
  }

  increaseScore(points) {
    this.score += points;
  }

  movement() {
    // A
    if (keyIsDown(65) && this.xPos > 80) this.xPos -= this.speed;
    // D
    if (keyIsDown(68) && this.xPos < width - 80) this.xPos += this.speed;
    // W
    if (keyIsDown(87) && this.yPos > 220) this.yPos -= this.speed;
    // S
    if (keyIsDown(83) && this.yPos < height - 80) this.yPos += this.speed;
  }

  abilities() {
    if (this.health <= 0) return;
    // Spacebar
    if (keyCode == 32 && this.canFire) this.fire();
  }

  fire() {

    this.canFire = false;

    new PlayerProjectile(
      {xPos : this.xPos, yPos : this.yPos}, // Position
      {width : 50, height : 50}, // Scale
      { // Stats
        damage : this.projectileDamage,
        speed : this.projectileSpeed,
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
    }
  }

  logic() {
    if (this.health <= 0) return;
    this.movement();
    this.display();
  }

}