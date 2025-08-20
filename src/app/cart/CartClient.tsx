'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

type Product = {
  id: number;
  name: string;
  scientific?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
  availability?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function CartClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        // Get cart data from localStorage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const cartQuantities = JSON.parse(cartData);
          
          // Fetch product details for cart items
          const response = await fetch('/api/products');
          const products: Product[] = await response.json();
          
          const items: CartItem[] = [];
          for (const [productId, quantity] of Object.entries(cartQuantities)) {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
              items.push({ product, quantity: quantity as number });
            }
          }
          
          setCartItems(items);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      const cartData: { [key: number]: number } = {};
      cartItems.forEach(item => {
        cartData[item.product.id] = item.quantity;
      });
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }, [cartItems, loading]);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const applyPromoCode = () => {
    // Mock promo codes - in real app, this would validate against backend
    const promoCodes: { [key: string]: number } = {
      'WELCOME10': 10,
      'GARDEN20': 20,
      'SPRING15': 15,
    };

    const discount = promoCodes[promoCode.toUpperCase()];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount });
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0; // Free shipping over $100
  const tax = (subtotal - discount) * 0.0825; // 8.25% tax rate
  const total = subtotal - discount + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-green-900">Your Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={() => router.push('/shop')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="p-6">
                      <div className="flex items-center">
                        {/* Product Image */}
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={item.product.images?.[0] || '/images/plants/nursery-1.jpeg'}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h3>
                          {item.product.scientific && (
                            <p className="text-sm text-gray-500 italic">
                              {item.product.scientific}
                            </p>
                          )}
                          <p className="text-green-600 font-semibold">
                            ${item.product.price?.toFixed(2)}
                          </p>
                          {item.product.availability && (
                            <p className={`text-xs ${
                              item.product.availability === 'In Stock' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {item.product.availability}
                            </p>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="ml-6 text-right">
                          <p className="font-semibold text-gray-900">
                            ${((item.product.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-4 text-red-500 hover:text-red-700 p-2"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                    <span className="text-green-800 font-medium">
                      {appliedPromo.code} applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter code"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                disabled={cartItems.length === 0}
                className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Proceed to Checkout
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about your order? Contact our customer service team.
                </p>
                <button
                  onClick={() => router.push('/contact')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Contact Us →
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-900 mb-1">Free Shipping</h4>
                <p className="text-sm text-blue-700">
                  Orders over $100 ship free! Local pickup available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

