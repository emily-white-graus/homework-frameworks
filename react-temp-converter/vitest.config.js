import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['./src/setupTests.js'],
		exclude: ['node_modules/*', 'e2e-tests/', '*/playwright.config.js'],
	},
})
