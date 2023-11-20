class Starship {

  constructor() {

    this.art = loadImage('assets/Starship_Test.png');

    this.speed = 5;
    this.health = 3;

    this.fireInterval = 500;
    this.canFire = true;
    
    this.xPos = width / 2;
    this.yPos = height - 50;

    this.width = 50;
    this.height = 50;

  }

  movement() {

    // A
    if (keyIsDown(65) && this.xPos > 0 + this.width / 2) this.xPos -= this.speed;

    // D
    if (keyIsDown(68) && this.xPos < width - this.width / 2) this.xPos += this.speed;

    // W
    if (keyIsDown(87) && this.yPos > 0 + this.height / 2) this.yPos -= this.speed;

    // S
    if (keyIsDown(83) && this.yPos < height - this.height / 2) this.yPos += this.speed;

  }

  abilities() {

    // Spacebar
    if (keyCode == 32 && this.canFire) ship.fire();
    
  }

  fire() {
    console.log("Fire!");
    this.setCanFire(false);
    let projectile = new PlayerProjectile(this.xPos, this.yPos, 25, 25, 10, 5);
    setTimeout(this.resetFire, this.fireInterval)
  }

  setCanFire(canFire) {
    this.canFire = canFire;
  }

  resetFire() {

    console.log("Reset Fire");

    // this. is not working, I think because
    // it's a timeout function and no longer
    // has access to a 'self'
    ship.setCanFire(true);

  }

  display() {
    imageMode(CENTER);
    image(this.art, this.xPos, this.yPos, this.width, this.height);
  }

  logic() {
    this.movement();
    this.display();
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`Ouch! We've been hit for ${damage} damage!`);
  }

}