import Phaser from "phaser";

export default class Home extends Phaser.Scene {
    constructor() {
        super("Home");
        this.state = {};
    }

    preload() {
        // (how image will be referred to, path to image file)

        // background image
        this.load.image('lobbybackground', '../assets/lobbybackground.png');
        // images for arrow keys
        // this.load.image('rightArrow', './assets/images/rightArrow.png');
        // this.load.image('leftArrow', './assets/images/leftArrow.png');
        // this.load.image('upArrow', './assets/images/upArrow.png');
        // this.load.image('downArrow', './assets/images/downArrow.png');
    }

    create () {
        const scene = this;

        // x, y, 'name of image to display', calling method to start game, in this

        // setting the background image
        this.add.image(0, 0, 'lobbybackground').setOrigin(0);

        // setting the arrow images
        // this.add.image(10, 10, 'rightArrow');
        // this.add.image(10, 20, 'leftArrow');
        // this.add.image(10, 30, 'upArrow');
        // this.add.image(10, 40, 'downArrow');

        // setting the blobs images (still?)

        // create socket
        this.socket = io();

        // launching lobby on top of home
        scene.scene.launch("Lobby", { socket: scene.socket});

        // creating other players group
        this.otherPlayers = this.physics.add.group();

        this.socket.on("setState", function (state) {
            const { roomKey, players, numPlayers } = state;
            scene.physics.resume();

            scene.state.roomKey = roomKey;
            scene.state.players = players;
            scene.state.numPlayers = numPlayers;
        });

        // need to set up players stuff

        // listen for all four arrow key key strokes
        // then call startGame or do this.state.start('Snake'); directly
    }

    startGame () {
        this.state.start('Snake');
    }

}
