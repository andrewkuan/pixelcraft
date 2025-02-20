import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { PixelUpdate, UserPresence } from '../src/types/canvas';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Store active users and their cursor positions
const activeUsers = new Map<string, UserPresence>();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData: UserPresence) => {
    activeUsers.set(socket.id, userData);
    io.emit('users', Array.from(activeUsers.values()));
  });

  // Handle pixel updates
  socket.on('pixelUpdate', (update: PixelUpdate) => {
    socket.broadcast.emit('pixelUpdate', update);
  });

  // Handle cursor movement
  socket.on('cursorMove', (position: { x: number; y: number }) => {
    const userData = activeUsers.get(socket.id);
    if (userData) {
      const updatedUser = { ...userData, cursor: position };
      activeUsers.set(socket.id, updatedUser);
      socket.broadcast.emit('cursorMove', { id: socket.id, ...updatedUser });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    activeUsers.delete(socket.id);
    io.emit('users', Array.from(activeUsers.values()));
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
}); 