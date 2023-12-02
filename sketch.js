// Isaiah M. Bernal

let startGame = false;
let canInput = false;

// Player
let player;

// Game Management
let gameManager;

// HUD
let healthBar, clock, score, gameStart, gameOver, gameWin;

// Projectiles
let projectiles = new Map();

// Art
let playerArt, heartArt, playerProjectileArt;
let alienBasicGreenArt, alienBasicProjectileArt;

// Audio
let loadSong;
let levelOneSong, levelTwoSong;
let alienBasicDmgSFX, alienBasicDeathSFX;
let playerDmgSFX;
let spaceWooshSFX;
let rewindSFX;

function preload() {

  // Player
  playerArt = loadImage("assets/images/Sprite_Starship_24x24.gif");
  heartArt = loadImage("assets/images/Sprite_Heart.png");
  clockArt = loadImage("assets/images/Sprite_Clock.gif");
  playerProjectileArt = loadImage("assets/images/Sprite_PlasmaBall_01_32x32.gif");
  playerDmgSFX = loadSound("assets/audio/SFX_Player_Hit_01.wav");

  // Alien
  alienBasicGreenArt = loadImage("assets/images/Sprite_Alien_Basic_Green.gif");
  alienBasicBlueArt = loadImage("assets/images/Sprite_Alien_Basic_Blue.gif");
  alienBasicProjectileArt = loadImage("assets/images/Sprite_PlasmaBall_02_32x32.gif");
  alienBasicDmgSFX = loadSound("assets/audio/SFX_Enemy_Hit_03.wav");
  alienBasicDeathSFX = loadSound("assets/audio/SFX_Enemy_Die_01.wav");

  // Robot
  robotBasicGrayArt = loadImage("assets/images/Sprite_Robot_Basic_56x26.gif");
  robotBasicWhiteArt = loadImage("assets/images/Sprite_Robot_Basic_White_56x26.gif");
  robotBasicDmgSFX = loadSound("assets/audio/SFX_Robot_Hit.wav");
  robotBasicDeathSFX = loadSound("assets/audio/SFX_Robot_Die.wav");
  
  // Music
  loadSong = loadSound("assets/audio/Music_Hotel_Revised.mp3");
  gameOverMusic = loadSound("assets/audio/Music_FallenDown.mp3");
  levelOneSong = loadSound("assets/audio/Music_EnemyApproaching.mp3");
  levelTwoSong = loadSound("assets/audio/Music_StrongerMonsters.mp3");
  levelThreeSong = loadSound("assets/audio/Music_SpearOfJustice.mp3");
  levelFourSong = loadSound("assets/audio/Music_MetalCrusher.mp3");
  levelFiveSong = loadSound("assets/audio/Music_SpiderDance.mp3");
  levelSixSong = loadSound("assets/audio/Music_Heartache.mp3");

  // Misc SFX
  spaceWooshSFX = loadSound("assets/audio/SFX_SpaceWoosh.mp3");
  rewindSFX = loadSound("assets/audio/SFX_TimeStop.mp3");

  // Misc Art
  spaceTravelGIF = loadImage("assets/images/SpaceTravel.gif");

}

function setup() {

  createCanvas(500, 750);
  background('black');
  frameRate(30);

  player = new Player(
    {xPos : width / 2, yPos : height - 100}, // Position
    {width : 300 / 5, height : 290 / 5}, // Scale
    {
      health : 4,
      speed : 7.5,
      projectileSpeed : 15,
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
    {xPos : width - 70, yPos : height - 30},
    player,
  );

  gameStart = new GameStart(
    "Sunbreak Starship\n\n\n\n" +
    "WASD - Move\n\n" +
    "Spacebar - Shoot\n\n" + 
    "R - Rewind\n\n\n\n" + 
    "Press Any Key To Start"
  );
  gameOver = new GameOver("Game Over");
  gameWin = new GameWin("You Win!");
  gameManager = new GameManager(loadSong, spaceWooshSFX);
  clock = new Clock(
    {xPos : width - 65, yPos : height - 80}, // Position
    gameManager
  );

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

  // console.log(`Projectiles [${projectiles.size}]`);
  projectiles.forEach(projectile => {
    projectile.logic();
  })

  
  gameManager.logic();

  healthBar.logic();
  clock.logic();
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
    // console.log(`Loading Level: [${gameManager.getLoadingLevel()}], In Battle: [${gameManager.getCurrLevel().getInBattle()}]`)
    if (gameManager.getLoadingLevel()
    || !gameManager.getCurrLevel().getInBattle()) {
      return;
    } 
    player.abilities();
  }
}