import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('Successful login navigates to inventory page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();

  const inventoryItems = page.locator('.inventory_item');
  expect(await inventoryItems.count()).toBeGreaterThan(1);
});
