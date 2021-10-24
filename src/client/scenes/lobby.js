class Lobby extends Phaser.Scene {

    constructor() {
        super({key: "Lobby"})
    }

    preload() {
        this.load.image("background", "assets/lobbybackground2.png")
        this.load.image("blob", "assets/purpleblobstill.png")
        this.load.spri
    }

    create() {
        this.image = this.add.image(710, 380, "background").setSizeToFrame();
        this.image = this.add.image(100, 100, "blob");
    }
}

