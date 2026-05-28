import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '../../components/ui/ProductCard'
import { SkeletonProductCard } from '../../components/ui/SkeletonCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { FiltersModal } from '../category/FiltersModal'
import { useDebounce } from '../../hooks/useDebounce'
import { searchProducts } from '../../data/products'
import type { FilterState } from '../../types'

export function SearchPage() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({ categories: [], brands: [] })
  const debouncedQuery = useDebounce(query, 350)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true)
      const t = setTimeout(() => setLoading(false), 400)
      return () => clearTimeout(t)
    }
    setLoading(false)
  }, [debouncedQuery])

  const results = debouncedQuery ? searchProducts(debouncedQuery) : []
  const filtered = results.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
    return true
  })

  return (
    <>
      <div className="page-enter">
        {/* Search input */}
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <div className="flex-1 h-12 bg-nectar-bg rounded-2xl flex items-center px-4 gap-3">
            <Search size={18} className="text-nectar-gray flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Store"
              className="flex-1 bg-transparent text-sm text-nectar-black placeholder:text-nectar-gray focus:outline-none"
              aria-label="Search products"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search">
                <X size={16} className="text-nectar-gray" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-nectar-bg"
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} className="text-nectar-black" />
          </button>
        </div>

        <div className="px-4 pb-4">
          {!debouncedQuery ? (
            <EmptyState
              icon={<Search size={56} />}
              title="Search for products"
              description="Start typing to find groceries, beverages, and more"
            />
          ) : loading ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => <SkeletonProductCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Search size={56} />}
              title={`No results for "${debouncedQuery}"`}
              description="Try different keywords or remove filters"
              action={
                <button
                  onClick={() => setQuery('')}
                  className="text-primary font-semibold text-sm"
                >
                  Clear search
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => navigate(`/product/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <FiltersModal
          filters={filters}
          onApply={(f) => { setFilters(f); setShowFilters(false) }}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  )
}
