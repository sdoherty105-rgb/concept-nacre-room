import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Colophon } from "@/components/Colophon";
import { Mast } from "@/components/Mast";
import "./globals.css";
import "./issue.css";

const display = localFont({
  src: "./fonts/BodoniModa-Display.woff2",
  weight: "520",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  preload: true,
  fallback: ["Times New Roman", "Georgia", "serif"],
});

const displayItalic = localFont({
  src: "./fonts/BodoniModa-Italic.woff2",
  weight: "400 900",
  style: "italic",
  variable: "--font-display-italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  preload: false,
  fallback: ["Times New Roman", "Georgia", "serif"],
});

const body = localFont({
  src: "./fonts/Jost-Roman.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

const bodyItalic = localFont({
  src: "./fonts/Jost-Italic.woff2",
  weight: "100 900",
  style: "italic",
  variable: "--font-body-italic",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: false,
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Nacre Room, Issue 01 (fictional concept)",
    template: "%s | Nacre Room (fictional concept)",
  },
  description:
    "Nacre Room is a fictional hair and beauty room, published as Issue 01 by OFF/SHIFT Studio. Prices, hours and reservations are demonstration data.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  applicationName: "Nacre Room (concept)",
};

export const viewport: Viewport = {
  themeColor: "#F1ECE8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${displayItalic.variable} ${body.variable} ${bodyItalic.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Mast />
        <main id="main">{children}</main>
        <Colophon />
      </body>
    </html>
  );
}
