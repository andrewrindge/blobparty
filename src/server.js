const socket = require("socket.io");
const http = require('http');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socket(server);

const players = {};

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/html/index.html');
});

app.use(express.static("client"));

server.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}.`)
});

io.on("connection", (socket) => {
    console.log("A player connected", socket.id);
});

setInterval(function() {
    io.sockets.emit('message', 'hi!')
}, 1000)