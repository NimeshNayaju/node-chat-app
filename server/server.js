const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// serving static files in Express
app.use(express.static(publicPath));

// registers an event listener, and do something when the event happens
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'admin@admin.com',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin@admin.com',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('New message: ', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // broadcasting a message
    // socket.broadcast.emit('createMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// starts a server on port 3000
server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

