import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Cart from '../Cart'
import cartReducer from '../../store/cartSlice'

const mockCartItems = [
  {
    id: 1,
    name: 'Test Plant 1',
    price: 29.99,
    image: '/test-image-1.jpg',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Test Plant 2',
    price: 39.99,
    image: '/test-image-2.jpg',
    quantity: 1,
  },
]

const createMockStore = (initialState = { items: [] }) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: initialState,
    },
  })
}

describe('Cart', () => {
  it('renders empty cart message when cart is empty', () => {
    const store = createMockStore()
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders cart items correctly', () => {
    const store = createMockStore({ items: mockCartItems })
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    mockCartItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument()
      expect(screen.getByDisplayValue(item.quantity.toString())).toBeInTheDocument()
    })
  })

  it('displays correct total price', () => {
    const store = createMockStore({ items: mockCartItems })
    const expectedTotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    expect(screen.getByText(`$${expectedTotal.toFixed(2)}`)).toBeInTheDocument()
  })

  it('allows quantity updates', () => {
    const store = createMockStore({ items: mockCartItems })
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    const quantityInput = screen.getByDisplayValue('2')
    fireEvent.change(quantityInput, { target: { value: '3' } })
    
    expect(quantityInput).toHaveValue(3)
  })
}) 