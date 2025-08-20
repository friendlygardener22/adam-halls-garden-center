import { NextResponse } from 'next/server';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    deliveryNotes?: string;
  };
  deliveryMethod: 'delivery' | 'pickup';
  items: OrderItem[];
  totals: {
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  paymentInfo: {
    last4: string;
    expiryMonth: string;
    expiryYear: string;
  };
}

// Mock order storage - replace with actual database
const orders = new Map<string, OrderData & { id: string; status: string; createdAt: Date }>();

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json();

    // Validate required fields
    const { customerInfo, deliveryMethod, items, totals } = orderData;
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    if (deliveryMethod === 'delivery' && (!customerInfo.address || !customerInfo.city || !customerInfo.zip)) {
      return NextResponse.json(
        { error: 'Missing required delivery address information' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `AG${Date.now().toString().slice(-6)}`;

    // Create order record
    const order = {
      ...orderData,
      id: orderId,
      status: 'pending',
      createdAt: new Date(),
    };

    // Store order (in real app, save to database)
    orders.set(orderId, order);

    // In a real application, you would:
    // 1. Process payment with Stripe/payment provider
    // 2. Send confirmation email to customer
    // 3. Send notification to staff
    // 4. Update inventory
    // 5. Schedule delivery/pickup

    console.log(`New order received: ${orderId}`, {
      customer: customerInfo.name,
      email: customerInfo.email,
      deliveryMethod,
      total: totals.total,
      itemCount: items.length,
    });

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order placed successfully',
      estimatedContactTime: deliveryMethod === 'delivery' ? '24 hours' : '4 hours',
      nextSteps: deliveryMethod === 'delivery' 
        ? 'We will call you within 24 hours to schedule delivery'
        : 'We will call you within 4 hours to confirm your pickup time',
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process order. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (orderId) {
    // Get specific order
    const order = orders.get(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(order);
  } else {
    // Get all orders (for admin - in real app, add authentication)
    const allOrders = Array.from(orders.values());
    return NextResponse.json({
      orders: allOrders,
      total: allOrders.length,
    });
  }
} 