class Enemy extends Character {

  constructor(position, scale, stats, assets, direction, points, level, tint) {

    super(position, scale, stats, assets);
    
    // Direction we move in
    this.direction = direction;

    // this.points = points;

    // Level we're in
    this.level = level;

    // Position we're ACTUALLY in,
    // yPos is the position we 
    // were TOLD to be in
    this.trueYPos = this.yPos - 200;

    // Timeout for firing
    this.fireTimeout;

    // Unique ID for the enemy map
    this.id;

    // The provided tint
    // color we should be
    this.tint = tint;

    // Whether or not we're in battle
    this.inBattle = false;

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

  }

  setId(id) {
    this.id = id;
  }

  getPositionList() {
    return this.positionList;
  }

  updatePositionList() {
    let point = {xPos : this.xPos, yPos : this.trueYPos};
    this.positionList.shift();
    this.positionList.push(point);
  }

  setPosition(xPos, yPos) {
    this.xPos = xPos, this.yPos = yPos;
  }

  getIsInvincible() {
    return this.isInvincible;
  }

  getInBattle() {
    return this.inBattle;
  }

  setInBattle(inBattle) {
    this.inBattle = inBattle;
  }

  // Move towards the yPos
  // we were told to be at
  load() {
    this.trueYPos += 3;
  }

  // Check to see if we're dead
  deathCheck() {

    // If we're dead
    if (this.health <= 0) {

      // Play the death sound
      this.deathSFX.play();

      // We're no longer in battle
      this.inBattle = false;

      console.log(`Enemy [${this.id}] has been destroyed!`);

      // Delete ourselves from 
      // the our level's enemy map 
      this.level.deleteEnemy(this.id);

    }
  }

  display() {
    imageMode(CENTER);
    // If we're supposed to be tinted
    if (this.tint != null) tint(this.tint);
    if (this.tintOn) tint(255, 50, 50);
    image(this.charArt, this.xPos, this.trueYPos, this.width * this.tintSize, this.height * this.tintSize);
    tint("white");
  }

  // Logic to be run every frame in sketch.js
  logic() {

    // If we're dead
    if (this.health <= 0) return;

    // If we haven't reached the 
    // yPos we were told to be at
    if (this.trueYPos < this.yPos) this.load();

    // If we're not rewinding
    if (!gameManager.getCurrLevel().getIsRewinding()) {
      this.movement();
    }

    this.display();

  }

}