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

const journey = pages.filter((entry) => ["home", "the-carte", "reserve"].includes(entry.name));

async function shoot(browser, { w, h }, entry, reduced) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  const client = await ctx.newCDPSession(page);
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  await page.goto(base + entry.path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
  const suffix = reduced ? `-reduced` : "";
  const file = `${out}/${entry.name}-${w}${suffix}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await ctx.close();
}

const browser = await chromium.launch();
for (const size of widths) {
  for (const entry of pages) await shoot(browser, size, entry, false);
  for (const entry of journey) await shoot(browser, size, entry, true);
}
await browser.close();
