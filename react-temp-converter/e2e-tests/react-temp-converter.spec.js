import { test, expect } from '@playwright/test';

test.describe('Temperature Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should convert celsius to fahrenheit', async ({ page }) => {
    const celsiusInput = page.locator('#celsius');
    const fahrenheitInput = page.locator('#fahrenheit');

    // Initial state check
    await expect(celsiusInput).toHaveValue('0');
    await expect(fahrenheitInput).toHaveValue('32');

    // Change Celsius input to 100
    await celsiusInput.fill('100');

    // Check if Fahrenheit is updated correctly
    await expect(fahrenheitInput).toHaveValue('212.00');
  });

  test('should convert fahrenheit to celsius', async ({ page }) => {
    const celsiusInput = page.locator('#celsius');
    const fahrenheitInput = page.locator('#fahrenheit');

    // Initial state check
    await expect(celsiusInput).toHaveValue('0');
    await expect(fahrenheitInput).toHaveValue('32');

    // Change Fahrenheit input to 212
    await fahrenheitInput.fill('212');

    // Check if Celsius is updated correctly
    await expect(celsiusInput).toHaveValue('100.00');
  });
});