import { FormEvent, useState } from 'react';
import { CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import { PERFUMES, Perfume } from '../data/perfumes';

export function CraftsmanshipSection() {
  const [batchInput, setBatchInput] = useState('LP-2611-A');
  const [verifiedMatch, setVerifiedMatch] = useState<Perfume | null>(PERFUMES[0]);
  const [notFoundCode, setNotFoundCode] = useState<string | null>(null);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    const normalized = batchInput.trim().toUpperCase();
    const match = PERFUMES.find((p) => p.batchCode.toUpperCase() === normalized);
    if (match) {
      setVerifiedMatch(match);
      setNotFoundCode(null);
    } else {
      setVerifiedMatch(null);
      setNotFoundCode(normalized || 'EMPTY');
    }
  };

  return (
    <section
      id="craftsmanship"
      className="border-t border-[#E6E2D8] bg-[#F3F1EC]/70 py-14 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Olfactory Architecture */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#8C6D46] mb-2">
              Olfactory Craftsmanship
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Three Movements of Scent Architecture
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl">
              Every bottle in our collection is formulated in high oil concentrations (22%–32%) so
              each phase unfolds cleanly across skin without synthetic harshness.
            </p>
          </div>

          <div className="divide-y divide-[#E6E2D8] border-y border-[#E6E2D8]">
            <div className="py-4 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-4 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                01. Top Notes
              </span>
              <span className="col-span-8 text-sm text-[#57534E]">
                Bright citrus, cardamom, and mineral sea salt setting the opening impression across
                the first 20 minutes.
              </span>
            </div>
            <div className="py-4 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-4 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                02. Heart Notes
              </span>
              <span className="col-span-8 text-sm text-[#57534E]">
                Damask rose, Florentine iris, and dry cypress emerging as the fragrance warms over
                hours 1 to 4.
              </span>
            </div>
            <div className="py-4 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-4 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                03. Base Notes
              </span>
              <span className="col-span-8 text-sm text-[#57534E]">
                Aged Assam oud, Mysore sandalwood, and golden labdanum resin anchoring the trail up
                to 14 hours.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Batch Code Authenticity Verifier */}
        <div
          id="authenticity"
          className="lg:col-span-6 bg-white border border-[#E6E2D8] rounded-lg p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[#8C6D46] mb-2">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Provenance &amp; Batch Verification</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Verify Your Bottle Batch Code
          </h3>
          <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
            Enter the etched batch code from the base of your Luxury Perfumes flacon or box to
            inspect bottling date and cellar provenance.
          </p>

          <form onSubmit={handleVerify} className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <label htmlFor="batch-code-input" className="sr-only">
              Batch code
            </label>
            <input
              id="batch-code-input"
              type="text"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              placeholder="e.g. LP-2611-A"
              className="flex-1 px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E6E2D8] rounded-md text-[#1C1917] uppercase tracking-wider"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>Verify Code</span>
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#78716C]">
            <span>Sample codes:</span>
            {PERFUMES.slice(0, 4).map((p) => (
              <button
                key={p.batchCode}
                type="button"
                onClick={() => {
                  setBatchInput(p.batchCode);
                  setVerifiedMatch(p);
                  setNotFoundCode(null);
                }}
                className="underline underline-offset-2 hover:text-[#1C1917] cursor-pointer tabular-nums"
              >
                {p.batchCode}
              </button>
            ))}
          </div>

          {verifiedMatch && (
            <div className="mt-6 p-4 bg-[#FAF9F6] border border-[#E6E2D8] rounded-md space-y-2 text-sm">
              <div className="flex items-center gap-2 font-medium text-[#1C1917]">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" aria-hidden="true" />
                <span>
                  Authentic Sealed Release — {verifiedMatch.brand} {verifiedMatch.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6E2D8] text-xs text-[#57534E] tabular-nums">
                <div>
                  <span className="text-[#78716C]">Batch:</span> {verifiedMatch.batchCode}
                </div>
                <div>
                  <span className="text-[#78716C]">Bottled:</span> {verifiedMatch.bottledDate}
                </div>
                <div>
                  <span className="text-[#78716C]">Origin:</span> {verifiedMatch.origin}
                </div>
                <div>
                  <span className="text-[#78716C]">Vault Temp:</span> 16°C Controlled
                </div>
              </div>
            </div>
          )}

          {notFoundCode && (
            <div className="mt-6 p-4 bg-[#FAF9F6] border border-[#E6E2D8] rounded-md text-xs text-[#57534E]">
              No matching record found for batch <strong className="text-[#1C1917]">{notFoundCode}</strong>. Please double-check the characters etched on the bottom glass label or try one of the sample codes above.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
