// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // all your .spec.js files live here
  fullyParallel: true,             // run test files in parallel
  forbidOnly: !!process.env.CI,    // prevent accidental test.only in CI
  retries: process.env.CI ? 2 : 0, // retry failed tests on CI
  workers: process.env.CI ? 1 : undefined, // local = auto workers, CI = single worker

  // Reporters
  reporter: [
 ['list'], // Console reporter
 ['allure-playwright', {
 outputFolder: 'allure-results',
 }]
 ],
  use: {
    baseURL: 'https://www.saucedemo.com/', // so you can use page.goto('/')
    trace: 'on-first-retry',               // collect trace on retry
    screenshot: 'only-on-failure',         // take screenshots if test fails
    video: 'retain-on-failure',            // record video for failed tests
    headless: true                         // run headless by default
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
