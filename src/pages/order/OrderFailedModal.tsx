import { X } from 'lucide-react'
import { Button } from '../../components/ui/Button'

interface OrderFailedModalProps {
  onRetry: () => void
  onHome: () => void
}

export function OrderFailedModal({ onRetry, onHome }: OrderFailedModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30" onClick={onHome} />
      <div className="relative bg-white rounded-3xl px-6 pt-6 pb-8 w-full max-w-sm text-center animate-[fadeSlideIn_0.25s_ease-out]">
        <button
          onClick={onHome}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-nectar-bg"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Illustration */}
        <div className="w-28 h-28 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-5 mt-4">
          <span className="text-5xl">🛍️</span>
        </div>

        <h2 className="text-xl font-bold text-nectar-black mb-2">Oops! Order Failed</h2>
        <p className="text-sm text-nectar-gray mb-6">Something went tembly wrong.</p>

        <Button onClick={onRetry} className="mb-3">Please Try Again</Button>
        <button
          onClick={onHome}
          className="text-sm font-semibold text-nectar-black"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
