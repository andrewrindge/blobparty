// this is the main javascript file, here we navigate through our other methods

// initializing game
// let game;
// game = new Phaser.Game(600, 450, Phaser.AUTO, '');
//
// // adding the home menu state
// game.state.add('Home', Home);
//
// // Adding the snake game state.
// game.state.add('Snake', Snake);
//
// // adding the game over state
// game.state.add('gameOver', gameOver);
//
// // starting game from "Home"
// game.state.start('Home');

import 'phaser';
import config from "/src/client/scripts/config.js";
import Lobby from "/src/client/scenes/lobby";

class Game extends Phaser.Game {
    constructor() {
        super(config);
        //ADD SCENES HERE
        this.scene.add("Lobby", Lobby);
        //START GAME WITH MAIN SCENE
        this.scene.start("Lobby");
    }
}

//new instance of game
window.onload = function () {
    window.game = new Game();
}