import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Login - Ruskær Jagtforening",
  description: "Velkommen til Ruskær Jagtforening, her tilbyder vi jagt, skydning og hundetræning for alle vores medlemmer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex sm:items-center justify-center m-6',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
