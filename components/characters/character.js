class Character {

  constructor(position, scale, stats, assets) {
    
    // Position
    this.xPos = position.xPos;
    this.yPos = position.yPos;

    // Scale
    this.width = scale.width;
    this.height = scale.height;

    // Stats
    this.health = stats.health;
    this.speed = stats.speed;
    this.projectileSpeed = stats.projectileSpeed;
    this.projectileDamage = stats.projectileDamage;
    this.projectileScaleMult = stats.projectileScaleMult;
    this.fireIntervalTime = stats.fireIntervalTime;

    // Assets
    this.charArt = assets.charArt;
    // this.fireSFX = loadSound(assets.fireSFXLocation);
    this.dmgSFX = assets.dmgSFX;
    this.deathSFX = assets.deathSFX;

    // Misc
    this.isInvincible = false;
    this.fireIntervalTimeMult = 1;
    this.canFire = true;
    this.tintOnTimeout;
    this.tintOn = false;
    this.tintOnTime = 100;
    this.tintSize = 1;

  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return {xPos : this.xPos, yPos : this.yPos};
  }

  display() {
    imageMode(CENTER);
    // If we're supposed to be tinted
    if (this.tint != null) tint(this.tint);
    if (this.tintOn) tint(255, 50, 50);
    image(this.charArt, this.xPos, this.yPos, this.width * this.tintSize, this.height * this.tintSize);
    tint("white");
  }

  // Meant to tint the character
  // and increase the character
  // size whenever we take damage
  tintCycle() {

    // Turn tint on
    this.tintOn = true;

    // Increase the size multiplier
    this.tintSize = 1.2;

    // Timeout after which tint
    // will be false and size 
    // will return to normal
    clearTimeout(this.tintOnTimeout);
    this.tintOnTimeout = setTimeout(() => {
      this.tintOn = false;
      this.tintSize = 1;
    }, this.tintOnTime);

  }

  // Called by projectiles
  // when taking damage
  takeDamage(damage) {

    // If we're invincible
    if (this.isInvincible) return;

    // If we're dead
    if (this.health <= 0) return;

    // Lower our health
    this.health -= damage;

    // Play the damage sound
    this.dmgSFX.play();

    // Start the tint cycle
    this.tintCycle();

    if (this instanceof Player) console.log(`Sunbreak Starship was hit for [${damage}] damage!\n[${this.health}] Health Left!`);
    else if (this instanceof Enemy) console.log(`Enemy [${this.id}] was hit for [${damage}] damage!`);

    // Check to see if we're dead
    this.deathCheck();
    
  }
  
}