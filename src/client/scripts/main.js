class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add("Lobby", Lobby);
        this.scene.start("Lobby");
    }
}

//new instance of game
window.onload = function () {
    window.game = new Game();
}