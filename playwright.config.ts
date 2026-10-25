import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);

export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    channel: process.env.PW_CHANNEL || undefined,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start",
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
