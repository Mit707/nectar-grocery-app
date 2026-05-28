import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const RESEND_SECONDS = 30

export function VerificationPage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRef = useRef<HTMLInputElement>(null)

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft])

  // Auto-navigate when 4 digits entered
  useEffect(() => {
    if (code.length === 4) {
      const t = setTimeout(() => navigate('/auth/location'), 300)
      return () => clearTimeout(t)
    }
  }, [code, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    setCode(raw)
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setCode('')
    setSecondsLeft(RESEND_SECONDS)
    inputRef.current?.focus()
  }

  return (
    <div className="page-container min-h-screen bg-auth-gradient flex flex-col">
      {/* Back button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-nectar-black" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-bold text-nectar-black mb-6">
          Enter your 4-digit code
        </h1>

        <label className="block text-sm text-nectar-gray mb-3 font-medium">Code</label>

        {/* OTP slot display — tap to focus hidden input */}
        <div
          className="flex items-center gap-4 border-b-2 border-nectar-border pb-3 mb-2 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-2xl font-bold text-nectar-black w-7 text-center">
              {code[i] ?? <span className="text-nectar-light text-xl">–</span>}
            </span>
          ))}
        </div>

        {/* Hidden real input */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={code}
          onChange={handleChange}
          disabled={secondsLeft === RESEND_SECONDS && code.length === 0 ? false : false}
          autoFocus
          className="sr-only"
          aria-label="Enter 4-digit verification code"
        />
      </div>

      {/* Resend + Next */}
      <div className="flex justify-between items-center px-6 pb-10">
        <button
          onClick={handleResend}
          disabled={secondsLeft > 0}
          className="text-sm font-semibold disabled:text-nectar-gray text-primary transition-colors"
        >
          {secondsLeft > 0 ? `Resend Code (${secondsLeft}s)` : 'Resend Code'}
        </button>
        <button
          onClick={() => navigate('/auth/location')}
          disabled={code.length < 4}
          className="w-14 h-14 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-card-lg transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
