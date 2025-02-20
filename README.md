# PixelCraft: Real-time Collaborative Pixel Art Creator

A modern web application that allows multiple users to create pixel art together in real-time. Built with Next.js, Socket.io, and Prisma.

## Features

- 🎨 Real-time collaborative canvas
- 👥 Multiple users can draw simultaneously
- 🎯 Different tools (brush, eraser, fill bucket)
- 🌈 Custom color palette selection
- 💾 Save and load artwork
- 👻 User presence indicators
- 💬 Built-in chat system
- ⏪ Undo/Redo functionality
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand
- **Real-time Communication**: Socket.io
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- GitHub account (for authentication)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pixelcraft.git
   cd pixelcraft
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/pixelcraft"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"

   # OAuth Providers
   GITHUB_ID="your-github-id"
   GITHUB_SECRET="your-github-secret"

   # Socket.io
   NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development servers:
   ```bash
   # Start the Socket.io server
   cd server
   npm run dev

   # In a new terminal, start the Next.js app
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- Frontend code is in the `src` directory
- Backend Socket.io server is in the `server` directory
- Database schema is in `prisma/schema.prisma`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 