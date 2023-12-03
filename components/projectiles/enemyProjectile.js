class EnemyProjectile extends Projectile {

  constructor(position, scale, stats, assets) {
    super(position, scale, stats, assets);
  }

  movement() {
    this.yPos += this.ySpeed;
    // If we have an xSpeed, move x position
    if (this.xSpeed != null) this.xPos += this.xSpeed;
  }

  // Check if we've collided with the player
  checkCollision() {

    // If we're touching the player
    if (dist(this.xPos, this.yPos, player.getPosition().xPos, player.getPosition().yPos) < this.width * 3/4) {
      console.log(`Enemy Projectile [${this.id}] Hit Player`);
      player.takeDamage(this.damage);
      projectiles.delete(this.id);
    }

  }

}