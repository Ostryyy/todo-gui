import { test, expect } from '@playwright/test';

test('should display login form and login successfully', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await expect(page.locator('mat-card-title')).toHaveText('Login');
  await page.fill('input[formControlName="username"]', 'testuser');
  await page.fill('input[formControlName="password"]', 'password');
  await page.click('button:has-text("Login")');

  await expect(page).toHaveURL('/home');
});
