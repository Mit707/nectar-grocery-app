import { useNavigate } from 'react-router-dom'
import { OrderFailedModal } from './OrderFailedModal'

export function OrderFailedPage() {
  const navigate = useNavigate()
  return (
    <div className="page-container min-h-screen bg-auth-gradient">
      <OrderFailedModal
        onRetry={() => navigate('/cart', { replace: true })}
        onHome={() => navigate('/home', { replace: true })}
      />
    </div>
  )
}
