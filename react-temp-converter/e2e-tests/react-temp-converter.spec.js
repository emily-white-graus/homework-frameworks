import { test, expect } from '@playwright/test'

const apps = [
	{ name: 'React', url: 'http://localhost:5173' },
]

for (const app of apps) {
	test.describe(`Temperature Converter - ${app.name}`, () => {
		test('should convert celsius to fahrenheit', async ({ page }) => {
			// Navigate to the application
			await page.goto(app.url)

			// Initial state check
			await expect(page.locator('#celsius')).toHaveValue('0')
			await expect(page.locator('#fahrenheit')).toHaveValue('32')

			// Change Celsius input to 100
			await page.locator('#celsius').fill('100')

			// Check if Fahrenheit is updated correctly
			await expect(page.locator('#fahrenheit')).toHaveValue('212.00')
		})

		test('should convert fahrenheit to celsius', async ({ page }) => {
			// Navigate to the application
			await page.goto(app.url)

			// Initial state check
			await expect(page.locator('#celsius')).toHaveValue('0')
			await expect(page.locator('#fahrenheit')).toHaveValue('32')

			// Change Fahrenheit input to 212
			await page.locator('#fahrenheit').fill('212')

			// Check if Celsius is updated correctly
			await expect(page.locator('#celsius')).toHaveValue('100.00')
		})
	})
}
