import { test, expect } from '@playwright/test';
import {
  registerUser,
  loginUser,
  deleteUser,
} from '../../core/auth/authHelpers';

test('successful register redirects to login page', async ({
  page,
  request,
}) => {
  const username = 'registeruser';
  const password = 'password123';

  await registerUser(page, username, password);

  await expect(page).toHaveURL('http://localhost:4200/login');

  const token = await loginUser(page, username, password);

  await expect(page).toHaveURL('http://localhost:4200/');
  await deleteUser(token, request);
});

test('display error messages for empty username and password', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/register');

  await page.click('#register-username-input');
  await page.click('#register-password-input');
  await page.click('#register-title');

  const usernameError = page.locator('#register-username-error');
  const passwordError = page.locator('#register-password-error');

  await expect(usernameError).toBeVisible();
  await expect(usernameError).toHaveText('Username is required');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password is required');
});

test('navigate to login page from register', async ({ page }) => {
  await page.goto('http://localhost:4200/register');

  await page.click('#login-link a');

  await expect(page).toHaveURL('http://localhost:4200/login');
});
