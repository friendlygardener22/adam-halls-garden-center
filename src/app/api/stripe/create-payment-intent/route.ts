import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  // eslint-disable-next-line no-console
  // eslint-disable-next-line no-console
    console.warn('STRIPE_SECRET_KEY is not configured. Stripe payments will not work.')
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-05-28.basil',
}) : null

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 503 }
      )
    }

    const { amount, currency = 'usd' } = await request.json()

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum amount is $0.50' },
        { status: 400 }
      )
    }

    // Validate currency
    if (currency !== 'usd') {
      return NextResponse.json(
        { error: 'Only USD currency is supported' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-console
    console.error('Stripe payment intent error:', error)
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Payment processing failed. Please try again.' },
      { status: 500 }
    )
  }
} 