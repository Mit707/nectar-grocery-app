import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, ChevronRight, ChevronDown } from "lucide-react";
import { ProductCard } from "../../components/ui/ProductCard";
import { SkeletonProductCard } from "../../components/ui/SkeletonCard";
import { useAuthStore } from "../../store/authStore";
import { useSimulatedFetch } from "../../hooks/useSimulatedFetch";
import {
  getFeaturedProducts,
  getBestSellingProducts,
  getProductsByCategory,
} from "../../data/products";
import { categories } from "../../data/categories";

function HomeBanner() {
  return (
    <div className="relative h-36 rounded-2xl overflow-hidden bg-[#EDF5EA]">
      {/* Left: vegetable basket photo */}
      <div className="absolute left-0 top-0 bottom-0 w-[52%]">
        <img
          src="/images/banner-vegetables.png"
          alt=""
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Right: promo text */}
      <div className="absolute right-0 top-0 bottom-7 w-[52%] flex flex-col justify-center pr-4 pl-2">
        <h2 className="text-nectar-black font-bold text-[18px] leading-tight">
          Fresh
          <br />
          Vegetables
        </h2>
        <p className="text-primary text-[11px] font-semibold mt-1.5">
          Get Up To 40% OFF
        </p>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={
              i === 0
                ? "w-5 h-1.5 bg-primary rounded-full"
                : "w-1.5 h-1.5 bg-nectar-light rounded-full"
            }
          />
        ))}
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  onSeeAll: () => void;
}
function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title">{title}</h2>
      <button
        onClick={onSeeAll}
        className="text-sm text-nectar-gray font-medium flex items-center gap-0.5"
      >
        See all <ChevronRight size={14} />
      </button>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [searchFocused, setSearchFocused] = useState(false);

  const { data: exclusiveProducts, loading: loadingExclusive } =
    useSimulatedFetch(getFeaturedProducts, 700);
  const { data: bestSelling, loading: loadingBest } = useSimulatedFetch(
    getBestSellingProducts,
    900,
  );
  const { data: groceries, loading: loadingGroceries } = useSimulatedFetch(
    () => getProductsByCategory("Fresh Fruits & Vegetable"),
    1100,
  );

  const location = user?.zone
    ? `${user.zone}${user.area ? `, ${user.area}` : ""}`
    : "Dhaka, Banasree";

  return (
    <div className="page-enter">
      {/* Header */}
      <header className="flex flex-col items-center px-4 pt-4 pb-2">
        <img src="/icons/carrot_red.svg" alt="" className="w-7 h-8 mb-1" />
        <button
          className="flex items-center gap-1"
          onClick={() => navigate("/auth/location")}
          aria-label="Change location"
        >
          <MapPin size={14} className="text-nectar-black" />
          <span className="text-sm font-semibold text-nectar-black">
            {location}
          </span>
          <ChevronDown size={14} className="text-nectar-black" />
        </button>
      </header>

      {/* Search bar */}
      <div className="px-4 mb-5">
        <button
          className="w-full h-12 bg-nectar-bg rounded-2xl flex items-center px-4 gap-3"
          onClick={() => navigate("/search")}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          aria-label="Search for products"
        >
          <Search size={18} className="text-nectar-gray" />
          <span className="text-nectar-gray text-sm">Search Store</span>
        </button>
        {searchFocused && null}
      </div>

      {/* Banner */}
      <div className="px-4 mb-6">
        <HomeBanner />
      </div>

      {/* Exclusive Offer */}
      <section className="px-4 mb-6">
        <SectionHeader
          title="Exclusive Offer"
          onSeeAll={() => navigate("/explore")}
        />
        {loadingExclusive ? (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2].map((i) => (
              <SkeletonProductCard key={i} className="min-w-[160px]" />
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {(exclusiveProducts ?? []).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                className="min-w-[160px]"
                onClick={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Best Selling */}
      <section className="px-4 mb-6">
        <SectionHeader
          title="Best Selling"
          onSeeAll={() => navigate("/explore")}
        />
        {loadingBest ? (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2].map((i) => (
              <SkeletonProductCard key={i} className="min-w-[160px]" />
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {(bestSelling ?? []).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                className="min-w-[160px]"
                onClick={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Groceries categories */}
      <section className="px-4 mb-6">
        <SectionHeader
          title="Groceries"
          onSeeAll={() => navigate("/explore")}
        />
        {/* Category pills */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-nectar-black transition-colors ${cat.bgClass}`}
            >
              <span>{cat.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        {loadingGroceries ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {(groceries ?? []).slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}
