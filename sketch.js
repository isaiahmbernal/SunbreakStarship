// Isaiah M. Bernal

let ship, healthBar, score, overlay, audioManager, gameManager;

let projectiles = new Map();

function preload() {}

function setup() {

  createCanvas(500, 750);
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

  healthBar = new HealthBar({
    xPos : 0 + 25,
    yPos : height - 25,
    ship : ship,
  });

  score = new Score();
  overlay = new Overlay();
  audioManager = new AudioManager();
  gameManager = new GameManager();

}

function draw() {

  background('black');

  ship.logic();

  gameManager.logic();

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