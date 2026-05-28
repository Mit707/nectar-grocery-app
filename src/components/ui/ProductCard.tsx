import { Plus } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'

interface ProductCardProps {
  product: Product
  onClick?: () => void
  className?: string
}

function PlaceholderImage({ category }: { category: string }) {
  const colors: Record<string, string> = {
    'Fresh Fruits & Vegetable': 'bg-[#F2FFF2]',
    'Meat & Fish': 'bg-[#FFF1F0]',
    'Dairy & Eggs': 'bg-[#FFFBE5]',
    Beverages: 'bg-[#E5F4FF]',
    'Bakery & Snacks': 'bg-[#F5F0FF]',
    'Cooking Oil & Ghee': 'bg-[#FFF3E5]',
    Cereals: 'bg-[#E5FFFC]',
    Pulses: 'bg-[#FFF0F5]',
  }
  const bg = colors[category] ?? 'bg-nectar-bg'
  return (
    <div className={cn('hidden w-full aspect-square rounded-xl items-center justify-center', bg)}>
      <span className="text-3xl opacity-40">🛒</span>
    </div>
  )
}

export function ProductCard({ product, onClick, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const qty = items.find((i) => i.product.id === product.id)?.quantity ?? 0

  return (
    <div
      className={cn('product-card cursor-pointer group', className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`${product.name}, $${product.price}`}
    >
      <div className="relative mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-contain rounded-xl"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const placeholder = target.nextElementSibling as HTMLElement | null
            if (placeholder) placeholder.style.display = 'flex'
          }}
        />
        <PlaceholderImage category={product.category} />
      </div>

      <p className="text-xs text-nectar-gray mb-0.5">{product.unit}</p>
      <p className="text-sm font-semibold text-nectar-black leading-tight mb-2 line-clamp-2">
        {product.name}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-base font-bold text-nectar-black">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            addItem(product)
          }}
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 flex-shrink-0',
            qty > 0
              ? 'bg-primary-dark text-white'
              : 'bg-primary hover:bg-primary-dark text-white',
          )}
          aria-label={`Add ${product.name} to cart`}
        >
          {qty > 0 ? (
            <span className="text-xs font-bold">{qty}</span>
          ) : (
            <Plus size={18} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  )
}
