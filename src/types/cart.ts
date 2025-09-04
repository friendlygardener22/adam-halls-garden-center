import { Product } from './product';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount?: CartDiscount;
}

export interface CartDiscount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount?: CartDiscount;
  loading: boolean;
  error?: string;
}

export interface AddToCartPayload {
  product: Product;
  quantity?: number;
}

export interface UpdateCartItemPayload {
  itemId: number;
  quantity: number;
}

export interface RemoveFromCartPayload {
  itemId: number;
}

export interface ApplyDiscountPayload {
  code: string;
}
