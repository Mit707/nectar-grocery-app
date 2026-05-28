import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  subtotal: () => number
  total: () => number
}

const DELIVERY_FEE = 1.0

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            }
          }
          return { items: [...state.items, { product, quantity: 1 }] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.product.id !== productId) }
          }
          return {
            items: state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i,
            ),
          }
        }),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      total: () => {
        const sub = get().subtotal()
        return sub > 0 ? sub + DELIVERY_FEE : 0
      },
    }),
    { name: 'nectar-cart' },
  ),
)
