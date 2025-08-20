import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'
import type { CartItem } from '@/store/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart)

  const addItem = (item: CartItem) => {
    dispatch(addToCart(item))
  }

  const removeItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const clear = () => {
    dispatch(clearCart())
  }

  return {
    items: cart.items,
    total: cart.total,
    addItem,
    removeItem,
    updateItemQuantity,
    clear,
  }
} 