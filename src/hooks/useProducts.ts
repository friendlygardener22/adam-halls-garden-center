import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  setProducts,
  setLoading,
  setError,
  updateProduct,
  removeProduct,
} from '@/store/productsSlice'
import type { Product } from '@/store/productsSlice'

export const useProducts = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state: RootState) => state.products)

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true))
      // TODO: Replace with actual API call
      const response = await fetch('/api/products')
      const data = await response.json()
      dispatch(setProducts(data))
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products'))
    }
  }

  const updateItem = (product: Product) => {
    dispatch(updateProduct(product))
  }

  const removeItem = (id: number) => {
    dispatch(removeProduct(id))
  }

  return {
    products: items,
    loading,
    error,
    fetchProducts,
    updateItem,
    removeItem,
  }
} 