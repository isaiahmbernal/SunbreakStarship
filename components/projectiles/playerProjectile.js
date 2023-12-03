class PlayerProjectile extends Projectile {

  constructor(position, scale, stats, assets, player) {
    super(position, scale, stats, assets);
    this.player = player;
    // console.log("Made Player Projectile");
  }

  movement() {
    this.yPos -= this.ySpeed;
  }

  // Check if we collided with any enemies
  checkCollision() {

    // For every enemy currently in this level
    gameManager.getCurrLevel().getEnemyMap().forEach(enemy => {

      // If the enemy is not in battle
      if (!enemy.getInBattle()) return;

      // If we're touching the enemy
      if (dist(this.xPos, this.yPos, enemy.getPosition().xPos, enemy.getPosition().yPos) < this.width * 1.5) {
        // console.log(`Player Projectile [${this.id}] Hit Enemy`);
        enemy.takeDamage(this.damage);
        this.player.increaseScore(this.damage);
        projectiles.delete(this.id);
      }

    });
  }

}