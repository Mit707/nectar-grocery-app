import { cn } from "../../utils/cn";
import type { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({
  category,
  onClick,
  className,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl p-4 flex flex-col h-36 w-full overflow-hidden border transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        category.bgClass,
        category.borderClass,
        className,
      )}
      aria-label={category.name}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-20 h-20 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const placeholder = target.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
        {/* <PlaceholderCategoryImage name={category.name} /> */}
      </div>
      <p className="text-sm font-semibold text-center text-nectar-black leading-tight mt-2">
        {category.name}
      </p>
    </button>
  );
}
