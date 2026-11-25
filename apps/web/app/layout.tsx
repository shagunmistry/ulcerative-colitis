import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Oswald, Space_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceWorker } from "@/components/ServiceWorker";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Providers } from "./providers";
import "./globals.css";
import "./print.css";

const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const display = Oswald({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: { default: "Understand ulcerative colitis", template: "%s, Ulcerative Colitis" },
  description:
    "Ulcerative colitis explained in plain language with sources: causes, medicines, other approaches and a 3D simulation.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0909" },
    { media: "(prefers-color-scheme: light)", color: "#f3e4cf" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${instrument.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <ServiceWorker />
          <SmokeBackground />
          <div className="relative z-10 flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
