const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let app = express();

let server = http.createServer(app);
let io = socketIO(server);

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected ');

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
})
