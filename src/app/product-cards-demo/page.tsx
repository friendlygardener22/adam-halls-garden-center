'use client';

import React, { useState, useEffect } from 'react';
import ProductCardEnhanced from '@/components/ProductCardEnhanced';

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  scientific?: string;
  product_card?: {
    card_image: string;
    card_html: string;
    spin_animation: string;
    rounded_card: string;
  };
  images: string[];
  description?: string;
}

const ProductCardsDemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Filter to show products with cards first, then others
        const productsWithCards = data.products.filter((p: Product) => p.product_card);
        const otherProducts = data.products.filter((p: Product) => !p.product_card).slice(0, 5);
        
        setProducts([...productsWithCards, ...otherProducts]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Cards Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing the new product card system with interactive animations, 
            multiple card variants, and enhanced user experience.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-2xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Multiple Card Variants</h3>
            <p className="text-gray-600">Switch between different card styles with interactive buttons.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-2xl mb-3">✨</div>
            <h3 className="text-lg font-semibold mb-2">Spin Animations</h3>
            <p className="text-gray-600">Toggle beautiful spin animations on product cards.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-2xl mb-3">🛒</div>
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-gray-600">Add to cart and view details with smooth hover effects.</p>
          </div>
        </div>

        {/* Products with Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products with Enhanced Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(product => product.product_card)
              .map((product) => (
                <ProductCardEnhanced
                  key={product.id}
                  product={product}
                  className="w-full"
                />
              ))}
          </div>
        </div>

        {/* Regular Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Regular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(product => !product.product_card)
              .map((product) => (
                <ProductCardEnhanced
                  key={product.id}
                  product={product}
                  className="w-full"
                />
              ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use Product Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Interactive Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Hover</strong> over cards to see animations and details</li>
                <li>• <strong>Click</strong> the refresh icon to toggle spin animations</li>
                <li>• <strong>Click</strong> the image icon to switch card variants</li>
                <li>• <strong>Click</strong> "Add to Cart" for quick purchase</li>
                <li>• <strong>Click</strong> anywhere else to view product details</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Card Variants</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Default Card:</strong> Standard product card layout</li>
                <li>• <strong>Rounded Card:</strong> Alternative rounded design</li>
                <li>• <strong>Animated Card:</strong> Cards with spin animations</li>
                <li>• <strong>Enhanced Info:</strong> Scientific names and categories</li>
                <li>• <strong>Quick Actions:</strong> Add to cart and view details</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCardsDemo;
