import React from 'react';
import { ProductFilters } from '@/types/product';

interface FilterPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  className?: string;
  showAdvanced?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  categories,
  className = '',
  showAdvanced = false,
}) => {
  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: undefined,
      priceRange: undefined,
      size: undefined,
      light: undefined,
      water: undefined,
      sortBy: 'featured',
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.priceRange || 500}
            onChange={(e) => handleFilterChange('priceRange', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            aria-label="Price range filter"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${filters.priceRange || 500}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'featured'}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-label="Sort products by"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <>
          {/* Size Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              value={filters.size || ''}
              onChange={(e) => handleFilterChange('size', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Light Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Light Requirements
            </label>
            <select
              value={filters.light || ''}
              onChange={(e) => handleFilterChange('light', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Light Levels</option>
              <option value="full-sun">Full Sun</option>
              <option value="partial-sun">Partial Sun</option>
              <option value="shade">Shade</option>
            </select>
          </div>

          {/* Water Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Requirements
            </label>
            <select
              value={filters.water || ''}
              onChange={(e) => handleFilterChange('water', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Water Levels</option>
              <option value="low">Low Water</option>
              <option value="moderate">Moderate Water</option>
              <option value="high">High Water</option>
            </select>
          </div>
        </>
      )}

      {/* Active Filters Summary */}
      {(filters.category || filters.priceRange !== undefined || filters.size || filters.light || filters.water) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange('category', undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.priceRange !== undefined && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Max Price: ${filters.priceRange}
                <button
                  onClick={() => handleFilterChange('priceRange', undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.size && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Size: {filters.size}
                <button
                  onClick={() => handleFilterChange('size', undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.light && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Light: {filters.light}
                <button
                  onClick={() => handleFilterChange('light', undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.water && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Water: {filters.water}
                <button
                  onClick={() => handleFilterChange('water', undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
