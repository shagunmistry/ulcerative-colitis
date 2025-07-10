import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - UC Guide',
    default: 'UC Guide - Comprehensive Ulcerative Colitis Resource',
  },
  description: 'Your comprehensive guide to ulcerative colitis. Access evidence-based information, practical tools, and supportive resources for managing UC.',
  keywords: ['ulcerative colitis', 'UC', 'inflammatory bowel disease', 'IBD', 'colitis management', 'UC symptoms', 'UC treatment', 'UC diet', 'UC resources'],
  authors: [{ name: 'UC Guide Team' }],
  creator: 'UC Guide',
  publisher: 'UC Guide',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ulcerative-colitis.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ulcerative-colitis.vercel.app',
    siteName: 'UC Guide',
    title: 'UC Guide - Comprehensive Ulcerative Colitis Resource',
    description: 'Your comprehensive guide to ulcerative colitis. Access evidence-based information, practical tools, and supportive resources for managing UC.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UC Guide - Comprehensive Ulcerative Colitis Resource',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UC Guide - Comprehensive Ulcerative Colitis Resource',
    description: 'Your comprehensive guide to ulcerative colitis. Access evidence-based information, practical tools, and supportive resources for managing UC.',
    images: ['/og-image.jpg'],
    creator: '@ucguide',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />

        <Analytics />

      </body>
    </html>
  );
}