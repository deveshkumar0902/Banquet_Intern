import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ALL_PATHS } from './helpers.js';

for (const path of [...ALL_PATHS, '/not-a-page']) {
  test(`${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = violations
      .filter((v) => ['serious', 'critical'].includes(v.impact))
      .map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target.join(' ')).slice(0, 5),
      }));
    expect(blocking).toEqual([]);
  });
}
