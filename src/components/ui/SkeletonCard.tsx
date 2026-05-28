import { cn } from '../../utils/cn'

export function SkeletonProductCard({ className }: { className?: string }) {
  return (
    <div className={cn('product-card', className)}>
      <div className="skeleton w-full aspect-square rounded-xl mb-2" />
      <div className="skeleton h-3 w-12 rounded mb-1" />
      <div className="skeleton h-4 w-3/4 rounded mb-2" />
      <div className="flex items-center justify-between mt-auto">
        <div className="skeleton h-5 w-14 rounded" />
        <div className="skeleton w-9 h-9 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonCategoryCard({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton rounded-2xl h-36 w-full', className)} />
  )
}

export function SkeletonListItem({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 py-4', className)}>
      <div className="skeleton w-16 h-16 rounded-xl flex-shrink-0" />
      <div className="flex-1">
        <div className="skeleton h-4 w-3/4 rounded mb-2" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
      <div className="skeleton h-5 w-12 rounded" />
    </div>
  )
}

export function SkeletonBanner({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton h-36 w-full rounded-2xl', className)} />
  )
}
