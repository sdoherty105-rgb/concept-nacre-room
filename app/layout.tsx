import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ConceptBar } from "@/components/ConceptBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "./salon.css";

const display = localFont({
  src: "./fonts/DMSerifDisplay-Latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--nr-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  weight: "400 700",
  variable: "--nr-body",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: false,
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Nacre Room | Hair & Beauty Salon, Marlowe Cove, Perth (fictional concept)",
  description:
    "Nacre Room is a fictional hair and beauty salon, designed by OFF/SHIFT Studio as a concept. Build an appointment, see the total time and price, and send a demo booking request.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  applicationName: "Nacre Room (concept)",
};

export const viewport: Viewport = {
  themeColor: "#F3EFEA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConceptBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

