'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import CloverPaymentForm from '@/components/CloverPaymentForm';

type Product = {
  id: number;
  name: string;
  scientific?: string;
  price?: number;
  images?: string[];
  availability?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pickupMethod: 'pickup' | 'delivery';
  specialInstructions: string;
};

export default function CheckoutClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    pickupMethod: 'pickup',
    specialInstructions: '',
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const cartQuantities = JSON.parse(cartData);
          
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

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
    const shipping = customerInfo.pickupMethod === 'delivery' ? 15 : 0;
    const tax = subtotal * 0.0825; // 8.25% tax rate
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  const handleCustomerInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || 
        !customerInfo.phone || !customerInfo.address || !customerInfo.city || 
        !customerInfo.state || !customerInfo.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async (paymentId: string, payment: any) => {
    setSubmitting(true);
    setPaymentError(null);

    try {
      // Prepare order data for checkout API
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price || 0,
          quantity: item.quantity,
          total: (item.product.price || 0) * item.quantity,
        })),
        customerInfo: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            street: customerInfo.address,
            city: customerInfo.city,
            state: customerInfo.state,
            zipCode: customerInfo.zipCode,
            country: 'USA',
          },
        },
        paymentMethod: {
          type: 'clover' as const,
          cardToken: paymentId, // Use payment ID as token for this example
        },
        shippingMethod: customerInfo.pickupMethod,
        specialInstructions: customerInfo.specialInstructions,
      };

      // Submit order to checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order');
      }

      // Generate order number
      const newOrderNumber = result.orderId || 'AH-' + Date.now().toString().slice(-6);
      setOrderNumber(newOrderNumber);

      // Clear cart
      localStorage.removeItem('cart');
      
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      setPaymentError(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const { subtotal, shipping, tax, total } = calculateTotals();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/shop')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We'll contact you soon to confirm the details.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600">Order Number:</p>
            <p className="font-semibold text-gray-900">{orderNumber}</p>
          </div>
          <button
            onClick={() => router.push('/shop')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
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
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-green-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {showPaymentForm ? 'Payment Information' : 'Customer Information'}
              </h2>
              
              {!showPaymentForm ? (
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      required
                      value={customerInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      required
                      value={customerInfo.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup or Delivery *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pickupMethod"
                        value="pickup"
                        checked={customerInfo.pickupMethod === 'pickup'}
                        onChange={(e) => handleInputChange('pickupMethod', e.target.value)}
                        className="mr-2"
                      />
                      <span>Pickup at Store (Free)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pickupMethod"
                        value="delivery"
                        checked={customerInfo.pickupMethod === 'delivery'}
                        onChange={(e) => handleInputChange('pickupMethod', e.target.value)}
                        className="mr-2"
                      />
                      <span>Local Delivery ($15)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    id="specialInstructions"
                    rows={3}
                    value={customerInfo.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special requests or instructions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Order Summary</h3>
                  <div className="text-sm text-blue-700">
                    <p><strong>Name:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
                    <p><strong>Email:</strong> {customerInfo.phone}</p>
                    <p><strong>Phone:</strong> {customerInfo.phone}</p>
                    <p><strong>Address:</strong> {customerInfo.address}, {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                    <p><strong>Delivery:</strong> {customerInfo.pickupMethod === 'delivery' ? 'Local Delivery' : 'Store Pickup'}</p>
                  </div>
                </div>

                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{paymentError}</p>
                  </div>
                )}

                <CloverPaymentForm
                  amount={total}
                  description={`Order from Adam Hall's Garden Center - ${cartItems.length} items`}
                  email={customerInfo.email}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="w-full mt-4 text-green-600 hover:text-green-700 text-sm"
                >
                  ← Back to Customer Information
                </button>
              </div>
            )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex items-center">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.product.images?.[0] || '/images/plants/nursery-1.jpeg'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${((item.product.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
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
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              {!showPaymentForm && (
                <button
                  onClick={handleCustomerInfoSubmit}
                  disabled={submitting}
                  className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {submitting ? 'Processing...' : 'Continue to Payment'}
                </button>
              )}

              {showPaymentForm && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm text-center">
                    Please complete your payment information on the left to place your order.
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing this order, you agree to our terms and conditions.
                We'll contact you to confirm your order details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

