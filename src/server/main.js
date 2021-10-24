import 'phaser';
import config from "/src/client/scripts/config.js";
import Home from "/src/client/scenes/home.js";
import Lobby from "/src/client/scenes/lobby.js";
import Snake from "/src/client/scenes/snake.js";
import GameOver from "/src/client/scenes/gameOver.js";

class Game extends Phaser.Game {
    constructor() {
        super(config);
        //ADD SCENES HERE
        this.scene.add("Home", Home);
        this.scene.add("Lobby", Lobby);
        //START GAME WITH MAIN SCENE
        this.scene.start("Home");
    }
}

//new instance of game
window.onload = function () {
    window.game = new Game();
}