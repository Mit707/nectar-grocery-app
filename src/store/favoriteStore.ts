import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'

interface FavoriteState {
  favorites: Product[]
  toggle: (product: Product) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggle: (product) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.id === product.id)
          return {
            favorites: exists
              ? state.favorites.filter((f) => f.id !== product.id)
              : [...state.favorites, product],
          }
        }),

      isFavorite: (productId) =>
        get().favorites.some((f) => f.id === productId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: 'nectar-favorites' },
  ),
)
