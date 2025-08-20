'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/store/productsSlice'
import { useWishlist } from './WishlistContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToWishlist, wishlist } = useWishlist()

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900">
            <Link href={`/shop/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <button
            onClick={() => addToWishlist({ id: String(product.id), name: product.name, image: product.image })}
            className={`ml-2 text-pink-500 hover:text-pink-700 focus:outline-none ${wishlist.some(w => w.id === String(product.id)) ? 'font-bold' : ''}`}
            title={wishlist.some(w => w.id === String(product.id)) ? 'In Wishlist' : 'Add to Wishlist'}
            aria-label="Add to wishlist"
            disabled={wishlist.some(w => w.id === String(product.id))}
          >
            ♥
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })}
            className="btn-primary"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
} 