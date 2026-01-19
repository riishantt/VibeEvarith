const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store channels and their messages in memory (in production, use a database)
let channels = {};
let users = {};

app.use(express.static(path.join(__dirname, 'chat-app')));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat-app', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send existing channels to new user
  socket.emit('channels', Object.keys(channels));

  // Handle user joining
  socket.on('join', (data) => {
    const { username, channel } = data;
    users[socket.id] = { username, channel };

    socket.join(channel);

    // Send channel history to user
    if (channels[channel]) {
      socket.emit('channelHistory', channels[channel]);
    }

    // Notify others in channel
    socket.to(channel).emit('userJoined', { username, channel });
  });

  // Handle channel creation
  socket.on('createChannel', (channelName) => {
    if (!channels[channelName]) {
      channels[channelName] = [];
      io.emit('channelCreated', channelName);
    }
  });

  // Handle messages
  socket.on('message', (data) => {
    const { channel, username, text, timestamp } = data;
    const message = { username, text, timestamp };

    // Store message
    if (!channels[channel]) {
      channels[channel] = [];
    }
    channels[channel].push(message);

    // Broadcast to channel
    io.to(channel).emit('message', message);
  });

  // Handle typing
  socket.on('typing', (data) => {
    socket.to(data.channel).emit('typing', { username: data.username });
  });

  socket.on('stopTyping', (data) => {
    socket.to(data.channel).emit('stopTyping');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.channel).emit('userLeft', { username: user.username });
      delete users[socket.id];
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});