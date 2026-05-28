import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { categories, allBrands } from '../../data/categories'
import type { FilterState } from '../../types'

interface FiltersModalProps {
  filters: FilterState
  onApply: (filters: FilterState) => void
  onClose: () => void
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-4 w-full py-3"
      aria-pressed={checked}
      aria-label={label}
    >
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors border-2 ${
          checked ? 'bg-primary border-primary' : 'border-nectar-border bg-white'
        }`}
      >
        {checked && <Check size={14} className="text-white" strokeWidth={3} />}
      </div>
      <span
        className={`text-base font-medium ${checked ? 'text-primary' : 'text-nectar-black'}`}
      >
        {label}
      </span>
    </button>
  )
}

export function FiltersModal({ filters, onApply, onClose }: FiltersModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const toggleCategory = (cat: string) => {
    const cats = localFilters.categories.includes(cat)
      ? localFilters.categories.filter((c) => c !== cat)
      : [...localFilters.categories, cat]
    setLocalFilters({ ...localFilters, categories: cats })
  }

  const toggleBrand = (brand: string) => {
    const brands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter((b) => b !== brand)
      : [...localFilters.brands, brand]
    setLocalFilters({ ...localFilters, brands })
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal panel */}
      <div className="relative mt-auto w-full max-w-md mx-auto bg-white rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col animate-[fadeSlideIn_0.25s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-nectar-bg"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-nectar-black">Filters</h2>
          <div className="w-9" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 pb-4">
          <div className="bg-nectar-bg rounded-2xl p-4 mb-4">
            <h3 className="text-lg font-bold text-nectar-black mb-2">Categories</h3>
            <div className="divide-y divide-nectar-border">
              {categories.map((cat) => (
                <CheckItem
                  key={cat.id}
                  label={cat.name}
                  checked={localFilters.categories.includes(cat.name)}
                  onToggle={() => toggleCategory(cat.name)}
                />
              ))}
            </div>
          </div>

          <div className="bg-nectar-bg rounded-2xl p-4">
            <h3 className="text-lg font-bold text-nectar-black mb-2">Brand</h3>
            <div className="divide-y divide-nectar-border">
              {allBrands.map((brand) => (
                <CheckItem
                  key={brand}
                  label={brand}
                  checked={localFilters.brands.includes(brand)}
                  onToggle={() => toggleBrand(brand)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="px-5 py-4 border-t border-nectar-border">
          <Button onClick={() => onApply(localFilters)}>Apply Filter</Button>
        </div>
      </div>
    </div>
  )
}
