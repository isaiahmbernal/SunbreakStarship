class EnemyProjectile extends Projectile {

  constructor(position, scale, stats, assets) {
    super(position, scale, stats, assets);
  }

  movement() {
    this.yPos += this.speed;
  }

  checkCollision() {
    if (dist(this.xPos, this.yPos, player.xPos, player.yPos) < this.width * 3/4) {
      console.log(`Enemy Projectile [${this.id}] Hit Player`);
      player.takeDamage(this.damage);
      projectiles.delete(this.id);
    }
  }

  logic() {
    this.movement();
    this.checkCollision();
    this.boundaryCheck();
    this.display();
  }

}