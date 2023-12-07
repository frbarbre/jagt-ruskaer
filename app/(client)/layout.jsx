import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import Nav from '@/components/navigation/Nav';
import { cn } from '@/lib/utils';
import Footer from '@/components/shared/Footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex flex-col justify-between bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Nav />

        <main className="mt-[92px] md:mt-[108px] p-6 md:pb-6 md:p-12">
          <section className="max-w-[1440px] mx-auto ">{children}</section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
