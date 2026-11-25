import { Check, Heart, Plus } from 'lucide-react';
import { CurrencyCode, Perfume, formatPrice } from '../data/perfumes';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  perfume: Perfume;
  currency: CurrencyCode;
  isWishlisted: boolean;
  justAdded: boolean;
  onToggleWishlist: (id: string) => void;
  onSelectPerfume: (perfume: Perfume) => void;
  onQuickAdd: (perfume: Perfume) => void;
}

export function ProductCard({
  perfume,
  currency,
  isWishlisted,
  justAdded,
  onToggleWishlist,
  onSelectPerfume,
  onQuickAdd,
}: ProductCardProps) {
  const defaultVariant = perfume.variants[0];

  return (
    <article className="group flex flex-col bg-white border border-[#E6E2D8] rounded-lg overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[#F3F1EC] overflow-hidden">
        <button
          type="button"
          onClick={() => onSelectPerfume(perfume)}
          aria-label={`View details for ${perfume.brand} ${perfume.name}`}
          className="block w-full h-full cursor-pointer text-left"
        >
          <ResilientImage
            src={perfume.image}
            alt={`${perfume.brand} ${perfume.name} ${perfume.concentration} bottle`}
            fallbackLabel={`${perfume.brand} — ${perfume.name}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        {perfume.badgeText && (
          <span className="pointer-events-none absolute top-3 left-3 text-[11px] font-medium tracking-[0.08em] uppercase text-[#1C1917] bg-[#FAF9F6]/90 px-2.5 py-1 rounded">
            {perfume.badgeText}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist(perfume.id)}
          aria-label={isWishlisted ? `Remove ${perfume.name} from wishlist` : `Save ${perfume.name} to wishlist`}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF9F6]/90 text-[#1C1917] hover:bg-white transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#8C6D46] text-[#8C6D46]' : 'text-[#57534E]'
            }`}
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.08em] uppercase text-[#57534E]">
            {perfume.brand} · {perfume.concentration}
          </p>
          <h3 className="mt-1 text-base font-semibold text-[#1C1917] leading-snug">
            <button
              type="button"
              onClick={() => onSelectPerfume(perfume)}
              className="text-left hover:text-[#8C6D46] transition-colors cursor-pointer"
            >
              {perfume.name}
            </button>
          </h3>
          <p className="mt-1.5 text-sm text-[#57534E] line-clamp-2 leading-relaxed">
            {perfume.tagline}
          </p>
          <p className="mt-2.5 text-xs text-[#78716C]">
            {perfume.scentFamily} · {perfume.gender} · {defaultVariant.volume}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-[15px] font-semibold text-[#1C1917]">
              {formatPrice(defaultVariant.pricePkr, currency)}
            </span>
            {defaultVariant.compareAtPkr && (
              <span className="text-xs text-[#78716C] line-through">
                {formatPrice(defaultVariant.compareAtPkr, currency)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onQuickAdd(perfume)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-[#8C6D46] text-white'
                : 'bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
