import { expect, test } from '@playwright/test';

test('contact form submits and shows the success message', async ({ page }) => {
  await page.goto('/contact');
  const form = page.getByRole('form', { name: 'Contact form' });
  await form.getByLabel(/Your name/).fill('E2E Contact');
  await form.getByLabel(/^Phone/).fill('+91 98765 43210');
  await form.getByLabel(/^Email/).fill('e2e@example.com');
  await form.getByLabel(/Subject/).fill('Site visit');
  await form.getByLabel(/Message/).fill('Could we visit next Saturday morning?');
  const response = page.waitForResponse('**/api/contact');
  await form.getByRole('button', { name: 'Send message' }).click();
  expect((await response).status()).toBe(201);
  await expect(page.getByText('Thank you, E2E Contact.')).toBeVisible();
});
