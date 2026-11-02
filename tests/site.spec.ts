import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/nacre-room";
const pages = [
  { path: "/", h1: /Nacre\s*Room/i, status: 200 },
  { path: "/the-carte", h1: /The carte/i, status: 200 },
  { path: "/people", h1: /The people/i, status: 200 },
  { path: "/journal", h1: /House notes/i, status: 200 },
  { path: "/reserve", h1: /Which practice/i, status: 200 },
  { path: "/this-page-does-not-exist", h1: /drifted off/i, status: 404 },
];

for (const p of pages) {
  test.describe(`page ${p.path}`, () => {
    test("renders with the expected status, heading and landmarks", async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(p.status);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });

    test("is noindex via meta tag and X-Robots-Tag header", async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.headers()["x-robots-tag"]).toMatch(/noindex/);
      expect(res?.headers()["x-robots-tag"]).toMatch(/nofollow/);
      const content = await page.locator('meta[name="robots"]').evaluateAll((els) => els.map((e) => e.getAttribute("content")).join(", "));
      expect(content).toMatch(/noindex/);
      expect(content).toMatch(/nofollow/);
    });

    test("shows the visible concept label linking to the studio", async ({ page }) => {
      await page.goto(p.path);
      const label = page.getByTestId("concept-label").getByRole("link", {
        name: "An OFF/SHIFT concept, fictional demonstration",
      });
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("href", CONCEPT_URL);
    });

    test("has no WCAG 2.2 AA violations detectable by axe", async ({ page }) => {
      await page.goto(p.path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  });
}

test("concept label sits in the first viewport at 390 and 1440", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of ["/", "/the-carte", "/people", "/journal", "/reserve"]) {
      await page.goto(path);
      const box = await page.getByTestId("concept-label").boundingBox();
      expect(box, path).toBeTruthy();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height + 1);
    }
  }
});

test("robots.txt disallows everything", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/User-agent:\s*\*/);
  expect(body).toMatch(/Disallow:\s*\/\s*$/m);
});

test("static assets also carry noindex", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.headers()["x-robots-tag"]).toMatch(/noindex/);
});

test("home page content works without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Nacre\s*Room/i);
  await expect(page.getByText("Signature Cut & Finish").first()).toBeVisible();
  await expect(page.getByText("$110").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "The visit" })).toBeVisible();
  await expect(page.getByText("Demonstration data").first()).toBeVisible();
  await page.goto("/reserve");
  await expect(page.getByRole("button", { name: "Request this appointment" })).toBeDisabled();
  await ctx.close();
});

test("reduced motion removes the cover rise", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const name = await page.locator(".masthead span").first().evaluate((el) => getComputedStyle(el).animationName);
  expect(name).toBe("none");
  await ctx.close();
});

async function openReserve(page: Page) {
  await page.goto("/reserve");
  await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
}

async function chooseRitual(page: Page, practice: RegExp, service: RegExp) {
  await openReserve(page);
  await page.getByRole("radio", { name: practice }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: service }).check();
  await page.getByRole("button", { name: "Continue" }).click();
}

test.describe("concierge reservation", () => {
  test("totals time and price and keeps a running line", async ({ page }) => {
    await chooseRitual(page, /Colour/, /Soft Balayage/);
    await page.getByRole("checkbox", { name: /Gloss finish/ }).check();
    await page.getByRole("checkbox", { name: /Take-home care set/ }).check();
    await expect(page.getByTestId("total-time")).toHaveText("3 hr 15 min");
    await expect(page.getByTestId("total-price")).toHaveText("$388");
    const line = page.getByTestId("running-summary");
    await expect(line).toContainText("Soft Balayage");
    await expect(line).toContainText("Gloss finish");
  });

  test("'Plan this' on the carte selects the service", async ({ page }) => {
    await page.goto("/the-carte");
    await page.getByRole("link", { name: "Plan this: Scalp Ritual" }).click();
    await page.waitForURL(/service=scalp-ritual/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Which ritual/);
    await expect(page.getByRole("radio", { name: /Scalp Ritual/ })).toBeChecked();
    await expect(page.getByTestId("total-price")).toHaveText("$90");
  });

  test("changing service drops add-ons that no longer apply", async ({ page }) => {
    await chooseRitual(page, /Cut & Style/, /Signature Cut/);
    await page.getByRole("checkbox", { name: /Bond repair mask/ }).check();
    await page.getByRole("button", { name: "Back" }).click();
    await page.getByRole("button", { name: "Back" }).click();
    await page.getByRole("radio", { name: /Brows, Lashes & Skin/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("radio", { name: /Signature Pearl Facial/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("checkbox", { name: /Bond repair mask/ })).toHaveCount(0);
    await expect(page.getByTestId("total-price")).toHaveText("$165");
  });
});

test.describe("booking form (demo only)", () => {
  test("has no action and never makes a network request on submit", async ({ page }) => {
    await chooseRitual(page, /Cut & Style/, /Signature Cut/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Preferred date").fill(nextWeekday(4));
    await page.getByRole("radio", { name: /Evening/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    const form = page.getByTestId("booking-form");
    expect(await form.getAttribute("action")).toBeNull();
    await expect(form.getByRole("button", { name: "Request this appointment" })).toBeEnabled();

    const requests: string[] = [];
    const navigations: string[] = [];
    page.on("request", (r) => requests.push(`${r.method()} ${r.resourceType()} ${r.url()}`));
    page.on("framenavigated", (f) => navigations.push(f.url()));
    const urlBefore = page.url();

    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByRole("textbox", { name: /^Mobile/ }).fill("0400 000 000");
    await page.getByLabel(/I understand this is a demonstration/).check();
    await form.getByRole("button", { name: "Request this appointment" }).click();

    const success = page.getByTestId("booking-success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("This is a demo");
    await expect(success).toContainText("not sent");
    expect(page.url()).toBe(urlBefore);
    expect(navigations).toEqual([]);
    expect(requests.filter((r) => !r.startsWith("GET"))).toEqual([]);
    expect(requests.filter((r) => /\b(fetch|xhr|websocket|ping|eventsource)\b/.test(r))).toEqual([]);
  });

  test("validates on the client with clear, linked errors", async ({ page }) => {
    await openReserve(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".error-summary")).toContainText("Choose a practice");

    await chooseRitual(page, /Cut & Style/, /Signature Cut/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Preferred date").fill(nextWeekday(4));
    await page.getByRole("radio", { name: /Morning/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByTestId("booking-form").getByRole("button", { name: "Request this appointment" }).click();
    const summary = page.locator(".error-summary");
    await expect(summary).toBeVisible();
    await expect(summary).toContainText("Enter your name");
    await expect(summary).toContainText("email");
    await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
    await expect(summary).toBeFocused();
  });

  test("rejects closed days and evening slots outside Thursday", async ({ page }) => {
    await chooseRitual(page, /Colour/, /Root Retouch/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Preferred date").fill(nextWeekday(1));
    await page.getByRole("radio", { name: /Morning/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".error-summary")).toContainText("closed on Sundays and Mondays");

    await page.getByLabel("Preferred date").fill(nextWeekday(2));
    await page.getByRole("radio", { name: /Evening/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".error-summary")).toContainText("Thursdays only");
  });
});

function nextWeekday(target: number): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  while (d.getDay() !== target) d.setDate(d.getDate() + 1);
  d.setDate(d.getDate() + 7);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
