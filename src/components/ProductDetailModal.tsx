import { useEffect, useState } from 'react';
import { Check, Heart, Minus, Plus, ShieldCheck, X } from 'lucide-react';
import { CurrencyCode, Perfume, formatPrice } from '../data/perfumes';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  perfume: Perfume | null;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToBag: (perfume: Perfume, volume: string, quantity: number) => void;
}

export function ProductDetailModal({
  perfume,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToBag,
}: ProductDetailModalProps) {
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (perfume) {
      setSelectedVolume(perfume.variants[0].volume);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [perfume]);

  useEffect(() => {
    if (!perfume) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [perfume, onClose]);

  if (!perfume) return null;

  const activeVariant =
    perfume.variants.find((v) => v.volume === selectedVolume) ?? perfume.variants[0];

  const handleAdd = () => {
    onAddToBag(perfume, activeVariant.volume, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E6E2D8] rounded-xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 border border-[#E6E2D8] text-[#1C1917] hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Sticky Gallery */}
          <div className="md:col-span-6 bg-[#F3F1EC] flex items-center justify-center p-6 sm:p-8">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
              <ResilientImage
                src={perfume.image}
                alt={`${perfume.brand} ${perfume.name} bottle`}
                fallbackLabel={`${perfume.brand} — ${perfume.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[#8C6D46]">
                <span>{perfume.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{perfume.concentration}</span>
              </div>

              <h2
                id="pdp-title"
                className="mt-1.5 font-serif text-3xl font-semibold text-[#1C1917] leading-tight"
              >
                {perfume.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3 tabular-nums">
                <span className="text-xl font-semibold text-[#1C1917]">
                  {formatPrice(activeVariant.pricePkr, currency)}
                </span>
                {activeVariant.compareAtPkr && (
                  <span className="text-sm text-[#78716C] line-through">
                    {formatPrice(activeVariant.compareAtPkr, currency)}
                  </span>
                )}
                <span className="text-xs text-[#57534E]">
                  · In Stock ({activeVariant.stock} sealed)
                </span>
              </div>

              <p className="mt-4 text-sm text-[#57534E] leading-relaxed">
                {perfume.description}
              </p>

              {/* Volume Selector */}
              <div className="mt-5">
                <span className="block text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
                  Select Volume
                </span>
                <div className="flex flex-wrap gap-2">
                  {perfume.variants.map((variant) => {
                    const isSelected = variant.volume === activeVariant.volume;
                    return (
                      <button
                        key={variant.volume}
                        type="button"
                        onClick={() => setSelectedVolume(variant.volume)}
                        className={`px-4 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                            : 'bg-[#FAF9F6] text-[#1C1917] border-[#E6E2D8] hover:border-[#8C6D46]'
                        }`}
                      >
                        {variant.volume}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Olfactory Pyramid */}
              <div className="mt-6 pt-5 border-t border-[#E6E2D8] space-y-2.5 text-sm">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-[#78716C]">
                    Top
                  </span>
                  <span className="col-span-9 text-[#1C1917]">
                    {perfume.notes.top.join(' · ')}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-[#78716C]">
                    Heart
                  </span>
                  <span className="col-span-9 text-[#1C1917]">
                    {perfume.notes.heart.join(' · ')}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-[#78716C]">
                    Base
                  </span>
                  <span className="col-span-9 text-[#1C1917]">
                    {perfume.notes.base.join(' · ')}
                  </span>
                </div>
              </div>

              {/* Provenance & Performance */}
              <div className="mt-5 pt-4 border-t border-[#F0ECE4] flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#57534E] tabular-nums">
                <span>Longevity: {perfume.longevityHours}</span>
                <span aria-hidden="true">·</span>
                <span>Sillage: {perfume.sillage}</span>
                <span aria-hidden="true">·</span>
                <span>Origin: {perfume.origin}</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#8C6D46]">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Verified Batch {perfume.batchCode} ({perfume.bottledDate})</span>
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="pt-4 border-t border-[#E6E2D8] flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-[#E6E2D8] rounded-md bg-[#FAF9F6]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-[#1C1917] hover:bg-[#EFECE4] rounded-l-md transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3.5 text-sm font-medium tabular-nums text-[#1C1917]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(activeVariant.stock, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-[#1C1917] hover:bg-[#EFECE4] rounded-r-md transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  addedFeedback
                    ? 'bg-[#8C6D46] text-white'
                    : 'bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A]'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>
                    Add to Bag · {formatPrice(activeVariant.pricePkr * quantity, currency)}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(perfume.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className="p-2.5 border border-[#E6E2D8] rounded-md hover:border-[#8C6D46] transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-[#8C6D46] text-[#8C6D46]' : 'text-[#57534E]'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
