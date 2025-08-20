'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tags: string[];
}

interface SearchResponse {
  results: Product[];
  total: number;
  filters: {
    categories: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SearchResponse['filters'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        const query = searchParams?.get('q') || '';
        const response = await fetch(
          `/api/search?q=${query}&category=${selectedCategory}&minPrice=${priceRange.min}&maxPrice=${
            priceRange.max
          }`
        );
        const data: SearchResponse = await response.json();
        setResults(data.results);
        setFilters(data.filters);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    performSearch();
  }, [searchParams, selectedCategory, priceRange]);

  return (
    <main className="min-h-screen">
      <section className="section">
        <div className="container">
          <h1 className="heading-1 text-center mb-8">
            Search Results for "{searchParams?.get('q') || ''}"
          </h1>

          {/* Filters Toggle */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filters
            </button>
            <div className="text-gray-600">
              {results.length} results found
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            {showFilters && filters && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-bold mb-4">Filters</h2>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {filters.categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="mr-2"
                          />
                          <span className="capitalize">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <button className="btn btn-primary text-sm">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No products found matching your search.</p>
                  <a href="/shop" className="btn btn-primary">
                    Browse All Products
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 