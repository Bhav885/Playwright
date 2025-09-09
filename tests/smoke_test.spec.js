import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('Smoke test - site accessibility', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
