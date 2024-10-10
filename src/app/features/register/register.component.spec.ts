import { test, expect } from '@playwright/test';

test('should display registration form and register successfully', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/register');

  await expect(page.locator('mat-card-title')).toHaveText('Register');
  await page.fill('input[formControlName="username"]', 'newuser');
  await page.fill('input[formControlName="password"]', 'password');
  await page.click('button:has-text("Register")');

  await expect(page).toHaveURL('/login');
});
