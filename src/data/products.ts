import type { Product } from '../types'
import rawProducts from './products.json'

export const products = rawProducts as unknown as Product[]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isExclusive)
}

export function getBestSellingProducts(): Product[] {
  return products.filter((p) => p.isBestSelling)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q),
  )
}
