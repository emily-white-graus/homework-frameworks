import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
	vi,
	describe,
	test,
	expect,
	beforeAll,
	afterEach,
	afterAll,
} from 'vitest'
import TemperatureConverter from '../TemperatureConverter'

// Mock server setup with initial responses
const server = setupServer(
	// Initial cat fact response
	http.get('https://catfact.ninja/fact', () => {
		return HttpResponse.json({
			fact: 'The average cat sleeps 16-18 hours per day.',
			length: 42,
		})
	}),

	// Initial cat image response
	http.get('https://api.thecatapi.com/v1/images/search', () => {
		return HttpResponse.json([
			{
				id: 'cat-id-123',
				url: 'https://example.com/initial-cat.jpg',
				width: 600,
				height: 400,
			},
		])
	}),
)

// Setup and teardown
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Cat Generator App', () => {
	test('renders initial loading states and then displays fetched cat data', async () => {
		render(<TemperatureConverter />)

		// Initially, loading indicators should be visible
		expect(screen.getByText('Loading fact...')).toBeInTheDocument()
		expect(screen.getByText('Loading image...')).toBeInTheDocument()

		// Wait for loading states to disappear
		await waitFor(() => {
			expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
			expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
		})

		// Check that fetched data is displayed
		expect(
			screen.getByText('The average cat sleeps 16-18 hours per day.'),
		).toBeInTheDocument()
		expect(screen.getByAltText('Random Cat')).toHaveAttribute(
			'src',
			'https://example.com/initial-cat.jpg',
		)
	})

	test("fetches and displays new cat fact when 'NEW CAT FACT' button is clicked", async () => {
		render(<TemperatureConverter />)

		// Wait for initial data to load
		await waitFor(() => {
			expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
		})

		// Setup server to return a new cat fact
		server.use(
			http.get('https://catfact.ninja/fact', () => {
				return HttpResponse.json({
					fact: 'Cats can rotate their ears 180 degrees.',
					length: 37,
				})
			}),
		)

		// Click the "NEW CAT FACT" button
		fireEvent.click(screen.getByText('NEW CAT FACT'))

		// The loading state should appear
		expect(screen.getByText('Loading fact...')).toBeInTheDocument()

		// Wait for the new data to load
		await waitFor(() => {
			expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
		})

		// The new fact should be displayed
		expect(
			screen.getByText('Cats can rotate their ears 180 degrees.'),
		).toBeInTheDocument()
	})

	test("fetches and displays new cat image with updated title when 'NEW CAT IMAGE' button is clicked", async () => {
		// Control the randomness for predictable title selection
		const originalRandom = Math.random
		Math.random = vi.fn(() => 0.3)

		render(<TemperatureConverter />)

		// Wait for initial data to load
		await waitFor(() => {
			expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
		})

		// Set up server to return a new cat image
		server.use(
			http.get('https://api.thecatapi.com/v1/images/search', () => {
				return HttpResponse.json([
					{
						id: 'cat-id-456',
						url: 'https://example.com/new-cat.jpg',
						width: 700,
						height: 500,
					},
				])
			}),
		)

		// Click the "NEW CAT IMAGE" button
		fireEvent.click(screen.getByText('NEW CAT IMAGE'))

		// The loading state should appear
		expect(screen.getByText('Loading image...')).toBeInTheDocument()

		// Wait for the new image to load
		await waitFor(() => {
			expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
		})

		// Check the new image is displayed
		expect(screen.getByAltText('Random Cat')).toHaveAttribute(
			'src',
			'https://example.com/new-cat.jpg',
		)

		// Clean up mock
		Math.random = originalRandom
	})
})
