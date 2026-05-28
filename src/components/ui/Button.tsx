import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'social'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'lg',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-[19px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none'

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark active:bg-primary-dark text-white',
    secondary: 'bg-nectar-bg hover:bg-nectar-border text-nectar-black',
    outline: 'border border-nectar-border bg-white hover:bg-nectar-bg text-nectar-black',
    ghost: 'bg-transparent hover:bg-nectar-bg text-nectar-black',
    social: 'bg-[#5383EC] hover:bg-[#4070d4] text-white',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-6 text-lg w-full',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  )
}
