const config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 780,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
    parent: body,
    dom: {
        createContainer: true,
    },
    scene: [],
};