import { test, expect } from '@playwright/test'

const apps = [
  { name: 'React', url: 'http://localhost:3030' },
  { name: 'Svelte', url: 'http://localhost:3031' },
]

for (const app of apps) {
  test.describe(`Cat Generator - ${app.name}`, () => {
    test('should load initial cat data and generate new facts', async ({ page }) => {
      await page.goto(app.url)

      // Wait for initial cat image and fact to load
      await page.waitForSelector('.cat-image', { state: 'visible' })
      await page.waitForSelector('.fact-container p', { state: 'visible' })

      const initialImageSrc = await page.locator('.cat-image').getAttribute('src')
      const initialFact = await page.locator('.fact-container p').textContent()

      expect(initialImageSrc).toBeTruthy()
      expect(initialFact).toBeTruthy()
      expect(initialFact.length).toBeGreaterThan(10)

      // Click the new fact button
      await page.locator('button.fact-btn').click()

      // React and Svelte use slightly different loading indicators
      if (app.name === 'React') {
        await page.waitForSelector('.loading-text', { state: 'visible', timeout: 5000 })
        await page.waitForSelector('.loading-text', { state: 'hidden', timeout: 5000 })
      } else {
        // For Svelte, wait for the loading state to be applied and then removed
        await expect(page.locator('button.fact-btn')).toBeDisabled({ timeout: 5000 })
        await expect(page.locator('button.fact-btn')).toBeEnabled({ timeout: 5000 })
      }

      // Get the updated fact text
      const updatedFact = await page.locator('.fact-container p').textContent()

      // Verify the fact has changed
      expect(updatedFact).toBeTruthy()
      expect(updatedFact).not.toEqual(initialFact)
    })

    test('should generate new cat images with titles', async ({ page }) => {
      await page.goto(app.url)

      // Wait for initial cat image and title to load
      await page.waitForSelector('.cat-image', { state: 'visible' })
      await page.waitForSelector('.image-container h2', { state: 'visible' })

      const initialImageSrc = await page.locator('.cat-image').getAttribute('src')
      const initialTitle = await page.locator('.image-container h2').textContent()

      expect(initialImageSrc).toBeTruthy()
      expect(initialTitle).toBeTruthy()
      expect(initialTitle.length).toBeGreaterThan(0)

      // Click the new image button
      await page.locator('button.image-btn').click()

      // React and Svelte use slightly different loading indicators
      if (app.name === 'React') {
        await page.waitForSelector('.loading', { state: 'visible', timeout: 5000 })
        await page.waitForSelector('.loading', { state: 'hidden', timeout: 5000 })
      } else {
        // For Svelte, wait for the loading state to be applied and then removed
        await expect(page.locator('button.image-btn')).toBeDisabled({ timeout: 5000 })
        await expect(page.locator('button.image-btn')).toBeEnabled({ timeout: 5000 })
      }

      // Get the updated image source and title
      const updatedImageSrc = await page.locator('.cat-image').getAttribute('src')
      const updatedTitle = await page.locator('.image-container h2').textContent()

      // Verify the image and title have changed
      expect(updatedImageSrc).toBeTruthy()
      expect(updatedTitle).toBeTruthy()
      expect(updatedImageSrc).not.toEqual(initialImageSrc)
    })

    test('should disable buttons during loading states', async ({ page }) => {
		await page.goto(app.url)
	  
		// Wait for initial cat image and fact to load
		await page.waitForSelector('.cat-image', { state: 'visible' })
		await page.waitForSelector('.fact-container p', { state: 'visible' })
	  
		// Ensure buttons are initially enabled
		await expect(page.locator('button.fact-btn')).toBeEnabled()
		await expect(page.locator('button.image-btn')).toBeEnabled()
	  
		// Test fact button loading state
		const factBtnPromise = page.waitForFunction(() => {
		  const btn = document.querySelector('button.fact-btn');
		  return btn && btn.disabled === true;
		}, { timeout: 5000 });
		
		await page.locator('button.fact-btn').click();
		await factBtnPromise;
		
		// Verify fact button is disabled during loading
		await expect(page.locator('button.fact-btn')).toBeDisabled();
	  
		// Wait for loading to complete
		if (app.name === 'React') {
		  await page.waitForSelector('.loading-text', { state: 'hidden', timeout: 5000 });
		} else {
		  await page.waitForFunction(() => {
			const btn = document.querySelector('button.fact-btn');
			return btn && btn.disabled === false;
		  }, { timeout: 5000 });
		}
	  
		// Verify fact button is re-enabled
		await expect(page.locator('button.fact-btn')).toBeEnabled();
	  
		// Test image button loading state
		const imageBtnPromise = page.waitForFunction(() => {
		  const btn = document.querySelector('button.image-btn');
		  return btn && btn.disabled === true;
		}, { timeout: 5000 });
		
		await page.locator('button.image-btn').click();
		await imageBtnPromise;
		
		// Verify image button is disabled during loading
		await expect(page.locator('button.image-btn')).toBeDisabled();
	  
		// Wait for loading to complete
		if (app.name === 'React') {
		  await page.waitForSelector('.loading', { state: 'hidden', timeout: 5000 });
		} else {
		  await page.waitForFunction(() => {
			const btn = document.querySelector('button.image-btn');
			return btn && btn.disabled === false;
		  }, { timeout: 5000 });
		}
	  
		// Verify both buttons are enabled after loading completes
		//Should be Enabled
		await expect(page.locator('button.fact-btn')).toBeEnabled();
		await expect(page.locator('button.image-btn')).toBeEnabled();
	  })
  })
}