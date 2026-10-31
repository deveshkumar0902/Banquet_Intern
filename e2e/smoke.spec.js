import { expect, test } from '@playwright/test';
import { ALL_PATHS, trackErrors } from './helpers.js';

for (const path of ALL_PATHS) {
  test(`${path} renders with one h1 and no console errors`, async ({ page }) => {
    const errors = trackErrors(page);
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/Dev Marriage Hall/);
    expect(errors).toEqual([]);
  });
}

test('unknown routes show the Not Found page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});
