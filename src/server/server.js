const path = require("path");
const socket = require("socket.io");
const http = require('http');
const express = require('express');
const { SocketAddress } = require("net");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socket(server);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "..", 'client/html/index.html'));
});

app.use(express.static(path.join(__dirname, "..", "client")));

app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error("Not found");
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

server.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}.`)
});

require("./socket")(io);