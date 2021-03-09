const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = socketio(server) // express() auto creates a http server but socket.io doesn't

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    console.log("socket.io server connection");

    socket.emit("message", "welcome to chat");
    socket.broadcast.emit("message", "new user joined chat");

    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    });

    socket.on("sendLocation", (coords) => {
        io.emit(
            "message",
            `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        );
    });

    socket.on("disconnect", () => {
        io.emit("message", "a user has left");
    });
});

server.listen(port, () => {
    console.log("nodejs server connected on port " + port);
});
