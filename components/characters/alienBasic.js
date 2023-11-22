class AlienBasic extends Enemy {

  constructor(position, scale, stats, assets, direction, points, level) {
    super(position, scale, stats, assets, direction, points, level);
    setTimeout(() => {this.fire();}, 3000);
    setTimeout(() => {this.isInvincible = false;}, 3000);
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

  fire() {

    if (gameManager.getCurrLevel().getEnemyMap().has(this.id)) {

      new EnemyProjectile(
        {xPos : this.xPos, yPos : this.yPos + 40}, // Position
        {width : 25, height : 25}, // Scale
        { // Stats
          damage : this.projectileDamage,
          speed : this.projectileSpeed
        }, 
        {art : alienBasicProjectileArt}, // Assets
      );

      // this.fireSFX.play();

    }
    
    // else {
    //   console.log(`Enemy [${this.id}] Not In Current Map`);
    //   console.log(gameManager.getCurrentEnemyMap());
    // }

    clearTimeout(this.fireTimeout);
    this.fireTimeout = setTimeout(() => {
      this.fire();
    }, this.fireIntervalTime * this.fireIntervalTimeMult);

  }

}