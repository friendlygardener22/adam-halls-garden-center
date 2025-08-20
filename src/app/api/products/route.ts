import { NextResponse } from 'next/server';
import productsData from '@/api/products.json';

export async function GET() {
  // Return the products array from the JSON file
  return NextResponse.json(productsData.products);
} 