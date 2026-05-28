import { useNavigate } from 'react-router-dom'
import { Star, Phone } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export function OrderSuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container min-h-screen bg-auth-gradient flex flex-col items-center justify-center px-6 text-center">
      {/* Checkmark with confetti */}
      <div className="relative mb-8">
        {/* Confetti dots */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none">
          {[
            { color: 'bg-primary', x: '-top-2 left-4', size: 'w-3 h-3' },
            { color: 'bg-red-400', x: 'top-2 right-2', size: 'w-2 h-2' },
            { color: 'bg-yellow-400', x: 'top-8 left-0', size: 'w-2.5 h-2.5' },
            { color: 'bg-blue-500', x: 'bottom-4 right-6', size: 'w-2 h-2' },
            { color: 'bg-purple-400', x: 'bottom-8 left-2', size: 'w-2 h-2' },
            { color: 'bg-nectar-orange', x: '-bottom-2 right-2', size: 'w-3 h-3' },
          ].map((dot, i) => (
            <div
              key={i}
              className={`absolute ${dot.color} ${dot.x} ${dot.size} rounded-full opacity-80`}
            />
          ))}
          {/* Squiggly lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192" fill="none">
            <path d="M20 40 Q30 30 20 20" stroke="#5383EC" strokeWidth="3" strokeLinecap="round" />
            <path d="M170 60 Q160 50 170 40" stroke="#F8A44C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M160 160 Q170 150 160 140" stroke="#53B175" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Green circle */}
        <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center shadow-card-lg relative z-10">
          <div className="w-24 h-24 border-4 border-white/30 rounded-full absolute" />
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M10 24 L20 34 L38 14"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-nectar-black mb-3 leading-snug">
        Your Order has been<br />accepted
      </h1>
      <p className="text-sm text-nectar-gray mb-8 max-w-xs">
        Your items has been placed and is on it&apos;s way to being processed
      </p>

      {/* Delivery person card */}
      <div className="w-full bg-white rounded-2xl border border-nectar-border px-4 py-3 flex items-center gap-3 mb-8 shadow-sm">
        <img
          src="/images/delivery-person.svg"
          alt="Delivery partner"
          className="w-14 h-14 rounded-full object-cover bg-[#EEF7F1] flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-nectar-gray uppercase tracking-wide font-medium">Your delivery partner</p>
          <p className="text-sm font-bold text-nectar-black mt-0.5">James Rodriguez</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={11} className="fill-nectar-orange text-nectar-orange" />
            ))}
            <span className="text-[11px] text-nectar-gray ml-1">4.9 · 1.2k reviews</span>
          </div>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary-dark transition-colors"
          aria-label="Call delivery partner"
        >
          <Phone size={16} className="text-white" />
        </button>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button onClick={() => navigate('/home', { replace: true })}>
          Track Order
        </Button>
        <button
          onClick={() => navigate('/home', { replace: true })}
          className="text-sm font-semibold text-nectar-black"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
