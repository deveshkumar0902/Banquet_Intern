import { expect, test } from '@playwright/test';
import { mainNav } from './helpers.js';

// Regression for audit bug #12: nav links were #anchors that only worked on the home page.
test('header links work from /gallery', async ({ page }) => {
  await page.goto('/gallery');
  await (await mainNav(page)).getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1, name: 'About Us' })).toBeVisible();

  await page.goto('/gallery');
  await (await mainNav(page)).getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Contact & Enquiries' })).toBeVisible();

  await page.goto('/gallery');
  await (await mainNav(page)).getByRole('link', { name: 'FAQ' }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Frequently Asked/ })).toBeVisible();
});

test('a home-page anchor works when arriving from another page', async ({ page }) => {
  await page.goto('/gallery');
  await page.goto('/#faq');
  await expect(page.locator('#faq')).toBeInViewport();
});

test('Enquire Now from an inner page lands on the contact enquiry form', async ({
  page,
  isMobile,
}) => {
  await page.goto('/gallery');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: 'Enquire Now' }).click();
  } else {
    await page.getByRole('banner').getByRole('link', { name: 'Enquire Now' }).click();
  }
  await expect(page).toHaveURL(/\/contact#enquiry$/);
  await expect(page.locator('#enquiry')).toBeInViewport();
});

test('mobile drawer opens, navigates and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const drawer = page.getByRole('dialog', { name: 'Menu' });
  await expect(drawer).toBeVisible();
  await drawer.getByRole('link', { name: 'Packages' }).click();
  await expect(drawer).toBeHidden();
  await expect(page.getByRole('heading', { level: 1, name: 'Event Packages' })).toBeVisible();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
