export type CurrencyCode = 'PKR' | 'USD';

export type ScentFamily = 'Woody & Oud' | 'Floral & Amber' | 'Fresh & Marine' | 'Warm & Spicy';
export type PerfumeCategory = 'House Designs' | 'Top Selling' | 'Featured' | 'New Arrivals';
export type GenderAudience = 'Unisex' | 'Women' | 'Men';

export interface PerfumeVariant {
  volume: string;
  pricePkr: number;
  compareAtPkr?: number;
  stock: number;
}

export interface Perfume {
  id: string;
  brand: string;
  name: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum';
  category: PerfumeCategory;
  gender: GenderAudience;
  scentFamily: ScentFamily;
  badgeText?: 'Bestseller' | 'Limited Edition' | 'New Arrival';
  tagline: string;
  description: string;
  image: string;
  variants: PerfumeVariant[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevityHours: string;
  sillage: 'Intimate' | 'Moderate' | 'Strong';
  batchCode: string;
  bottledDate: string;
  origin: string;
  createdAtIndex: number;
}

export const HERO_IMAGE = '/src/assets/images/hero_luxury_perfumes_1795589034102.jpg';

export const FREE_DELIVERY_THRESHOLD_PKR = 10000;
export const STANDARD_DELIVERY_FEE_PKR = 450;

export const PERFUMES: Perfume[] = [
  {
    id: 'lp-royal-oud-coffret',
    brand: 'Luxury Perfumes',
    name: 'Royal Oud Coffret Edition',
    concentration: 'Eau de Parfum',
    category: 'House Designs',
    gender: 'Unisex',
    scentFamily: 'Woody & Oud',
    badgeText: 'Limited Edition',
    tagline: 'Faceted smoked crystal decanter in a gold-embossed rigid presentation box.',
    description:
      'Our flagship house design: hand-cut smoked glass paired with a solid knurled brass cap and velvet-lined ivory coffret. Formulated around aged agarwood, roasted saffron, and warm Mysore sandalwood.',
    image: '/src/assets/images/design_royal_oud_coffret_1795589360057.jpg',
    variants: [
      { volume: '100 ml', pricePkr: 22500, compareAtPkr: 25500, stock: 8 },
      { volume: '50 ml', pricePkr: 13800, stock: 14 },
    ],
    notes: {
      top: ['Kashmiri Saffron', 'Nutmeg Blossom', 'Italian Bergamot'],
      heart: ['Aged Agarwood', 'Damask Rose', 'Incense Tears'],
      base: ['Mysore Sandalwood', 'Black Amber', 'Guaiac Wood'],
    },
    longevityHours: '12–14 hrs',
    sillage: 'Strong',
    batchCode: 'LP-2611-D1',
    bottledDate: 'November 2026',
    origin: 'Paris & Grasse',
    createdAtIndex: 10,
  },
  {
    id: 'lp-emerald-nocturne',
    brand: 'Luxury Perfumes',
    name: 'Emerald Nocturne',
    concentration: 'Eau de Parfum',
    category: 'House Designs',
    gender: 'Unisex',
    scentFamily: 'Woody & Oud',
    badgeText: 'New Arrival',
    tagline: 'Beveled emerald glass flacon crowned with a hand-hammered brass cap.',
    description:
      'Designed in-house for evening wear, Emerald Nocturne balances crushed green cardamom and cypress needle with velvety vetiver, dark oakmoss, and toasted cedar.',
    image: '/src/assets/images/design_emerald_nocturne_1795589361458.jpg',
    variants: [
      { volume: '100 ml', pricePkr: 18500, compareAtPkr: 21000, stock: 11 },
      { volume: '50 ml', pricePkr: 11900, stock: 16 },
    ],
    notes: {
      top: ['Green Cardamom', 'Crushed Cypress', 'Bitter Petitgrain'],
      heart: ['Haitian Vetiver', 'Violet Leaf', 'Clary Sage'],
      base: ['Aged Oakmoss', 'Atlas Cedar', 'Labdanum'],
    },
    longevityHours: '10–12 hrs',
    sillage: 'Moderate',
    batchCode: 'LP-2611-D2',
    bottledDate: 'November 2026',
    origin: 'London & Paris',
    createdAtIndex: 9,
  },
  {
    id: 'lp-crimson-saffron',
    brand: 'Luxury Perfumes',
    name: 'Crimson Saffron Reserve',
    concentration: 'Extrait de Parfum',
    category: 'House Designs',
    gender: 'Unisex',
    scentFamily: 'Warm & Spicy',
    badgeText: 'Limited Edition',
    tagline: 'Fluted ruby glass extrait bottle with brushed gold collar and stone cap.',
    description:
      'A tactile fluted ruby-crimson silhouette topped with carved raw obsidian. Inside, red saffron threads melt into spiced plum, suede leather, and resinous benzoin.',
    image: '/src/assets/images/design_crimson_saffron_1795589360721.jpg',
    variants: [
      { volume: '50 ml', pricePkr: 16900, compareAtPkr: 19200, stock: 9 },
      { volume: '100 ml', pricePkr: 27800, stock: 5 },
    ],
    notes: {
      top: ['Red Saffron', 'Spiced Plum', 'Pink Peppercorn'],
      heart: ['Crimson Rose', 'Warm Suede', 'Cinnamon Bark'],
      base: ['Siam Benzoin', 'Tonka Bean', 'Dark Patchouli'],
    },
    longevityHours: '12–16 hrs',
    sillage: 'Strong',
    batchCode: 'LP-2611-D3',
    bottledDate: 'November 2026',
    origin: 'Grasse, France',
    createdAtIndex: 8,
  },
  {
    id: 'lp-discovery-coffret',
    brand: 'Luxury Perfumes',
    name: 'Signature Discovery Coffret',
    concentration: 'Eau de Parfum',
    category: 'House Designs',
    gender: 'Unisex',
    scentFamily: 'Floral & Amber',
    badgeText: 'Bestseller',
    tagline: 'Linen-bound five-vial collector set (5 × 10 ml) with brushed brass atomizers.',
    description:
      'Experience five signature house compositions in travel-ready 10 ml glass atomizers nestled inside a custom sand-linen coffret. Ideal for gifting or layering exploration.',
    image: '/src/assets/images/design_discovery_coffret_1795589363258.jpg',
    variants: [
      { volume: '5 × 10 ml Set', pricePkr: 8900, compareAtPkr: 10500, stock: 20 },
    ],
    notes: {
      top: ['Bergamot', 'Saffron', 'White Peach'],
      heart: ['Damask Rose', 'Cypress', 'Florentine Iris'],
      base: ['Assam Oud', 'Mysore Sandalwood', 'Golden Amber'],
    },
    longevityHours: '8–12 hrs',
    sillage: 'Moderate',
    batchCode: 'LP-2611-D4',
    bottledDate: 'November 2026',
    origin: 'Paris & Milan',
    createdAtIndex: 7,
  },
  {
    id: 'arquitectura-melanges-noir',
    brand: 'Arquitectura',
    name: 'Mélanges Noir',
    concentration: 'Extrait de Parfum',
    category: 'Top Selling',
    gender: 'Unisex',
    scentFamily: 'Woody & Oud',
    badgeText: 'Bestseller',
    tagline: 'Smoked Cambodian oud faceted with dark saffron and obsidian labdanum.',
    description:
      'Macerated for six months in small oak casks, Mélanges Noir opens with crisp black cardamom before settling into aged Assam oud, charred cedar, and velvety benzoin resin.',
    image: '/src/assets/images/perfume_oud_obsidian_1795589035351.jpg',
    variants: [
      { volume: '50 ml', pricePkr: 14500, compareAtPkr: 16800, stock: 12 },
      { volume: '100 ml', pricePkr: 24900, compareAtPkr: 28500, stock: 7 },
    ],
    notes: {
      top: ['Black Cardamom', 'Saffron Thread', 'Bitter Bergamot'],
      heart: ['Assam Oud', 'Turkish Rose', 'Smoked Incense'],
      base: ['Spanish Labdanum', 'Charred Cedarwood', 'Siam Benzoin'],
    },
    longevityHours: '12–14 hrs',
    sillage: 'Strong',
    batchCode: 'LP-2611-A',
    bottledDate: 'October 2026',
    origin: 'Grasse, France',
    createdAtIndex: 4,
  },
  {
    id: 'aethel-oceanis',
    brand: 'Aethel',
    name: 'Oceanis',
    concentration: 'Eau de Parfum',
    category: 'Top Selling',
    gender: 'Men',
    scentFamily: 'Fresh & Marine',
    badgeText: 'Bestseller',
    tagline: 'Cold Atlantic sea spray balanced over Australian sandalwood and cypress.',
    description:
      'Housed under a hand-turned walnut cap, Oceanis pairs mineral sea salt and crushed Sicilian lemon leaf with dry coastal cypress and luminous white ambergris.',
    image: '/src/assets/images/perfume_ocean_wood_1795589036775.jpg',
    variants: [
      { volume: '50 ml', pricePkr: 9800, compareAtPkr: 11500, stock: 18 },
      { volume: '100 ml', pricePkr: 16400, compareAtPkr: 18900, stock: 9 },
    ],
    notes: {
      top: ['Sicilian Lemon Leaf', 'Mineral Sea Salt', 'Pink Pepper'],
      heart: ['Blue Cypress', 'Clary Sage', 'Crushed Juniper'],
      base: ['Australian Sandalwood', 'White Ambergris', 'Vetiver Root'],
    },
    longevityHours: '8–10 hrs',
    sillage: 'Moderate',
    batchCode: 'LP-2610-C',
    bottledDate: 'September 2026',
    origin: 'London, United Kingdom',
    createdAtIndex: 3,
  },
  {
    id: 'aurora-paris',
    brand: 'Aurora',
    name: 'Aurora Eau de Parfum',
    concentration: 'Eau de Parfum',
    category: 'Featured',
    gender: 'Women',
    scentFamily: 'Floral & Amber',
    badgeText: 'Limited Edition',
    tagline: 'Damask rose petals veiled in white peach, cashmere wood, and soft peony.',
    description:
      'Cut into a sunlit faceted crystal flacon finished with a woven coral silk tassel, Aurora blends dewy lychee and orchard peach with velvet damask rose and airy musk.',
    image: '/src/assets/images/perfume_coral_baroque_1795589036379.jpg',
    variants: [
      { volume: '75 ml', pricePkr: 13200, compareAtPkr: 15000, stock: 10 },
      { volume: '100 ml', pricePkr: 17900, stock: 6 },
    ],
    notes: {
      top: ['White Peach', 'Lychee Nectar', 'Calabrian Bergamot'],
      heart: ['Damask Rose', 'Pink Peony', 'Osmanthus Blossom'],
      base: ['Cashmere Wood', 'Madagascar Vanilla', 'Skin Musk'],
    },
    longevityHours: '9–11 hrs',
    sillage: 'Moderate',
    batchCode: 'LP-2609-F',
    bottledDate: 'August 2026',
    origin: 'Paris, France',
    createdAtIndex: 2,
  },
  {
    id: 'royal-amethyst',
    brand: 'Maison Violette',
    name: 'Royal Amethyst',
    concentration: 'Eau de Parfum',
    category: 'Featured',
    gender: 'Women',
    scentFamily: 'Floral & Amber',
    tagline: 'Velvet Florentine iris and black plum wrapped in roasted tonka bean.',
    description:
      'A nocturnal study in powdery iris butter and dark stone fruit, Royal Amethyst transitions from crisp violet leaf into warm suede, patchouli heart, and Madagascar tonka.',
    image: '/src/assets/images/perfume_amethyst_velvet_1795589036913.jpg',
    variants: [
      { volume: '75 ml', pricePkr: 11800, stock: 14 },
      { volume: '100 ml', pricePkr: 15900, compareAtPkr: 17500, stock: 8 },
    ],
    notes: {
      top: ['Black Plum', 'Violet Leaf', 'Mandarin Zest'],
      heart: ['Florentine Iris', 'Night Jasmine', 'Heliotrope'],
      base: ['Roasted Tonka', 'Soft Suede', 'Indonesian Patchouli'],
    },
    longevityHours: '9–11 hrs',
    sillage: 'Moderate',
    batchCode: 'LP-2608-M',
    bottledDate: 'August 2026',
    origin: 'Florence, Italy',
    createdAtIndex: 1,
  },
  {
    id: 'aurea-reserve',
    brand: 'Aurea',
    name: 'Reserve Eau de Parfum',
    concentration: 'Eau de Parfum',
    category: 'New Arrivals',
    gender: 'Unisex',
    scentFamily: 'Warm & Spicy',
    badgeText: 'New Arrival',
    tagline: 'Burnished golden amber, spiced cognac accord, and roasted cinnamon bark.',
    description:
      'Crowned with a solid brushed-brass sphere, Aurea Reserve radiates warmth through aged cognac oak, Ceylon cinnamon, honeyed tobacco leaf, and Madagascar vanilla pod.',
    image: '/src/assets/images/perfume_amber_regalia_1795589037230.jpg',
    variants: [
      { volume: '50 ml', pricePkr: 12900, compareAtPkr: 14500, stock: 15 },
      { volume: '100 ml', pricePkr: 21500, stock: 5 },
    ],
    notes: {
      top: ['Aged Cognac Accord', 'Ceylon Cinnamon', 'Blood Orange'],
      heart: ['Honeyed Tobacco', 'Myrrh Resin', 'Praline'],
      base: ['Golden Amber', 'Bourbon Vanilla', 'Oak Cask'],
    },
    longevityHours: '11–13 hrs',
    sillage: 'Strong',
    batchCode: 'LP-2611-R',
    bottledDate: 'November 2026',
    origin: 'Grasse, France',
    createdAtIndex: 6,
  },
  {
    id: 'aura-travertine',
    brand: 'Aura Atelier',
    name: 'Travertine',
    concentration: 'Extrait de Parfum',
    category: 'New Arrivals',
    gender: 'Unisex',
    scentFamily: 'Woody & Oud',
    badgeText: 'New Arrival',
    tagline: 'Sun-warmed limestone mineral accord, white fig, and creamy santal.',
    description:
      'Presented in a speckled stone-finish flacon with a hammered gunmetal ring cap, Travertine evokes sunlit architectural stone with green fig milk, dry papyrus, and Mysore sandalwood.',
    image: '/src/assets/images/perfume_ivory_granite_1795589037441.jpg',
    variants: [
      { volume: '50 ml', pricePkr: 15400, stock: 9 },
      { volume: '100 ml', pricePkr: 26200, compareAtPkr: 29000, stock: 4 },
    ],
    notes: {
      top: ['Green Fig Leaf', 'White Cardamom', 'Mineral Limestone'],
      heart: ['Dry Papyrus', 'Orris Concrete', 'White Tea'],
      base: ['Mysore Sandalwood', 'Ambrette Seed', 'Blonde Cedar'],
    },
    longevityHours: '10–12 hrs',
    sillage: 'Intimate',
    batchCode: 'LP-2611-T',
    bottledDate: 'November 2026',
    origin: 'Milan, Italy',
    createdAtIndex: 5,
  },
];

export function formatPrice(amountPkr: number, currency: CurrencyCode): string {
  if (currency === 'USD') {
    const usd = Math.round(amountPkr / 278);
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `Rs. ${amountPkr.toLocaleString('en-PK')}`;
}
