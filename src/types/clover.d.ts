declare module 'clover-ecomm-sdk' {
  export class CloverEcommSDK {
    constructor(config: {
      appId: string;
      appSecret: string;
      environment: 'sandbox' | 'production';
      merchantId: string;
    });

    payments: {
      create(payment: {
        amount: number;
        currency: string;
        source: string;
        description?: string;
        receipt_email?: string;
        metadata?: Record<string, any>;
      }): Promise<{
        id: string;
        amount: number;
        currency: string;
        status: string;
        created: number;
        description?: string;
        failure_reason?: string;
      }>;
      retrieve(paymentId: string): Promise<any>;
    };

    tokens: {
      create(token: {
        card: {
          number: string;
          exp_month: number;
          exp_year: number;
          cvc: string;
          name?: string;
        };
      }): Promise<{ id: string }>;
    };

    refunds: {
      create(refund: {
        payment: string;
        amount?: number;
      }): Promise<any>;
    };
  }
}
