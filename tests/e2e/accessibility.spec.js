const {test, expect} = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("has no serious accessibility violations", async ({page})=>{
  await page.goto("/");
  await expect(page.locator("#system")).toBeVisible();
  const results=await new AxeBuilder({page}).disableRules(["color-contrast"]).analyze();
  const serious=results.violations.filter(v=>["serious","critical"].includes(v.impact));
  expect(serious,serious.map(v=>`${v.id}: ${v.help}`).join("\n")).toEqual([]);
});
