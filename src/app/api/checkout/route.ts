import { NextRequest, NextResponse } from 'next/server';
import { cloverService, CloverService } from '@/services/clover';

// Define CartItem interface locally to match the expected structure
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface CheckoutRequest {
  items: CartItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  paymentMethod: {
    type: 'clover' | 'cash';
    cardToken?: string;
    cardData?: {
      number: string;
      exp_month: number;
      exp_year: number;
      cvc: string;
      name?: string;
    };
  };
  shippingMethod: 'pickup' | 'delivery';
  specialInstructions?: string;
}

interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CheckoutRequest['customerInfo'];
  total: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: Date;
  paymentId?: string;
  paymentStatus?: 'pending' | 'succeeded' | 'failed';
}

// In a real application, you'd use a database
let orders: Order[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, customerInfo, paymentMethod, shippingMethod, specialInstructions } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const taxRate = 0.0825; // 8.25% tax rate for Moreno Valley, CA
    const tax = subtotal * taxRate;
    
    // Calculate shipping
    let shipping = 0;
    if (shippingMethod === 'delivery') {
      // Simple delivery calculation based on order value
      if (subtotal < 50) {
        shipping = 15; // $15 for orders under $50
      } else if (subtotal < 100) {
        shipping = 10; // $10 for orders $50-$100
      } else {
        shipping = 0; // Free shipping for orders over $100
      }
    }

    const grandTotal = subtotal + tax + shipping;

    // Process payment with Clover
    let paymentId: string | undefined;
    let paymentStatus: 'pending' | 'succeeded' | 'failed' = 'pending';

    if (paymentMethod.type === 'clover') {
      try {
        let cardToken = paymentMethod.cardToken;

        // If no card token provided, create one from card data
        if (!cardToken && paymentMethod.cardData) {
          cardToken = await cloverService.createCardToken(paymentMethod.cardData);
        }

        if (!cardToken) {
          return NextResponse.json(
            { error: 'Payment information required for Clover payments' },
            { status: 400 }
          );
        }

        // Process payment with Clover
        const paymentResponse = await cloverService.createPayment({
          amount: CloverService.formatAmount(grandTotal),
          currency: 'usd',
          cardToken: cardToken,
          description: `Order from Adam Hall's Garden Center - ${items.length} items`,
          email: customerInfo.email,
          metadata: {
            orderType: 'online',
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            shippingMethod: shippingMethod,
          },
        });

        paymentId = paymentResponse.id;
        paymentStatus = paymentResponse.status;

        if (paymentStatus === 'failed') {
          return NextResponse.json(
            { error: `Payment failed: ${paymentResponse.failure_reason || 'Unknown error'}` },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error('Clover payment processing error:', error);
        return NextResponse.json(
          { error: 'Payment processing failed. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Create order
    const order: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items,
      customerInfo,
      total: subtotal,
      tax,
      shipping,
      grandTotal,
      status: paymentStatus === 'succeeded' ? 'confirmed' : 'pending',
      createdAt: new Date(),
      estimatedDelivery: shippingMethod === 'delivery' 
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        : undefined,
      paymentId,
      paymentStatus,
    };

    // Add to orders (in a real app, save to database)
    orders.push(order);

    // Clear cart (in a real app, this would be user-specific)
    // cartItems = [];

    // Send confirmation email (in a real app, integrate with email service)
    // await sendOrderConfirmationEmail(customerInfo.email, order);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const email = searchParams.get('email');

    if (orderId) {
      // Get specific order
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ order });
    }

    if (email) {
      // Get orders for customer
      const customerOrders = orders.filter(o => o.customerInfo.email === email);
      return NextResponse.json({ orders: customerOrders });
    }

    // Get all orders (in a real app, this would be admin-only)
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    orders[orderIndex].status = status;

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
      message: 'Order status updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
