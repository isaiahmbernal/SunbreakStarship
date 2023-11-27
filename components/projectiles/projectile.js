class Projectile {

  constructor(position, scale, stats, assets) {

    // Position
    this.xPos = position.xPos;
    this.yPos = position.yPos;

    // Scale
    this.width = scale.width;
    this.height = scale.height;

    // Stats
    this.damage = stats.damage;
    this.speed = stats.speed;

    // Assets
    this.art = assets.art;

    this.id = Math.floor(Math.random() * 1000);
    while (projectiles.has(this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }
    
    projectiles.set(this.id, this);
    
    // console.log(`Projectile [${this.id}] Created {xPos: ${this.xPos}, yPos: ${this.yPos}}`);

  }
  
  getId() {
    return this.id;
  }

  boundaryCheck() {

    if (this.yPos > height + this.height || this.yPos < 0 - this.height) {
      // console.log(`Projectile [${this.id}] Out of Y Bounds`); 
      projectiles.delete(this.id);
    }

    if (this.xPos > width + this.width || this.xPos < 0 - this.width) {
      // console.log(`Projectile [${this.id}] Out of X Bounds`);
      projectiles.delete(this.id);
    }

  }

  display() {
    imageMode(CENTER);
    image(this.art, this.xPos, this.yPos, this.width, this.height);
  }

}

