import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'
import { zones, areas } from '../../data/categories'

export function SelectLocationPage() {
  const navigate = useNavigate()
  const { login, user, updateUser } = useAuthStore()
  const [zone, setZone] = useState('Banasree')
  const [area, setArea] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    if (!user) {
      login({ id: '1', name: 'User', email: 'user@nectar.com', zone, area })
    } else {
      updateUser({ zone, area })
    }
    setTimeout(() => navigate('/home', { replace: true }), 600)
  }

  return (
    <div className="page-container min-h-screen bg-auth-gradient flex flex-col px-6">
      {/* Map illustration */}
      <div className="flex justify-center mt-16 mb-8">
        <img
          src="/images/location.png"
          alt="Map location"
          className="w-40 h-32 object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold text-nectar-black text-center mb-3">
        Select Your Location
      </h1>
      <p className="text-nectar-gray text-sm text-center mb-10 px-4">
        Swithch on your location to stay in tune with what&apos;s happening in your area
      </p>

      {/* Zone dropdown */}
      <div className="mb-6">
        <p className="text-sm font-bold text-nectar-black mb-2">Your Zone</p>
        <div className="relative">
          <select
            value={zone}
            onChange={(e) => { setZone(e.target.value); setArea('') }}
            className="w-full h-14 appearance-none border border-nectar-border rounded-2xl px-4 pr-10 text-base text-nectar-black bg-white focus:outline-none focus:border-primary"
          >
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-nectar-gray pointer-events-none" />
        </div>
      </div>

      {/* Area dropdown */}
      <div className="mb-12">
        <p className="text-sm font-bold text-nectar-black mb-2">Your Area</p>
        <div className="relative">
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={`w-full h-14 appearance-none border border-nectar-border rounded-2xl px-4 pr-10 text-base bg-white focus:outline-none focus:border-primary ${area ? 'text-nectar-black' : 'text-nectar-light'}`}
          >
            <option value="" disabled>Types of your area</option>
            {(areas[zone] ?? []).map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-nectar-gray pointer-events-none" />
        </div>
      </div>

      <Button onClick={handleSubmit} loading={loading} disabled={!zone}>
        Submit
      </Button>
    </div>
  )
}
