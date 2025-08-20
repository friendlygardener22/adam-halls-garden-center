'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { products } from '@/data/products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  care: string;
  featured: boolean;
  inStock?: boolean;
  rating?: number;
  reviews?: Review[];
  features?: string[];
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
  author: string;
  date: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (params?.category && params?.productId) {
      const foundProduct = products.find(
        (p: Product) => p.category === params.category && p.id === Number(params.productId)
      );
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <a href="/shop" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back to Shop</a>
        </div>
      </main>
    );
  }

  // Placeholder reviews and features if not present
  const reviews: Review[] = Array.isArray(product.reviews) ? product.reviews : [];
  const features: string[] = product.features || [];
  const averageRating = reviews.length > 0 ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length : 0;

  return (
    <main className="min-h-screen">
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image || '/images/logo.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="heading-1 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({reviews.length} reviews)
                </span>
              </div>

              <p className="text-2xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <label htmlFor="quantity" className="mr-4">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border-r"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border-l"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="btn btn-primary w-full mb-6 rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition">
                Add to Cart
              </button>

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex space-x-8">
                  <button
                    className={`pb-2 ${
                      activeTab === 'description'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`pb-2 ${
                      activeTab === 'care'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('care')}
                  >
                    Care Instructions
                  </button>
                  <button
                    className={`pb-2 ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Features</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {features.length > 0 ? features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      )) : <React.Fragment><li>No features listed.</li></React.Fragment>}
                    </ul>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Care Instructions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {product.care ? (
                        <div>{product.care}</div>
                      ) : (
                        <div>No care instructions listed.</div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
                    <div className="space-y-6">
                      {reviews.length > 0 ? reviews.map((review: Review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star: number) => (
                                <StarIcon
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {review.author} • {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      )) : <React.Fragment><li>No reviews available.</li></React.Fragment>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 