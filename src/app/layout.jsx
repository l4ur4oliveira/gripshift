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

const siteMetadata = {
  siteUrl: 'https://gripshift-app.vercel.app/',
  siteTitle: 'GripShift - Master Your Chord Transitions',
  siteDescription: 'A minimalist, high-performance tool for guitar players to accelerate muscle memory with the 1-minute chord transition exercise.',
  siteImage: '/social-image.jpg',
}

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.siteTitle,
  description: siteMetadata.siteDescription,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'GripShift',
    type: 'website',
    url: siteMetadata.siteUrl,
    title: siteMetadata.siteTitle,
    description: siteMetadata.siteDescription,
    images: [
      {
        url: siteMetadata.siteImage,
        width: 1200,
        height: 630,
        alt: 'GripShift logo with the phrase Master Your Chord Transitions and a background image of a cellphone showing the app.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.siteTitle,
    description: siteMetadata.siteDescription,
    images: [siteMetadata.siteImage],
  },
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
