class GameManager {

  constructor() {

    let level1Enemies = new Map();

    for (let i = 0; i < 5; i++) {
      new Alien01({
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
    }

    let level2Enemies = {}

  }

}