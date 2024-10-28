import { test, expect } from '@playwright/test';
import {
  registerUser,
  loginUser,
  deleteUser,
} from '../../core/auth/authHelpers';

test('successful login redirects to home page', async ({ page, request }) => {
  const username = 'loginuser';
  const password = 'password123';

  await registerUser(page, username, password);
  const token = await loginUser(page, username, password);

  await expect(page).toHaveURL('http://localhost:4200/');

  await deleteUser(token, request);
});

test('display error messages for empty username and password', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/login');

  await page.click('#username-input');
  await page.click('#password-input');
  await page.click('#login-title');

  const usernameError = page.locator('#username-error');
  const passwordError = page.locator('#password-error');

  await expect(usernameError).toBeVisible();
  await expect(usernameError).toHaveText('Username is required');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password is required');
});

test('display error message for invalid login credentials', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('#username-input', 'invaliduser');
  await page.fill('#password-input', 'wrongpassword');
  await page.click('#login-button');

  const errorMessage = page.locator('#login-message.alert-danger');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Invalid credentials');
});

test('navigate to registration page from login', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.click('#register-link a');

  await expect(page).toHaveURL('http://localhost:4200/register');
});
