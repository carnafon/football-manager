import { test, expect } from '@playwright/test';

test('home page shows Manager Dashboard heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Manager Dashboard');
});
