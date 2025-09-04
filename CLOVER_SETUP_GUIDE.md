# Clover Payment Processing Setup Guide

## Overview

This guide will help you set up Clover payment processing for Adam Hall's Garden Center. Clover has been integrated as the primary payment processor, replacing Stripe.

## What's Been Implemented

### 1. Backend Integration
- **Clover Service** (`src/services/clover.ts`): Core payment processing service
- **Payment API Routes** (`src/app/api/payments/clover/route.ts`): RESTful API for payment operations
- **Updated Checkout API** (`src/app/api/checkout/route.ts`): Modified to use Clover instead of Stripe

### 2. Frontend Integration
- **Clover Payment Hook** (`src/hooks/useCloverPayment.ts`): React hook for payment operations
- **Payment Form Component** (`src/components/CloverPaymentForm.tsx`): Secure payment form
- **Updated Checkout Flow** (`src/app/checkout/CheckoutClient.tsx`): Two-step checkout with payment integration

### 3. Features
- ✅ Secure card tokenization
- ✅ Payment processing
- ✅ Refund capabilities
- ✅ Payment status tracking
- ✅ Error handling
- ✅ Form validation
- ✅ Responsive design

## Setup Instructions

### Step 1: Get Clover Credentials

1. **Create a Clover Developer Account**
   - Go to [Clover Developer Portal](https://developer.clover.com/)
   - Sign up for a developer account

2. **Create a New App**
   - Navigate to "Apps" in your developer dashboard
   - Click "Create New App"
   - Choose "E-commerce" as the app type
   - Fill in your app details

3. **Get Your Credentials**
   - Note your **App ID** and **App Secret**
   - Get your **Merchant ID** from your Clover account

### Step 2: Configure Environment Variables

1. **Copy the template file:**
   ```bash
   cp env.clover.template .env.local
   ```

2. **Edit `.env.local` and add your credentials:**
   ```env
   CLOVER_APP_ID=your_actual_app_id
   CLOVER_APP_SECRET=your_actual_app_secret
   CLOVER_ENVIRONMENT=sandbox
   CLOVER_MERCHANT_ID=your_actual_merchant_id
   ```

3. **For production, change the environment:**
   ```env
   CLOVER_ENVIRONMENT=production
   ```

### Step 3: Test the Integration

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test with sandbox credentials:**
   - Use Clover's test card numbers:
     - **Visa**: 4111111111111111
     - **Mastercard**: 5555555555554444
     - **Expiration**: Any future date
     - **CVC**: Any 3 digits

3. **Test the checkout flow:**
   - Add items to cart
   - Go to checkout
   - Fill in customer information
   - Complete payment with test card

### Step 4: Production Deployment

1. **Update environment variables on your hosting platform:**
   - Set `CLOVER_ENVIRONMENT=production`
   - Add your production Clover credentials

2. **Test with real cards:**
   - Use small amounts for initial testing
   - Verify refund functionality

## API Endpoints

### Payment Processing
- `POST /api/payments/clover`
  - `action: 'create-token'` - Create card token
  - `action: 'process-payment'` - Process payment
  - `action: 'refund'` - Process refund

### Payment Retrieval
- `GET /api/payments/clover?paymentId={id}` - Get payment details

### Checkout
- `POST /api/checkout` - Complete order with payment

## Security Features

### Frontend Security
- ✅ Card number formatting and validation
- ✅ Expiration date validation
- ✅ CVC validation
- ✅ No card data stored in browser
- ✅ Secure tokenization

### Backend Security
- ✅ Environment variable protection
- ✅ Error handling without exposing sensitive data
- ✅ Payment status tracking
- ✅ Order validation

## Error Handling

The system includes comprehensive error handling:

### Common Errors
- **Invalid card number**: Basic Luhn algorithm validation
- **Expired card**: Date validation
- **Invalid CVC**: Length and format validation
- **Payment declined**: Clover API error handling
- **Network errors**: Retry mechanisms

### Error Messages
- User-friendly error messages
- No sensitive data in error responses
- Detailed logging for debugging

## Testing

### Sandbox Testing
```javascript
// Test card numbers
const testCards = {
  visa: '4111111111111111',
  mastercard: '5555555555554444',
  amex: '378282246310005'
};

// Test scenarios
- Successful payment
- Declined payment
- Invalid card number
- Expired card
- Insufficient funds
```

### Production Testing
- Use real cards with small amounts
- Test refund functionality
- Verify webhook handling (if implemented)

## Troubleshooting

### Common Issues

1. **"Invalid App ID" Error**
   - Verify your Clover App ID is correct
   - Ensure the app is properly configured in Clover dashboard

2. **"Payment Failed" Error**
   - Check card details are valid
   - Verify merchant account is active
   - Check Clover dashboard for transaction logs

3. **"Environment Mismatch" Error**
   - Ensure `CLOVER_ENVIRONMENT` matches your credentials
   - Use sandbox credentials for testing

### Debug Mode

Enable debug logging by adding to your environment:
```env
DEBUG=clover:*
```

## Support

### Clover Resources
- [Clover Developer Documentation](https://docs.clover.com/)
- [Clover API Reference](https://docs.clover.com/reference)
- [Clover Support](https://support.clover.com/)

### Application Support
- Check the browser console for frontend errors
- Check server logs for backend errors
- Verify environment variables are set correctly

## Migration from Stripe

If you were previously using Stripe:

1. **Remove Stripe dependencies** (optional):
   ```bash
   npm uninstall @stripe/react-stripe-js @stripe/stripe-js stripe
   ```

2. **Update environment variables**:
   - Remove Stripe keys
   - Add Clover credentials

3. **Test thoroughly**:
   - Verify all payment flows work
   - Test error scenarios
   - Confirm order processing

## Next Steps

After setup, consider implementing:

1. **Webhook Handling**: Real-time payment status updates
2. **Recurring Payments**: For subscription services
3. **Payment Analytics**: Track payment success rates
4. **Fraud Detection**: Additional security measures
5. **Multi-currency Support**: If expanding internationally

## Security Checklist

- [ ] Environment variables are secure
- [ ] No card data logged
- [ ] HTTPS enabled in production
- [ ] Error messages don't expose sensitive data
- [ ] Payment validation implemented
- [ ] Refund process tested
- [ ] Audit logs enabled

---

**Note**: Always test thoroughly in sandbox mode before going live with real payments. Keep your Clover credentials secure and never commit them to version control.
