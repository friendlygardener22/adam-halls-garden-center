'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import cartService from '../services/cartService';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState(200);
  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('all');
  const [light, setLight] = useState('all');
  const [water, setWater] = useState('all');
  const [loading, setLoading] = useState(true);

  const catalogGridRef = React.useRef(null);
  const priceValueRef = React.useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products];
    
    // Apply filters
    filtered = filtered.filter(product => {
      const priceMatch = product.price <= priceRange;
      const categoryMatch = category === 'all' || product.category === category;
      const sizeMatch = size === 'all' || product.size === size;
      const lightMatch = light === 'all' || product.light === light;
      const waterMatch = water === 'all' || product.water === water;
      return priceMatch && categoryMatch && sizeMatch && lightMatch && waterMatch;
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange, category, size, light, water]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
    if (priceValueRef.current) {
      priceValueRef.current.textContent = `$${e.target.value}`;
    }
  };

  const handleAddToCart = (product) => {
    cartService.addItem(product);
  };

  const resetFilters = () => {
    setPriceRange(200);
    setCategory('all');
    setSize('all');
    setLight('all');
    setWater('all');
    setSortBy('name');
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="catalog-container">
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="sortSelect">Sort by:</label>
          <select 
            id="sortSelect" 
            value={sortBy} 
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priceSlider">Max Price: <span ref={priceValueRef}>${priceRange}</span></label>
          <input
            type="range"
            id="priceSlider"
            min="0"
            max="200"
            value={priceRange}
            onChange={handlePriceChange}
            className="price-slider"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="categoryFilter">Category:</label>
          <select
            id="categoryFilter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="indoor">Indoor Plants</option>
            <option value="outdoor">Outdoor Plants</option>
            <option value="tools">Garden Tools</option>
            <option value="supplies">Supplies</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sizeFilter">Size:</label>
          <select
            id="sizeFilter"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="lightFilter">Light Requirements:</label>
          <select
            id="lightFilter"
            value={light}
            onChange={(e) => setLight(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Light Levels</option>
            <option value="low">Low Light</option>
            <option value="medium">Medium Light</option>
            <option value="bright">Bright Light</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="waterFilter">Water Needs:</label>
          <select
            id="waterFilter"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Water Needs</option>
            <option value="low">Low Water</option>
            <option value="medium">Medium Water</option>
            <option value="high">High Water</option>
          </select>
        </div>

        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>

      <div className="catalog-grid" ref={catalogGridRef}>
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="card-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="product-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="image-overlay">
                <button className="zoom-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="plant-info">
              <h3>{product.name}</h3>
              {product.scientificName && (
                <p className="plant-scientific">{product.scientificName}</p>
              )}
              <p className="plant-price">${product.price.toFixed(2)}</p>
              {product.size && (
                <p className="plant-size">
                  <i className="fas fa-ruler"></i> {product.size}
                </p>
              )}
              {product.description && (
                <p className="plant-description">{product.description}</p>
              )}
              <div className="plant-features">
                {product.category && (
                  <span>
                    <i className="fas fa-leaf"></i> {product.category}
                  </span>
                )}
                {product.light && (
                  <span>
                    <i className="fas fa-sun"></i> {product.light}
                  </span>
                )}
                {product.water && (
                  <span>
                    <i className="fas fa-tint"></i> {product.water}
                  </span>
                )}
              </div>
              <div className="plant-actions">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn primary add-to-cart"
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button className="btn secondary quick-view">
                  <i className="fas fa-eye"></i> Quick View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 