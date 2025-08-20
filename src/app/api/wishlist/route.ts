import { NextResponse } from 'next/server';

// In-memory wishlist for demo (not persistent)
let wishlist: { id: string; name: string; image: string }[] = [
  { id: 'p1', name: 'Fiddle Leaf Fig', image: '/images/plants/indoor/fiddle-leaf-fig.jpg' },
];

export async function GET() {
  return NextResponse.json({ wishlist });
}

export async function POST(request: Request) {
  const item = await request.json();
  if (!wishlist.find(w => w.id === item.id)) {
    wishlist.push(item);
  }
  return NextResponse.json({ wishlist });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  wishlist = wishlist.filter(w => w.id !== id);
  return NextResponse.json({ wishlist });
} 