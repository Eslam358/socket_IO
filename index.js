const express = require("express");
const { createServer, request } = require("node:http");
const { join } = require("node:path");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
// const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// io.on('connection', (socket) => {
//   console.log('a user connected-------');
// });

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
   
    socket.broadcast.emit('message', msg);
  });

socket.on("typing1", ()=>{
  socket.broadcast.emit("typing_1")
})
socket.on("typing2", ()=>{
  socket.broadcast.emit("typing_2")
})

});


server.listen(PORT, () => {
  console.log(`server running at http://localhost: ${PORT}`);
});

