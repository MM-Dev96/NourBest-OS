const {defineConfig, devices} = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  retries: 1,
  reporter: [["list"], ["html", {outputFolder: "playwright-report", open: "never"}]],
  use: {baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure"},
  webServer: {command: "python3 -m http.server 4173", url: "http://127.0.0.1:4173", reuseExistingServer: true},
  projects: [
    {name: "desktop", use: {...devices["Desktop Chrome"]}},
    // Keep the real Apple viewport, touch, DPR, and user-agent while using the
    // CI-available Chromium engine. This makes mobile layout tests portable;
    // final Safari validation still happens on a physical iPhone/iPad.
    {name: "iphone", use: {...devices["iPhone 13"], browserName: "chromium"}},
    {name: "tablet", use: {...devices["iPad (gen 7)"], browserName: "chromium"}}
  ]
});
