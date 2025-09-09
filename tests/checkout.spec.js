import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('End-to-End Checkout Flow', async ({ page }) => {
  // Set timeouts
  test.setTimeout(120000); // 2 min for the whole test
  page.setDefaultTimeout(30000); // 30s for each locator action

  // Instantiate Page Objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Add items
  await inventoryPage.addBackpack();
  await inventoryPage.addBikeLight();

  // 3. Go to cart
  await inventoryPage.goToCart();

  // 4. Checkout
  await cartPage.checkout();
  await checkoutPage.fillDetails('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  // 5. Verify order success
  await expect(checkoutPage.successMessage).toBeVisible();
});
