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
    this.ySpeed = stats.ySpeed;
    this.xSpeed = stats.xSpeed;

    // Assets
    this.art = assets.art;

    // Position History
    this.positionList = [
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
      {xPos : this.xPos, yPos : this.yPos},
    ];

    // Origin y height
    this.startingYPos = this.yPos;

    // Frequency of updates
    this.positionUpdateTime = 500; // ms
    
    // Projectile ID
    this.id = Math.floor(Math.random() * 1000);
    while (projectiles.has(this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }
    
    // Add self to projectile map
    projectiles.set(this.id, this);
    
    // console.log(`Projectile [${this.id}] Created {xPos: ${this.xPos}, yPos: ${this.yPos}}`);
    
  }
  
  getId() {
    return this.id;
  }

  getPositionList() {
    return this.positionList;
  }

  getStartingYPos() {
    return this.startingYPos;
  }

  setPosition(xPos, yPos) {
    this.xPos = xPos, this.yPos = yPos;
  }

  // Update the position list with
  // our most recent position
  updatePositionList() {
    let point = {xPos : this.xPos, yPos : this.yPos};
    this.positionList.shift();
    this.positionList.push(point);
  }

  // Check to see if we're outside the game screen
  boundaryCheck() {

    // If we're above or below the game screen,
    // delete self from the projectiles map
    if (this.yPos > height + this.height || this.yPos < 0 - this.height) {
      // console.log(`Projectile [${this.id}] Out of Y Bounds`);
      projectiles.delete(this.id);
      return;
    }

    // If we're left or right of the game screen,
    // delete self from the projectiles map
    if (this.xPos > width + this.width || this.xPos < 0 - this.width) {
      // console.log(`Projectile [${this.id}] Out of X Bounds`);
      projectiles.delete(this.id);
      return;
    }

  }

  display() {
    imageMode(CENTER);
    image(this.art, this.xPos, this.yPos, this.width, this.height);
  }

  // Logic to run every game frame from sketch.js
  logic() {

    // If the game isn't currently rewinding
    if (!gameManager.getCurrLevel().getIsRewinding()) {
      this.movement();
      this.checkCollision();
      this.boundaryCheck();
    }

    this.display();
    
  }

}

