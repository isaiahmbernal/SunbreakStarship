class Projectile {

  constructor({xPos, yPos, width, height, damage, speed}={}) {

    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.damage = damage;
    this.speed = speed;

    this.id = Math.floor(Math.random() * 1000);
    while (projectiles.has(this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }
    
    projectiles.set(this.id, this);
    // console.log(`Projectile [${this.id}] Created {xPos: ${xPos}, yPos: ${yPos}}`);

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

}

class EnemyProjectile extends Projectile {

  constructor(xPos, yPos, width, height, damage, speed) {
    super(xPos, yPos, width, height, damage, speed);
  }

  display() {
    fill("red");
    circle(this.xPos, this.yPos, this.width);
  }

  movement() {
    this.yPos += this.speed;
  }

  checkCollision() {
      if (dist(this.xPos, this.yPos, ship.xPos, ship.yPos) < this.width * 3/4) {
        console.log(`Enemy Projectile [${this.id}] Hit Player`);
        ship.takeDamage(this.damage);
        projectiles.delete(this.id);
      }
  }

  logic() {
    this.movement();
    this.display();
    this.checkCollision();
    this.boundaryCheck();
  }

}

class PlayerProjectile extends Projectile {

  constructor(xPos, yPos, width, height, damage, speed) {
    super(xPos, yPos, width, height, damage, speed);
  }

  display() {
    fill("white");
    circle(this.xPos, this.yPos, this.width);
  }

  movement() {
    this.yPos -= this.speed;
  }

  checkCollision() {
    gameManager.getCurrentEnemyMap().forEach(enemy => {
      if (!(enemy instanceof Enemy)) return;
      if (enemy.getIsInvincible()) return;
      if (dist(this.xPos, this.yPos, enemy.xPos, enemy.yPos) < this.width * 1.5) {
        console.log(`Player Projectile [${this.id}] Hit Enemy`);
        enemy.takeDamage(this.damage);
        projectiles.delete(this.id);
      }
    });
  }

  logic() {
    this.movement();
    this.display();
    this.checkCollision();
    this.boundaryCheck();
  }

}