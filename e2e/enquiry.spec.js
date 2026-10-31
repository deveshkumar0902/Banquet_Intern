import { expect, test } from '@playwright/test';
import { futureDate } from './helpers.js';

async function fill(form, name) {
  await form.getByLabel(/Your name/).fill(name);
  await form.getByLabel(/^Phone/).fill('98765 43210');
  await form.getByLabel(/Event type/).selectOption('Wedding');
  await form.getByLabel(/Event date/).fill(futureDate());
  await form.getByLabel(/Guests/).fill('300');
}

test('hero enquiry form submits and shows the success message', async ({ page }) => {
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Enquiry form' });
  await fill(form, 'E2E Hero');
  const response = page.waitForResponse('**/api/enquiries');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  expect((await response).status()).toBe(201);
  await expect(page.getByText('Thank you, E2E Hero.')).toBeVisible();
});

test('invalid submit shows errors and sends nothing', async ({ page }) => {
  let posted = false;
  page.on('request', (r) => r.url().includes('/api/enquiries') && (posted = true));
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Enquiry form' });
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(form.getByText('Please enter your name')).toBeVisible();
  await expect(form.getByRole('alert')).toContainText('Please check the highlighted fields');
  await expect(form.getByLabel(/Your name/)).toBeFocused();
  expect(posted).toBe(false);
});

test('a services CTA pre-fills the event type on the contact page', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: /Enquire about a corporate event/ }).click();
  await expect(page).toHaveURL(/\/contact\?event=Corporate(%20|\+)Event#enquiry/);
  await expect(page.locator('#enquiry-eventType')).toHaveValue('Corporate Event');
});

test('a venue page pre-selects that venue', async ({ page }) => {
  await page.goto('/venues/elegance-hall');
  await expect(page.locator('#venue-venue')).toHaveValue('elegance-hall');
});
