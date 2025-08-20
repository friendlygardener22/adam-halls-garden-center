'use client';

import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/data/products';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [sortBy, setSortBy] = useState('featured');
  const category = params.category;
  let filtered = products.filter(p => p.category === category);
  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen">
      <section className="section">
        <div className="container">
          <h1 className="heading-1 text-center mb-8 capitalize">{category}</h1>
          
          {/* Filters and Sort */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button className="btn btn-primary text-sm rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Message */}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found in this category.</p>
              <a href="/shop" className="btn btn-primary">
                View All Products
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 