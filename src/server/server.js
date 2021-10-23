const socket = require("socket.io");
const http = require('http');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.static("public"));

server.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}.`)
});

io.on("connection", (socket) => {
    console.log("Made socket connection", socket.id);
});