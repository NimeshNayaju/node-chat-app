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
    from: 'server@server.com',
    text: 'Message from server',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('New message: ', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// starts a server on port 3000
server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

