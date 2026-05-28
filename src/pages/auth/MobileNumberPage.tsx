import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PhoneInput } from '../../components/ui/PhoneInput'

export function MobileNumberPage() {
  const navigate = useNavigate()
  const [number, setNumber] = useState('')

  const handleNext = () => {
    if (number.length >= 7) navigate('/auth/verify')
  }

  return (
    <div className="page-container min-h-screen bg-auth-gradient flex flex-col">
      {/* Back */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-nectar-black" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-bold text-nectar-black mb-6">
          Enter your mobile number
        </h1>

        <label className="block text-sm text-nectar-gray mb-3 font-medium">
          Mobile Number
        </label>

        <PhoneInput value={number} onChange={setNumber} autoFocus />
      </div>

      <div className="flex justify-end px-6 pb-10">
        <button
          onClick={handleNext}
          disabled={number.length < 7}
          className="w-14 h-14 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-card-lg transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
