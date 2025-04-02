import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte()],
	test: {
		exclude: [
			'node_modules/**',
			'e2e/**',
			'tests/e2e/**',
			'**/playwright.config.js',
		],
	},
})
