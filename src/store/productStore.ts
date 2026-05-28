import { create } from 'zustand'
import type { FilterState } from '../types'

interface ProductStoreState {
  filters: FilterState
  searchQuery: string
  setSearchQuery: (q: string) => void
  setFilters: (filters: FilterState) => void
  resetFilters: () => void
  toggleCategoryFilter: (category: string) => void
  toggleBrandFilter: (brand: string) => void
}

const defaultFilters: FilterState = { categories: [], brands: [] }

export const useProductStore = create<ProductStoreState>()((set) => ({
  filters: defaultFilters,
  searchQuery: '',

  setSearchQuery: (q) => set({ searchQuery: q }),

  setFilters: (filters) => set({ filters }),

  resetFilters: () => set({ filters: defaultFilters }),

  toggleCategoryFilter: (category) =>
    set((state) => {
      const cats = state.filters.categories.includes(category)
        ? state.filters.categories.filter((c) => c !== category)
        : [...state.filters.categories, category]
      return { filters: { ...state.filters, categories: cats } }
    }),

  toggleBrandFilter: (brand) =>
    set((state) => {
      const brands = state.filters.brands.includes(brand)
        ? state.filters.brands.filter((b) => b !== brand)
        : [...state.filters.brands, brand]
      return { filters: { ...state.filters, brands } }
    }),
}))
