const {test, expect} = require("@playwright/test");

async function enterSystem(page){
  await page.goto("/");
  await expect(page.locator("#system")).toBeVisible();
  if(await page.locator("#onboarding").isVisible()){
    await page.locator("#profile-name").fill("مستخدم الاختبار");
    await page.locator('[data-action="finish-onboarding"]').click();
  }
}

test("boots and opens core applications", async ({page})=>{
  await enterSystem(page);
  for(const id of ["files","notes","tasks","calculator","diagnostics"]){
    await page.evaluate(appId=>openApp(appId),id);
    await expect(page.locator(`.app-window[data-app="${id}"]`)).toBeVisible();
  }
});

test("creates a real folder and persists it", async ({page})=>{
  await enterSystem(page);
  await page.evaluate(()=>openApp("files"));
  page.once("dialog",dialog=>dialog.accept("اختبار المجلد"));
  await page.locator('[data-file-new]').click();
  await expect(page.getByText("اختبار المجلد",{exact:true})).toBeVisible();
  await page.reload();
  await expect(page.locator("#system")).toBeVisible();
  await page.evaluate(()=>openApp("files"));
  await expect(page.getByText("اختبار المجلد",{exact:true})).toBeVisible();
});

test("creates QR and remains inside viewport", async ({page})=>{
  await enterSystem(page);
  await page.locator('[data-action="launcher"]').click();
  await page.locator('#launcher .app-card[data-open="qrtools"]').click();
  await page.locator('[data-qr-text]').fill("https://example.com/nourbest");
  await page.locator('[data-qr-generate]').click();
  const data=await page.locator('[data-qr-canvas]').evaluate(canvas=>canvas.toDataURL());
  expect(data.length).toBeGreaterThan(500);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+2);
  expect(overflow).toBeFalsy();
});
