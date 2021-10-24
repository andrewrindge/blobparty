class Home extends Phaser.Scene {
    constructor() {
        super({key: "Home"})
    }

    preload() {
        this.load.image("background", "assets/homebackground.png")
    }

    create() {
        this.socket = io;
        this.image = this.add.image(0, 0, "background");
        scene.scene.launch("Lobby", {socket: scene.socket});
    }
}