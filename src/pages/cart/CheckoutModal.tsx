import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight, CreditCard } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useCartStore } from '../../store/cartStore'

interface CheckoutModalProps {
  onClose: () => void
}

export function CheckoutModal({ onClose }: CheckoutModalProps) {
  const navigate = useNavigate()
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)
  const [loading, setLoading] = useState(false)

  const handlePlaceOrder = () => {
    setLoading(true)
    setTimeout(() => {
      clearCart()
      const success = Math.random() > 0.2
      if (success) {
        navigate('/order/success', { replace: true })
      } else {
        navigate('/order/failed', { replace: true })
      }
    }, 1200)
  }

  const rows = [
    { label: 'Delivery', value: 'Select Method', hasArrow: true },
    { label: 'Pament', value: null, icon: <CreditCard size={18} className="text-primary" />, hasArrow: true },
    { label: 'Promo Code', value: 'Pick discount', hasArrow: true },
    { label: 'Total Cost', value: `$${total.toFixed(2)}`, hasArrow: true },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl px-5 pt-5 pb-8 animate-[fadeSlideIn_0.25s_ease-out]">
        {/* Handle */}
        <div className="w-10 h-1 bg-nectar-border rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-nectar-black">Checkout</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-nectar-bg"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Rows */}
        <div className="divide-y divide-nectar-border mb-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-4">
              <span className="text-base text-nectar-black">{row.label}</span>
              <div className="flex items-center gap-2">
                {row.icon}
                {row.value && (
                  <span className="text-sm font-semibold text-nectar-black">{row.value}</span>
                )}
                {row.hasArrow && <ChevronRight size={16} className="text-nectar-gray" />}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-nectar-gray mb-5 text-center">
          By placing an order you agree to our{' '}
          <span className="text-nectar-black font-semibold">Terms</span> And{' '}
          <span className="text-nectar-black font-semibold">Conditions</span>
        </p>

        <Button onClick={handlePlaceOrder} loading={loading}>
          Place Order
        </Button>
      </div>
    </div>
  )
}
