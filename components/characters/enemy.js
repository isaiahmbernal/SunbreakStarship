class Enemy extends Character {

  constructor(position, scale, stats, assets, direction, points, level, tint) {

    super(position, scale, stats, assets);
    this.direction = direction;
    this.points = points;
    this.level = level;

    this.isInvincible = true;
    this.fireTimeout;

    this.id;
    this.tint = tint;

    // console.log(`${this.level.getName()}: Enemy [${this.id}] Created`)

  }

  setId(id) {
    this.id = id;
  }

  getIsInvincible() {
    return this.isInvincible;
  }

  deathCheck() {
    if (this.health <= 0) {
      this.deathSFX.play();
      console.log(`Enemy [${this.id}] has been destroyed!`);
      this.level.deleteEnemy(this.id);
    }
  }

  logic() {
    if (this.health <= 0) return;
    this.movement();
    this.display();
  }

}