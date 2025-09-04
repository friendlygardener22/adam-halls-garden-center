// Temporarily disabled Clover SDK for development
// import { CloverEcommSDK } from 'clover-ecomm-sdk';

export interface CloverConfig {
  appId: string;
  appSecret: string;
  environment: 'sandbox' | 'production';
  merchantId: string;
}

export interface CloverPaymentRequest {
  amount: number; // Amount in cents
  currency: string;
  cardToken: string;
  description?: string;
  email?: string;
  metadata?: Record<string, any>;
}

export interface CloverPaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  created: number;
  description?: string;
  failure_reason?: string;
}

export class CloverService {
  // private sdk: CloverEcommSDK;
  private config: CloverConfig;

  constructor(config: CloverConfig) {
    this.config = config;
    // Temporarily disabled for development
    // this.sdk = new CloverEcommSDK({
    //   appId: config.appId,
    //   appSecret: config.appSecret,
    //   environment: config.environment,
    //   merchantId: config.merchantId,
    // });
  }

  async createPayment(paymentRequest: CloverPaymentRequest): Promise<CloverPaymentResponse> {
    try {
      // Temporarily return mock response for development
      console.log('Mock payment processing:', paymentRequest);
      return {
        id: `mock_${Date.now()}`,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: 'succeeded',
        created: Date.now(),
        description: paymentRequest.description,
      };
    } catch (error) {
      console.error('Clover payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Payment processing failed: ${errorMessage}`);
    }
  }

  async createCardToken(cardData: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
    name?: string;
  }): Promise<string> {
    try {
      // Temporarily return mock token for development
      console.log('Mock token creation:', cardData);
      return `mock_token_${Date.now()}`;
    } catch (error) {
      console.error('Clover token creation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Card token creation failed: ${errorMessage}`);
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<any> {
    try {
      // Temporarily return mock refund for development
      console.log('Mock refund processing:', { paymentId, amount });
      return { id: `mock_refund_${Date.now()}`, status: 'succeeded' };
    } catch (error) {
      console.error('Clover refund error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Refund processing failed: ${errorMessage}`);
    }
  }

  async getPayment(paymentId: string): Promise<any> {
    try {
      // Temporarily return mock payment for development
      console.log('Mock payment retrieval:', paymentId);
      return { id: paymentId, status: 'succeeded', amount: 1000 };
    } catch (error) {
      console.error('Clover payment retrieval error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Payment retrieval failed: ${errorMessage}`);
    }
  }

  // Helper method to format amount for Clover (convert dollars to cents)
  static formatAmount(amount: number): number {
    return Math.round(amount * 100);
  }

  // Helper method to format amount from Clover (convert cents to dollars)
  static unformatAmount(amount: number): number {
    return amount / 100;
  }
}

// Initialize Clover service with environment variables
export const cloverService = new CloverService({
  appId: process.env.CLOVER_APP_ID || '',
  appSecret: process.env.CLOVER_APP_SECRET || '',
  environment: (process.env.CLOVER_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  merchantId: process.env.CLOVER_MERCHANT_ID || '',
});
