class RobotBasic extends Enemy {

  constructor(position, scale, stats, assets, direction, points, level, tint) {

    super(position, scale, stats, assets, direction, points, level, tint);

    // Start shooting loop 3 seconds
    // after initialization
    setTimeout(() => {this.fire();}, 3000);

    // setTimeout(() => {this.isInvincible = false;}, 3000);

  }

  movement() {

    // Don't Move
    if (this.direction == 0) return;

    // Move Right
    if (this.xPos - this.width / 2 < 0 ) this.direction = 1;
    // Move Left
    else if (this.xPos + this.width / 2 > width) this.direction = -1;

    // Move Right
    if (this.direction > 0) this.xPos += this.speed;
    // Move Left
    else if (this.direction < 0) this.xPos -= this.speed;

    // console.log(`Enemy [${this.id}] Movement: {xPos: ${this.xPos}, yPos: ${this.yPos}, direction: ${this.direction}}`);

  }

  // Shooting method
  fire() {

    // If we're in battle and
    // the level isn't rewinding
    if (this.inBattle && 
      !gameManager.getCurrLevel().getIsRewinding()) {

      // Create an enemy projectile
      new EnemyProjectile(
        {xPos : this.xPos - this.width / 3, yPos : this.trueYPos + 20}, // Position
        { // Scale
          width : 25 * this.projectileScaleMult,
          height : 25 * this.projectileScaleMult,
        }, 
        { // Stats
          damage : this.projectileDamage,
          ySpeed : this.projectileSpeed,
          xSpeed : 1,
        }, 
        {art : alienBasicProjectileArt}, // Assets
      );

      // Create another enemy projectile
      new EnemyProjectile(
        {xPos : this.xPos + this.width / 3, yPos : this.trueYPos + 20}, // Position
        { // Scale
          width : 25 * this.projectileScaleMult,
          height : 25 * this.projectileScaleMult,
        }, 
        { // Stats
          damage : this.projectileDamage,
          ySpeed : this.projectileSpeed,
          xSpeed : -1,
        }, 
        {art : alienBasicProjectileArt}, // Assets
      );

      // this.fireSFX.play();

    }

    // Timeout after which this
    // fire method will be run again
    clearTimeout(this.fireTimeout);
    this.fireTimeout = setTimeout(() => {
      this.fire();
    }, this.fireIntervalTime * this.fireIntervalTimeMult);

  }

}