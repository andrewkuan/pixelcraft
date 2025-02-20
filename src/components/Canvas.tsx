'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useCanvasStore from '@/store/canvasStore';
import { PixelUpdate } from '@/types/canvas';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const {
    pixels,
    width,
    height,
    scale,
    tool,
    color,
    brushSize,
    showGrid,
    setPixel
  } = useCanvasStore();

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('pixelUpdate', (update: PixelUpdate) => {
      setPixel(update.x, update.y, update.color);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Draw function
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pixels
    Object.entries(pixels).forEach(([key, color]) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * scale, 0);
        ctx.lineTo(x * scale, height * scale);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * scale);
        ctx.lineTo(width * scale, y * scale);
        ctx.stroke();
      }
    }
  };

  // Handle drawing
  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!socket) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / scale);
    const y = Math.floor((e.clientY - rect.top) / scale);

    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const update: PixelUpdate = {
      x,
      y,
      color: tool === 'eraser' ? '' : color,
      userId: 'anonymous'
    };

    setPixel(x, y, update.color);
    socket.emit('pixelUpdate', update);
  };

  // Draw on canvas update
  useEffect(() => {
    draw();
  }, [pixels, scale, showGrid]);

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width * scale}
        height={height * scale}
        className="touch-none"
        onClick={handleDraw}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleDraw(e);
        }}
      />
    </div>
  );
};

export default Canvas; 