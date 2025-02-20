import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { PixelUpdate } from './types';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Store current canvas state
const pixels: Record<string, string> = {};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current canvas state to new clients
  socket.emit('canvasState', pixels);

  // Handle pixel updates
  socket.on('pixelUpdate', (update: PixelUpdate) => {
    const key = `${update.x},${update.y}`;
    if (update.color === '') {
      delete pixels[key];
    } else {
      pixels[key] = update.color;
    }
    socket.broadcast.emit('pixelUpdate', update);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Add a health check endpoint
app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
}); 