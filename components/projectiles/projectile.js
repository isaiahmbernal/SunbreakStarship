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

    this.startingYPos = this.yPos;

    this.positionUpdateTime = 500; // ms
    
    this.id = Math.floor(Math.random() * 1000);
    while (projectiles.has(this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }
    
    projectiles.set(this.id, this);
    
    // console.log(`Projectile [${this.id}] Created {xPos: ${this.xPos}, yPos: ${this.yPos}}`);

    // this.positionInterval = setInterval(() => {
    //   this.updatePositionList();
    // }, this.positionUpdateTime);
    
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

  updatePositionList() {
    // if (gameManager.getCurrLevel().getIsRewinding()) return;
    let point = {xPos : this.xPos, yPos : this.yPos};
    this.positionList.shift();
    this.positionList.push(point);
  }

  boundaryCheck() {

    if (this.yPos > height + this.height || this.yPos < 0 - this.height) {
      // console.log(`Projectile [${this.id}] Out of Y Bounds`);
      clearInterval(this.positionInterval);
      projectiles.delete(this.id);
      return;
    }

    if (this.xPos > width + this.width || this.xPos < 0 - this.width) {
      // console.log(`Projectile [${this.id}] Out of X Bounds`);
      clearInterval(this.positionInterval);
      projectiles.delete(this.id);
      return;
    }

  }

  display() {
    imageMode(CENTER);
    image(this.art, this.xPos, this.yPos, this.width, this.height);
  }

  logic() {
    if (!gameManager.getCurrLevel().getIsRewinding()) {
      this.movement();
      this.checkCollision();
      this.boundaryCheck();
    }
    this.display();
  }

}

