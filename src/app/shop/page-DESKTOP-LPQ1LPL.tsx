'use client';

import React from 'react';
import Catalog from '@/js/catalog';
import '@/styles/catalog.css';

export default function ShopPage() {
  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop Our Collection</h1>
        <p className="shop-description">
          Discover our carefully curated selection of plants, tools, and garden supplies.
          From indoor plants to outdoor essentials, we have everything you need to create
          your perfect garden.
        </p>
      </div>
      <Catalog />
    </div>
  );
} 