const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

// Import routes from routes folder, used for organising
const authRoutes = require('./routes/auth');
const lessonFeedbackRoutes = require('./routes/lessonFeedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Single HTTP server used by both Express and Socket.IO
const server = http.createServer(app);

// Allows the React Native frontend to communicate with the backend.
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json('Server is looking healthy.');
});

// Use routes from the routes folder
app.use('/api/auth', authRoutes);
app.use('/api/lessonFeedback', lessonFeedbackRoutes);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const MAX_RECENT_MESSAGES = 50;
const recentMessages = [];

function safeTrimText(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

io.on('connection', (socket) => {
  // Get the correct username and ID if it's given. Otherwise assum guest identity
  const token = socket.handshake?.auth?.token;
  const usernameFromClient = safeTrimText(socket.handshake?.auth?.username) || 'Guest';

  let user = {
    userId: null,
    username: usernameFromClient,
  };

  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = {
        userId: decoded.userId ?? null,
        username: usernameFromClient,
      };
    } catch {
      // If verification fails, fall back to Guest identity
    }
  }

  socket.data.user = user;

  socket.emit('chat:history', recentMessages);

  socket.on('chat:message', (payload, ack) => {
    const text = safeTrimText(payload?.text);
    if (!text) {
      if (typeof ack === 'function') ack({ ok: false, error: 'Message cannot be empty.' });
      return;
    }

    const message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
      user: socket.data.user,
    };

    recentMessages.push(message);
    if (recentMessages.length > MAX_RECENT_MESSAGES) {
      recentMessages.splice(0, recentMessages.length - MAX_RECENT_MESSAGES);
    }

    io.emit('chat:message', message);

    if (typeof ack === 'function') ack({ ok: true });
  });
});



// Starts the local server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:` + PORT);
  console.log(`Socket.IO running on http://localhost:` + PORT);
});
