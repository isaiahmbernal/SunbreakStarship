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
    this.fireIntervalTime = stats.fireIntervalTime;

    // Assets
    this.charArt = assets.charArt;
    // this.fireSFX = loadSound(assets.fireSFXLocation);
    // this.dmgSFX = loadSound(assets.dmgSFXLocation);
    // this.deathSFX = loadSound(assets.deathSFXLocation);

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

  display() {
    imageMode(CENTER);
    if (this.tintOn) tint(255, 50, 50);
    image(this.charArt, this.xPos, this.yPos, this.width * this.tintSize, this.height * this.tintSize);
    tint("white");
  }

  tintCycle() {
    this.tintOn = true;
    this.tintSize = 1.2;
    clearTimeout(this.tintOnTimeout);
    this.tintOnTimeout = setTimeout(() => {
      this.tintOn = false;
      this.tintSize = 1;
    }, this.tintOnTime);
  }

  takeDamage(damage) {
    if (this.isInvincible) return;
    if (this.health <= 0) return;
    this.health -= damage;
    // this.dmgSFX.play();
    this.tintCycle();
    if (this instanceof Player) console.log(`Sunbreak Starship was hit for [${damage}] damage!\n[${this.health}] Health Left!`);
    else if (this instanceof Enemy) console.log(`Enemy [${this.id}] was hit for [${damage}] damage!`);
    this.deathCheck();
  }
  
}