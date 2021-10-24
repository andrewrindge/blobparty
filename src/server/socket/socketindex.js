const room = {
    users: [],
    gameScore: [],
    players: {},
    numOfPlayers: 0
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Made socket connection", socket.id);

        socket.on("disconnect", function(data) {
            console.log(socket.id, "Disconnected")
            delete room.players[socket.id]

            io.sockets.emit("left", socket.id)
            io.sockets.emit("players", room.players)
        })

        // Initial state of the new player that just joined.
        // Maybe the color and the position can be randomized in the future
        // Properties such as which key to play as during the snake
        // game can be added.
        init = {
            position: {
                x: Math.random() * 400 + 100,
                y: Math.random() * 200 + 100,
            }
        }
        room.players[socket.id] = init
        // Give the client the player's initial state
        socket.on("init", function() {
            socket.emit("init", {
                id: socket.id,
                data: init
            })
        })

        io.sockets.emit("players", room.players)

        // Alert everyone that a new client has joined
        io.sockets.emit("joined", {
            id: socket.id,
            data: init
        })
        // Adds the player to the players dictionary
        // players[socket.id] = init

        socket.on("requestPlayers", function() {
            socket.emit("players", room.players)
        })

        socket.on("updatePosition", function(data) {
            io.sockets.emit("updatePosition", {
                id: socket.id,
                position: data
            })
        })

        socket.on("joinSnake", function(data) {
            // Player wants to join the snake room
            socket.join("snake")
            io.to("snake").emit("joinedSnake", socket.id)
        })

        socket.on("keyPress", function(key) {
            // TODO: Register the movement. When the key is pressed down, continually move
            // the player in that direction.
            console.log(`${socket.id} pressed ${key}`)
        })
    });
}