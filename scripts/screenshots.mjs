// Full-page screenshots at the three review widths.
// Usage: BASE_URL=http://localhost:3000 node scripts/screenshots.mjs
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = "docs/screens";
mkdirSync(out, { recursive: true });

const pages = [
  { name: "home", path: "/" },
  { name: "the-carte", path: "/the-carte" },
  { name: "people", path: "/people" },
  { name: "journal", path: "/journal" },
  { name: "reserve", path: "/reserve" },
];
const widths = [
  { w: 390, h: 844 },
  { w: 768, h: 1024 },
  { w: 1440, h: 900 },
];

const browser = await chromium.launch();
for (const { w, h } of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const entry of pages) {
    await page.goto(base + entry.path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${out}/${entry.name}-${w}.png`, fullPage: true });
    console.log(`${out}/${entry.name}-${w}.png`);
  }
  await ctx.close();
}
await browser.close();
