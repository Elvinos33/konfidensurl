import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactGA from 'react-ga4';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Konfidens URL',
  description: 'Generate short URLs at Konfidens.',
};

ReactGA.initialize('G-L6ZR8P56VP');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-konfidens-white`}>
        {children}
      </body>
    </html>
  );
}
