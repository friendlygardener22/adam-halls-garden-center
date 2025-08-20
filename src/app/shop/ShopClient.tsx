'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Simple icon components to avoid import issues
const MagnifyingGlassIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="h-5 w-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const categories = [
  { key: 'all', label: 'All Products', icon: '🌱' },
  { key: 'Trees', label: 'Trees', icon: '🌳' },
  { key: 'Shrubs', label: 'Shrubs', icon: '🌿' },
  { key: 'Perennials', label: 'Perennials', icon: '🌸' },
  { key: 'Annuals', label: 'Annuals', icon: '🌺' },
  { key: 'Succulents', label: 'Succulents', icon: '🌵' },
  { key: 'Tropical', label: 'Tropical', icon: '🌴' },
  { key: 'Fruit', label: 'Fruit Trees', icon: '🍎' },
  { key: 'Tools', label: 'Tools', icon: '🛠️' },
  { key: 'Supplies', label: 'Supplies', icon: '🧺' },
];

const priceRanges = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: Infinity, label: 'Over $200' },
];

const lightOptions = [
  { key: 'all', label: 'All Light Levels' },
  { key: 'Full Sun', label: 'Full Sun' },
  { key: 'Partial Shade', label: 'Partial Shade' },
  { key: 'Shade', label: 'Shade' },
  { key: 'Indoor', label: 'Indoor' },
];

const waterOptions = [
  { key: 'all', label: 'All Water Needs' },
  { key: 'Low', label: 'Low Water' },
  { key: 'Moderate', label: 'Moderate Water' },
  { key: 'High', label: 'High Water' },
  { key: 'Drought Tolerant', label: 'Drought Tolerant' },
];

const sizeOptions = [
  { key: 'all', label: 'All Sizes' },
  { key: 'Small', label: 'Small (< 3 ft)' },
  { key: 'Medium', label: 'Medium (3-8 ft)' },
  { key: 'Large', label: 'Large (> 8 ft)' },
];

type Product = {
  id: number;
  name: string;
  scientific?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
  features?: string[];
  care?: {
    light?: string;
    water?: string;
    soil?: string;
    fertilizer?: string;
    pruning?: string;
  };
  size?: {
    height?: string;
    width?: string;
  };
  availability?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
  tags?: string[];
};

export default function ShopClient() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedLight, setSelectedLight] = useState('all');
  const [selectedWater, setSelectedWater] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.scientific?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features?.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(product => 
        product.price && product.price >= range.min && product.price <= range.max
      );
    }

    // Apply light filter
    if (selectedLight !== 'all') {
      filtered = filtered.filter(product => 
        product.care?.light?.toLowerCase().includes(selectedLight.toLowerCase())
      );
    }

    // Apply water filter
    if (selectedWater !== 'all') {
      filtered = filtered.filter(product => 
        product.care?.water?.toLowerCase().includes(selectedWater.toLowerCase())
      );
    }

    // Apply size filter
    if (selectedSize !== 'all') {
      filtered = filtered.filter(product => {
        const height = product.size?.height;
        if (!height) return false;
        
        const heightNum = parseInt(height.match(/\d+/)?.[0] || '0');
        switch (selectedSize) {
          case 'Small':
            return heightNum < 3;
          case 'Medium':
            return heightNum >= 3 && heightNum <= 8;
          case 'Large':
            return heightNum > 8;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedPriceRange, selectedLight, selectedWater, selectedSize, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const addToCart = (productId: number) => {
    // Update local state
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    
    // Update localStorage
    const cartData = localStorage.getItem('cart');
    const currentCart = cartData ? JSON.parse(cartData) : {};
    currentCart[productId] = (currentCart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange(null);
    setSelectedLight('all');
    setSelectedWater('all');
    setSelectedSize('all');
    setSortBy('name');
  };

  const getWaterIcon = (waterText: string) => {
    if (waterText.toLowerCase().includes('low') || waterText.toLowerCase().includes('drought')) {
      return '💧';
    } else if (waterText.toLowerCase().includes('moderate')) {
      return '💧💧';
    } else if (waterText.toLowerCase().includes('high') || waterText.toLowerCase().includes('regular')) {
      return '💧💧💧';
    }
    return '💧';
  };

  const getLightIcon = (lightText: string) => {
    if (lightText.toLowerCase().includes('full sun')) {
      return '☀️';
    } else if (lightText.toLowerCase().includes('partial') || lightText.toLowerCase().includes('morning')) {
      return '🌤️';
    } else if (lightText.toLowerCase().includes('shade') || lightText.toLowerCase().includes('indoor')) {
      return '🌥️';
    }
    return '☀️';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-900">Shop Our Products</h1>
              <p className="text-gray-600 mt-1">Find the perfect plants and supplies for your garden</p>
            </div>
            
          {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <MagnifyingGlassIcon />
              </div>
            </form>

            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => router.push('/cart')}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <ShoppingCartIcon />
                <span>Cart ({getCartCount()})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <FilterIcon />
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === category.key
                            ? 'bg-green-100 text-green-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Light Requirements */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Light Requirements</h3>
                  <div className="space-y-2">
                    {lightOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setSelectedLight(option.key)}
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedLight === option.key
                            ? 'bg-green-100 text-green-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water Needs */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Water Needs</h3>
                  <div className="space-y-2">
                    {waterOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setSelectedWater(option.key)}
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedWater === option.key
                            ? 'bg-green-100 text-green-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                  <div className="space-y-2">
                    {sizeOptions.map((option) => (
              <button
                        key={option.key}
                        onClick={() => setSelectedSize(option.key)}
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedSize === option.key
                            ? 'bg-green-100 text-green-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedPriceRange === index
                            ? 'bg-green-100 text-green-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {range.label}
              </button>
            ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-green-600 hover:text-green-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100">
                          <Image 
                        src={product.images?.[0] || '/images/plants/nursery-1.jpeg'}
                            alt={product.name} 
                            fill
                            className="object-cover" 
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
                      >
                        <HeartIcon filled={wishlist.includes(product.id)} />
                      </button>
                      {product.rating && (
                        <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <StarIcon filled={true} />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      )}
                      </div>

                    {/* Product Info */}
                      <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.scientific && (
                        <p className="text-sm text-gray-500 italic mb-2">
                          {product.scientific}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Plant Care Info */}
                      {(product.care?.light || product.care?.water || product.size) && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-1 mb-2">
                            <InfoIcon />
                            <span className="text-xs font-medium text-gray-700">Care Info</span>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            {product.care?.light && (
                              <div className="flex items-center gap-1">
                                <span>{getLightIcon(product.care.light)}</span>
                                <span className="truncate">{product.care.light}</span>
                              </div>
                            )}
                            {product.care?.water && (
                              <div className="flex items-center gap-1">
                                <span>{getWaterIcon(product.care.water)}</span>
                                <span className="truncate">{product.care.water}</span>
                              </div>
                            )}
                            {product.size?.height && (
                              <div className="flex items-center gap-1">
                                <span>📏</span>
                                <span>{product.size.height} H</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-green-600">
                            ${product.price?.toFixed(2)}
                          </p>
                          {product.availability && (
                            <p className={`text-xs ${
                              product.availability === 'In Stock' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {product.availability}
                            </p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={product.availability !== 'In Stock'}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 