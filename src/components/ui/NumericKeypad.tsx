import { Delete } from 'lucide-react'

interface NumericKeypadProps {
  onKey: (key: string) => void
  onDelete: () => void
}

const rows = [
  [{ label: '1', sub: '' }, { label: '2', sub: 'ABC' }, { label: '3', sub: 'DEF' }],
  [{ label: '4', sub: 'GHI' }, { label: '5', sub: 'JKL' }, { label: '6', sub: 'MNO' }],
  [{ label: '7', sub: 'PQRS' }, { label: '8', sub: 'TUV' }, { label: '9', sub: 'WXYZ' }],
]

export function NumericKeypad({ onKey, onDelete }: NumericKeypadProps) {
  return (
    <div className="bg-white border-t border-nectar-border">
      {rows.map((row, ri) => (
        <div key={ri} className="flex">
          {row.map((key) => (
            <button
              key={key.label}
              onClick={() => onKey(key.label)}
              className="flex-1 h-16 flex flex-col items-center justify-center border-b border-r border-nectar-border last:border-r-0 active:bg-nectar-bg transition-colors"
              aria-label={key.label}
            >
              <span className="text-xl font-medium text-nectar-black leading-none">
                {key.label}
              </span>
              {key.sub && (
                <span className="text-[9px] text-nectar-gray mt-0.5 tracking-wider">
                  {key.sub}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
      <div className="flex">
        <button
          onClick={() => onKey('+')}
          className="flex-1 h-16 flex items-center justify-center border-r border-nectar-border active:bg-nectar-bg transition-colors text-nectar-gray text-lg"
          aria-label="symbols"
        >
          + * #
        </button>
        <button
          onClick={() => onKey('0')}
          className="flex-1 h-16 flex flex-col items-center justify-center border-r border-nectar-border active:bg-nectar-bg transition-colors"
          aria-label="0"
        >
          <span className="text-xl font-medium text-nectar-black">0</span>
        </button>
        <button
          onClick={onDelete}
          className="flex-1 h-16 flex items-center justify-center active:bg-nectar-bg transition-colors"
          aria-label="delete"
        >
          <Delete size={22} className="text-nectar-black" />
        </button>
      </div>
    </div>
  )
}
