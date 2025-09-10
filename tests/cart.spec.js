import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('Add items to cart and validate', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('button').click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).locator('button').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/.*cart.html/);
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);
  await expect(cartItems).toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
});
