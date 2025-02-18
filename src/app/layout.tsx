'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

import colors from '@/assets/styles/colors';
import { Divider } from '@mui/material';

import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Jokeree',
//   description: 'Joke generator',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Divider style={{ borderTop: '1px solid lightgrey' }} />

          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
