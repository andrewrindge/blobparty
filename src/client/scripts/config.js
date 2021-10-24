const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 450,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
    dom: {
        createContainer: true,
    },
    scene: [],
};