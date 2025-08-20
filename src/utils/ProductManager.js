import { plants } from '../data/plants.js';

class ProductManager {
  constructor() {
    this.products = [];
    this.filters = {
      category: 'all',
      price: 'all',
      season: 'all'
    };
  }

  async loadProducts() {
    // In a real application, this would fetch from an API
    // For now, we'll use our static plant data
    this.products = plants;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  setFilter(type, value) {
    this.filters[type] = value;
    return this.filterProducts();
  }

  filterProducts() {
    return this.products.filter(product => {
      if (this.filters.category !== 'all' && product.category !== this.filters.category) {
        return false;
      }
      if (this.filters.price !== 'all') {
        const price = parseFloat(product.price);
        switch (this.filters.price) {
          case 'under-25':
            if (price >= 25) return false;
            break;
          case '25-50':
            if (price < 25 || price > 50) return false;
            break;
          case '50-100':
            if (price < 50 || price > 100) return false;
            break;
          case 'over-100':
            if (price <= 100) return false;
            break;
        }
      }
      if (this.filters.season !== 'all' && product.season !== this.filters.season) {
        return false;
      }
      return true;
    });
  }

  getCategories() {
    return [...new Set(this.products.map(product => product.category))];
  }

  getSeasons() {
    return [...new Set(this.products.map(product => product.season))];
  }

  getFeaturedProducts() {
    return this.products.filter(product => product.featured);
  }

  getRelatedProducts(category, currentProductId) {
    return this.products
      .filter(product => product.category === category && product.id !== currentProductId)
      .slice(0, 4);
  }
}

export default ProductManager; 