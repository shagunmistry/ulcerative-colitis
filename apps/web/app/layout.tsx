import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Oswald, Space_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Providers } from "./providers";
import "./globals.css";

const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const display = Oswald({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: { default: "Ulcerative Colitis: a 3D explorer", template: "%s, Ulcerative Colitis" },
  description:
    "Explore how ulcerative colitis takes hold and how treatments act, with a 3D simulation and sourced evidence.",
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
          <SmokeBackground />
          <div className="relative z-10 flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[var(--rule)] px-6 py-8 text-sm text-[var(--ink-soft)] lg:px-10">
              <p className="mx-auto max-w-[1400px]">
                For learning, not medical advice. Do not start, stop or change any treatment because of what you see
                here; talk to your gastroenterology team. Seek urgent care for heavy bleeding, fever, severe pain or a
                swollen abdomen.
              </p>
            </footer>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
