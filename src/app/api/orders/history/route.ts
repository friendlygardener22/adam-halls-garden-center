import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, you'd check the user's token and fetch their orders
  // For demo, return static orders
  const orders = [
    {
      id: '1001',
      date: '2024-06-01',
      total: 49.99,
      items: [
        { name: 'Fiddle Leaf Fig', qty: 1, price: 29.99 },
        { name: 'Organic Potting Soil', qty: 2, price: 10.00 },
      ],
      status: 'Delivered',
    },
    {
      id: '1000',
      date: '2024-05-15',
      total: 19.99,
      items: [
        { name: 'Garden Trowel', qty: 1, price: 9.99 },
        { name: 'Succulent', qty: 1, price: 10.00 },
      ],
      status: 'Shipped',
    },
  ];
  return NextResponse.json({ orders });
} 