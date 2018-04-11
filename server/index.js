const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let app = express();
let { generateMessage, generateLocationMessage } = require('./utils/message')
let server = http.createServer(app);
let io = socketIO(server);

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', (socket) => {

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server');
  })

  socket.on("createLocationMessage", (coords) => {
      io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  })

})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
})
