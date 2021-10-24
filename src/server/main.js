// this is the main javascript file, here we navigate through our other methods

// initializing game
let game;
game = new Phaser.Game(600, 450, Phaser.AUTO, '');

// adding the home menu state
game.state.add('Home', Home);

// Adding the snake game state.
game.state.add('Snake', Snake);

// adding the game over state
game.state.add('gameOver', gameOver);

// starting game from "Home"
game.state.start('Home');
