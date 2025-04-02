import { test, expect } from '@playwright/test'

const apps = [{ name: 'Svelte', url: 'http://localhost:3031' }]

for (const app of apps) {
	test.describe(`Cat Generator - ${app.name}`, () => {
	  test('should load initial cat data and generate new facts', async ({ page }) => {
		// Navigate to the application
		await page.goto(app.url)
  
		// Wait for initial data to load
		await page.waitForSelector('.cat-image', { state: 'visible' })
		await page.waitForSelector('.fact-container p', { state: 'visible' })
  
		// Capture initial state
		const initialImageSrc = await page.locator('.cat-image').getAttribute('src')
		const initialFact = await page.locator('.fact-container p').textContent()
  
		// Verify initial state has valid data
		expect(initialImageSrc).toBeTruthy()
		expect(initialFact.length).toBeGreaterThan(10)
  
		// Click "NEW CAT FACT" button
		await page.locator('button.fact-btn').click()
  
		// Wait for new fact to load
		await page.waitForSelector('.loading-text', { state: 'visible' })
		await page.waitForSelector('.loading-text', { state: 'hidden' })
  
		// Capture updated state
		const updatedFact = await page.locator('.fact-container p').textContent()
  
		// Verify fact has changed
		expect(updatedFact).not.toEqual(initialFact)
	  })
  
	  test('should generate new cat images with titles', async ({ page }) => {
		// Navigate to the application
		await page.goto(app.url)
  
		// Wait for initial data to load
		await page.waitForSelector('.cat-image', { state: 'visible' })
		await page.waitForSelector('.image-container h2', { state: 'visible' })
  
		// Capture initial state
		const initialImageSrc = await page.locator('.cat-image').getAttribute('src')
		const initialTitle = await page.locator('.image-container h2').textContent()
  
		// Verify initial state has valid data
		expect(initialImageSrc).toBeTruthy()
		expect(initialTitle.length).toBeGreaterThan(0)
  
		// Click "NEW CAT IMAGE" button
		await page.locator('button.image-btn').click()
  
		// Wait for new image to load
		await page.waitForSelector('.loading', { state: 'visible' })
		await page.waitForSelector('.loading', { state: 'hidden' })
  
		// Capture updated state
		const updatedImageSrc = await page.locator('.cat-image').getAttribute('src')
		const updatedTitle = await page.locator('.image-container h2').textContent()
  
		// Verify image and title have changed
		expect(updatedImageSrc).not.toEqual(initialImageSrc)
		expect(updatedTitle).not.toEqual(initialTitle)
	  })
  
	  test('should disable buttons during loading states', async ({ page }) => {
		// Navigate to the application
		await page.goto(app.url)
  
		// Wait for initial load to complete
		await page.waitForSelector('.cat-image', { state: 'visible' })
		await page.waitForSelector('.fact-container p', { state: 'visible' })
  
		// Click "NEW CAT FACT" button
		await page.locator('button.fact-btn').click()
  
		// Verify button is disabled during loading
		await expect(page.locator('button.fact-btn')).toBeDisabled()
  
		// Wait for loading to complete
		await page.waitForSelector('.loading-text', { state: 'hidden' })
  
		// Verify button is re-enabled
		await expect(page.locator('button.fact-btn')).toBeEnabled()
	  })
	})
  }