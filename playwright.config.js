// @ts-check
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e-tests',
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',
	use: {
		headless: true,
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],

	webServer: [
		{
			command: 'cd react-cat-generator && npm run dev -- --port=3030',
			url: 'http://localhost:3030',
			reuseExistingServer: !process.env.CI,
		},
		{
			command: 'cd svelte-cat-generator && npm run dev -- --port=3031',
			url: 'http://localhost:3031',
			reuseExistingServer: !process.env.CI,
		},
	],
})
