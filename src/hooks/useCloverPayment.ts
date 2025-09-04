import { useState, useCallback } from 'react';

export interface CloverCardData {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
  name?: string;
}

export interface CloverPaymentData {
  amount: number;
  currency: string;
  cardToken?: string;
  cardData?: CloverCardData;
  description?: string;
  email?: string;
  metadata?: Record<string, any>;
}

export interface CloverPaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
  payment?: any;
}

export const useCloverPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCardToken = useCallback(async (cardData: CloverCardData): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/clover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create-token',
          cardData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create card token');
      }

      return data.token;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const processPayment = useCallback(async (paymentData: CloverPaymentData): Promise<CloverPaymentResult> => {
    setLoading(true);
    setError(null);

    try {
      let cardToken = paymentData.cardToken;

      // If no card token provided, create one from card data
      if (!cardToken && paymentData.cardData) {
        const newCardToken = await createCardToken(paymentData.cardData);
        if (!newCardToken) {
          throw new Error('Failed to create card token');
        }
        cardToken = newCardToken;
      }

      if (!cardToken) {
        throw new Error('Card token is required for payment processing');
      }

      const response = await fetch('/api/payments/clover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'process-payment',
          amount: paymentData.amount,
          currency: paymentData.currency,
          cardToken,
          description: paymentData.description,
          email: paymentData.email,
          metadata: paymentData.metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      return {
        success: true,
        paymentId: data.payment.id,
        payment: data.payment,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, [createCardToken]);

  const refundPayment = useCallback(async (paymentId: string, refundAmount?: number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/clover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'refund',
          paymentId,
          refundAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Refund processing failed');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPayment = useCallback(async (paymentId: string): Promise<any | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/payments/clover?paymentId=${paymentId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to retrieve payment');
      }

      return data.payment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createCardToken,
    processPayment,
    refundPayment,
    getPayment,
    clearError,
  };
};
