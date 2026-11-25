import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { PerfumeCategory } from '../data/perfumes';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
  onNavigateCategory: (category: 'All' | PerfumeCategory) => void;
}

export function Navbar({ bagCount, onOpenBag, onNavigateCategory }: NavbarProps) {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (targetId: string, category?: 'All' | PerfumeCategory) => {
    setMobileMenuOpen(false);
    if (category) {
      onNavigateCategory(category);
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E6E2D8]">
      {!bannerDismissed && (
        <div className="bg-[#1C1917] text-[#FAF9F6] text-xs px-4 py-2 flex items-center justify-center relative">
          <p className="text-center tracking-wide truncate pr-6">
            100% Original Sealed Fragrances · Complimentary Nationwide Delivery Over Rs. 10,000 · Cash on Delivery
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#A8A29E] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden -ml-2 p-2.5 text-[#1C1917] hover:bg-[#F3F1EC] rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a
            href="#top"
            className="font-serif text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            Luxury Perfumes
          </a>
        </div>

        {/* Zone 2: 5 single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'All')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'House Designs')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            House Designs
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'Top Selling')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Top Selling
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('craftsmanship')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Fragrance Notes
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('authenticity')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Authenticity
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="tabular-nums text-[#E6D5B8]">({bagCount})</span>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E6E2D8] bg-[#FAF9F6] px-4 py-4 flex flex-col gap-2"
        >
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'All')}
            className="text-left px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F3F1EC] rounded-md"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'House Designs')}
            className="text-left px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F3F1EC] rounded-md"
          >
            House Designs
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('collection', 'Top Selling')}
            className="text-left px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F3F1EC] rounded-md"
          >
            Top Selling
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('craftsmanship')}
            className="text-left px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F3F1EC] rounded-md"
          >
            Fragrance Notes
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('authenticity')}
            className="text-left px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F3F1EC] rounded-md"
          >
            Authenticity
          </button>
        </nav>
      )}
    </div>
  );
}
