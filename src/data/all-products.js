import { plants } from './plants.js';
import { gardenProducts, seasonalProducts } from './garden-products.js';

// Combine all products into one comprehensive catalog
export const allProducts = [
  ...plants,
  ...gardenProducts,
  ...seasonalProducts
];

// Helper functions for product filtering and search
export const getProductsByCategory = (category) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const getProductsByPriceRange = (min, max) => {
  return allProducts.filter(product => product.price >= min && product.price <= max);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    (product.scientific && product.scientific.toLowerCase().includes(searchTerm)) ||
    product.category.toLowerCase().includes(searchTerm) ||
    (product.features && product.features.some(feature => 
      feature.toLowerCase().includes(searchTerm)
    ))
  );
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.featured || product.rating >= 4.5).slice(0, 8);
};

export const getProductsBySeason = (season) => {
  return allProducts.filter(product => 
    product.season?.toLowerCase().includes(season.toLowerCase()) ||
    product.availability?.toLowerCase().includes(season.toLowerCase())
  );
};

export const getProductsByCareLevel = (careLevel) => {
  return allProducts.filter(product => {
    if (!product.care) return false;
    
    const careText = JSON.stringify(product.care).toLowerCase();
    switch (careLevel) {
      case 'easy':
        return careText.includes('low maintenance') || careText.includes('easy care');
      case 'moderate':
        return careText.includes('moderate') || careText.includes('regular');
      case 'advanced':
        return careText.includes('special') || careText.includes('advanced');
      default:
        return true;
    }
  });
};

// Product statistics
export const getProductStats = () => {
  const stats = {
    total: allProducts.length,
    categories: {},
    priceRanges: {
      under25: 0,
      under50: 0,
      under100: 0,
      under200: 0,
      over200: 0
    },
    averagePrice: 0,
    averageRating: 0
  };

  let totalPrice = 0;
  let totalRating = 0;
  let ratedProducts = 0;

  allProducts.forEach(product => {
    // Category stats
    stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    
    // Price range stats
    if (product.price < 25) stats.priceRanges.under25++;
    else if (product.price < 50) stats.priceRanges.under50++;
    else if (product.price < 100) stats.priceRanges.under100++;
    else if (product.price < 200) stats.priceRanges.under200++;
    else stats.priceRanges.over200++;
    
    // Price and rating totals
    totalPrice += product.price;
    if (product.rating) {
      totalRating += product.rating;
      ratedProducts++;
    }
  });

  stats.averagePrice = totalPrice / allProducts.length;
  stats.averageRating = ratedProducts > 0 ? totalRating / ratedProducts : 0;

  return stats;
};

// Get unique categories
export const getUniqueCategories = () => {
  const categories = [...new Set(allProducts.map(product => product.category))];
  return categories.sort();
};

// Get products with images
export const getProductsWithImages = () => {
  return allProducts.filter(product => product.images && product.images.length > 0);
};

// Get products by availability
export const getProductsByAvailability = (availability) => {
  return allProducts.filter(product => 
    product.availability?.toLowerCase().includes(availability.toLowerCase())
  );
};

// Get products by brand
export const getProductsByBrand = (brand) => {
  return allProducts.filter(product => 
    product.brand?.toLowerCase().includes(brand.toLowerCase())
  );
};

// Get products with care information
export const getProductsWithCareInfo = () => {
  return allProducts.filter(product => product.care && Object.keys(product.care).length > 0);
};

// Get products by hardiness zone
export const getProductsByHardinessZone = (zone) => {
  return allProducts.filter(product => {
    if (!product.hardinessZone) return false;
    const zones = product.hardinessZone.split('-').map(z => parseInt(z));
    return zones.length === 2 && zone >= zones[0] && zone <= zones[1];
  });
};

// Get products by bloom time
export const getProductsByBloomTime = (bloomTime) => {
  return allProducts.filter(product => 
    product.bloomTime?.toLowerCase().includes(bloomTime.toLowerCase())
  );
};

// Get products by special features
export const getProductsBySpecialFeatures = (feature) => {
  return allProducts.filter(product => 
    product.specialFeatures?.some(sf => 
      sf.toLowerCase().includes(feature.toLowerCase())
    )
  );
};

// Export individual product arrays for specific use cases
export { plants, gardenProducts, seasonalProducts };
