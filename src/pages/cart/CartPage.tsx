import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { CheckoutModal } from './CheckoutModal'
import { useCartStore } from '../../store/cartStore'
import { ShoppingCart } from 'lucide-react'

export function CartPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, total } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)

  const tot = total()

  if (items.length === 0) {
    return (
      <div className="page-enter">
        <div className="px-4 pt-4">
          <h1 className="text-xl font-bold text-nectar-black text-center">My Cart</h1>
        </div>
        <EmptyState
          icon={<ShoppingCart size={56} />}
          title="Your cart is empty"
          description="Start shopping to add items to your cart"
          action={
            <Button onClick={() => navigate('/explore')} size="md">
              Browse Products
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
          <h1 className="text-xl font-bold text-nectar-black text-center">My Cart</h1>
        </div>

        {/* Cart items */}
        <div className="px-4 divide-y divide-nectar-border">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3 py-4">
              {/* Image */}
              <div className="w-16 h-16 bg-nectar-bg rounded-xl flex-shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-nectar-black leading-tight line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-nectar-gray mt-0.5">{product.unit}, Price</p>

                {/* Qty controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 rounded-full border border-nectar-border flex items-center justify-center hover:bg-nectar-bg transition-colors text-lg leading-none"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="text-sm font-bold text-nectar-black w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-colors text-lg leading-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(product.id)}
                  className="w-6 h-6 flex items-center justify-center text-nectar-light hover:text-nectar-error transition-colors"
                  aria-label={`Remove ${product.name}`}
                >
                  <X size={16} />
                </button>
                <span className="text-sm font-bold text-nectar-black">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom - Go to checkout */}
        <div className="px-4 pt-4 pb-6">
          <Button
            onClick={() => setShowCheckout(true)}
            className="flex items-center justify-between"
          >
            <span>Go to Checkout</span>
            <span className="bg-primary-dark px-3 py-1 rounded-full text-sm font-bold">
              ${tot.toFixed(2)}
            </span>
          </Button>
        </div>
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  )
}
