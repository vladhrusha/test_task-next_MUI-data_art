import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

import colors from '@/assets/styles/colors';
import { Divider } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jokeree',
  description: 'Joke generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{
          backgroundColor: colors.primary,
          color: colors.text,
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Divider style={{ borderTop: '1px solid lightgrey' }} />

        {children}
      </body>
    </html>
  );
}
