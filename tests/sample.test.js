// tests/sample.test.js
const { test, expect } = require('@playwright/test');
test('Successful login test', async ({ page }) => {
 await page.goto('https://opensource-demo.orangehrmlive.com/');
 await expect(page).toHaveTitle('OrangeHRM');
});
test('Failed login test', async ({ page }) => {
 await page.goto('https://opensource-demo.orangehrmlive.com/');
 // This will fail intentionally
 await expect(page).toHaveTitle('Wrong Title');
});