// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// AETHERIA EATERY TYPES
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // slug of the category
  imageUrl: string;
  brand?: string; // Optional, for brand-specific items
  colors?: string[]; // Optional, for color swatches
}
export interface CartItem extends Product {
  quantity: number;
}
export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  setCategories: (categories: string[]) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setBrands: (brands: string[]) => void;
  setColors: (colors: string[]) => void;
  reset: () => void;
}
// Backend Integration Types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Price at the time of order
}
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: number; // timestamp
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}
// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
}