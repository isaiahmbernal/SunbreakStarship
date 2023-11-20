// Isaiah M. Bernal

let ship, healthBar, score, overlay, audioManager;

let enemies = new Map();
let projectiles = new Map();

function preload() {}

function setup() {

  createCanvas(500, 500);
  background('black');
  frameRate(30);

  ship = new Starship({
    xPos : width / 2,
    yPos : height - 100,
    width : 50,
    height : 50,
    health : 5,
    speed : 7.5,
    fireIntervalTime : 500,
    assetLocation : "assets/Starship_02_Test.png",
  });

  enemyLeftTest = new Alien01({
    xPos : width / 2 - 260 / 3,
    yPos : height / 5,
    width : 260 / 3,
    height : 210 / 3,
    health : 3,
    speed : 5,
    fireIntervalTime : 400,
    direction : -1,
    assetLocation : "assets/Alien_01_Alive.gif",
  });

  enemyRightTest = new Alien01({
    xPos : width / 2 + 260 / 3,
    yPos : height / 5,
    width : 260 / 3,
    height : 210 / 3,
    health : 3,
    speed : 5,
    fireIntervalTime : 400,
    direction : 1,
    assetLocation : "assets/Alien_01_Alive.gif",
  });

  healthBar = new HealthBar({
    xPos : 0 + 25,
    yPos : height - 25,
    ship : ship,
  });

  score = new Score();
  overlay = new Overlay();
  audioManager = new AudioManager();

}

function draw() {

  background('black');

  ship.logic();
  
  enemies.forEach(enemy => {
    enemy.logic();
  })

  projectiles.forEach(projectile => {
    projectile.logic();
  })

  healthBar.logic();
  score.logic();
  overlay.logic();

}

function keyPressed() {
  ship.abilities();
}