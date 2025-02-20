'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-3xl font-bold">Welcome to PixelCraft</h1>
        <p className="text-gray-600">Please sign in to start creating pixel art</p>
        <button
          onClick={() => signIn('github')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In with GitHub
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">PixelCraft</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {session.user?.name || 'Artist'}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <Toolbar />
            <div className="bg-white p-8 border border-gray-200 rounded-lg">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 