class Lobby extends Phaser.Scene {
    constructor() {
        super({key: "Lobby"})
    }

    preload() {
        this.load.image("blob", "assets/purpleblobstill.png")
    }

    create() {
        const scene = this
        scene.players = {}
        scene.initialized = false
        scene.myId = ""

        //this.image = this.add.image(400.4, 300, "blob");

        socket.on("init", function(data) {
            scene.myId = data.id;
        })
        
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
    }

    addPlayer(scene, id, data) {
        scene.players[id] = data
        
        const sprite = scene.add.sprite(
            data.position.x,
            data.position.y,
            "blob"
        );

        scene.players[id].sprite = sprite;
    }

    removePlayer(scene, id) {
        scene.players[id].sprite.destroy(true);

        delete scene.players[id]
    }
}
