import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  variant?: 'underline' | 'box'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightIcon, leftIcon, variant = 'underline', className, ...props }, ref) => {
    if (variant === 'box') {
      return (
        <div className="relative w-full">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nectar-gray">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-12 bg-nectar-bg rounded-2xl border border-transparent px-4 text-base text-nectar-black placeholder:text-nectar-light focus:outline-none focus:border-primary transition-colors',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-nectar-error',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-nectar-gray">
              {rightIcon}
            </span>
          )}
          {error && <p className="mt-1 text-xs text-nectar-error">{error}</p>}
        </div>
      )
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-nectar-gray mb-2 font-medium">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-nectar-gray">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'auth-input-underline',
              leftIcon && 'pl-8',
              rightIcon && 'pr-8',
              error && 'border-nectar-error',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-nectar-gray cursor-pointer">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-nectar-error">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
