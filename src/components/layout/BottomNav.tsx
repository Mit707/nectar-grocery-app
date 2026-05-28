import { NavLink, useLocation } from 'react-router-dom'
import type { LucideProps } from 'lucide-react'
import { ShoppingCart, Heart, User } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useCartStore } from '../../store/cartStore'

type CustomIconProps = { active: boolean }
type LucideIconType = React.ComponentType<LucideProps>

// Custom SVGs matching Figma exactly
function ShopIcon({ active }: CustomIconProps) {
  const c = active ? '#53B175' : '#181725'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1" y="1" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.7"/>
      <rect x="12.5" y="1" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.7"/>
      <rect x="1" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.7"/>
      <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.7"/>
    </svg>
  )
}

function ExploreIcon({ active }: CustomIconProps) {
  const c = active ? '#53B175' : '#181725'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {/* Horizontal lines */}
      <line x1="2" y1="6" x2="11" y2="6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="2" y1="11" x2="11" y2="11" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="2" y1="16" x2="8" y2="16" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      {/* Magnifying glass */}
      <circle cx="16.5" cy="13.5" r="4" stroke={c} strokeWidth="1.7"/>
      <line x1="19.5" y1="16.5" x2="21" y2="18" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

type NavItem =
  | { to: string; label: string; isCustom: true; Icon: React.ComponentType<CustomIconProps>; isCart?: boolean }
  | { to: string; label: string; isCustom: false; Icon: LucideIconType; isCart?: boolean }

const navItems: NavItem[] = [
  { to: '/home', label: 'Shop', isCustom: true, Icon: ShopIcon },
  { to: '/explore', label: 'Explore', isCustom: true, Icon: ExploreIcon },
  { to: '/cart', label: 'Cart', isCustom: false, Icon: ShoppingCart, isCart: true },
  { to: '/favorites', label: 'Favourite', isCustom: false, Icon: Heart },
  { to: '/account', label: 'Account', isCustom: false, Icon: User },
]

export function BottomNav() {
  const totalItems = useCartStore((s) => s.totalItems())
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-nav border-t border-nectar-border safe-bottom"
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto flex items-center h-[68px] px-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to)

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative focus:outline-none focus-visible:bg-nectar-bg rounded-lg"
              aria-label={item.label}
            >
              <div className="relative">
                {item.isCustom ? (
                  <item.Icon active={isActive} />
                ) : (
                  <item.Icon
                    size={24}
                    strokeWidth={isActive ? 2 : 1.5}
                    className={cn(
                      'transition-colors duration-150',
                      isActive ? 'text-primary' : 'text-nectar-black',
                    )}
                  />
                )}
                {item.isCart && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors duration-150',
                  isActive ? 'text-primary' : 'text-nectar-black',
                )}
              >
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
