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

  socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the Chat App',
      createdAt: new Date().getTime() 
  })

  socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    })
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  })

})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
})
