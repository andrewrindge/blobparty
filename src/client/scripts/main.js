class Game extends Phaser.Game {
    constructor() {
        super(config);
        //ADD SCENES HERE
        //this.scene.add("Home", Home);
        this.scene.add("Lobby", Lobby);
        //START GAME WITH MAIN SCENE
        this.scene.start("Lobby");
    }
}

//new instance of game
window.onload = function () {
    window.game = new Game();
}