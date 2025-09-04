'use client';

import React, { useState, useEffect } from 'react';
import { allProducts, getProductsByCategory, searchProducts, getProductStats } from '@/data/all-products';
import { productCategories, careCategories, seasonalAvailability } from '@/data/categories';
import ProductCardEnhanced from '@/components/ProductCardEnhanced';
import FilterPanel from '@/components/FilterPanel';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

interface ProductFilters {
  category?: string;
  priceRange?: number;
  size?: string;
  light?: string;
  water?: string;
  sortBy?: string;
  search?: string;
  season?: string;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'featured'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const productsPerPage = 12;

  // Get unique categories for filter panel
  const categories = productCategories.map(cat => cat.label);

  // Apply filters and search
  useEffect(() => {
    let filteredProducts = allProducts;

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filteredProducts = getProductsByCategory(filters.category);
    }

    // Apply search filter
    if (filters.search) {
      filteredProducts = searchProducts(filters.search);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.priceRange!
      );
    }

    // Apply size filter
    if (filters.size) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.size) return false;
        const height = product.size.height;
        if (filters.size === 'small' && height.includes('< 2')) return true;
        if (filters.size === 'medium' && (height.includes('2-6') || height.includes('3-5'))) return true;
        if (filters.size === 'large' && height.includes('> 6')) return true;
        return false;
      });
    }

    // Apply light filter
    if (filters.light) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.care?.light) return false;
        const light = product.care.light.toLowerCase();
        if (filters.light === 'full-sun' && light.includes('full sun')) return true;
        if (filters.light === 'partial-sun' && light.includes('partial')) return true;
        if (filters.light === 'shade' && light.includes('shade')) return true;
        return false;
      });
    }

    // Apply water filter
    if (filters.water) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.care?.water) return false;
        const water = product.care.water.toLowerCase();
        if (filters.water === 'low' && water.includes('low')) return true;
        if (filters.water === 'moderate' && water.includes('moderate')) return true;
        if (filters.water === 'high' && water.includes('high')) return true;
        return false;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'featured':
          default:
            return (b.rating || 0) - (a.rating || 0);
        }
      });
    }

    setProducts(filteredProducts);
    setCurrentPage(1);
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Get product statistics
  const stats = getProductStats();

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
              <p className="text-gray-600 mt-2">
                Discover our complete collection of plants, tools, and garden supplies
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Search onSearch={handleSearch} placeholder="Search products..." />
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>{stats.total} products available</span>
              <span>Average price: ${stats.averagePrice.toFixed(2)}</span>
              <span>Average rating: {stats.averageRating.toFixed(1)}/5</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
              showAdvanced={showAdvanced}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCardEnhanced
                      key={product.id}
                      product={product}
                      onAddToCart={(product) => {
                        // Handle add to cart
                        console.log('Add to cart:', product);
                      }}
                      onAddToWishlist={(product) => {
                        // Handle add to wishlist
                        console.log('Add to wishlist:', product);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => setFilters({ sortBy: 'featured' })}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
