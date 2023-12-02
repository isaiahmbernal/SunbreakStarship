class Enemy extends Character {

  constructor(position, scale, stats, assets, direction, points, level, tint) {

    super(position, scale, stats, assets);
    
    this.direction = direction;
    this.points = points;
    this.level = level;

    this.loadYPos = this.yPos - 200;

    this.fireTimeout;

    this.id;
    this.tint = tint;

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
    let point = {xPos : this.xPos, yPos : this.loadYPos};
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

  load() {
    this.loadYPos += 3;
  }

  deathCheck() {
    if (this.health <= 0) {
      this.deathSFX.play();
      this.inBattle = false;
      console.log(`Enemy [${this.id}] has been destroyed!`);
      this.level.deleteEnemy(this.id);
    }
  }

  display() {
    imageMode(CENTER);
    if (this.tint != null) tint(this.tint);
    if (this.tintOn) tint(255, 50, 50);
    image(this.charArt, this.xPos, this.loadYPos, this.width * this.tintSize, this.height * this.tintSize);
    tint("white");
  }

  logic() {
    if (this.health <= 0) return;
    if (this.loadYPos < this.yPos) this.load();
    if (!gameManager.getCurrLevel().getIsRewinding()) this.movement();
    this.display();
  }

}