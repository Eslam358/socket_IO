const express = require("express");
const { createServer, request } = require("node:http");
const { join } = require("node:path");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
// const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// io.on('connection', (socket) => {
//   console.log('a user connected-------');
// });

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);
    // socket.emit("message", msg);
    socket.broadcast.emit('message');
  });

socket.on("typing1", ()=>{
  socket.broadcast.emit("typing_1")
})
socket.on("typing2", ()=>{
  socket.broadcast.emit("typing_2")
})
socket.on("")

});


server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

