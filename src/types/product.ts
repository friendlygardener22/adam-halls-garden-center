export interface Product {
  id: number;
  name: string;
  scientific?: string;
  category: string;
  price: number;
  description?: string;
  images: string[];
  image?: string;
  features?: string[];
  care?: {
    light?: string;
    water?: string;
    soil?: string;
    general?: string;
    fertilizer?: string;
    pruning?: string;
  } | string;
  size?: {
    height?: string;
    width?: string;
  };
  availability?: string;
  image_category?: string;
  sku?: string;
  container_size?: string;
  supplier?: string;
  location?: string;
  last_updated?: string;
  bloom_color?: string;
  bloom_season?: string;
  growth_rate?: string;
  usda_zones?: string;
  frost_tolerance?: string;
  drought_tolerance?: string;
  pet_safe?: string;
  edible?: string;
  advertisement?: string;
  product_card?: {
    card_image?: string;
    card_html?: string;
    spin_animation?: string;
    rounded_card?: string;
  };
  featured?: boolean;
  inStock?: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
  author: string;
  date: string;
}

export interface ProductFilters {
  category?: string;
  priceRange?: number;
  size?: string;
  light?: string;
  water?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'name';
}

export interface ProductSearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
}
