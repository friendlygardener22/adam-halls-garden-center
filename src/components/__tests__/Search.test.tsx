import { render, screen, fireEvent } from '@testing-library/react'
import Search from '../Search'

describe('Search', () => {
  it('renders search input correctly', () => {
    const mockOnSearch = jest.fn()
    render(<Search onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search plants, tools, and more...')
    expect(searchInput).toBeInTheDocument()
  })

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn()
    render(<Search onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search plants, tools, and more...')
    const searchForm = searchInput.closest('form')

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.submit(searchForm!)

    expect(mockOnSearch).toHaveBeenCalledWith('test search')
  })

  it('clears input after search', () => {
    const mockOnSearch = jest.fn()
    render(<Search onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search plants, tools, and more...')
    const searchForm = searchInput.closest('form')

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.submit(searchForm!)

    expect(searchInput).toHaveValue('')
  })
}) 