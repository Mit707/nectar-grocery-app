import { useNavigate } from 'react-router-dom'
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import { useFavoriteStore } from '../../store/favoriteStore'

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  value?: string
  onClick?: () => void
  danger?: boolean
}

function MenuItem({ icon, label, value, onClick, danger }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-5 py-4 hover:bg-nectar-bg transition-colors"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-primary-light'}`}>
        <span className={danger ? 'text-nectar-error' : 'text-primary'}>{icon}</span>
      </div>
      <span className={`flex-1 text-left text-base font-medium ${danger ? 'text-nectar-error' : 'text-nectar-black'}`}>
        {label}
      </span>
      {value && <span className="text-sm text-nectar-gray">{value}</span>}
      {!danger && <ChevronRight size={18} className="text-nectar-gray" />}
    </button>
  )
}

export function AccountPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const totalItems = useCartStore((s) => s.totalItems())
  const favCount = useFavoriteStore((s) => s.favorites.length)

  const handleLogout = () => {
    logout()
    navigate('/onboarding', { replace: true })
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="px-4 pt-6 pb-5 flex items-center gap-4">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={28} className="text-primary" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold text-nectar-black">{user?.name ?? 'Guest User'}</h2>
          <p className="text-sm text-nectar-gray">{user?.email ?? ''}</p>
          {user?.zone && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-nectar-gray" />
              <span className="text-xs text-nectar-gray">{user.zone}{user.area ? `, ${user.area}` : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-4 mb-5 grid grid-cols-2 gap-3">
        <div className="bg-primary-light rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{totalItems}</p>
          <p className="text-xs text-nectar-gray mt-1">Items in cart</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{favCount}</p>
          <p className="text-xs text-nectar-gray mt-1">Favourites</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="divide-y divide-nectar-border border-t border-nectar-border">
        <MenuItem
          icon={<ShoppingBag size={20} />}
          label="Orders"
          value="Track & manage"
          onClick={() => navigate('/cart')}
        />
        <MenuItem
          icon={<Heart size={20} />}
          label="Favourites"
          value={`${favCount} items`}
          onClick={() => navigate('/favorites')}
        />
        <MenuItem
          icon={<MapPin size={20} />}
          label="Delivery Address"
          value={user?.zone ?? 'Not set'}
          onClick={() => navigate('/auth/location')}
        />
        <MenuItem
          icon={<CreditCard size={20} />}
          label="Payment Methods"
          onClick={() => {}}
        />
        <MenuItem
          icon={<Bell size={20} />}
          label="Notifications"
          onClick={() => {}}
        />
        <MenuItem
          icon={<HelpCircle size={20} />}
          label="Help & Support"
          onClick={() => {}}
        />
        <MenuItem
          icon={<LogOut size={20} />}
          label="Log out"
          onClick={handleLogout}
          danger
        />
      </div>

      <div className="h-4" />
    </div>
  )
}
