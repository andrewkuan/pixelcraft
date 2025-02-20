'use client';

import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">PixelCraft</h1>
            <div className="text-gray-600">
              Start creating pixel art!
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