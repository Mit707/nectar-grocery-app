import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const COUNTRIES = [
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'IN', name: 'India',       dial: '+91',  flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan',    dial: '+92',  flag: '🇵🇰' },
  { code: 'US', name: 'USA',         dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', name: 'UK',          dial: '+44',  flag: '🇬🇧' },
  { code: 'AE', name: 'UAE',         dial: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia',dial: '+966', flag: '🇸🇦' },
  { code: 'AU', name: 'Australia',   dial: '+61',  flag: '🇦🇺' },
  { code: 'CA', name: 'Canada',      dial: '+1',   flag: '🇨🇦' },
  { code: 'MY', name: 'Malaysia',    dial: '+60',  flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore',   dial: '+65',  flag: '🇸🇬' },
  { code: 'QA', name: 'Qatar',       dial: '+974', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait',      dial: '+965', flag: '🇰🇼' },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onCountryChange?: (dial: string) => void
  autoFocus?: boolean
}

export function PhoneInput({ value, onChange, onCountryChange, autoFocus }: PhoneInputProps) {
  const [country, setCountry] = useState(COUNTRIES[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
    setCountry(c)
    setDropdownOpen(false)
    onCountryChange?.(c.dial)
    inputRef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11)
    onChange(raw)
  }

  return (
    <div className="relative">
      {/* Input row */}
      <div
        className="flex items-center gap-2 border-b-2 border-nectar-border pb-3 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Country selector button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o) }}
          className="flex items-center gap-1 flex-shrink-0 focus:outline-none"
          aria-label="Select country code"
        >
          <span className="text-xl leading-none">{country.flag}</span>
          <ChevronDown size={14} className="text-nectar-gray" />
        </button>

        <span className="w-px h-5 bg-nectar-border flex-shrink-0" />
        <span className="text-base font-medium text-nectar-black flex-shrink-0">{country.dial}</span>

        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          placeholder="Phone number"
          autoFocus={autoFocus}
          className="flex-1 bg-transparent text-base text-nectar-black placeholder:text-nectar-light focus:outline-none min-w-0"
        />
      </div>

      {/* Country dropdown */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-card-lg border border-nectar-border z-50 overflow-hidden max-h-64 overflow-y-auto">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCountrySelect(c)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-nectar-bg text-left transition-colors"
              >
                <span className="text-xl leading-none">{c.flag}</span>
                <span className="flex-1 text-sm text-nectar-black">{c.name}</span>
                <span className="text-sm text-nectar-gray font-medium">{c.dial}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
