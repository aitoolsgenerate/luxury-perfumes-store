import { CurrencyCode, PerfumeCategory } from '../data/perfumes';

interface FooterProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onSelectCategory: (cat: 'All' | PerfumeCategory) => void;
}

export function Footer({ currency, onCurrencyChange, onSelectCategory }: FooterProps) {
  const scrollToCollection = (cat: 'All' | PerfumeCategory) => {
    onSelectCategory(cat);
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E6E2D8] bg-[#FAF9F6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E6E2D8]">
          <div className="md:col-span-5">
            <span className="font-serif text-2xl font-semibold text-[#1C1917]">
              Luxury Perfumes
            </span>
            <p className="mt-2.5 text-sm text-[#57534E] max-w-sm leading-relaxed">
              Independent curators of 100% authentic niche and designer fragrances. Dispatched
              nationwide in sealed, climate-protected packaging.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
              Curated Edits
            </p>
            <button
              type="button"
              onClick={() => scrollToCollection('All')}
              className="block text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              All Fragrances
            </button>
            <button
              type="button"
              onClick={() => scrollToCollection('House Designs')}
              className="block text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              House Designs
            </button>
            <button
              type="button"
              onClick={() => scrollToCollection('Top Selling')}
              className="block text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Top Selling
            </button>
            <button
              type="button"
              onClick={() => scrollToCollection('Featured')}
              className="block text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Featured Houses
            </button>
            <button
              type="button"
              onClick={() => scrollToCollection('New Arrivals')}
              className="block text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              New Arrivals
            </button>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm text-[#57534E]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
              Client Care &amp; Boutiques
            </p>
            <p>Lahore · Gulberg III Galleria Vault</p>
            <p>Karachi · Clifton Block 4 Salon</p>
            <p>Islamabad · F-6 Markaz Concierge</p>

            <div className="pt-3 flex items-center gap-2">
              <span className="text-xs text-[#78716C]">Display Currency:</span>
              <div className="inline-flex border border-[#E6E2D8] rounded-md bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => onCurrencyChange('PKR')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    currency === 'PKR'
                      ? 'bg-[#1C1917] text-[#FAF9F6]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  PKR (Rs.)
                </button>
                <button
                  type="button"
                  onClick={() => onCurrencyChange('USD')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#1C1917] text-[#FAF9F6]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} Luxury Perfumes. All rights reserved.</p>
          <p>Sealed Originality Guarantee · Nationwide Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
