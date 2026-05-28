import { NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { cn } from '../../utils/cn'
import { BottomNav } from './BottomNav'
import { InstallBanner } from '../ui/InstallBanner'
import { useCartStore } from '../../store/cartStore'

const navItems = [
  { to: '/home', icon: LayoutGrid, label: 'Shop' },
  { to: '/explore', icon: Search, label: 'Explore' },
  { to: '/cart', icon: ShoppingCart, label: 'Cart' },
  { to: '/favorites', icon: Heart, label: 'Favourite' },
  { to: '/account', icon: User, label: 'Account' },
]

export function AppLayout() {
  const totalItems = useCartStore((s) => s.totalItems())

  return (
    <div className="min-h-screen max-w-md mx-auto lg:max-w-none lg:mx-0">
      {/* Desktop sidebar (lg+) */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white border-r border-nectar-border z-50 flex-col p-6">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-primary font-extrabold text-2xl tracking-tight">nectar</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isCart = to === '/cart'
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors',
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'text-nectar-black hover:bg-primary-light hover:text-primary',
                  )
                }
              >
                <div className="relative">
                  <Icon size={20} />
                  {isCart && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </div>
                <span>{label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pb-[88px] lg:ml-64 lg:pb-0 min-h-screen">
        <Outlet />
      </main>

      {/* Bottom nav (mobile only) */}
      <div className="lg:hidden">
        <BottomNav />
      </div>

      {/* PWA install banner — mobile only, floats above bottom nav */}
      <InstallBanner />
    </div>
  )
}
