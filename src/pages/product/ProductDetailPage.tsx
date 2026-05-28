import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ChevronDown, ChevronRight, Star } from "lucide-react";
import { TopBar } from "../../components/layout/TopBar";
import { Button } from "../../components/ui/Button";
import { getProductById } from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { useFavoriteStore } from "../../store/favoriteStore";
import { cn } from "../../utils/cn";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = getProductById(productId ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);
  const toggle = useFavoriteStore((s) => s.toggle);
  const favored = useFavoriteStore((s) =>
    s.favorites.some((f) => f.id === (productId ?? "")),
  );

  const [detailOpen, setDetailOpen] = useState(true);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  if (!product) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          <p className="text-nectar-gray mb-4">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary font-semibold"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      addItem(product);
    }
    navigate("/cart");
  };

  const handleDecrement = () => {
    if (quantity > 0) updateQuantity(product.id, quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity === 0) addItem(product);
    else updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="page-enter">
      <TopBar showShare />

      {/* Product image */}
      <div className="bg-nectar-bg mx-4 rounded-2xl mb-4 relative overflow-hidden">
        {imgFailed ? (
          <div className="w-full h-64 flex items-center justify-center opacity-20">
            <span className="text-8xl">🛒</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-contain p-4"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === 0 ? "w-5 bg-primary" : "w-1.5 bg-nectar-light",
              )}
            />
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="px-4">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold text-nectar-black flex-1 pr-4">
            {product.name}
          </h1>
          <button
            onClick={() => toggle(product)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-nectar-bg transition-colors"
            aria-label={
              favored ? "Remove from favourites" : "Add to favourites"
            }
          >
            <Heart
              size={22}
              className={
                favored ? "fill-red-500 text-red-500" : "text-nectar-light"
              }
            />
          </button>
        </div>
        <p className="text-nectar-gray text-sm mb-4">{product.unit}, Price</p>

        {/* Qty + Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="w-9 h-9 rounded-full border border-nectar-border flex items-center justify-center disabled:opacity-40 hover:bg-nectar-bg transition-colors text-xl font-light"
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="text-lg font-bold text-nectar-black min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-2xl font-bold text-nectar-black">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-nectar-border mb-4" />

        {/* Product Detail accordion */}
        <button
          onClick={() => setDetailOpen(!detailOpen)}
          className="flex items-center justify-between w-full py-3"
          aria-expanded={detailOpen}
        >
          <span className="font-bold text-nectar-black">Product Detail</span>
          <ChevronDown
            size={18}
            className={cn(
              "text-nectar-gray transition-transform",
              detailOpen && "rotate-180",
            )}
          />
        </button>
        {detailOpen && (
          <p className="text-sm text-nectar-gray leading-relaxed pb-4">
            {product.description}
          </p>
        )}
        <div className="h-px bg-nectar-border" />

        {/* Nutritions row */}
        <button
          onClick={() => setNutritionOpen(!nutritionOpen)}
          className="flex items-center justify-between w-full py-4"
          aria-expanded={nutritionOpen}
        >
          <span className="font-bold text-nectar-black">Nutritions</span>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-nectar-bg text-nectar-gray px-2.5 py-1 rounded-full font-medium">
              100gr
            </span>
            <ChevronRight size={18} className="text-nectar-gray" />
          </div>
        </button>
        {nutritionOpen && product.nutritions && (
          <div className="pb-4 grid grid-cols-2 gap-2">
            {Object.entries(product.nutritions).map(([key, val]) => (
              <div key={key} className="bg-nectar-bg rounded-xl px-3 py-2">
                <p className="text-xs text-nectar-gray">{key}</p>
                <p className="text-sm font-semibold text-nectar-black">{val}</p>
              </div>
            ))}
          </div>
        )}
        <div className="h-px bg-nectar-border" />

        {/* Review row */}
        <div className="flex items-center justify-between w-full py-4">
          <span className="font-bold text-nectar-black">Review</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-nectar-orange text-nectar-orange"
                      : "text-nectar-border"
                  }
                />
              ))}
            </div>
            <ChevronRight size={18} className="text-nectar-gray" />
          </div>
        </div>
        <div className="h-px bg-nectar-border mb-6" />

        {/* Add to basket */}
        <Button onClick={handleAddToCart}>Add To Basket</Button>
        <div className="h-6" />
      </div>
    </div>
  );
}
