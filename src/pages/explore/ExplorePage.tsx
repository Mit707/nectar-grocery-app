import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CategoryCard } from '../../components/ui/CategoryCard'
import { SkeletonCategoryCard } from '../../components/ui/SkeletonCard'
import { useSimulatedFetch } from '../../hooks/useSimulatedFetch'
import { categories } from '../../data/categories'

export function ExplorePage() {
  const navigate = useNavigate()
  const { data: cats, loading } = useSimulatedFetch(() => categories, 500)

  return (
    <div className="page-enter px-4 pt-4 pb-4">
      <h1 className="text-2xl font-bold text-nectar-black text-center mb-5">
        Find Products
      </h1>

      {/* Search bar */}
      <button
        className="w-full h-12 bg-nectar-bg rounded-2xl flex items-center px-4 gap-3 mb-6"
        onClick={() => navigate('/search')}
        aria-label="Search for products"
      >
        <Search size={18} className="text-nectar-gray" />
        <span className="text-nectar-gray text-sm">Search Store</span>
      </button>

      {/* Category grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCategoryCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {(cats ?? []).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/category/${cat.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
