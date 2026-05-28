import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '../../components/layout/TopBar'
import { ProductCard } from '../../components/ui/ProductCard'
import { SkeletonProductCard } from '../../components/ui/SkeletonCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { FiltersModal } from './FiltersModal'
import { useSimulatedFetch } from '../../hooks/useSimulatedFetch'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import type { Product, FilterState } from '../../types'
import { ShoppingBag } from 'lucide-react'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterState>({ categories: [], brands: [] })

  const category = categories.find((c) => c.id === categoryId)

  const { data, loading } = useSimulatedFetch<Product[]>(() => {
    if (!category) return []
    return products.filter((p) => p.category === category.name)
  }, 600)

  const filtered = (data ?? []).filter((p) => {
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(p.category)) return false
    if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(p.brand)) return false
    return true
  })

  return (
    <>
      <div className="page-enter">
        <TopBar
          title={category?.name ?? 'Products'}
          showFilter
          onFilterClick={() => setShowFilters(true)}
        />

        <div className="px-4 pb-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag size={56} />}
              title="No products found"
              description="Try adjusting your filters or check back later."
              action={
                <button
                  onClick={() => setActiveFilters({ categories: [], brands: [] })}
                  className="text-primary font-semibold text-sm"
                >
                  Clear filters
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
          filters={activeFilters}
          onApply={(f) => { setActiveFilters(f); setShowFilters(false) }}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  )
}
