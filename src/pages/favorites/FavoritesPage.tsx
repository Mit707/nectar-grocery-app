import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Heart } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { OrderFailedModal } from '../order/OrderFailedModal'
import { useFavoriteStore } from '../../store/favoriteStore'
import { useCartStore } from '../../store/cartStore'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites } = useFavoriteStore()
  const addItem = useCartStore((s) => s.addItem)
  const [showError, setShowError] = useState(false)

  const handleAddAll = () => {
    if (favorites.length === 0) return
    favorites.forEach((p) => addItem(p))
    navigate('/cart')
  }

  if (favorites.length === 0) {
    return (
      <div className="page-enter">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-nectar-black text-center">Favoururite</h1>
        </div>
        <EmptyState
          icon={<Heart size={56} />}
          title="No favourites yet"
          description="Add products to your favourites to see them here"
          action={
            <Button onClick={() => navigate('/explore')} size="md">
              Explore Products
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <>
      <div className="page-enter">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-nectar-black text-center">Favoururite</h1>
        </div>

        {/* Favorites list */}
        <div className="px-4 divide-y divide-nectar-border">
          {favorites.map((product) => (
            <button
              key={product.id}
              className="flex items-center gap-3 py-4 w-full text-left"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image */}
              <div className="w-14 h-14 bg-nectar-bg rounded-xl flex-shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-nectar-black line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-nectar-gray mt-0.5">{product.unit}, Price</p>
              </div>

              {/* Price + Arrow */}
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-nectar-black">
                  ${product.price.toFixed(2)}
                </span>
                <ChevronRight size={16} className="text-nectar-gray flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Add all to cart */}
        <div className="px-4 pt-4 pb-6">
          <Button onClick={handleAddAll}>Add All To Cart</Button>
        </div>
      </div>

      {showError && (
        <OrderFailedModal
          onRetry={() => setShowError(false)}
          onHome={() => { setShowError(false); navigate('/home') }}
        />
      )}
    </>
  )
}
