import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UC Guide - Your Comprehensive Ulcerative Colitis Resource",
  description: "Your comprehensive guide to understanding and managing Ulcerative Colitis. Access evidence-based information, practical tools, and supportive resources - all in one place.",
  keywords: ["ulcerative colitis", "UC", "IBD", "inflammatory bowel disease", "treatment", "symptoms", "diet", "health", "colitis management", "UC symptoms", "UC diet", "UC treatment"],
  authors: [{ name: "UC Guide Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://ucguide.com",
  },
  openGraph: {
    title: "UC Guide - Your Comprehensive Ulcerative Colitis Resource",
    description: "Your comprehensive guide to understanding and managing Ulcerative Colitis. Access evidence-based information, practical tools, and supportive resources - all in one place.",
    type: "website",
    locale: "en_US",
    url: "https://ucguide.com",
    siteName: "UC Guide",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UC Guide - Comprehensive Ulcerative Colitis Resource",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UC Guide - Your Comprehensive Ulcerative Colitis Resource",
    description: "Your comprehensive guide to understanding and managing Ulcerative Colitis. Access evidence-based information, practical tools, and supportive resources - all in one place.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "UC Guide",
              description: "Your comprehensive guide to understanding and managing Ulcerative Colitis. Access evidence-based information, practical tools, and supportive resources - all in one place.",
              url: "https://ucguide.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ucguide.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              publisher: {
                "@type": "Organization",
                name: "UC Guide Team",
                url: "https://ucguide.com"
              },
              mainEntity: {
                "@type": "MedicalCondition",
                name: "Ulcerative Colitis",
                alternateName: ["UC", "IBD", "Inflammatory Bowel Disease"],
                description: "A chronic inflammatory bowel disease that causes inflammation and ulcers in the digestive tract",
                medicalCode: {
                  "@type": "MedicalCode",
                  code: "K51",
                  codingSystem: "ICD-10"
                }
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
