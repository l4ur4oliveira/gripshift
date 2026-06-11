import { Open_Sans, Oswald } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
});

export const metadata = {
  title: 'GripShift - Master Your Chord Transitions',
  description: 'A minimalist, high-performance tool for guitar players to accelerate muscle memory with the 1-minute chord transition exercise.',
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} ${oswald.variable}`}>
      <body className="antialiased min-h-screen bg-brandBlack text-brandWhite selection:bg-brandCrimson selection:text-brandWhite">
        {children}
      </body>
    </html>
  );
}
