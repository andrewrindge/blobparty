// this is the page for when the game is over and gives the option to restart
// restart -> snake/home

let gameOver = {
    preload : function() {
        // little squished head snake picture?
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // button to start game again (as in home)
        // x, y, 'name of image to display', calling method to start game, in this
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // show game stats
        // (x, y, "Last Score") then (x, y, score as a string)
        game.add.text(235, 350, "Last Score", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
    },

    startGame: function () {
        // Change the state back to Game.
        this.state.start('Snake');

    }
}