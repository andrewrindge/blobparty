class Lobby extends Phaser.Scene {
    counter = 0;

    constructor() {
        super({key: "Lobby"})
    }

    preload() {
        this.load.image("background", "assets/lobbybackground2.png")
        //this.load.image("blob", "assets/purpleblobstill.png")
        this.load.image("purple", "assets/purpleblobstill.png");
        this.load.image("pink", "assets/pinkblobstill.png");
        this.load.image("yellow", "assets/yellowblobstill.png");
        this.load.image("green", "assets/greenblobstill.png");
        //this.load.spritesheet('purplesprite', "assets/purplespritesheet.png", {frameWidth: 160, frameHeight: 160});
    }

    create() {
        const scene = this
        scene.players = {}
        scene.initialized = false
        scene.myId = ""

        this.image = this.add.image(710, 380, "background")

        socket.emit("init")
        socket.on("init", function(data) {
            scene.myId = data.id;
            socket.emit("requestPlayers")

            socket.on("players", function(data) {
                console.log(scene.initialized)
                if (!scene.initialized) {
                    scene.initialized = true;
                    for (const id in data) {
                        scene.addPlayer(scene, id, data[id])
                        //scene.players[id] = data[id]
                        //console.log(`Add player: id: ${id}, data: ${data[id]}`)
                        //console.log(scene.players)
                    }
                }
            })

            socket.on("joined", function(data) {
                scene.addPlayer(scene, data.id, data.data)
                //scene.players[data.id] = data.data
                //console.log(`Add player: id: ${data.id}, data: ${data.data}`)
                //console.log(scene.players)
            })

            socket.on("left", function(data) {
                scene.removePlayer(scene, data)
                //delete scene.players[data]

                //console.log(scene.players)
            })

            socket.on("updatePosition", function(data) {
                if (scene.players[data.id].text) {
                    scene.players[data.id].text.x = scene.players[data.id].position.x
                    scene.players[data.id].text.y = scene.players[data.id].position.y - 100
                }

                if (data.id === scene.myId) {
                    return
                }

                scene.players[data.id].position = data.position
                scene.players[data.id].sprite.x = scene.players[data.id].position.x
                scene.players[data.id].sprite.y = scene.players[data.id].position.y
            })

            socket.on("chat-message", function(data) {
                console.log(`Chat message ${data.message}`)

                if (scene.players[data.id].text)
                    scene.players[data.id].text.destroy(true)

                scene.players[data.id].text = scene.add.text(
                    scene.players[data.id].position.x, 
                    scene.players[data.id].position.y - 100,
                    data.message,
                    {
                        fontFamily: 'sans-serif',
                        color: "black",
                        boundsAlignH: "center"
                    }
                ).setOrigin(0.5)

                if (scene.players[data.id].textTimer) {
                    clearTimeout(scene.players[data.id].textTimer)
                    scene.players[data.id].textTimer = null
                }

                scene.players[data.id].textTimer = setTimeout(
                    () => {
                        scene.players[data.id].text.destroy(true)
                        scene.players[data.id].text = null
                    },
                    5000
                )
            })
        })
        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.play("left",true);
    }

    addPlayer(scene, id, data) {
        scene.players[id] = data

        if (id === scene.myId) {
            const sprite = scene.physics.add
                .sprite(data.position.x,
                    data.position.y,
                    this.getTypes()
                )
            sprite.setCollideWorldBounds(true);
            scene.players[id].sprite = sprite;
        } else {
            const sprite = scene.add.sprite(
                data.position.x,
                data.position.y,
                this.getTypes()
            );
            scene.players[id].sprite = sprite;
        }
        this.counter++;
    }

    getTypes() {
        if (this.counter === 0) {
            return "pink";
        } else if (this.counter === 1) {
            return "green";
        } else if (this.counter === 2) {
            return "purple";
        } else if (this.counter === 3) {
            return "yellow";
        }
    }

    removePlayer(scene, id) {
        if (scene.players[id].text)
            scene.players[id].text.destroy(true)

        scene.players[id].sprite.destroy(true)

        delete scene.players[id]
    }

    update() {
        const scene = this;
        const speed = 225;
        const friction = 0.05;

        if (this.cursors.left.isDown) {
            this.players[this.myId].sprite.body.setVelocityX(-speed)
        } else if (this.cursors.right.isDown) {
            this.players[this.myId].sprite.body.setVelocityX(speed)
        }

        if (this.cursors.up.isDown) {
            this.players[this.myId].sprite.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.players[this.myId].sprite.body.setVelocityY(speed);
        }

        this.players[this.myId].sprite.body.setVelocityX(
            (1 - friction) * this.players[this.myId].sprite.body.velocity.x
        )

        this.players[this.myId].sprite.body.setVelocityY(
            (1 - friction) * this.players[this.myId].sprite.body.velocity.y
        )

        this.players[this.myId].position = {
            x: this.players[this.myId].sprite.x,
            y: this.players[this.myId].sprite.y
        }

        socket.emit("updatePosition", this.players[this.myId].position)
    }
}
