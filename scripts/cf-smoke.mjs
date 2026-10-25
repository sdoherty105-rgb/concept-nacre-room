#!/usr/bin/env node
/** Smoke-test OpenNext output with wrangler dev (local only, no deploy). */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = 8787;
const base = `http://127.0.0.1:${port}`;

const child = spawn("npx", ["wrangler", "dev", "--port", String(port), "--local"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: process.env,
});

let ready = false;
child.stdout.on("data", (buf) => {
  const t = buf.toString();
  process.stdout.write(t);
  if (t.includes("Ready on")) ready = true;
});
child.stderr.on("data", (buf) => process.stderr.write(buf));

async function waitReady(ms = 45_000) {
  const start = Date.now();
  while (!ready && Date.now() - start < ms) await sleep(250);
  if (!ready) throw new Error("wrangler dev did not become ready");
  await sleep(500);
}

async function check(path, expectStatus) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  if (res.status !== expectStatus) throw new Error(`${path} expected ${expectStatus}, got ${res.status}`);
  const robots = res.headers.get("x-robots-tag") ?? "";
  if (!/noindex/i.test(robots)) throw new Error(`${path} missing X-Robots-Tag noindex (${robots})`);
  return res;
}

try {
  await waitReady();
  await check("/", 200);
  await check("/first-visit", 200);
  const robots = await fetch(`${base}/robots.txt`);
  const body = await robots.text();
  if (!/Disallow:\s*\/\s*$/m.test(body)) throw new Error("robots.txt does not Disallow: /");
  console.log("\ncf-smoke: OK (home + first-visit 200, X-Robots-Tag noindex, robots.txt disallows)");
} finally {
  child.kill("SIGTERM");
  await sleep(300);
  process.exit(0);
}
