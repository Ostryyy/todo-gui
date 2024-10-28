import { APIRequestContext, Page, expect } from '@playwright/test';

export async function registerUser(
  page: Page,
  username: string,
  password: string
) {
  await page.goto('http://localhost:4200/register');

  await page.fill('#register-username-input', username);
  await page.fill('#register-password-input', password);
  await page.click('#register-button');

  await page.waitForURL('http://localhost:4200/login');
}

export async function loginUser(
  page: Page,
  username: string,
  password: string
): Promise<string> {
  await page.goto('http://localhost:4200/login');

  await page.fill('#username-input', username);
  await page.fill('#password-input', password);
  await page.click('#login-button');

  await page.waitForURL('http://localhost:4200/');

  const token = await page.evaluate(() => localStorage.getItem('token') || '');
  return token || '';
}

export async function deleteUser(token: string, request: APIRequestContext) {
  const response = await request.delete(`http://localhost:4200/api/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.ok()).toBeTruthy();
}
