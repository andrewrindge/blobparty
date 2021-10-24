// this is the home menu location where the game will launch from
// maybe incorporated into lobby set up where players will meet up
// restart -> home -> snake

var Home = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to,
        // the second one is the path to our file.
        game.load.image('home', './assets/images/home.png');
    },

    create: function () {
        //creating a button to initialize game star
        // x, y, 'name of image to display', calling method to start game, in this
        this.add.button(0, 0, 'home', this.startGame, this);
    },

    startGame: function () {
        this.state.start('Snake');
    }

};
