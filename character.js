class Character {
  constructor(xPos, yPos, width, height, health, speed, fireIntervalTime, assetLocation) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.health = health;
    this.speed = speed;
    this.fireIntervalTime = fireIntervalTime;
    this.art = loadImage(assetLocation);

    this.fireIntervalTimeMult = 1;
    this.canFire = true;
    this.tintOnTimeout;
    this.tintOn = false;
    this.tintOnTime = 100;
    this.tintSize = 1;
  }

  display() {
    imageMode(CENTER);
    if (this.tintOn) tint(255, 50, 50);
    image(this.art, this.xPos, this.yPos, this.width * this.tintSize, this.height * this.tintSize);
    tint("white");
  }
  
}

class Starship extends Character {

  constructor({xPos, yPos, width, height, health, speed, fireIntervalTime, assetLocation}={}) {
    super(xPos, yPos, width, height, health, speed, fireIntervalTime, assetLocation);
  }

  getHealth() {
    return this.health;
  }

  movement() {
    // A
    if (keyIsDown(65) && this.xPos > 80) this.xPos -= this.speed;
    // D
    if (keyIsDown(68) && this.xPos < width - 80) this.xPos += this.speed;
    // W
    if (keyIsDown(87) && this.yPos > 140 + this.height / 2) this.yPos -= this.speed;
    // S
    if (keyIsDown(83) && this.yPos < height - 80) this.yPos += this.speed;
  }

  abilities() {

    if (this.health <= 0) return;

    // Spacebar
    if (keyCode == 32 && this.canFire) this.fire();

  }

  fire() {
    // console.log("Fire!");
    this.canFire = false;
    let projectile = new PlayerProjectile({
      xPos : this.xPos,
      yPos : this.yPos,
      width : 25,
      height : 25,
      damage : 1,
      speed : 20,
    });
    setTimeout(this.resetFire, this.fireIntervalTime * this.fireIntervalTimeMult);
  }

  setCanFire(canFire) {
    this.canFire = canFire;
  }

  resetFire() {
    // console.log("Reset Fire");
    // this. is not working, I think because
    // it's a timeout function and no longer
    // has access to a 'self'
    ship.setCanFire(true);
  }

  takeDamage(damage) {

    if (this.health <= 0) return;

    this.health -= damage;
    this.tintOn = true;
    this.tintSize = 1.2;
    console.log(`Sunbreak Starship has been struck! Sustained ${damage} damage!`);

    if (this.health <= 0) {
      console.log(`Sunbreak Starship has been destroyed...`);
      this.xPos = -10, this.yPos = -10;
      audioManager.musicGameOver();
    } 
    
    clearTimeout(this.tintOnTimeout);
    this.tintOnTimeout = setTimeout(() => {
      this.resetTint()
    }, 100);
  }

  resetTint() {
    // console.log("Reset Tint");
    this.tintOn = false;
    this.tintSize = 1;
  }

  logic() {
    if (this.health <= 0) return;
    this.movement();
    this.display();
  }

}

class Enemy extends Character {

  constructor({xPos, yPos, width, height, health, speed, fireIntervalTime, direction, assetLocation}) {
    super(xPos, yPos, width, height, health, speed, fireIntervalTime, assetLocation);
    this.direction = direction;
    this.fireTimeout;
    this.pointsUponDeath;
    this.id = Math.floor(Math.random() * 1000);
    while (enemies.has(this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }
    enemies.set(this.id, this);
    console.log(`Enemy [${this.id}] Created`);
  }

  takeDamage(damage) {
    this.health -= damage;
    this.tintOn = true;
    this.tintSize = 1.2;
    console.log(`Enemy [${this.id}] was hit for ${damage} damage!`);

    if (this.health <= 0) {
      console.log(`Enemy [${this.id}] has been killed!`);
      clearTimeout(this.fireTimeout);
      score.addPoints(this.pointsUponDeath);
      enemies.delete(this.id);
      return;
    }
    
    clearTimeout(this.tintOnTimeout);
    this.tintOnTimeout = setTimeout(() => {
      this.resetTint()
    }, 100);
  }

  resetTint() {
    // console.log("Reset Tint");
    this.tintOn = false;
    this.tintSize = 1;
  }

  logic() {
    // if (this.health <= 0) return;
    this.movement();
    this.display();
  }

}

class Alien01 extends Enemy {

  constructor(xPos, yPos, width, height, health, speed, fireIntervalTime, direction, assetLocation) {
    super(xPos, yPos, width, height, health, speed, fireIntervalTime, direction, assetLocation);
    this.pointsUponDeath = 1;
    setTimeout(() => {
      if (this.health > 0) this.fire();
    }, 3000);
  }

  movement() {
    if (this.xPos - this.width / 2 < 0 ) this.direction = 1;
    else if (this.xPos + this.width / 2 > width) this.direction = -1;
    if (this.direction > 0) this.xPos += this.speed;
    else if (this.direction < 0) this.xPos -= this.speed;
    // console.log(`Enemy [${this.id}] Movement: {xPos: ${this.xPos}, yPos: ${this.yPos}, direction: ${this.direction}}`);
  }

  fire() {
    let projectile = new EnemyProjectile({
      xPos : this.xPos,
      yPos : this.yPos + 40,
      width : 25,
      height : 25,
      damage : 1,
      speed : 5,
    });
    clearTimeout(this.fireTimeout);
    this.fireTimeout = setTimeout(() => {
      this.fire();
    }, this.fireIntervalTime * this.fireIntervalTimeMult);
  }

}