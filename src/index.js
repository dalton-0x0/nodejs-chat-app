const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = socketio(server)
// express() auto creates a http server but socket.io doesn't
// setup required on the client side as well before io.on() connection

// define port
const port = process.env.PORT || 3000;

// define path to public for html render
const publicDirectoryPath = path.join(__dirname, "../public");

// setup static directory to serve up
app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", (socket) => {
    console.log("socket.io server connection");
    socket.emit("countUpdated", count);
    socket.on("increment", () => {
        count++;
        // socket.emit("countUpdated", count); // emits to only the 'socket' connection
        io.emit("countUpdated", count); // emits to every connection
    });
});

server.listen(port, () => {
    console.log("nodejs server connected on port " + port);
});
