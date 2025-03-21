import { render, screen, cleanup } from '@testing-library/svelte'
import { describe, it, expect, afterEach } from 'vitest'
import TemperatureConverter from '../TemperatureConverter.svelte'
import user from '@testing-library/user-event'

describe('TemperatureConverter', () => {
	afterEach(cleanup)
	// Test 1: Component renders correctly?
	it('renders the component with default values', () => {
		render(TemperatureConverter, {})

		// Comprova si el títol es mostra
		expect(screen.getByText('Temperature Converter')).toBeInTheDocument()

		// Comprova si els camps d'entrada existeixen
		expect(screen.getByLabelText(/celsius/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/fahrenheit/i)).toBeInTheDocument()

		// Comprova els valors per defecte
		expect(screen.getByLabelText(/celsius/i)).toHaveValue(0)
		expect(screen.getByLabelText(/fahrenheit/i)).toHaveValue(32)
	})

	// Test 2: Celsius to Fahrenheit?
	it('converts Celsius to Fahrenheit correctly', async () => {
		render(TemperatureConverter, {})

		const celsiusInput = screen.getByLabelText(/celsius/i)

		// Canvia Celsius a 100
		await user.type(celsiusInput, '100')

		// Fahrenheit hauria de ser 212
		const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)
		expect(fahrenheitInput).toHaveValue(212)
	})

	// Test 3: Fahrenheit to Celsius?
	it('converts Fahrenheit to Celsius correctly', async () => {
		render(TemperatureConverter, {})

		const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

		// Canvia Fahrenheit a 212
		await user.clear(fahrenheitInput)
		await user.type(fahrenheitInput, '212')

		// Celsius hauria de ser 100
		const celsiusInput = screen.getByLabelText(/celsius/i)
		expect(celsiusInput).toHaveValue(100)
	})
})
