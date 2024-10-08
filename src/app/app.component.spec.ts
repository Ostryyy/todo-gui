import { test, expect } from '@playwright/test';

test('should display the toolbar with To-Do App title', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const toolbar = page.locator('mat-toolbar');
  await expect(toolbar).toBeVisible();
  await expect(toolbar).toHaveText('To-Do App');
});

test('should display the button with "Test" text', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const button = page.locator('#test-button');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Test');
});
