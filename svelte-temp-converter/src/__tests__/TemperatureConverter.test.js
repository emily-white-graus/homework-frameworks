import { render, fireEvent, waitFor } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CatGenerator from './CatGenerator.svelte'

// Mock server setup
const server = setupServer(
  // Mock cat fact API
  rest.get('https://catfact.ninja/fact', ( res, ctx) => {
    return res(
      ctx.json({
        fact: 'Cats have five toes on their front paws, but only four on the back ones.',
        length: 69,
      }),
    )
  }),

  // Mock cat image API
  rest.get('https://api.thecatapi.com/v1/images/search', ( res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'https://example.com/cat-image.jpg',
          id: 'test-id-123',
          width: 640,
          height: 480,
        },
      ]),
    )
  }),
)

// Setup and teardown
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Cat Generator App (Svelte)', () => {
  test('Test 1: Should load initial cat fact and image on mount', async () => {
    render(CatGenerator)
    
    // Verify loading states appear first
    expect(screen.getByText('Loading fact...')).toBeInTheDocument()
    expect(screen.getByText('Loading image...')).toBeInTheDocument()
    
    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
      expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
    })
    
    // Verify the fact and image are displayed
    expect(
      screen.getByText('Cats have five toes on their front paws, but only four on the back ones.'),
    ).toBeInTheDocument()
    expect(screen.getByAltText('Random Cat')).toHaveAttribute(
      'src',
      'https://example.com/cat-image.jpg',
    )
  })

  test('Test 2: Should fetch a new cat fact when button is clicked', async () => {
    render(CatGenerator)
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
    })
    
    // Update the mock server to return a different fact
    server.use(
      rest.get('https://catfact.ninja/fact', ( res, ctx) => {
        return res(
          ctx.json({
            fact: 'A cat can jump 5 times its height in a single bound.',
            length: 52,
          }),
        )
      }),
    )
    
    // Click the "NEW CAT FACT" button
    fireEvent.click(screen.getByText('NEW CAT FACT'))
    
    // Verify loading state appears
    expect(screen.getByText('Loading fact...')).toBeInTheDocument()
    
    // Wait for new fact to load
    await waitFor(() => {
      expect(screen.queryByText('Loading fact...')).not.toBeInTheDocument()
    })
    
    // Verify the new fact is displayed
    expect(
      screen.getByText('A cat can jump 5 times its height in a single bound.'),
    ).toBeInTheDocument()
  })

  test('Test 3: Should fetch a new cat image and update title when button is clicked', async () => {
    // Mock Math.random to always return 0.5 for predictable title selection
    const originalRandom = Math.random
    Math.random = jest.fn(() => 0.5)
    
    render(CatGenerator)
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
    })
    
    // Capture the initial title for comparison
    const initialTitle = screen.getByRole('heading', { level: 2 }).textContent
    
    // Update the mock server to return a different image
    server.use(
      rest.get('https://api.thecatapi.com/v1/images/search', ( res, ctx) => {
        return res(
          ctx.json([
            {
              url: 'https://example.com/new-cat-image.jpg',
              id: 'test-id-456',
              width: 800,
              height: 600,
            },
          ]),
        )
      }),
    )
    
    // Click the "NEW CAT IMAGE" button
    fireEvent.click(screen.getByText('NEW CAT IMAGE'))
    
    // Verify loading state appears
    expect(screen.getByText('Loading image...')).toBeInTheDocument()
    
    // Wait for new image to load
    await waitFor(() => {
      expect(screen.queryByText('Loading image...')).not.toBeInTheDocument()
    })
    
    // Verify the new image is displayed
    expect(screen.getByAltText('Random Cat')).toHaveAttribute(
      'src',
      'https://example.com/new-cat-image.jpg',
    )
    
    // Verify the title has changed (since we fixed Math.random, we can predict it)
    const newTitle = screen.getByRole('heading', { level: 2 }).textContent
    expect(newTitle).not.toBe(initialTitle)
    
    // Restore original Math.random
    Math.random = originalRandom
  })
})