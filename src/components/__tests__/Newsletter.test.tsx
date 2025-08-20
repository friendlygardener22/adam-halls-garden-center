import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Newsletter from '../Newsletter'

describe('Newsletter', () => {
  it('renders newsletter form correctly', () => {
    render(<Newsletter />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })

    expect(emailInput).toBeInTheDocument()
    expect(subscribeButton).toBeInTheDocument()
  })

  it('shows success message after successful subscription', async () => {
    render(<Newsletter />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(subscribeButton)

    await waitFor(() => {
      expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument()
    })
  })

  it('shows error message for invalid email', async () => {
    render(<Newsletter />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(subscribeButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('disables button while submitting', async () => {
    render(<Newsletter />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(subscribeButton)

    expect(subscribeButton).toBeDisabled()
    expect(subscribeButton).toHaveTextContent('Subscribing...')

    await waitFor(() => {
      expect(subscribeButton).not.toBeDisabled()
      expect(subscribeButton).toHaveTextContent('Subscribe')
    })
  })
}) 