import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import ProductCard from '../ProductCard'
import cartReducer from '../../store/cartSlice'

const mockProduct = {
  id: '1',
  name: 'Test Plant',
  description: 'A beautiful test plant',
  price: 29.99,
  image: '/test-image.jpg',
  category: 'plants',
  inStock: true,
}

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  })
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const store = createMockStore()
    
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    )

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image)
  })

  it('disables add to cart button when product is out of stock', () => {
    const store = createMockStore()
    const outOfStockProduct = { ...mockProduct, inStock: false }
    
    render(
      <Provider store={store}>
        <ProductCard product={outOfStockProduct} />
      </Provider>
    )

    const addToCartButton = screen.getByRole('button')
    expect(addToCartButton).toBeDisabled()
    expect(addToCartButton).toHaveTextContent('Out of Stock')
  })

  it('enables add to cart button when product is in stock', () => {
    const store = createMockStore()
    
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    )

    const addToCartButton = screen.getByRole('button')
    expect(addToCartButton).not.toBeDisabled()
    expect(addToCartButton).toHaveTextContent('Add to Cart')
  })
}) 