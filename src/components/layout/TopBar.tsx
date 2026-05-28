import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Share2, SlidersHorizontal } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ReactNode } from 'react'

interface TopBarProps {
  title?: string
  showBack?: boolean
  rightAction?: ReactNode
  showShare?: boolean
  showFilter?: boolean
  onFilterClick?: () => void
  className?: string
  transparent?: boolean
}

export function TopBar({
  title,
  showBack = true,
  rightAction,
  showShare = false,
  showFilter = false,
  onFilterClick,
  className,
  transparent = false,
}: TopBarProps) {
  const navigate = useNavigate()

  return (
    <header
      className={cn(
        'flex items-center justify-between h-14 px-4 sticky top-0 z-30',
        transparent ? 'bg-transparent' : 'bg-white',
        className,
      )}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-nectar-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Go back"
          >
            <ChevronLeft size={24} className="text-nectar-black" />
          </button>
        )}
      </div>

      {title && (
        <h1 className="text-lg font-bold text-nectar-black text-center flex-1">{title}</h1>
      )}

      <div className="w-10 flex justify-end">
        {rightAction}
        {showShare && (
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-nectar-bg transition-colors focus:outline-none"
            aria-label="Share"
          >
            <Share2 size={20} className="text-nectar-black" />
          </button>
        )}
        {showFilter && (
          <button
            onClick={onFilterClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-nectar-bg transition-colors focus:outline-none"
            aria-label="Filters"
          >
            <SlidersHorizontal size={20} className="text-nectar-black" />
          </button>
        )}
      </div>
    </header>
  )
}
