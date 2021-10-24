const room = {
    // users: [],
    // gameScore: [],
    // players: {},
    // numOfPlayers: 0
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Made socket connection", socket.id);
        socket.on("disconnect", function(data) {
            console.log(socket.id, "Disconnected")
        })
    
        // Initial state of the new player that just joined.
        // Maybe the color and the position can be randomized in the future
        // Properties such as which key to play as during the snake
        // game can be added.
        init = {
            color: "yellow",
            position: {
                x: 0,
                y: 0
            }
        }
    
        // Give the client the player's initial state
        socket.emit("init", init)
    
        // Alert everyone that a new client has joined
        io.sockets.emit("joined", {
            id: socket.id,
            init: init
        })
        // Adds the player to the players dictionary
        players[socket.id] = init
    
        socket.on("keyPress", function(key) {
            // TODO: Register the movement. When the key is pressed down, continually move
            // the player in that direction.
            console.log(`${socket.id} pressed ${key}`)
        })
    });
}