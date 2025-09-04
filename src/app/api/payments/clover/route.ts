import { NextRequest, NextResponse } from 'next/server';
import { cloverService, CloverService } from '@/services/clover';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'create-token':
        const { cardData } = data;
        if (!cardData) {
          return NextResponse.json(
            { error: 'Card data is required' },
            { status: 400 }
          );
        }

        const token = await cloverService.createCardToken(cardData);
        return NextResponse.json({ token });

      case 'process-payment':
        const { amount, currency, cardToken, description, email, metadata } = data;
        
        if (!amount || !currency || !cardToken) {
          return NextResponse.json(
            { error: 'Amount, currency, and card token are required' },
            { status: 400 }
          );
        }

        const payment = await cloverService.createPayment({
          amount: CloverService.formatAmount(amount),
          currency,
          cardToken,
          description,
          email,
          metadata,
        });

        return NextResponse.json({ payment });

      case 'refund':
        const { paymentId, refundAmount } = data;
        
        if (!paymentId) {
          return NextResponse.json(
            { error: 'Payment ID is required' },
            { status: 400 }
          );
        }

        const refund = await cloverService.refundPayment(
          paymentId, 
          refundAmount ? CloverService.formatAmount(refundAmount) : undefined
        );

        return NextResponse.json({ refund });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Clover API error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const payment = await cloverService.getPayment(paymentId);
    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Clover payment retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve payment' },
      { status: 500 }
    );
  }
}
