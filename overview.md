# PixelCraft: Real-time Collaborative Pixel Art Creator

## Project Overview
PixelCraft is a modern web application that allows multiple users to create pixel art together in real-time. Think of it as a collaborative canvas where each pixel becomes part of a larger artistic creation, bringing together creativity and real-time collaboration.

## Key Features
- 🎨 Real-time collaborative canvas
- 👥 Multiple users can draw simultaneously
- 🎯 Different tools (brush, eraser, fill bucket)
- 🌈 Custom color palette selection
- 💾 Save and load artwork
- 👻 User presence indicators
- 💬 Built-in chat system
- ⏪ Undo/Redo functionality
- 📱 Responsive design for all devices

## Technical Stack
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand
- **Real-time Communication**: Socket.io
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## Learning Opportunities
This project showcases several modern web development concepts:
1. Real-time data synchronization
2. State management in complex applications
3. Canvas manipulation and pixel-level graphics
4. WebSocket implementation
5. User authentication and session management
6. Responsive design patterns
7. Modern React patterns and hooks
8. Database design for real-time applications

## Project Structure
```
pixelcraft/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configs
│   └── pages/            # App routes and pages
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── server/                # Backend Node.js server
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

## Features Deep Dive

### Real-time Canvas
The heart of PixelCraft is its real-time collaborative canvas. Each pixel update is broadcasted to all connected users instantly, creating a seamless collaborative experience. The canvas is implemented using HTML5 Canvas API with custom optimizations for performance.

### User Presence
See who's currently working on the artwork with real-time user presence indicators. Each user's cursor position is shown to others, creating a true collaborative feel.

### Tools and Controls
- Brush tool with size control
- Color picker with custom palette saving
- Fill bucket for larger areas
- Eraser tool
- Grid toggle for precise pixel placement
- Zoom controls

### Project Saving
All artwork is automatically saved and can be resumed later. Users can also export their creations in various formats (PNG, JPG, GIF).

## Future Enhancements
- Time-lapse replay of artwork creation
- Custom room creation
- More advanced tools (layers, filters)
- Mobile app version
- Community gallery
- Social features (likes, comments, sharing)

## Contributing
We welcome contributions! Please check our contributing guidelines for more information on how to get involved.

## License
MIT License - feel free to use this project for learning, modification, and distribution. 