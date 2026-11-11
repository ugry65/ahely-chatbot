const {defineConfig, devices} = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {headless: true, channel: process.env.CI ? 'chrome' : undefined},
  projects: [
    {name: 'desktop', use: {viewport: {width: 1280, height: 900}}},
    {name: 'mobile', use: {...devices['iPhone 13'], defaultBrowserType: 'chromium'}}
  ]
});
