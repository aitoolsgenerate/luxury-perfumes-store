import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/perfumes';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCollection: () => void;
  onVerifyAuthenticity: () => void;
}

export function Hero({ onExploreCollection, onVerifyAuthenticity }: HeroProps) {
  return (
    <section id="top" className="border-b border-[#E6E2D8] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#8C6D46] mb-4">
              100% Original Branded Editions
            </p>
            <h1
              className="font-serif text-[clamp(2.35rem,4vw,3.65rem)] font-semibold leading-[1.08] tracking-tight text-[#1C1917] mb-5"
              style={{ textWrap: 'balance' }}
            >
              Curated Haute Parfumerie, Direct from the Vault.
            </h1>
            <p className="text-base leading-relaxed text-[#57534E] max-w-md mb-8">
              Discover small-batch extraits and signature Eau de Parfum houses stored in
              temperature-controlled cellars, verified by batch code, and delivered sealed to your door.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onVerifyAuthenticity}
                className="text-sm font-medium text-[#1C1917] hover:text-[#8C6D46] underline underline-offset-4 decoration-[#D6D0C4] hover:decoration-[#8C6D46] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify a Batch Code
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[280px] lg:min-h-[420px] aspect-[16/10] lg:aspect-auto rounded-lg overflow-hidden bg-[#F3F1EC] border border-[#E6E2D8]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Three luxury amber glass perfume bottles displayed on natural raw travertine stone pedestals in warm morning sunlight"
                fallbackLabel="Luxury Perfumes Reserve Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 3-column assurance strip below hero split */}
        <div className="mt-10 pt-8 border-t border-[#E6E2D8] grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium text-[#1C1917]">100% Sealed Authenticity</p>
            <p className="text-[#57534E] mt-0.5">
              Original manufacturer cellophane and verifiable batch numbers on every flacon.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#1C1917]">Cash on Delivery Nationwide</p>
            <p className="text-[#57534E] mt-0.5">
              Complimentary insured courier delivery on orders above Rs. 10,000.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#1C1917]">Climate-Controlled Cellar</p>
            <p className="text-[#57534E] mt-0.5">
              Stored away from UV light at 16°C to preserve delicate top notes and maceration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
