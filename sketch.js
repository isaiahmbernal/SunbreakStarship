// Isaiah M. Bernal

let startGame = false;
let canInput = false;

// Player
let player;

// Game Management
let gameManager;

// HUD
let healthBar, score, gameStart, gameOver, gameWin;

// Projectiles
let projectiles = new Map();

// Art
let playerArt, heartArt, playerProjectileArt;
let alienBasicArt, alienBasicProjectileArt;

// Audio
let loadSong;
let levelOneSong, levelTwoSong;
let alienBasicDmgSFX, alienBasicDeathSFX;
let playerDmgSFX;
let spaceWooshSFX;

function preload() {

  // Player
  playerArt = loadImage("assets/images/Starship_02_Test.png");
  heartArt = loadImage("assets/images/HUD_Heart.png");
  playerProjectileArt = loadImage("assets/images/Art_EnergyBall_Player.gif");
  playerDmgSFX = loadSound("assets/audio/SFX_Player_Hit_01.wav");

  // Enemy
  alienBasicArt = loadImage("assets/images/Alien_01_Alive.gif");
  alienBasicProjectileArt = loadImage("assets/images/Art_EnergyBall_Enemy.gif");
  alienBasicDmgSFX = loadSound("assets/audio/SFX_Enemy_Hit_03.wav");
  alienBasicDeathSFX = loadSound("assets/audio/SFX_Enemy_Die_01.wav");
  
  // Music
  loadSong = loadSound("assets/audio/Music_Hotel_Revised.mp3");
  gameOverMusic = loadSound("assets/audio/Music_FallenDown.mp3");
  levelOneSong = loadSound("assets/audio/Music_EnemyApproaching.mp3");
  levelTwoSong = loadSound("assets/audio/Music_StrongerMonsters.mp3");
  levelThreeSong = loadSound("assets/audio/Music_SpearOfJustice.mp3");

  // Misc SFX
  spaceWooshSFX = loadSound("assets/audio/SFX_SpaceWoosh.mp3");

  // Misc Art
  spaceTravelGIF = loadImage("assets/images/SpaceTravel.gif");

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
      projectileScaleMult : 1,
      fireIntervalTime : 500,
    }, // Stats
    { // Assets
      charArt : playerArt,
      // fireSFX : "",
      dmgSFX : playerDmgSFX,
      deathSFX : playerDmgSFX,
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

  gameStart = new GameStart("Press Any Key To Start");
  gameOver = new GameOver("Game Over");
  gameWin = new GameWin("You Win!");
  gameManager = new GameManager(loadSong, spaceWooshSFX);

  setTimeout(() => {canInput = true}, 5500);

}

function draw() {

  background('black');

  if (gameManager.getLoadingLevel()) {
    tint(255, 200);
    image(spaceTravelGIF, width / 2, height / 2, width, height + 200);
    tint(255);
  }

  player.logic();

  gameManager.logic();

  // console.log(`Projectiles [${projectiles.size}]`);
  projectiles.forEach(projectile => {
    projectile.logic();
  })

  healthBar.logic();
  scoreText.logic();
  gameStart.logic();
  gameOver.logic();
  gameWin.logic();

}

function keyPressed() {
  if (!startGame) {
    startGame = true;
    gameManager.startGame();
  }
  if (canInput) {
    console.log(`Loading Level: [${gameManager.getLoadingLevel()}], In Battle: [${gameManager.getCurrLevel().getInBattle()}]`)
    if (gameManager.getLoadingLevel()
    || !gameManager.getCurrLevel().getInBattle()) {
      return;
    } 
    player.abilities();
  }
}