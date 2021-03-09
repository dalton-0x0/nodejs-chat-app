const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = socketio(server)
// express() auto creates a http server but socket.io doesn't
// setup required on the client side as well before io.on() connection

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    console.log("socket.io server connection");

    socket.emit("message", "welcome to chat");

    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    });
});

server.listen(port, () => {
    console.log("nodejs server connected on port " + port);
});
