import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TemperatureConverter from '../TemperatureConverter'

describe('TemperatureConverter', () => {
	// Test 1: Component renders correctly?
	it('renders the component with default values', () => {
		render(<TemperatureConverter />)

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
	it('converts Celsius to Fahrenheit correctly', () => {
		render(<TemperatureConverter />)

		const celsiusInput = screen.getByLabelText(/celsius/i)

		// Canvia Celsius a 100 (messed up test, should be 100)
		fireEvent.change(celsiusInput, { target: { value: '200' } })

		// Fahrenheit hauria de ser 212
		const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)
		expect(fahrenheitInput).toHaveValue(212)
	})

	// Test 3: Fahrenheit to Celsius?
	it('converts Fahrenheit to Celsius correctly', () => {
		render(<TemperatureConverter />)

		const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

		// Canvia Fahrenheit a 212
		fireEvent.change(fahrenheitInput, { target: { value: '212' } })

		// Celsius hauria de ser 100
		const celsiusInput = screen.getByLabelText(/celsius/i)
		expect(celsiusInput).toHaveValue(100)
	})
})
