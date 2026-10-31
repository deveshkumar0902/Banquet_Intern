import { defineConfig, devices } from '@playwright/test';

// The API runs with an in-memory database and no SMTP (emails are logged), and a raised
// rate limit because every test submits from the same IP.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: { baseURL: 'http://localhost:5173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: 'npm run start -w apps/api',
      url: 'http://localhost:4000/api/health',
      reuseExistingServer: !process.env.CI,
      env: {
        NODE_ENV: 'test',
        DATABASE_PATH: ':memory:',
        PORT: '4000',
        RATE_LIMIT_MAX: '1000',
        LOG_LEVEL: 'warn',
      },
    },
    {
      command: 'npm run dev -w apps/web',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
