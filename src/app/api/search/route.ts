import { NextResponse } from 'next/server';

// Mock product database - replace with actual database
const products = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    category: 'plants',
    price: 49.99,
    image: '/images/products/plant1.jpg',
    description: 'Large indoor plant with distinctive leaves',
    tags: ['indoor', 'low-maintenance', 'air-purifying'],
  },
  {
    id: 2,
    name: 'Snake Plant',
    category: 'plants',
    price: 34.99,
    image: '/images/products/plant2.jpg',
    description: 'Low-maintenance indoor plant',
    tags: ['indoor', 'easy', 'air-purifying'],
  },
  {
    id: 3,
    name: 'Pothos',
    category: 'plants',
    price: 24.99,
    image: '/images/products/plant3.jpg',
    description: 'Trailing vine, great for shelves and hanging baskets',
    tags: ['indoor', 'trailing', 'easy'],
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    category: 'plants',
    price: 59.99,
    image: '/images/products/plant4.jpg',
    description: 'Statement plant with large, glossy leaves',
    tags: ['indoor', 'statement', 'tree'],
  },
  {
    id: 5,
    name: 'Peace Lily',
    category: 'plants',
    price: 29.99,
    image: '/images/products/plant5.jpg',
    description: 'Elegant plant with white blooms, great for air purification',
    tags: ['indoor', 'flowering', 'air-purifying'],
  },
  {
    id: 6,
    name: 'Premium Pruning Shears',
    category: 'tools',
    price: 29.99,
    image: '/images/products/tool1.jpg',
    description: 'Professional-grade pruning tool',
    tags: ['garden-tools', 'pruning', 'professional'],
  },
  {
    id: 7,
    name: 'Organic Potting Mix',
    category: 'supplies',
    price: 19.99,
    image: '/images/products/supply1.jpg',
    description: 'Premium soil for all your plants',
    tags: ['soil', 'organic', 'potting'],
  },
  // Add more products as needed...
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'featured';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;

  // Filter products
  const results = products.filter(product => {
    const matchesQuery = 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query));
    
    const matchesCategory = !category || product.category === category;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  // Sort results
  switch (sort) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    // 'featured' is default order
  }

  return NextResponse.json({
    results,
    total: results.length,
    filters: {
      categories: Array.from(new Set(products.map(p => p.category))),
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price)),
      },
    },
  });
} 