'use client';

import React, { useState } from 'react';
import { useCloverPayment, CloverCardData } from '@/hooks/useCloverPayment';

interface CloverPaymentFormProps {
  amount: number;
  currency?: string;
  description?: string;
  email?: string;
  onSuccess: (paymentId: string, payment: any) => void;
  onError: (error: string) => void;
  className?: string;
}

export default function CloverPaymentForm({
  amount,
  currency = 'usd',
  description,
  email,
  onSuccess,
  onError,
  className = '',
}: CloverPaymentFormProps) {
  const { loading, error, processPayment } = useCloverPayment();
  const [cardData, setCardData] = useState<CloverCardData>({
    number: '',
    exp_month: 0,
    exp_year: 0,
    cvc: '',
    name: '',
  });

  const handleInputChange = (field: keyof CloverCardData, value: string | number) => {
    setCardData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('number', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!cardData.number || !cardData.exp_month || !cardData.exp_year || !cardData.cvc) {
      onError('Please fill in all required fields');
      return;
    }

    // Validate card number (basic check)
    const cleanNumber = cardData.number.replace(/\s/g, '');
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      onError('Please enter a valid card number');
      return;
    }

    // Validate expiration date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (cardData.exp_year < currentYear || 
        (cardData.exp_year === currentYear && cardData.exp_month < currentMonth)) {
      onError('Card has expired');
      return;
    }

    // Validate CVC
    if (cardData.cvc.length < 3 || cardData.cvc.length > 4) {
      onError('Please enter a valid CVC');
      return;
    }

    try {
      const result = await processPayment({
        amount,
        currency,
        cardData: {
          ...cardData,
          number: cleanNumber, // Remove spaces for processing
        },
        description,
        email,
        metadata: {
          source: 'web_checkout',
          timestamp: new Date().toISOString(),
        },
      });

      if (result.success && result.paymentId) {
        onSuccess(result.paymentId, result.payment);
      } else {
        onError(result.error || 'Payment failed');
      }
    } catch (err) {
      onError('Payment processing failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardName"
          value={cardData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Card Number *
        </label>
        <input
          type="text"
          id="cardNumber"
          value={cardData.number}
          onChange={handleCardNumberChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Month *
          </label>
          <select
            id="expMonth"
            value={cardData.exp_month || ''}
            onChange={(e) => handleInputChange('exp_month', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Year *
          </label>
          <select
            id="expYear"
            value={cardData.exp_year || ''}
            onChange={(e) => handleInputChange('exp_year', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
          CVC *
        </label>
        <input
          type="text"
          id="cvc"
          value={cardData.cvc}
          onChange={(e) => handleInputChange('cvc', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="123"
          maxLength={4}
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing Payment...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <div className="text-xs text-gray-500 text-center">
        Your payment is secured by Clover. We never store your card information.
      </div>
    </form>
  );
}
