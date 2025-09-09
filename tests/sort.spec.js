import { test, expect } from '@playwright/test';

test.setTimeout(120000); // Full test timeout

test('Lab 3.2: Product sorting - low to high', async ({ page }) => {
  // 1️⃣ Login
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Ensure we are on inventory page
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2️⃣ Select "Price (low to high)" from sort dropdown
  await page.getByRole('combobox').selectOption('lohi');

  // 3️⃣ Temporary explicit wait for UI update
  await page.waitForTimeout(1000);

  // 4️⃣ Get all product prices and convert to numbers
  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceStrings.map(price => parseFloat(price.replace('$', '')));

  // 5️⃣ Verification: assert prices are sorted ascending
  const sortedPrices = [...prices].sort((a, b) => a - b);
  await expect(prices).toEqual(sortedPrices);
});
