import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig(({ mode }) => ({
	plugins: [svelte(), svelteTesting()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/setupTests.js'],
	},
}))
