// Captures full-page screenshots of the home page and one inner page at three widths.
// Usage: BASE_URL=http://localhost:3000 node scripts/screenshots.mjs
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = "docs/screens";
mkdirSync(out, { recursive: true });

const pages = [
  { name: "home", path: "/" },
  { name: "first-visit", path: "/first-visit" },
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
  for (const p of pages) {
    await page.goto(base + p.path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${out}/${p.name}-${w}.png`, fullPage: true });
    console.log(`${out}/${p.name}-${w}.png`);
  }
  await ctx.close();
}
await browser.close();
