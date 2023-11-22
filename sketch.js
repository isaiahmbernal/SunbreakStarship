// Isaiah M. Bernal

// Player
let player;

// Game Management
let gameManager;

// HUD
let healthBar, score, overlay;

// Projectiles
let projectiles = new Map();

// Art
let playerArt, heartArt, playerProjectileArt;
let alienBasicArt, alienBasicProjectileArt;

// Audio
let levelOneSong, levelTwoSong;

function preload() {

  // Player
  playerArt = loadImage("assets/images/Starship_02_Test.png");
  heartArt = loadImage("assets/images/HUD_Heart.png");
  playerProjectileArt = loadImage("assets/images/Art_EnergyBall_Player.gif");

  // Enemy
  alienBasicArt = loadImage("assets/images/Alien_01_Alive.gif");
  alienBasicProjectileArt = loadImage("assets/images/Art_EnergyBall_Enemy.gif");
  
  // Music
  levelOneSong = loadSound("assets/audio/Music_EnemyApproaching.mp3");
  levelTwoSong = loadSound("assets/audio/Music_StrongerMonsters.mp3");
  levelThreeSong = loadSound("assets/audio/Music_SpearOfJustice.mp3");

}

function setup() {

  createCanvas(500, 750);
  background('black');
  frameRate(30);

  player = new Player(
    {xPos : width / 2, yPos : height - 100}, // Position
    {width : 50, height : 50}, // Scale
    {
      health : 5,
      speed : 7.5,
      projectileSpeed : 10,
      projectileDamage : 1,
      fireIntervalTime : 500,
    }, // Stats
    { // Assets
      charArt : playerArt,
      // fireSFX : "",
      // dmgSFX : "",
      // deathSFX : "",
    },
  );

  healthBar = new HealthBar(
    {xPos : 25, yPos : height - 25}, // Position
    player, // Player
  );

  scoreText = new ScoreText(
    {xPos : width - 70, yPos : height - 25},
    player,
  );

  gameOver = new GameOver();
  gameManager = new GameManager();

}

function draw() {

  background('black');

  player.logic();

  gameManager.logic();

  // console.log(`Projectiles [${projectiles.size}]`);
  projectiles.forEach(projectile => {
    projectile.logic();
  })

  healthBar.logic();
  scoreText.logic();
  gameOver.logic();

}

function keyPressed() {
  if (!gameManager.getCurrLevel().music.isPlaying()) {
    gameManager.getCurrLevel().playMusic();
  }
  player.abilities();
}