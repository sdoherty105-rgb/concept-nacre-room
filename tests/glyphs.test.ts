import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Decorative text glyphs that must not appear in UI source.
 * Functional plus signs in code (e.g. arithmetic) are fine; UI copy uses words instead.
 */
const FORBIDDEN = /[→←↑↓✓✔★☆•·▪▸▹►◆●○›‹»«✕×➔➜➝➞➡➢➣➤➥➦➧➨➩➪➫➬➭➮➯➱➲➳➴➵➶➷➸➹➺➻➼➽➾\u2013\u2014]/gu;

const ROOTS = ["app", "components", "lib"];
const EXT = /\.(tsx|ts|css)$/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) out.push(...walk(path));
    else if (EXT.test(name)) out.push(path);
  }
  return out;
}

describe("no decorative text glyphs in UI source", () => {
  it("app, components and lib contain none of the banned characters", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(root)) {
        const text = readFileSync(file, "utf8");
        for (const match of text.matchAll(FORBIDDEN)) {
          const line = text.slice(0, match.index).split("\n").length;
          offenders.push(`${file}:${line} (${JSON.stringify(match[0])})`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
