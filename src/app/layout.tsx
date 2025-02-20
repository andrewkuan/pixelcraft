import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PixelCraft - Collaborative Pixel Art Creator',
  description: 'Create pixel art together in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 