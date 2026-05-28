export enum ProductCategory {
  FRESH_FRUITS_VEGETABLES = 'Fresh Fruits & Vegetable',
  COOKING_OIL_GHEE = 'Cooking Oil & Ghee',
  MEAT_FISH = 'Meat & Fish',
  BAKERY_SNACKS = 'Bakery & Snacks',
  DAIRY_EGGS = 'Dairy & Eggs',
  BEVERAGES = 'Beverages',
  CEREALS = 'Cereals',
  PULSES = 'Pulses',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export enum DeliveryMethod {
  STANDARD = 'Standard Delivery',
  EXPRESS = 'Express Delivery',
  PICKUP = 'Store Pickup',
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  unit: string
  image: string
  description: string
  brand: string
  inStock: boolean
  nutritions?: Record<string, string>
  rating: number
  reviewCount: number
  isFeatured?: boolean
  isBestSelling?: boolean
  isExclusive?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  zone?: string
  area?: string
  avatar?: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  createdAt: string
  delivery?: DeliveryMethod
  paymentMethod?: string
  promoCode?: string
}

export interface Category {
  id: string
  name: ProductCategory
  image: string
  bgClass: string
  borderClass: string
}

export interface FilterState {
  categories: string[]
  brands: string[]
}
