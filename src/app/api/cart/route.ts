import { NextRequest, NextResponse } from 'next/server';
import { CartItem, AddToCartPayload, UpdateCartItemPayload, RemoveFromCartPayload } from '@/types/cart';

// In a real application, you'd use a database
// For now, we'll use a simple in-memory store (not suitable for production)
let cartItems: CartItem[] = [];

export async function GET() {
  try {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AddToCartPayload = await request.json();
    const { product, quantity = 1 } = body;

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].total = 
        cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation
        product,
        quantity,
        price: product.price,
        total: product.price * quantity,
      };
      cartItems.push(newItem);
    }

    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount,
      message: 'Item added to cart successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCartItemPayload = await request.json();
    const { itemId, quantity } = body;

    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cartItems.splice(itemIndex, 1);
    } else {
      // Update quantity
      cartItems[itemIndex].quantity = quantity;
      cartItems[itemIndex].total = cartItems[itemIndex].price * quantity;
    }

    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount,
      message: 'Cart updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: RemoveFromCartPayload = await request.json();
    const { itemId } = body;

    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    cartItems.splice(itemIndex, 1);

    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount,
      message: 'Item removed from cart successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
