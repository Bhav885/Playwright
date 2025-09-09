import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('Locator strategy mastery', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // getByText()
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // getByAltText()
  await expect(page.getByAltText('Sauce Labs Backpack')).toBeVisible();

  // locator() with CSS
  await page.locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .locator('button').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
