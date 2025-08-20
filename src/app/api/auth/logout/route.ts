import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the cookie
  return NextResponse.json({ message: 'Logged out' }, {
    status: 200,
    headers: {
      'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0',
    },
  });
} 