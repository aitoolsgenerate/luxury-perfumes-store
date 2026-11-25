import { useEffect, useMemo, useState } from 'react';
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { CartDrawer, CartItem, OrderRecord } from './components/CartDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  CurrencyCode,
  GenderAudience,
  PERFUMES,
  Perfume,
  PerfumeCategory,
  ScentFamily,
} from './data/perfumes';

type CategoryTab = 'All' | PerfumeCategory | 'Saved';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const STORAGE_KEYS = {
  cart: 'luxury_perfumes_cart_v1',
  wishlist: 'luxury_perfumes_wishlist_v1',
  orders: 'luxury_perfumes_orders_v1',
  currency: 'luxury_perfumes_currency_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>(() =>
    readStorage<CurrencyCode>(STORAGE_KEYS.currency, 'PKR')
  );
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('All');
  const [selectedFamily, setSelectedFamily] = useState<'All' | ScentFamily>('All');
  const [selectedGender, setSelectedGender] = useState<'All' | GenderAudience>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = readStorage<{ perfumeId: string; volume: string; quantity: number }[]>(
      STORAGE_KEYS.cart,
      []
    );
    return saved
      .map((entry) => {
        const perfume = PERFUMES.find((p) => p.id === entry.perfumeId);
        if (!perfume) return null;
        const variant =
          perfume.variants.find((v) => v.volume === entry.volume) ?? perfume.variants[0];
        return {
          perfume,
          volume: variant.volume,
          unitPricePkr: variant.pricePkr,
          quantity: Math.max(1, entry.quantity),
        };
      })
      .filter((item): item is CartItem => item !== null);
  });

  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.wishlist, [])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage<OrderRecord[]>(STORAGE_KEYS.orders, [])
  );

  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.cart,
        JSON.stringify(
          cart.map((c) => ({
            perfumeId: c.perfume.id,
            volume: c.volume,
            quantity: c.quantity,
          }))
        )
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.currency, JSON.stringify(currency));
    } catch {
      // Ignore storage quota errors
    }
  }, [currency]);

  const filteredPerfumes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PERFUMES.filter((p) => {
      if (activeCategory === 'Saved' && !wishlist.includes(p.id)) return false;
      if (
        activeCategory !== 'All' &&
        activeCategory !== 'Saved' &&
        p.category !== activeCategory
      ) {
        return false;
      }
      if (selectedFamily !== 'All' && p.scentFamily !== selectedFamily) return false;
      if (selectedGender !== 'All' && p.gender !== selectedGender) return false;

      if (q) {
        const haystack = [
          p.brand,
          p.name,
          p.concentration,
          p.scentFamily,
          p.tagline,
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.variants[0].pricePkr - b.variants[0].pricePkr;
      }
      if (sortBy === 'price-desc') {
        return b.variants[0].pricePkr - a.variants[0].pricePkr;
      }
      if (sortBy === 'newest') {
        return b.createdAtIndex - a.createdAtIndex;
      }
      return 0;
    });
  }, [activeCategory, selectedFamily, selectedGender, sortBy, searchQuery, wishlist]);

  const bagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToBag = (perfume: Perfume, volume: string, quantity = 1) => {
    const variant =
      perfume.variants.find((v) => v.volume === volume) ?? perfume.variants[0];

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.perfume.id === perfume.id && item.volume === variant.volume
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: Math.min(variant.stock, next[existingIdx].quantity + quantity),
        };
        return next;
      }
      return [
        ...prev,
        {
          perfume,
          volume: variant.volume,
          unitPricePkr: variant.pricePkr,
          quantity,
        },
      ];
    });

    setJustAddedId(perfume.id);
    window.setTimeout(() => {
      setJustAddedId((current) => (current === perfume.id ? null : current));
    }, 1200);
  };

  const handleUpdateCartQuantity = (perfumeId: string, volume: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.perfume.id === perfumeId && item.volume === volume) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (perfumeId: string, volume: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.perfume.id === perfumeId && item.volume === volume))
    );
  };

  const handleCompleteOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setSelectedFamily('All');
    setSelectedGender('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    selectedFamily !== 'All' ||
    selectedGender !== 'All' ||
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917]">
      <Navbar
        bagCount={bagCount}
        onOpenBag={() => setBagOpen(true)}
        onNavigateCategory={(cat) => setActiveCategory(cat)}
      />

      <main className="flex-1">
        <Hero
          onExploreCollection={() =>
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
          }
          onVerifyAuthenticity={() =>
            document.getElementById('authenticity')?.scrollIntoView({ behavior: 'smooth' })
          }
        />

        {/* Section 2: Curated Collection */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6E2D8]">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#8C6D46] mb-1.5">
                Signature Vault
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
                The Perfume Collection
              </h2>
            </div>

            {/* Category Tabs */}
            <div
              role="tablist"
              aria-label="Filter fragrances by category"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F1EC] border border-[#E6E2D8] rounded-lg self-start md:self-auto"
            >
              {(
                [
                  'All',
                  'House Designs',
                  'Top Selling',
                  'Featured',
                  'New Arrivals',
                  'Saved',
                ] as CategoryTab[]
              ).map((tab) => {
                const isActive = activeCategory === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {tab === 'Saved' && (
                      <Heart
                        className={`w-3 h-3 ${
                          wishlist.length > 0 ? 'fill-[#8C6D46] text-[#8C6D46]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <span>{tab === 'All' ? 'All Fragrances' : tab}</span>
                    {tab === 'Saved' && wishlist.length > 0 && (
                      <span className="tabular-nums text-[#8C6D46]">({wishlist.length})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search, Filter Toggle & Sort Toolbar */}
          <div className="py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by house, scent, or note (e.g. oud, rose)..."
                  aria-label="Search fragrances"
                  className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] placeholder:text-[#A8A29E]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                aria-expanded={showFilters}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  showFilters || selectedFamily !== 'All' || selectedGender !== 'All'
                    ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                    : 'bg-white text-[#1C1917] border-[#E6E2D8] hover:border-[#8C6D46]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-xs text-[#78716C] tabular-nums">
                {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'edition' : 'editions'}
              </span>

              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs text-[#57534E]">
                  Sort:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 text-xs font-medium bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expandable Filter Panel */}
          {showFilters && (
            <div className="mb-6 p-4 bg-white border border-[#E6E2D8] rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-[#57534E]">Olfactory Family:</span>
                  {(
                    [
                      'All',
                      'Woody & Oud',
                      'Floral & Amber',
                      'Fresh & Marine',
                      'Warm & Spicy',
                    ] as const
                  ).map((fam) => (
                    <button
                      key={fam}
                      type="button"
                      onClick={() => setSelectedFamily(fam)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                        selectedFamily === fam
                          ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                          : 'bg-[#FAF9F6] text-[#1C1917] border-[#E6E2D8] hover:border-[#8C6D46]'
                      }`}
                    >
                      {fam}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-[#57534E]">Profile:</span>
                  {(['All', 'Unisex', 'Women', 'Men'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                        selectedGender === g
                          ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                          : 'bg-[#FAF9F6] text-[#1C1917] border-[#E6E2D8] hover:border-[#8C6D46]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-medium text-[#8C6D46] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredPerfumes.length === 0 ? (
            <div className="py-16 px-6 text-center bg-white border border-[#E6E2D8] rounded-lg">
              <p className="font-serif text-2xl font-medium text-[#1C1917]">
                {activeCategory === 'Saved'
                  ? 'No fragrances saved to your wishlist yet'
                  : 'No fragrances match your current selection'}
              </p>
              <p className="mt-2 text-sm text-[#57534E]">
                {activeCategory === 'Saved'
                  ? 'Tap the heart icon on any bottle to save it for later comparison.'
                  : 'Try clearing one of your olfactory filters or searching for another note.'}
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-5 px-5 py-2.5 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors cursor-pointer"
              >
                View All Fragrances
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPerfumes.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  currency={currency}
                  isWishlisted={wishlist.includes(perfume.id)}
                  justAdded={justAddedId === perfume.id}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectPerfume={setSelectedPerfume}
                  onQuickAdd={(p) => handleAddToBag(p, p.variants[0].volume, 1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Craftsmanship & Authenticity */}
        <CraftsmanshipSection />
      </main>

      <Footer
        currency={currency}
        onCurrencyChange={setCurrency}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <ProductDetailModal
        perfume={selectedPerfume}
        currency={currency}
        isWishlisted={selectedPerfume ? wishlist.includes(selectedPerfume.id) : false}
        onClose={() => setSelectedPerfume(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
      />

      <CartDrawer
        isOpen={bagOpen}
        items={cart}
        orders={orders}
        currency={currency}
        onClose={() => setBagOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
