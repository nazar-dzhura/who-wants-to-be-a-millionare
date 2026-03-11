import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { GameProvider } from '@/context/GameContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Who Wants to Be a Millionaire?',
  description: 'A trivia game inspired by Who Wants to Be a Millionaire',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <GameProvider>
            {children}
          </GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
