class Lobby extends Phaser.Scene {
    constructor() {
        super({key: "Lobby"})
    }

    preload() {
        this.load.image("blob", "assets/purpleblobstill.png")
    }

    create() {
        this.image = this.add.image(400.4, 300, "blob");
    }
}

