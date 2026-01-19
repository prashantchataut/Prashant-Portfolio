import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Prashant Chataut — Portfolio',
  description: 'Portfolio of Prashant Chataut - Thoughtful systems, careful writing, and disciplined execution.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <SmoothScroll>
        <body className="bg-sand text-ink antialiased selection:bg-ink/10 selection:text-slate">
          {children}
        </body>
      </SmoothScroll>
    </html>
  );
}
