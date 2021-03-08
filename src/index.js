const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = socketio(server)
// express() auto creates a http server but socket.io doesn't
// setup required on the client side as well before io.on() connection

// define port number
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");

// setup static directory to serve up
app.use(express.static(publicDirectoryPath));

io.on("connection", () => {
    console.log("chat-app socket.io connection");
});

server.listen(port, () => {
    console.log("chat-app server is up on port " + port);
});
