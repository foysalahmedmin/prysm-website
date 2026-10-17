import type { Product } from '@/domain'

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'spectral-silk-button-down',
    name: 'Spectral Silk Button-Down',
    category: 'clothing',
    subcategory: 'tops',
    summary:
      'Fluid mulberry silk shirt with micro-refractive luster and hidden mother-of-pearl placket.',
    description:
      'Cut from high-twist mulberry silk woven with light-refracting silica micro-filaments, the Spectral Button-Down balances fluid drape with architectural tailoring. The collar is reinforced with featherweight organza for permanent roll retention.',
    details: [
      'Semi-spread collar with soft interlining',
      'Concealed French placket with smoke mother-of-pearl buttons',
      'Mitered single-button cuffs with hand-rolled hems',
      'Curved hem designed to be worn untucked or draped',
    ],
    materials: '100% Mulberry Silk with Silica Nano-Filaments',
    care: [
      'Dry clean only',
      'Cool iron on reverse with press cloth',
      'Store on contoured cedar hanger',
    ],
    price: 48000,
    media: [
      {
        src: '/images/products/spectral-silk-button-down-1.webp',
        alt: 'Spectral Silk Button-Down, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-silk-button-down-2.webp',
        alt: 'Spectral Silk Button-Down, detail view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-silk-button-down-3.webp',
        alt: 'Spectral Silk Button-Down, back view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Violet',
            swatch: '#5b4a78',
          },
          {
            value: 'Spectral Pearl',
            swatch: '#e9eef4',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-001-v1',
        sku: 'PRY-TOP-001-VIO-S',
        options: {
          size: 'S',
          color: 'Prism Violet',
        },
        stock: 6,
      },
      {
        id: 'p-001-v2',
        sku: 'PRY-TOP-001-VIO-M',
        options: {
          size: 'M',
          color: 'Prism Violet',
        },
        stock: 12,
      },
      {
        id: 'p-001-v3',
        sku: 'PRY-TOP-001-VIO-L',
        options: {
          size: 'L',
          color: 'Prism Violet',
        },
        stock: 8,
      },
      {
        id: 'p-001-v4',
        sku: 'PRY-TOP-001-VIO-XL',
        options: {
          size: 'XL',
          color: 'Prism Violet',
        },
        stock: 0,
      },
      {
        id: 'p-001-v5',
        sku: 'PRY-TOP-001-PRL-S',
        options: {
          size: 'S',
          color: 'Spectral Pearl',
        },
        stock: 9,
      },
      {
        id: 'p-001-v6',
        sku: 'PRY-TOP-001-PRL-M',
        options: {
          size: 'M',
          color: 'Spectral Pearl',
        },
        stock: 15,
      },
      {
        id: 'p-001-v7',
        sku: 'PRY-TOP-001-PRL-L',
        options: {
          size: 'L',
          color: 'Spectral Pearl',
        },
        stock: 10,
      },
      {
        id: 'p-001-v8',
        sku: 'PRY-TOP-001-PRL-XL',
        options: {
          size: 'XL',
          color: 'Spectral Pearl',
        },
        stock: 4,
      },
    ],
    tags: ['silk', 'refractive', 'tailoring', 'tops', 'new'],
    collectionSlugs: ['liquid-silk', 'refractive-tailoring'],
    badges: ['new', 'bestseller'],
    rating: {
      average: 4.9,
      count: 18,
    },
    featured: true,
    createdAt: '2026-08-15T10:00:00.000Z',
  },
  {
    id: 'p-002',
    slug: 'refractive-organza-overshirt',
    name: 'Refractive Organza Overshirt',
    category: 'clothing',
    subcategory: 'tops',
    summary:
      'Semi-sheer technical organza overshirt with dropped shoulders and laser-bonded seams.',
    description:
      'Designed as a luminous outer layering layer, the Refractive Organza Overshirt captures and disperses light through a micro-prismatic weave. Crisp hand-feel that softens with wear while maintaining geometric volume.',
    details: [
      'Laser-bonded seam construction with zero thread bulk',
      'Camp collar with hidden titanium stay',
      'Dual chest patch pockets with optical alignment',
      'Square hem with side split vents',
    ],
    materials: '68% Polyamide Organza, 32% Micro-Silica Monofilament',
    care: ['Gentle hand wash cold', 'Line dry in shade', 'Do not tumble dry'],
    price: 56000,
    media: [
      {
        src: '/images/products/refractive-organza-overshirt-1.webp',
        alt: 'Refractive Organza Overshirt, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-organza-overshirt-2.webp',
        alt: 'Refractive Organza Overshirt, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Liquid Smoke',
            swatch: '#3a3d4d',
          },
          {
            value: 'Solar Flare',
            swatch: '#c8a45e',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-002-v1',
        sku: 'PRY-TOP-002-SMK-S',
        options: {
          size: 'S',
          color: 'Liquid Smoke',
        },
        stock: 7,
      },
      {
        id: 'p-002-v2',
        sku: 'PRY-TOP-002-SMK-M',
        options: {
          size: 'M',
          color: 'Liquid Smoke',
        },
        stock: 11,
      },
      {
        id: 'p-002-v3',
        sku: 'PRY-TOP-002-SMK-L',
        options: {
          size: 'L',
          color: 'Liquid Smoke',
        },
        stock: 5,
      },
      {
        id: 'p-002-v4',
        sku: 'PRY-TOP-002-SOL-S',
        options: {
          size: 'S',
          color: 'Solar Flare',
        },
        stock: 4,
      },
      {
        id: 'p-002-v5',
        sku: 'PRY-TOP-002-SOL-M',
        options: {
          size: 'M',
          color: 'Solar Flare',
        },
        stock: 8,
      },
      {
        id: 'p-002-v6',
        sku: 'PRY-TOP-002-SOL-L',
        options: {
          size: 'L',
          color: 'Solar Flare',
        },
        stock: 6,
      },
    ],
    tags: ['organza', 'overshirt', 'sheer', 'layering'],
    collectionSlugs: ['spectral-lightwear', 'refractive-tailoring'],
    badges: ['bestseller'],
    rating: {
      average: 4.8,
      count: 14,
    },
    featured: true,
    createdAt: '2026-08-20T11:00:00.000Z',
  },
  {
    id: 'p-003',
    slug: 'holographic-mesh-tee',
    name: 'Holographic Mesh Tee',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'Fine gauge circular-knit mesh t-shirt with dual-spectrum optical yarn.',
    description:
      'An understated everyday staple with an unexpected optical dimension. The knit shifts between subtle charcoal and violet shimmer depending on viewing angle and natural illumination.',
    details: [
      'Double-layer bound rib collar',
      'Drop needle breathable mesh structure',
      'Blind hem cuffs and waistband',
      'Anti-static conductive finishing',
    ],
    materials: '82% Mercerised Cotton, 18% Refractive Metallic Filament',
    care: ['Machine wash delicate inside out', 'Flat dry', 'Cool iron'],
    price: 22000,
    media: [
      {
        src: '/images/products/holographic-mesh-tee-1.webp',
        alt: 'Holographic Mesh Tee, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/holographic-mesh-tee-2.webp',
        alt: 'Holographic Mesh Tee, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Obsidian Sheen',
            swatch: '#1a1c24',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-003-v1',
        sku: 'PRY-TOP-003-OBS-S',
        options: {
          size: 'S',
          color: 'Obsidian Sheen',
        },
        stock: 15,
      },
      {
        id: 'p-003-v2',
        sku: 'PRY-TOP-003-OBS-M',
        options: {
          size: 'M',
          color: 'Obsidian Sheen',
        },
        stock: 22,
      },
      {
        id: 'p-003-v3',
        sku: 'PRY-TOP-003-OBS-L',
        options: {
          size: 'L',
          color: 'Obsidian Sheen',
        },
        stock: 18,
      },
      {
        id: 'p-003-v4',
        sku: 'PRY-TOP-003-OBS-XL',
        options: {
          size: 'XL',
          color: 'Obsidian Sheen',
        },
        stock: 9,
      },
    ],
    tags: ['tee', 'mesh', 'essentials', 'tops'],
    collectionSlugs: ['prism-chroma', 'core-archive'],
    badges: [],
    rating: {
      average: 4.7,
      count: 21,
    },
    featured: false,
    createdAt: '2026-07-12T09:00:00.000Z',
  },
  {
    id: 'p-004',
    slug: 'liquid-silk-camisole',
    name: 'Liquid Silk Camisole',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'Bias-cut silk slip top with delicate French seams and micro-adjustable straps.',
    description:
      'Cut entirely on the bias for natural mechanical stretch and contouring without elastane. Designed to skim the collarbone and layer beneath structured blazers or worn alone.',
    details: [
      'Bias-cut silhouette with soft cowl neckline',
      'Skinny self-rouleau shoulder straps with concealed adjusters',
      'Fully lined in pure silk habotai',
      'Clean baby-hem finish',
    ],
    materials: '100% Heavy Silk Crepe de Chine (19mm)',
    care: ['Dry clean only', 'Steamer recommended'],
    price: 34000,
    media: [
      {
        src: '/images/products/liquid-silk-camisole-1.webp',
        alt: 'Liquid Silk Camisole, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/liquid-silk-camisole-2.webp',
        alt: 'Liquid Silk Camisole, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'XS',
          },
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Champagne Prism',
            swatch: '#ded2bc',
          },
          {
            value: 'Midnight Violet',
            swatch: '#241e33',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-004-v1',
        sku: 'PRY-TOP-004-CHM-XS',
        options: {
          size: 'XS',
          color: 'Champagne Prism',
        },
        stock: 5,
      },
      {
        id: 'p-004-v2',
        sku: 'PRY-TOP-004-CHM-S',
        options: {
          size: 'S',
          color: 'Champagne Prism',
        },
        stock: 8,
      },
      {
        id: 'p-004-v3',
        sku: 'PRY-TOP-004-CHM-M',
        options: {
          size: 'M',
          color: 'Champagne Prism',
        },
        stock: 12,
      },
      {
        id: 'p-004-v4',
        sku: 'PRY-TOP-004-CHM-L',
        options: {
          size: 'L',
          color: 'Champagne Prism',
        },
        stock: 6,
      },
      {
        id: 'p-004-v5',
        sku: 'PRY-TOP-004-MDN-XS',
        options: {
          size: 'XS',
          color: 'Midnight Violet',
        },
        stock: 4,
      },
      {
        id: 'p-004-v6',
        sku: 'PRY-TOP-004-MDN-S',
        options: {
          size: 'S',
          color: 'Midnight Violet',
        },
        stock: 7,
      },
      {
        id: 'p-004-v7',
        sku: 'PRY-TOP-004-MDN-M',
        options: {
          size: 'M',
          color: 'Midnight Violet',
        },
        stock: 10,
      },
      {
        id: 'p-004-v8',
        sku: 'PRY-TOP-004-MDN-L',
        options: {
          size: 'L',
          color: 'Midnight Violet',
        },
        stock: 5,
      },
    ],
    tags: ['silk', 'camisole', 'bias-cut', 'evening'],
    collectionSlugs: ['liquid-silk'],
    badges: [],
    rating: {
      average: 4.9,
      count: 12,
    },
    featured: false,
    createdAt: '2026-08-01T14:00:00.000Z',
  },
  {
    id: 'p-005',
    slug: 'prismatic-poplin-shirt',
    name: 'Prismatic Poplin Shirt',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'Crisp 120s 2-ply cotton poplin treated with nano-refractive prism wash.',
    description:
      'An architectural everyday shirt tailored with relaxed proportions, sculpted high armholes, and an elongated collar point that commands presence under structured tailoring.',
    details: [
      'Compact 120/2 Egyptian Giza cotton poplin',
      'Chiseled cuffs with dual buttonholes for cufflinks option',
      'Split back yoke with center box pleat',
      'Genuine Australian trocas shell buttons',
    ],
    materials: '100% Giza Long-Staple Cotton',
    care: ['Machine wash warm 40C', 'Warm iron with steam', 'Hang dry'],
    price: 42000,
    media: [
      {
        src: '/images/products/prismatic-poplin-shirt-1.webp',
        alt: 'Prismatic Poplin Shirt, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-poplin-shirt-2.webp',
        alt: 'Prismatic Poplin Shirt, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Optic White',
            swatch: '#ffffff',
          },
          {
            value: 'Sky Refraction',
            swatch: '#d0dce8',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-005-v1',
        sku: 'PRY-TOP-005-WHT-S',
        options: {
          size: 'S',
          color: 'Optic White',
        },
        stock: 10,
      },
      {
        id: 'p-005-v2',
        sku: 'PRY-TOP-005-WHT-M',
        options: {
          size: 'M',
          color: 'Optic White',
        },
        stock: 18,
      },
      {
        id: 'p-005-v3',
        sku: 'PRY-TOP-005-WHT-L',
        options: {
          size: 'L',
          color: 'Optic White',
        },
        stock: 14,
      },
      {
        id: 'p-005-v4',
        sku: 'PRY-TOP-005-WHT-XL',
        options: {
          size: 'XL',
          color: 'Optic White',
        },
        stock: 7,
      },
      {
        id: 'p-005-v5',
        sku: 'PRY-TOP-005-SKY-S',
        options: {
          size: 'S',
          color: 'Sky Refraction',
        },
        stock: 6,
      },
      {
        id: 'p-005-v6',
        sku: 'PRY-TOP-005-SKY-M',
        options: {
          size: 'M',
          color: 'Sky Refraction',
        },
        stock: 12,
      },
      {
        id: 'p-005-v7',
        sku: 'PRY-TOP-005-SKY-L',
        options: {
          size: 'L',
          color: 'Sky Refraction',
        },
        stock: 8,
      },
      {
        id: 'p-005-v8',
        sku: 'PRY-TOP-005-SKY-XL',
        options: {
          size: 'XL',
          color: 'Sky Refraction',
        },
        stock: 3,
      },
    ],
    tags: ['poplin', 'shirt', 'tailoring', 'office', 'classic'],
    collectionSlugs: ['refractive-tailoring', 'core-archive'],
    badges: ['bestseller'],
    rating: {
      average: 4.8,
      count: 24,
    },
    featured: true,
    createdAt: '2026-06-18T10:00:00.000Z',
  },
  {
    id: 'p-006',
    slug: 'iridescent-camp-collar-shirt',
    name: 'Iridescent Camp Collar Shirt',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'Relaxed short-sleeve resort shirt in iridescent cupro-tencel blend.',
    description:
      'A relaxed summer silhouette crafted from silky cupro that drapes softly against the body. The yarn is cross-dyed to produce a dynamic duochrome shift between jade green and champagne amber.',
    details: [
      'One-piece Cuban camp collar',
      'Straight hem with side slits',
      'Seamless front placket with horn buttons',
      'Chest welt pocket',
    ],
    materials: '60% Cupro, 40% Tencel Lyocell',
    care: ['Gentle cycle cold', 'Line dry in shade', 'Warm iron on reverse'],
    price: 39000,
    media: [
      {
        src: '/images/products/iridescent-camp-collar-shirt-1.webp',
        alt: 'Iridescent Camp Collar Shirt, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/iridescent-camp-collar-shirt-2.webp',
        alt: 'Iridescent Camp Collar Shirt, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Jade Amber',
            swatch: '#4f7264',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-006-v1',
        sku: 'PRY-TOP-006-JAD-S',
        options: {
          size: 'S',
          color: 'Jade Amber',
        },
        stock: 8,
      },
      {
        id: 'p-006-v2',
        sku: 'PRY-TOP-006-JAD-M',
        options: {
          size: 'M',
          color: 'Jade Amber',
        },
        stock: 14,
      },
      {
        id: 'p-006-v3',
        sku: 'PRY-TOP-006-JAD-L',
        options: {
          size: 'L',
          color: 'Jade Amber',
        },
        stock: 9,
      },
    ],
    tags: ['camp-collar', 'cupro', 'summer', 'resort'],
    collectionSlugs: ['prism-chroma'],
    badges: [],
    rating: {
      average: 4.6,
      count: 9,
    },
    featured: false,
    createdAt: '2026-07-25T13:00:00.000Z',
  },
  {
    id: 'p-007',
    slug: 'sheer-optical-blouse',
    name: 'Sheer Optical Blouse',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'High-neck pleated blouse in micro-pleated diaphanous chiffon.',
    description:
      'Ethereal volume meets disciplined geometry. Permanently heat-set micro-pleats expand and contract with movement, creating an undulating Moire pattern as light passes through the sheer silk-blend matrix.',
    details: [
      'Architectural funnel neck with button closure at back nape',
      'Voluminous raglan sleeves with elongated cuff pleats',
      'Includes detachable silk camisole base layer',
      'Raw laser-cut hem',
    ],
    materials: '70% Silk Chiffon, 30% Polyamide Monofilament',
    care: ['Specialist dry clean only', 'Do not steam pleats directly'],
    price: 46000,
    media: [
      {
        src: '/images/products/sheer-optical-blouse-1.webp',
        alt: 'Sheer Optical Blouse, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/sheer-optical-blouse-2.webp',
        alt: 'Sheer Optical Blouse, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Spectral Lavender',
            swatch: '#b8a9cf',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-007-v1',
        sku: 'PRY-TOP-007-LAV-S',
        options: {
          size: 'S',
          color: 'Spectral Lavender',
        },
        stock: 6,
      },
      {
        id: 'p-007-v2',
        sku: 'PRY-TOP-007-LAV-M',
        options: {
          size: 'M',
          color: 'Spectral Lavender',
        },
        stock: 10,
      },
      {
        id: 'p-007-v3',
        sku: 'PRY-TOP-007-LAV-L',
        options: {
          size: 'L',
          color: 'Spectral Lavender',
        },
        stock: 4,
      },
    ],
    tags: ['blouse', 'sheer', 'pleated', 'evening'],
    collectionSlugs: ['spectral-lightwear'],
    badges: ['new'],
    rating: {
      average: 4.8,
      count: 11,
    },
    featured: false,
    createdAt: '2026-08-30T16:00:00.000Z',
  },
  {
    id: 'p-008',
    slug: 'prismatic-structured-tee',
    name: 'Prismatic Structured Tee',
    category: 'clothing',
    subcategory: 'tops',
    summary:
      'Heavyweight compact jersey t-shirt with bonded neckline and prismatic side-seam tapes.',
    description:
      'A boxy heavyweight t-shirt engineered from 280gsm long-staple cotton jersey. Features heat-bonded spectral film tape along the interior side slits that flashes when in motion.',
    details: [
      'Heavyweight 280gsm compact organic cotton',
      'Drop shoulder with reinforced neck tape',
      'Heat-bonded refractive seam detailing',
      'Pre-shrunk to zero residual shrinkage',
    ],
    materials: '100% Organic Compact Cotton',
    care: ['Machine wash cold', 'Tumble dry low', 'Iron inside out'],
    price: 19000,
    compareAtPrice: 24000,
    media: [
      {
        src: '/images/products/prismatic-structured-tee-1.webp',
        alt: 'Prismatic Structured Tee, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-structured-tee-2.webp',
        alt: 'Prismatic Structured Tee, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Chroma Black',
            swatch: '#15171d',
          },
          {
            value: 'Vapour Grey',
            swatch: '#dcdde2',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-008-v1',
        sku: 'PRY-TOP-008-BLK-S',
        options: {
          size: 'S',
          color: 'Chroma Black',
        },
        stock: 14,
      },
      {
        id: 'p-008-v2',
        sku: 'PRY-TOP-008-BLK-M',
        options: {
          size: 'M',
          color: 'Chroma Black',
        },
        stock: 26,
      },
      {
        id: 'p-008-v3',
        sku: 'PRY-TOP-008-BLK-L',
        options: {
          size: 'L',
          color: 'Chroma Black',
        },
        stock: 18,
      },
      {
        id: 'p-008-v4',
        sku: 'PRY-TOP-008-BLK-XL',
        options: {
          size: 'XL',
          color: 'Chroma Black',
        },
        stock: 9,
      },
      {
        id: 'p-008-v5',
        sku: 'PRY-TOP-008-GRY-S',
        options: {
          size: 'S',
          color: 'Vapour Grey',
        },
        stock: 10,
      },
      {
        id: 'p-008-v6',
        sku: 'PRY-TOP-008-GRY-M',
        options: {
          size: 'M',
          color: 'Vapour Grey',
        },
        stock: 16,
      },
      {
        id: 'p-008-v7',
        sku: 'PRY-TOP-008-GRY-L',
        options: {
          size: 'L',
          color: 'Vapour Grey',
        },
        stock: 11,
      },
      {
        id: 'p-008-v8',
        sku: 'PRY-TOP-008-GRY-XL',
        options: {
          size: 'XL',
          color: 'Vapour Grey',
        },
        stock: 6,
      },
    ],
    tags: ['tee', 'heavyweight', 'sale', 'basics'],
    collectionSlugs: ['core-archive'],
    badges: ['sale'],
    rating: {
      average: 4.6,
      count: 28,
    },
    featured: false,
    createdAt: '2026-06-01T10:00:00.000Z',
  },
  {
    id: 'p-009',
    slug: 'spectral-ribbed-turtleneck',
    name: 'Spectral Ribbed Turtleneck',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: 'Ultra-fine 18-gauge merino turtleneck knit with subtle refractive sheen.',
    description:
      'Spun from superfine 15.5-micron Australian merino wool inter-knitted with microscopic metallic lurex that imparts an internal radiance without any scratchiness or bulk.',
    details: [
      '18-gauge fully fashioned seamless knit',
      'Double-fold ribbed turtleneck that holds structure',
      'Fluted elongated sleeves designed to stack at the wrist',
      'Zero side seams for maximum comfort',
    ],
    materials: '90% Superfine Merino Wool, 10% Micro-Lurex',
    care: ['Hand wash cold with wool detergent', 'Dry flat on towel', 'Fold, never hang'],
    price: 62000,
    media: [
      {
        src: '/images/products/spectral-ribbed-turtleneck-1.webp',
        alt: 'Spectral Ribbed Turtleneck, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-ribbed-turtleneck-2.webp',
        alt: 'Spectral Ribbed Turtleneck, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Deep Ultraviolet',
            swatch: '#31254a',
          },
          {
            value: 'Silver Mirage',
            swatch: '#d5dae2',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-009-v1',
        sku: 'PRY-KNT-009-UV-S',
        options: {
          size: 'S',
          color: 'Deep Ultraviolet',
        },
        stock: 8,
      },
      {
        id: 'p-009-v2',
        sku: 'PRY-KNT-009-UV-M',
        options: {
          size: 'M',
          color: 'Deep Ultraviolet',
        },
        stock: 12,
      },
      {
        id: 'p-009-v3',
        sku: 'PRY-KNT-009-UV-L',
        options: {
          size: 'L',
          color: 'Deep Ultraviolet',
        },
        stock: 7,
      },
      {
        id: 'p-009-v4',
        sku: 'PRY-KNT-009-SLV-S',
        options: {
          size: 'S',
          color: 'Silver Mirage',
        },
        stock: 9,
      },
      {
        id: 'p-009-v5',
        sku: 'PRY-KNT-009-SLV-M',
        options: {
          size: 'M',
          color: 'Silver Mirage',
        },
        stock: 14,
      },
      {
        id: 'p-009-v6',
        sku: 'PRY-KNT-009-SLV-L',
        options: {
          size: 'L',
          color: 'Silver Mirage',
        },
        stock: 8,
      },
    ],
    tags: ['knitwear', 'turtleneck', 'merino', 'luxury'],
    collectionSlugs: ['spectral-lightwear', 'core-archive'],
    badges: ['bestseller'],
    rating: {
      average: 4.9,
      count: 20,
    },
    featured: true,
    createdAt: '2026-08-10T12:00:00.000Z',
  },
  {
    id: 'p-010',
    slug: 'liquid-metallic-crewneck',
    name: 'Liquid Metallic Crewneck',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: 'Midweight relaxed sweater knitted from silk tape and metallic spun viscose.',
    description:
      'A textural masterpiece combining flat silk tape yarn with filament viscose. The surface evokes molten glass or ripples across water under intense directional light.',
    details: [
      'Heavy gauge open ladder stitch across chest',
      'Relaxed drop-shoulder silhouette',
      'Chunky ribbed trims with tubular cast-off',
      'Substantial fluid hand-feel with cool touch',
    ],
    materials: '55% Silk, 45% Spun Viscose',
    care: ['Dry clean only', 'Store flat in breathable bag'],
    price: 68000,
    media: [
      {
        src: '/images/products/liquid-metallic-crewneck-1.webp',
        alt: 'Liquid Metallic Crewneck, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/liquid-metallic-crewneck-2.webp',
        alt: 'Liquid Metallic Crewneck, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Molten Platinum',
            swatch: '#c4c8d2',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-010-v1',
        sku: 'PRY-KNT-010-PLT-S',
        options: {
          size: 'S',
          color: 'Molten Platinum',
        },
        stock: 5,
      },
      {
        id: 'p-010-v2',
        sku: 'PRY-KNT-010-PLT-M',
        options: {
          size: 'M',
          color: 'Molten Platinum',
        },
        stock: 9,
      },
      {
        id: 'p-010-v3',
        sku: 'PRY-KNT-010-PLT-L',
        options: {
          size: 'L',
          color: 'Molten Platinum',
        },
        stock: 4,
      },
    ],
    tags: ['knitwear', 'metallic', 'crewneck', 'statement'],
    collectionSlugs: ['liquid-silk', 'prism-chroma'],
    badges: ['new'],
    rating: {
      average: 4.8,
      count: 10,
    },
    featured: false,
    createdAt: '2026-09-01T15:00:00.000Z',
  },
  {
    id: 'p-011',
    slug: 'refractive-mohair-cardigan',
    name: 'Refractive Mohair Cardigan',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: 'Brushed South African kid mohair cardigan with spectral crystal buttons.',
    description:
      'Cloud-like brushed kid mohair with an airy halo. Features custom-faceted crystal glass buttons that cast miniature rainbow reflections onto the chest when illuminated.',
    details: [
      'Hand-brushed 7-gauge kid mohair blend',
      'Deep V-neckline with ribbed button band',
      'Custom faceted Austrian crystal glass buttons',
      'Dual front welt patch pockets',
    ],
    materials: '65% Kid Mohair, 30% Polyamide, 5% Wool',
    care: [
      'Hand wash cold with approved wool wash',
      'Dry flat',
      'Gently brush with soft clothes brush',
    ],
    price: 74000,
    compareAtPrice: 88000,
    media: [
      {
        src: '/images/products/refractive-mohair-cardigan-1.webp',
        alt: 'Refractive Mohair Cardigan, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-mohair-cardigan-2.webp',
        alt: 'Refractive Mohair Cardigan, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Lilac',
            swatch: '#c8b6d6',
          },
          {
            value: 'Charcoal Frost',
            swatch: '#3f424b',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-011-v1',
        sku: 'PRY-KNT-011-LIL-S',
        options: {
          size: 'S',
          color: 'Prism Lilac',
        },
        stock: 6,
      },
      {
        id: 'p-011-v2',
        sku: 'PRY-KNT-011-LIL-M',
        options: {
          size: 'M',
          color: 'Prism Lilac',
        },
        stock: 11,
      },
      {
        id: 'p-011-v3',
        sku: 'PRY-KNT-011-LIL-L',
        options: {
          size: 'L',
          color: 'Prism Lilac',
        },
        stock: 5,
      },
      {
        id: 'p-011-v4',
        sku: 'PRY-KNT-011-CHR-S',
        options: {
          size: 'S',
          color: 'Charcoal Frost',
        },
        stock: 4,
      },
      {
        id: 'p-011-v5',
        sku: 'PRY-KNT-011-CHR-M',
        options: {
          size: 'M',
          color: 'Charcoal Frost',
        },
        stock: 8,
      },
      {
        id: 'p-011-v6',
        sku: 'PRY-KNT-011-CHR-L',
        options: {
          size: 'L',
          color: 'Charcoal Frost',
        },
        stock: 3,
      },
    ],
    tags: ['cardigan', 'mohair', 'sale', 'knitwear'],
    collectionSlugs: ['spectral-lightwear'],
    badges: ['sale'],
    rating: {
      average: 4.7,
      count: 17,
    },
    featured: false,
    createdAt: '2026-07-01T11:00:00.000Z',
  },
  {
    id: 'p-012',
    slug: 'gradient-cashmere-knit',
    name: 'Gradient Cashmere Knit',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: '2-ply Mongolian cashmere crewneck with seamless chromatic dip-dye transition.',
    description:
      'Spun from pure Grade-A Mongolian cashmere with an ultra-soft hand feel. Each sweater is hand-dipped into our proprietary non-toxic dye vat to produce a seamless gradient from fog grey to violet.',
    details: [
      '100% Grade-A 2-ply Mongolian Cashmere',
      'Seamless dip-dye chromatic gradient',
      'Raglan sleeve construction for clean shoulder line',
      '1x1 ribbed collar, cuffs, and hem',
    ],
    materials: '100% Cashmere',
    care: ['Hand wash cold or dry clean', 'Lay flat to dry', 'Pilling comb included'],
    price: 82000,
    media: [
      {
        src: '/images/products/gradient-cashmere-knit-1.webp',
        alt: 'Gradient Cashmere Knit, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/gradient-cashmere-knit-2.webp',
        alt: 'Gradient Cashmere Knit, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Spectral Gradient',
            swatch: '#796a94',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-012-v1',
        sku: 'PRY-KNT-012-GRD-S',
        options: {
          size: 'S',
          color: 'Spectral Gradient',
        },
        stock: 5,
      },
      {
        id: 'p-012-v2',
        sku: 'PRY-KNT-012-GRD-M',
        options: {
          size: 'M',
          color: 'Spectral Gradient',
        },
        stock: 9,
      },
      {
        id: 'p-012-v3',
        sku: 'PRY-KNT-012-GRD-L',
        options: {
          size: 'L',
          color: 'Spectral Gradient',
        },
        stock: 6,
      },
      {
        id: 'p-012-v4',
        sku: 'PRY-KNT-012-GRD-XL',
        options: {
          size: 'XL',
          color: 'Spectral Gradient',
        },
        stock: 2,
      },
    ],
    tags: ['cashmere', 'knitwear', 'luxury', 'gradient'],
    collectionSlugs: ['prism-chroma', 'core-archive'],
    badges: ['bestseller'],
    rating: {
      average: 5,
      count: 19,
    },
    featured: true,
    createdAt: '2026-08-28T14:00:00.000Z',
  },
  {
    id: 'p-013',
    slug: 'prismatic-fine-gauge-polo',
    name: 'Prismatic Fine-Gauge Polo',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: 'Long-sleeve knit polo in 24-gauge sea island cotton with mother-of-pearl zip.',
    description:
      'Precision-knitted from rare West Indian Sea Island cotton. Features a sleek half-zip placket with custom titanium puller and a knit flat-point collar that sits crisp under blazers.',
    details: [
      'Ultra-fine 24-gauge knit Sea Island cotton',
      'Polished concealed titanium zipper with prism engraved pull',
      'Ribbed cuffs and hem with elastane recovery thread',
      'Fully fashioned armholes',
    ],
    materials: '100% Sea Island Cotton',
    care: ['Gentle cycle cold', 'Reshape while damp and dry flat', 'Cool iron'],
    price: 49000,
    media: [
      {
        src: '/images/products/prismatic-fine-gauge-polo-1.webp',
        alt: 'Prismatic Fine-Gauge Polo, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-fine-gauge-polo-2.webp',
        alt: 'Prismatic Fine-Gauge Polo, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Steel Blue',
            swatch: '#4b5e73',
          },
          {
            value: 'Daylight Pearl',
            swatch: '#e5e9f0',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-013-v1',
        sku: 'PRY-KNT-013-BLU-S',
        options: {
          size: 'S',
          color: 'Steel Blue',
        },
        stock: 7,
      },
      {
        id: 'p-013-v2',
        sku: 'PRY-KNT-013-BLU-M',
        options: {
          size: 'M',
          color: 'Steel Blue',
        },
        stock: 12,
      },
      {
        id: 'p-013-v3',
        sku: 'PRY-KNT-013-BLU-L',
        options: {
          size: 'L',
          color: 'Steel Blue',
        },
        stock: 6,
      },
      {
        id: 'p-013-v4',
        sku: 'PRY-KNT-013-PRL-S',
        options: {
          size: 'S',
          color: 'Daylight Pearl',
        },
        stock: 5,
      },
      {
        id: 'p-013-v5',
        sku: 'PRY-KNT-013-PRL-M',
        options: {
          size: 'M',
          color: 'Daylight Pearl',
        },
        stock: 10,
      },
      {
        id: 'p-013-v6',
        sku: 'PRY-KNT-013-PRL-L',
        options: {
          size: 'L',
          color: 'Daylight Pearl',
        },
        stock: 6,
      },
    ],
    tags: ['polo', 'knitwear', 'sea-island-cotton'],
    collectionSlugs: ['refractive-tailoring', 'core-archive'],
    badges: [],
    rating: {
      average: 4.8,
      count: 13,
    },
    featured: false,
    createdAt: '2026-07-19T10:00:00.000Z',
  },
  {
    id: 'p-014',
    slug: 'refractive-heavyweight-hoodie',
    name: 'Refractive Heavyweight Hoodie',
    category: 'clothing',
    subcategory: 'sweatshirts',
    summary: '460gsm custom French terry hoodie with refractive reflective chord and lined hood.',
    description:
      'An elevated architectural fleece hoodie cut from ultra-dense loopback French terry. The hood is structured with an internal double-layer panel to stand upright without drawstring gathering.',
    details: [
      '460gsm combed organic cotton French terry',
      'Kangaroo pocket with concealed interior phone sleeve',
      'Custom reflective braided drawstring with titanium aglets',
      'Dense ribbed side gussets for enhanced drape',
    ],
    materials: '100% Organic Cotton French Terry',
    care: ['Machine wash inside out cold', 'Hang dry', 'Do not iron on reflective print'],
    price: 42000,
    media: [
      {
        src: '/images/products/refractive-heavyweight-hoodie-1.webp',
        alt: 'Refractive Heavyweight Hoodie, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-heavyweight-hoodie-2.webp',
        alt: 'Refractive Heavyweight Hoodie, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Charcoal',
            swatch: '#282b35',
          },
          {
            value: 'Chalk White',
            swatch: '#f1f3f7',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-014-v1',
        sku: 'PRY-SWT-014-CHR-S',
        options: {
          size: 'S',
          color: 'Prism Charcoal',
        },
        stock: 12,
      },
      {
        id: 'p-014-v2',
        sku: 'PRY-SWT-014-CHR-M',
        options: {
          size: 'M',
          color: 'Prism Charcoal',
        },
        stock: 20,
      },
      {
        id: 'p-014-v3',
        sku: 'PRY-SWT-014-CHR-L',
        options: {
          size: 'L',
          color: 'Prism Charcoal',
        },
        stock: 15,
      },
      {
        id: 'p-014-v4',
        sku: 'PRY-SWT-014-CHR-XL',
        options: {
          size: 'XL',
          color: 'Prism Charcoal',
        },
        stock: 8,
      },
      {
        id: 'p-014-v5',
        sku: 'PRY-SWT-014-CHK-S',
        options: {
          size: 'S',
          color: 'Chalk White',
        },
        stock: 9,
      },
      {
        id: 'p-014-v6',
        sku: 'PRY-SWT-014-CHK-M',
        options: {
          size: 'M',
          color: 'Chalk White',
        },
        stock: 16,
      },
      {
        id: 'p-014-v7',
        sku: 'PRY-SWT-014-CHK-L',
        options: {
          size: 'L',
          color: 'Chalk White',
        },
        stock: 11,
      },
      {
        id: 'p-014-v8',
        sku: 'PRY-SWT-014-CHK-XL',
        options: {
          size: 'XL',
          color: 'Chalk White',
        },
        stock: 5,
      },
    ],
    tags: ['hoodie', 'sweatshirts', 'heavyweight', 'essentials'],
    collectionSlugs: ['core-archive'],
    badges: ['bestseller'],
    rating: {
      average: 4.9,
      count: 32,
    },
    featured: true,
    createdAt: '2026-07-05T09:00:00.000Z',
  },
  {
    id: 'p-015',
    slug: 'spectral-loopback-crewneck',
    name: 'Spectral Loopback Crewneck',
    category: 'clothing',
    subcategory: 'sweatshirts',
    summary: 'Minimalist raglan crewneck in 400gsm diagonal French terry with flatlock stitching.',
    description:
      'Clean sportswear elevated to luxury through premium yarn selection and exacting Japanese flatlock construction. Features an ergonomic underarm football gusset for restriction-free movement.',
    details: [
      '400gsm diagonal French terry with peach face finish',
      'Ergonomic underarm diamond gusset',
      'Vintage-inspired V-insert at collar',
      'Heavy ribbed cuffs that retain elasticity',
    ],
    materials: '100% Long-Staple Cotton',
    care: ['Machine wash cold', 'Tumble dry low', 'Warm iron'],
    price: 36000,
    media: [
      {
        src: '/images/products/spectral-loopback-crewneck-1.webp',
        alt: 'Spectral Loopback Crewneck, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-loopback-crewneck-2.webp',
        alt: 'Spectral Loopback Crewneck, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Heather Violet',
            swatch: '#685d79',
          },
          {
            value: 'Mineral Ink',
            swatch: '#1b2230',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-015-v1',
        sku: 'PRY-SWT-015-VIO-S',
        options: {
          size: 'S',
          color: 'Heather Violet',
        },
        stock: 8,
      },
      {
        id: 'p-015-v2',
        sku: 'PRY-SWT-015-VIO-M',
        options: {
          size: 'M',
          color: 'Heather Violet',
        },
        stock: 14,
      },
      {
        id: 'p-015-v3',
        sku: 'PRY-SWT-015-VIO-L',
        options: {
          size: 'L',
          color: 'Heather Violet',
        },
        stock: 9,
      },
      {
        id: 'p-015-v4',
        sku: 'PRY-SWT-015-INK-S',
        options: {
          size: 'S',
          color: 'Mineral Ink',
        },
        stock: 10,
      },
      {
        id: 'p-015-v5',
        sku: 'PRY-SWT-015-INK-M',
        options: {
          size: 'M',
          color: 'Mineral Ink',
        },
        stock: 18,
      },
      {
        id: 'p-015-v6',
        sku: 'PRY-SWT-015-INK-L',
        options: {
          size: 'L',
          color: 'Mineral Ink',
        },
        stock: 12,
      },
    ],
    tags: ['crewneck', 'sweatshirts', 'minimalist'],
    collectionSlugs: ['core-archive'],
    badges: [],
    rating: {
      average: 4.8,
      count: 16,
    },
    featured: false,
    createdAt: '2026-06-25T11:00:00.000Z',
  },
  {
    id: 'p-016',
    slug: 'prismatic-zip-track-top',
    name: 'Prismatic Zip Track Top',
    category: 'clothing',
    subcategory: 'sweatshirts',
    summary: 'High-neck track jacket in bonded technical jersey with iridescent side stripes.',
    description:
      'A futuristic interpretation of the heritage track jacket. Crafted from bonded double-knit jersey with a structured stand collar and iridescent micro-perforated tape running down both sleeves.',
    details: [
      'Bonded technical double-knit jersey (340gsm)',
      'Two-way riri zipper with spectral anodised finish',
      'Dual concealed zip hand pockets',
      'Raglan sleeve with iridescent piping',
    ],
    materials: '72% Viscose, 24% Polyamide, 4% Elastane',
    care: ['Gentle wash cold inside out', 'Hang to dry', 'Do not iron zipper'],
    price: 48000,
    compareAtPrice: 58000,
    media: [
      {
        src: '/images/products/prismatic-zip-track-top-1.webp',
        alt: 'Prismatic Zip Track Top, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-zip-track-top-2.webp',
        alt: 'Prismatic Zip Track Top, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Liquid Jet',
            swatch: '#13141a',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-016-v1',
        sku: 'PRY-SWT-016-JET-S',
        options: {
          size: 'S',
          color: 'Liquid Jet',
        },
        stock: 7,
      },
      {
        id: 'p-016-v2',
        sku: 'PRY-SWT-016-JET-M',
        options: {
          size: 'M',
          color: 'Liquid Jet',
        },
        stock: 12,
      },
      {
        id: 'p-016-v3',
        sku: 'PRY-SWT-016-JET-L',
        options: {
          size: 'L',
          color: 'Liquid Jet',
        },
        stock: 5,
      },
    ],
    tags: ['track-jacket', 'sweatshirts', 'sale', 'sportswear'],
    collectionSlugs: ['prism-chroma'],
    badges: ['sale'],
    rating: {
      average: 4.7,
      count: 15,
    },
    featured: false,
    createdAt: '2026-07-20T14:00:00.000Z',
  },
  {
    id: 'p-017',
    slug: 'spectral-trench-coat',
    name: 'The Spectral Trench Coat',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Architectural double-breasted trench in waterproof iridescent technical gabardine.',
    description:
      'The definitive hero piece of PRYSM. Engineered from high-density gabardine woven with two distinct yarn angles, producing a fluid color shift between deep twilight navy and radiant amber in shifting light.',
    details: [
      'Waterproof, windproof breathable 3-layer membrane (10,000mm)',
      'Traditional storm flap and epaulettes with horn buttons',
      'Removable self-fabric waist belt with titanium D-rings',
      'Deep storm welt pockets with magnetic closure',
    ],
    materials: '68% Cotton, 32% Technical Nylon with Hydrophobic Coating',
    care: ['Specialist dry clean only'],
    price: 145000,
    media: [
      {
        src: '/images/products/spectral-trench-1.webp',
        alt: 'The Spectral Trench Coat, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-trench-2.webp',
        alt: 'The Spectral Trench Coat, detail view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-trench-3.webp',
        alt: 'The Spectral Trench Coat, back view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Spectral Navy',
            swatch: '#1a2238',
          },
          {
            value: 'Opal Sand',
            swatch: '#dcd6cb',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-017-v1',
        sku: 'PRY-OUT-017-NVY-S',
        options: {
          size: 'S',
          color: 'Spectral Navy',
        },
        stock: 4,
      },
      {
        id: 'p-017-v2',
        sku: 'PRY-OUT-017-NVY-M',
        options: {
          size: 'M',
          color: 'Spectral Navy',
        },
        stock: 8,
      },
      {
        id: 'p-017-v3',
        sku: 'PRY-OUT-017-NVY-L',
        options: {
          size: 'L',
          color: 'Spectral Navy',
        },
        stock: 6,
      },
      {
        id: 'p-017-v4',
        sku: 'PRY-OUT-017-NVY-XL',
        options: {
          size: 'XL',
          color: 'Spectral Navy',
        },
        stock: 2,
      },
      {
        id: 'p-017-v5',
        sku: 'PRY-OUT-017-SND-S',
        options: {
          size: 'S',
          color: 'Opal Sand',
        },
        stock: 5,
      },
      {
        id: 'p-017-v6',
        sku: 'PRY-OUT-017-SND-M',
        options: {
          size: 'M',
          color: 'Opal Sand',
        },
        stock: 9,
      },
      {
        id: 'p-017-v7',
        sku: 'PRY-OUT-017-SND-L',
        options: {
          size: 'L',
          color: 'Opal Sand',
        },
        stock: 7,
      },
      {
        id: 'p-017-v8',
        sku: 'PRY-OUT-017-SND-XL',
        options: {
          size: 'XL',
          color: 'Opal Sand',
        },
        stock: 3,
      },
    ],
    tags: ['trench', 'outerwear', 'waterproof', 'hero', 'tailoring'],
    collectionSlugs: ['refractive-tailoring', 'core-archive'],
    badges: ['bestseller'],
    rating: {
      average: 5,
      count: 27,
    },
    featured: true,
    createdAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'p-018',
    slug: 'iridescent-technical-parka',
    name: 'Iridescent Technical Parka',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Modular fishtail parka with detachable fleece vest liner and spectral ripstop shell.',
    description:
      'A 3-in-1 cold-weather jacket that transitions effortlessly across climates. The outer shell is crafted from Japanese micro-ripstop nylon with water-beading fluorocarbon-free DWR.',
    details: [
      'Micro-ripstop nylon shell with fully taped seams',
      'Detachable inner fleece insulation vest with internal pocket',
      'Fishtail hem with drawcord adjustment and snap studs',
      'Articulated storm hood with malleable visor wire',
    ],
    materials: '100% Recycled Technical Polyamide, Polar Fleece Lining',
    care: ['Machine wash gentle cold', 'Tumble dry low to reactivate DWR', 'Do not bleach'],
    price: 128000,
    media: [
      {
        src: '/images/products/iridescent-technical-parka-1.webp',
        alt: 'Iridescent Technical Parka, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/iridescent-technical-parka-2.webp',
        alt: 'Iridescent Technical Parka, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Opal Emerald',
            swatch: '#2d4b41',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-018-v1',
        sku: 'PRY-OUT-018-EME-S',
        options: {
          size: 'S',
          color: 'Opal Emerald',
        },
        stock: 5,
      },
      {
        id: 'p-018-v2',
        sku: 'PRY-OUT-018-EME-M',
        options: {
          size: 'M',
          color: 'Opal Emerald',
        },
        stock: 9,
      },
      {
        id: 'p-018-v3',
        sku: 'PRY-OUT-018-EME-L',
        options: {
          size: 'L',
          color: 'Opal Emerald',
        },
        stock: 6,
      },
    ],
    tags: ['parka', 'outerwear', 'technical', 'modular'],
    collectionSlugs: ['spectral-lightwear'],
    badges: ['new'],
    rating: {
      average: 4.8,
      count: 14,
    },
    featured: false,
    createdAt: '2026-09-02T11:00:00.000Z',
  },
  {
    id: 'p-019',
    slug: 'refractive-double-breasted-blazer',
    name: 'Refractive Double-Breasted Blazer',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Tailored 6x2 double-breasted blazer in structured wool-silk with peak lapels.',
    description:
      'Impeccable evening tailoring constructed with a half-canvas chest piece and soft roped shoulders. The cloth reflects ambient light with a whisper of chromatic violet.',
    details: [
      '6x2 double-breasted button closure with horn buttons',
      'Broad peak lapels with silk pick stitching',
      'Flapped jet pockets and ticket pocket',
      'Double rear vents with cupro lining throughout',
    ],
    materials: '75% Virgin Wool, 25% Silk Filaments',
    care: ['Professional dry clean only', 'Keep in dust garment bag'],
    price: 115000,
    media: [
      {
        src: '/images/products/refractive-blazer-1.webp',
        alt: 'Refractive Double-Breasted Blazer, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-blazer-2.webp',
        alt: 'Refractive Double-Breasted Blazer, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Midnight',
            swatch: '#151928',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-019-v1',
        sku: 'PRY-OUT-019-MID-S',
        options: {
          size: 'S',
          color: 'Prism Midnight',
        },
        stock: 6,
      },
      {
        id: 'p-019-v2',
        sku: 'PRY-OUT-019-MID-M',
        options: {
          size: 'M',
          color: 'Prism Midnight',
        },
        stock: 11,
      },
      {
        id: 'p-019-v3',
        sku: 'PRY-OUT-019-MID-L',
        options: {
          size: 'L',
          color: 'Prism Midnight',
        },
        stock: 7,
      },
      {
        id: 'p-019-v4',
        sku: 'PRY-OUT-019-MID-XL',
        options: {
          size: 'XL',
          color: 'Prism Midnight',
        },
        stock: 3,
      },
    ],
    tags: ['blazer', 'outerwear', 'tailoring', 'double-breasted'],
    collectionSlugs: ['refractive-tailoring'],
    badges: ['bestseller'],
    rating: {
      average: 4.9,
      count: 22,
    },
    featured: true,
    createdAt: '2026-08-14T10:00:00.000Z',
  },
  {
    id: 'p-020',
    slug: 'liquid-silk-duster',
    name: 'Liquid Silk Duster Coat',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Unstructured ankle-length duster in heavy mulberry silk with waterfall drape.',
    description:
      'A poetic lightweight coat designed to ripple behind the wearer with every step. Unlined and unpadded to maximise the natural liquid drape of high-density silk charmeuse.',
    details: [
      'Ankle-skimming flowing silhouette',
      'Shawl collar extending to open front',
      'Removable wide silk sash tie belt',
      'Deep in-seam side pockets',
    ],
    materials: '100% Heavy Mulberry Silk Charmeuse',
    care: ['Specialist dry clean only'],
    price: 138000,
    media: [
      {
        src: '/images/products/liquid-silk-duster-1.webp',
        alt: 'Liquid Silk Duster Coat, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/liquid-silk-duster-2.webp',
        alt: 'Liquid Silk Duster Coat, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Champagne Bronze',
            swatch: '#9b846e',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-020-v1',
        sku: 'PRY-OUT-020-BRZ-S',
        options: {
          size: 'S',
          color: 'Champagne Bronze',
        },
        stock: 4,
      },
      {
        id: 'p-020-v2',
        sku: 'PRY-OUT-020-BRZ-M',
        options: {
          size: 'M',
          color: 'Champagne Bronze',
        },
        stock: 7,
      },
      {
        id: 'p-020-v3',
        sku: 'PRY-OUT-020-BRZ-L',
        options: {
          size: 'L',
          color: 'Champagne Bronze',
        },
        stock: 4,
      },
    ],
    tags: ['duster', 'silk', 'outerwear', 'evening'],
    collectionSlugs: ['liquid-silk'],
    badges: [],
    rating: {
      average: 4.8,
      count: 12,
    },
    featured: false,
    createdAt: '2026-08-22T13:00:00.000Z',
  },
  {
    id: 'p-021',
    slug: 'prismatic-cropped-bomber',
    name: 'Prismatic Cropped Bomber',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Flight bomber in iridescent high-density satin with gathered sleeve seams.',
    description:
      'A sharp, modern volume featuring gathered puckered sleeve seams and an exaggerated ribbed waist. The satin weave catches overhead lighting with an intense prismatic sheen.',
    details: [
      'High-density technical nylon-satin shell',
      'Two-way chunky titanium zip closure',
      'Utility sleeve pocket with custom prism puller',
      'Dense wool-blend ribbed trims',
    ],
    materials: '100% Technical Satin Nylon, Cupro Lining',
    care: ['Dry clean only'],
    price: 98000,
    media: [
      {
        src: '/images/products/prismatic-cropped-bomber-1.webp',
        alt: 'Prismatic Cropped Bomber, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-cropped-bomber-2.webp',
        alt: 'Prismatic Cropped Bomber, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Steel Prism',
            swatch: '#5a6270',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-021-v1',
        sku: 'PRY-OUT-021-STL-S',
        options: {
          size: 'S',
          color: 'Steel Prism',
        },
        stock: 6,
      },
      {
        id: 'p-021-v2',
        sku: 'PRY-OUT-021-STL-M',
        options: {
          size: 'M',
          color: 'Steel Prism',
        },
        stock: 10,
      },
      {
        id: 'p-021-v3',
        sku: 'PRY-OUT-021-STL-L',
        options: {
          size: 'L',
          color: 'Steel Prism',
        },
        stock: 5,
      },
    ],
    tags: ['bomber', 'outerwear', 'satin', 'cropped'],
    collectionSlugs: ['spectral-lightwear'],
    badges: ['new'],
    rating: {
      average: 4.7,
      count: 11,
    },
    featured: false,
    createdAt: '2026-09-05T15:00:00.000Z',
  },
  {
    id: 'p-022',
    slug: 'refractive-down-puffer',
    name: 'Refractive Down Puffer Jacket',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: '800-fill RDS goose down puffer jacket in shimmering iridescent ripstop.',
    description:
      'Engineered for extreme sub-zero warmth without aesthetic compromise. The lightweight translucent shell reveals subtle structural down baffles beneath, glowing softly under artificial light.',
    details: [
      '800-fill power RDS certified goose down (90/10)',
      'Water-resistant iridescent 15D ripstop nylon shell',
      'High funnel collar with packable storm hood',
      'Fleece-lined thermal hand warmer pockets',
    ],
    materials: '100% Recycled Polyamide Shell, 800-Fill Goose Down',
    care: [
      'Professional wet clean or machine wash cold on delicate with down wash',
      'Tumble dry low with dryer balls',
    ],
    price: 112000,
    media: [
      {
        src: '/images/products/refractive-down-puffer-1.webp',
        alt: 'Refractive Down Puffer Jacket, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-down-puffer-2.webp',
        alt: 'Refractive Down Puffer Jacket, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Glacier Opal',
            swatch: '#d9e2ec',
          },
          {
            value: 'Midnight Violet',
            swatch: '#241e33',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-022-v1',
        sku: 'PRY-OUT-022-GLC-S',
        options: {
          size: 'S',
          color: 'Glacier Opal',
        },
        stock: 5,
      },
      {
        id: 'p-022-v2',
        sku: 'PRY-OUT-022-GLC-M',
        options: {
          size: 'M',
          color: 'Glacier Opal',
        },
        stock: 8,
      },
      {
        id: 'p-022-v3',
        sku: 'PRY-OUT-022-GLC-L',
        options: {
          size: 'L',
          color: 'Glacier Opal',
        },
        stock: 4,
      },
      {
        id: 'p-022-v4',
        sku: 'PRY-OUT-022-MDN-S',
        options: {
          size: 'S',
          color: 'Midnight Violet',
        },
        stock: 6,
      },
      {
        id: 'p-022-v5',
        sku: 'PRY-OUT-022-MDN-M',
        options: {
          size: 'M',
          color: 'Midnight Violet',
        },
        stock: 9,
      },
      {
        id: 'p-022-v6',
        sku: 'PRY-OUT-022-MDN-L',
        options: {
          size: 'L',
          color: 'Midnight Violet',
        },
        stock: 5,
      },
    ],
    tags: ['puffer', 'outerwear', 'down', 'winter'],
    collectionSlugs: ['spectral-lightwear'],
    badges: [],
    rating: {
      average: 4.9,
      count: 16,
    },
    featured: false,
    createdAt: '2026-08-19T10:00:00.000Z',
  },
  {
    id: 'p-023',
    slug: 'structured-prism-overcoat',
    name: 'Structured Prism Overcoat',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'Single-breasted architectural tailored overcoat in heavy double-faced cashmere-wool.',
    description:
      'An elongated, masculine silhouette cut with sharp tailored shoulders, clean fly-front buttoning, and an iridescent cupro buggy lining. The double-faced cloth offers monumental structure.',
    details: [
      'Double-faced 680gsm wool-cashmere blend',
      'Fly-front concealed horn button placket',
      'Deep vertical welt pockets with fleece lining',
      'Center back walking vent with concealed button tab',
    ],
    materials: '85% Virgin Wool, 15% Cashmere',
    care: ['Specialist dry clean only'],
    price: 165000,
    compareAtPrice: 185000,
    media: [
      {
        src: '/images/products/structured-prism-overcoat-1.webp',
        alt: 'Structured Prism Overcoat, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/structured-prism-overcoat-2.webp',
        alt: 'Structured Prism Overcoat, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
          {
            value: 'XL',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Deep Obsidian',
            swatch: '#111319',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-023-v1',
        sku: 'PRY-OUT-023-OBS-S',
        options: {
          size: 'S',
          color: 'Deep Obsidian',
        },
        stock: 4,
      },
      {
        id: 'p-023-v2',
        sku: 'PRY-OUT-023-OBS-M',
        options: {
          size: 'M',
          color: 'Deep Obsidian',
        },
        stock: 8,
      },
      {
        id: 'p-023-v3',
        sku: 'PRY-OUT-023-OBS-L',
        options: {
          size: 'L',
          color: 'Deep Obsidian',
        },
        stock: 5,
      },
      {
        id: 'p-023-v4',
        sku: 'PRY-OUT-023-OBS-XL',
        options: {
          size: 'XL',
          color: 'Deep Obsidian',
        },
        stock: 2,
      },
    ],
    tags: ['overcoat', 'tailoring', 'wool', 'sale', 'outerwear'],
    collectionSlugs: ['refractive-tailoring', 'core-archive'],
    badges: ['sale'],
    rating: {
      average: 5,
      count: 21,
    },
    featured: true,
    createdAt: '2026-07-15T10:00:00.000Z',
  },
  {
    id: 'p-024',
    slug: 'refractive-tailored-trousers',
    name: 'Refractive Tailored Trousers',
    category: 'clothing',
    subcategory: 'trousers',
    summary: 'High-waisted single pleat trousers in fluid wool-silk with pressed sharp creases.',
    description:
      'Designed to pair perfectly with the Refractive Double-Breasted Blazer. Features a clean Hollywood waistband with concealed side adjusters, falling into an elongated full break.',
    details: [
      'Single forward pleat with pressed permanent sharp crease',
      'Concealed hook-and-bar closure with zip fly',
      'Internal curtain waistband with shirt grip tape',
      'Angled slash pockets and dual rear jet pockets',
    ],
    materials: '75% Virgin Wool, 25% Silk Filaments',
    care: ['Dry clean only', 'Press with steam on reverse'],
    price: 58000,
    media: [
      {
        src: '/images/products/refractive-tailored-trousers-1.webp',
        alt: 'Refractive Tailored Trousers, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-tailored-trousers-2.webp',
        alt: 'Refractive Tailored Trousers, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: '46',
          },
          {
            value: '48',
          },
          {
            value: '50',
          },
          {
            value: '52',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Midnight',
            swatch: '#151928',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-024-v1',
        sku: 'PRY-TRS-024-MID-46',
        options: {
          size: '46',
          color: 'Prism Midnight',
        },
        stock: 8,
      },
      {
        id: 'p-024-v2',
        sku: 'PRY-TRS-024-MID-48',
        options: {
          size: '48',
          color: 'Prism Midnight',
        },
        stock: 14,
      },
      {
        id: 'p-024-v3',
        sku: 'PRY-TRS-024-MID-50',
        options: {
          size: '50',
          color: 'Prism Midnight',
        },
        stock: 10,
      },
      {
        id: 'p-024-v4',
        sku: 'PRY-TRS-024-MID-52',
        options: {
          size: '52',
          color: 'Prism Midnight',
        },
        stock: 5,
      },
    ],
    tags: ['trousers', 'tailoring', 'wool-silk', 'suit'],
    collectionSlugs: ['refractive-tailoring'],
    badges: ['bestseller'],
    rating: {
      average: 4.8,
      count: 19,
    },
    featured: true,
    createdAt: '2026-08-14T11:00:00.000Z',
  },
  {
    id: 'p-025',
    slug: 'liquid-silk-wide-leg-pant',
    name: 'Liquid Silk Wide-Leg Pant',
    category: 'clothing',
    subcategory: 'trousers',
    summary: 'Fluid pull-on palazzo trousers in heavy sand-washed silk with elasticated back.',
    description:
      'The pinnacle of relaxed luxury. High-twist sand-washed silk cascades freely to the floor, creating fluid movement and dynamic light reflections with every step.',
    details: [
      'Wide-leg palazzo cut with generous hem allowance',
      'Flat front waistband with concealed elasticated back section',
      'Deep in-seam pockets',
      'Unlined for maximum breathability',
    ],
    materials: '100% Sand-Washed Mulberry Silk (22mm)',
    care: ['Dry clean or delicate hand wash cold', 'Hang dry in shade'],
    price: 52000,
    media: [
      {
        src: '/images/products/liquid-silk-wide-leg-pant-1.webp',
        alt: 'Liquid Silk Wide-Leg Pant, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/liquid-silk-wide-leg-pant-2.webp',
        alt: 'Liquid Silk Wide-Leg Pant, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Champagne Bronze',
            swatch: '#9b846e',
          },
          {
            value: 'Opal Pearl',
            swatch: '#e6ebf2',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-025-v1',
        sku: 'PRY-TRS-025-BRZ-S',
        options: {
          size: 'S',
          color: 'Champagne Bronze',
        },
        stock: 6,
      },
      {
        id: 'p-025-v2',
        sku: 'PRY-TRS-025-BRZ-M',
        options: {
          size: 'M',
          color: 'Champagne Bronze',
        },
        stock: 11,
      },
      {
        id: 'p-025-v3',
        sku: 'PRY-TRS-025-BRZ-L',
        options: {
          size: 'L',
          color: 'Champagne Bronze',
        },
        stock: 5,
      },
      {
        id: 'p-025-v4',
        sku: 'PRY-TRS-025-PRL-S',
        options: {
          size: 'S',
          color: 'Opal Pearl',
        },
        stock: 7,
      },
      {
        id: 'p-025-v5',
        sku: 'PRY-TRS-025-PRL-M',
        options: {
          size: 'M',
          color: 'Opal Pearl',
        },
        stock: 12,
      },
      {
        id: 'p-025-v6',
        sku: 'PRY-TRS-025-PRL-L',
        options: {
          size: 'L',
          color: 'Opal Pearl',
        },
        stock: 6,
      },
    ],
    tags: ['pant', 'silk', 'wide-leg', 'loungewear'],
    collectionSlugs: ['liquid-silk'],
    badges: [],
    rating: {
      average: 4.9,
      count: 15,
    },
    featured: false,
    createdAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 'p-026',
    slug: 'spectral-technical-cargo',
    name: 'Spectral Technical Cargo Pant',
    category: 'clothing',
    subcategory: 'trousers',
    summary: 'Tapered cargo pant in water-repellent memory nylon with magnetic pocket flaps.',
    description:
      'Precision utilitarian engineering. Crafted from Japanese memory-shape technical nylon that resists wrinkling and holds crisp architectural 3D pocket volume.',
    details: [
      'Memory-shape water-repellent technical nylon',
      'Ergonomic articulated knee darts',
      'Dual gusseted 3D cargo pockets with Fidlock magnetic closures',
      'Adjustable bungee toggle cuffs for versatile styling',
    ],
    materials: '100% Technical Memory Nylon',
    care: ['Machine wash cold', 'Air dry', 'Do not iron magnetic closures'],
    price: 64000,
    media: [
      {
        src: '/images/products/spectral-technical-cargo-1.webp',
        alt: 'Spectral Technical Cargo Pant, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-technical-cargo-2.webp',
        alt: 'Spectral Technical Cargo Pant, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Refractive Slate',
            swatch: '#3c404b',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-026-v1',
        sku: 'PRY-TRS-026-SLT-S',
        options: {
          size: 'S',
          color: 'Refractive Slate',
        },
        stock: 7,
      },
      {
        id: 'p-026-v2',
        sku: 'PRY-TRS-026-SLT-M',
        options: {
          size: 'M',
          color: 'Refractive Slate',
        },
        stock: 12,
      },
      {
        id: 'p-026-v3',
        sku: 'PRY-TRS-026-SLT-L',
        options: {
          size: 'L',
          color: 'Refractive Slate',
        },
        stock: 6,
      },
    ],
    tags: ['cargo', 'technical', 'trousers', 'utilitarian'],
    collectionSlugs: ['spectral-lightwear'],
    badges: ['new'],
    rating: {
      average: 4.7,
      count: 13,
    },
    featured: false,
    createdAt: '2026-09-01T12:00:00.000Z',
  },
  {
    id: 'p-027',
    slug: 'iridescent-pleated-column-skirt',
    name: 'Iridescent Pleated Column Skirt',
    category: 'clothing',
    subcategory: 'skirts',
    summary: 'Maxi column skirt with sunray knife pleats in duochrome organza.',
    description:
      'An architectural maxi skirt with permanent knife pleating. As the wearer walks, the alternating pleat folds reveal secondary chromatic tones in liquid violet and amber.',
    details: [
      'Sharp permanent sunray knife pleating',
      'Elasticated Grosgrain interior waistband',
      'Concealed side zipper with hook closure',
      'Full sheer outer layer over opaque silk lining',
    ],
    materials: '60% Polyamide, 40% Silk Crepe de Chine Lining',
    care: ['Specialist dry clean only', 'Do not iron pleats'],
    price: 56000,
    compareAtPrice: 68000,
    media: [
      {
        src: '/images/products/iridescent-pleated-column-skirt-1.webp',
        alt: 'Iridescent Pleated Column Skirt, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/iridescent-pleated-column-skirt-2.webp',
        alt: 'Iridescent Pleated Column Skirt, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Size',
        kind: 'size',
        values: [
          {
            value: 'S',
          },
          {
            value: 'M',
          },
          {
            value: 'L',
          },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Violet Shimmer',
            swatch: '#7e6799',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-027-v1',
        sku: 'PRY-SKT-027-VIO-S',
        options: {
          size: 'S',
          color: 'Violet Shimmer',
        },
        stock: 5,
      },
      {
        id: 'p-027-v2',
        sku: 'PRY-SKT-027-VIO-M',
        options: {
          size: 'M',
          color: 'Violet Shimmer',
        },
        stock: 9,
      },
      {
        id: 'p-027-v3',
        sku: 'PRY-SKT-027-VIO-L',
        options: {
          size: 'L',
          color: 'Violet Shimmer',
        },
        stock: 4,
      },
    ],
    tags: ['skirt', 'pleated', 'sale', 'evening'],
    collectionSlugs: ['prism-chroma'],
    badges: ['sale'],
    rating: {
      average: 4.8,
      count: 18,
    },
    featured: false,
    createdAt: '2026-07-10T15:00:00.000Z',
  },
  {
    id: 'p-028',
    slug: 'glass-clasp-crossbody-bag',
    name: 'Glass-Clasp Crossbody Bag',
    category: 'accessories',
    subcategory: 'bags',
    summary: 'Sculpted calfskin box bag with custom solid crystal optical glass turn-clasp.',
    description:
      'Constructed from smooth box calfskin with lacquered hand-painted edges. Centered around a solid borosilicate crystal glass clasp that refracts ambient light like a prism.',
    details: [
      'French box calfskin with nappa lambskin lining',
      'Hand-polished solid borosilicate optical crystal clasp',
      'Adjustable leather shoulder strap with titanium buckle',
      'Internal card slot and key lanyard',
    ],
    materials: '100% Calfskin, Borosilicate Crystal Glass Hardware',
    care: [
      'Store in cotton dust bag with tissue stuffing',
      'Clean glass clasp with microfiber cloth',
    ],
    price: 78000,
    media: [
      {
        src: '/images/products/glass-clasp-crossbody-1.webp',
        alt: 'Glass-Clasp Crossbody Bag, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/glass-clasp-crossbody-2.webp',
        alt: 'Glass-Clasp Crossbody Bag, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Obsidian Black',
            swatch: '#111216',
          },
          {
            value: 'Chroma Pearl',
            swatch: '#e3e8f0',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-028-v1',
        sku: 'PRY-ACC-028-OBS-OS',
        options: {
          color: 'Obsidian Black',
        },
        stock: 8,
      },
      {
        id: 'p-028-v2',
        sku: 'PRY-ACC-028-PRL-OS',
        options: {
          color: 'Chroma Pearl',
        },
        stock: 6,
      },
    ],
    tags: ['bag', 'crossbody', 'leather', 'crystal', 'hero'],
    collectionSlugs: ['core-archive', 'refractive-tailoring'],
    badges: ['bestseller'],
    rating: {
      average: 5,
      count: 25,
    },
    featured: true,
    createdAt: '2026-08-05T10:00:00.000Z',
  },
  {
    id: 'p-029',
    slug: 'iridescent-nylon-tote',
    name: 'Iridescent Technical Nylon Tote',
    category: 'accessories',
    subcategory: 'bags',
    summary: 'Structured daily tote bag in water-repellent prismatic Japanese micro-twill.',
    description:
      'A functional daily carryall engineered with padded dual handles, an internal 16-inch padded laptop compartment, and an exterior quick-access magnetic pocket.',
    details: [
      'Japanese high-density prismatic nylon twill',
      'Padded 16-inch laptop pocket with magnetic closure',
      'Reinforced leather base with protective titanium studs',
      'Detachable webbing shoulder strap',
    ],
    materials: '100% Recycled Technical Polyamide, Calfskin Accents',
    care: ['Wipe clean with damp cloth'],
    price: 42000,
    media: [
      {
        src: '/images/products/iridescent-nylon-tote-1.webp',
        alt: 'Iridescent Technical Nylon Tote, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/iridescent-nylon-tote-2.webp',
        alt: 'Iridescent Technical Nylon Tote, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Smoke Violet',
            swatch: '#453c52',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-029-v1',
        sku: 'PRY-ACC-029-SMK-OS',
        options: {
          color: 'Smoke Violet',
        },
        stock: 15,
      },
    ],
    tags: ['tote', 'bag', 'nylon', 'laptop', 'work'],
    collectionSlugs: ['core-archive'],
    badges: [],
    rating: {
      average: 4.8,
      count: 18,
    },
    featured: false,
    createdAt: '2026-07-28T11:00:00.000Z',
  },
  {
    id: 'p-030',
    slug: 'spectral-printed-silk-scarf',
    name: 'Spectral Printed Silk Scarf',
    category: 'accessories',
    subcategory: 'scarves',
    summary: '90x90cm hand-rolled silk twill scarf with optical dispersion print.',
    description:
      'Woven from 16mm pure silk twill in Lyon, France. Features an algorithmic optical artwork illustrating the dispersion of white light into spectral chromatic wavelengths.',
    details: [
      '90cm x 90cm square format',
      'Hand-rolled and hand-stitched edges (roulotte)',
      'Double-sided high-definition digital dispersion print',
      'Presented in signature embossed sliding box',
    ],
    materials: '100% Silk Twill (16mm)',
    care: ['Dry clean only'],
    price: 26000,
    media: [
      {
        src: '/images/products/spectral-printed-silk-scarf-1.webp',
        alt: 'Spectral Printed Silk Scarf, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-printed-silk-scarf-2.webp',
        alt: 'Spectral Printed Silk Scarf, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Prism Spectrum',
            swatch: '#855799',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-030-v1',
        sku: 'PRY-ACC-030-PRM-OS',
        options: {
          color: 'Prism Spectrum',
        },
        stock: 12,
      },
    ],
    tags: ['scarf', 'silk', 'accessories', 'gifting'],
    collectionSlugs: ['liquid-silk', 'prism-chroma'],
    badges: ['bestseller'],
    rating: {
      average: 4.9,
      count: 20,
    },
    featured: true,
    createdAt: '2026-08-12T09:00:00.000Z',
  },
  {
    id: 'p-031',
    slug: 'refractive-technical-belt',
    name: 'Refractive Technical Belt',
    category: 'accessories',
    subcategory: 'belts',
    summary: '30mm webbing belt with quick-release titanium magnetic buckle.',
    description:
      'Constructed from high-tensile jacquard webbing interwoven with reflective filaments. Features a custom CNC-milled titanium magnetic buckle with smooth positive engagement.',
    details: [
      '30mm high-tensile nylon webbing with reflective weave',
      'Custom CNC-milled Grade-5 titanium buckle',
      'Infinitely micro-adjustable length up to 115cm',
      'Laser-cut heat-sealed tip',
    ],
    materials: 'High-Tensile Polyamide, Grade-5 Titanium',
    care: ['Wipe clean with damp cloth'],
    price: 21000,
    media: [
      {
        src: '/images/products/refractive-technical-belt-1.webp',
        alt: 'Refractive Technical Belt, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/refractive-technical-belt-2.webp',
        alt: 'Refractive Technical Belt, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Titanium Slate',
            swatch: '#545963',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-031-v1',
        sku: 'PRY-ACC-031-SLT-OS',
        options: {
          color: 'Titanium Slate',
        },
        stock: 14,
      },
    ],
    tags: ['belt', 'technical', 'titanium', 'accessories'],
    collectionSlugs: ['titanium-forms'],
    badges: [],
    rating: {
      average: 4.8,
      count: 15,
    },
    featured: false,
    createdAt: '2026-07-15T12:00:00.000Z',
  },
  {
    id: 'p-032',
    slug: 'holographic-leather-cardholder',
    name: 'Holographic Leather Cardholder',
    category: 'accessories',
    subcategory: 'leather-goods',
    summary: 'Slim 4-slot cardholder in calfskin with holographic edge foil.',
    description:
      'Hand-crafted from durable French box calf. The beveled card slots feature hand-applied holographic foil edges that flash spectrum colors when cards are removed.',
    details: [
      '4 card slots and central cash compartment',
      'Hand-painted holographic foiled edge bevels',
      'Blind embossed PRYSM wordmark',
      'RFID blocking inner shield',
    ],
    materials: '100% Box Calfskin Leather',
    care: ['Condition with neutral leather balm'],
    price: 18000,
    media: [
      {
        src: '/images/products/holographic-leather-cardholder-1.webp',
        alt: 'Holographic Leather Cardholder, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/holographic-leather-cardholder-2.webp',
        alt: 'Holographic Leather Cardholder, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Color',
        kind: 'color',
        values: [
          {
            value: 'Midnight Black',
            swatch: '#121318',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-032-v1',
        sku: 'PRY-ACC-032-BLK-OS',
        options: {
          color: 'Midnight Black',
        },
        stock: 20,
      },
    ],
    tags: ['cardholder', 'leather', 'accessories', 'wallet'],
    collectionSlugs: ['core-archive'],
    badges: [],
    rating: {
      average: 4.7,
      count: 16,
    },
    featured: false,
    createdAt: '2026-06-20T10:00:00.000Z',
  },
  {
    id: 'p-033',
    slug: 'titanium-prism-signet-ring',
    name: 'Titanium Prism Signet Ring',
    category: 'jewelry',
    subcategory: 'rings',
    summary: 'Precision-milled aerospace titanium signet ring with micro-faceted prism top.',
    description:
      'Milled from a single block of aerospace-grade titanium (Ti-6Al-4V). The flat signet face is diamond-cut with micro-facets that catch light with high-intensity laser reflections.',
    details: [
      'Solid Aerospace Grade-5 Titanium',
      'Diamond-cut micro-prismatic face',
      'Comfort-fit curved interior profile',
      'Biocompatible, hypoallergenic, and corrosion-proof',
    ],
    materials: '100% Grade-5 Titanium',
    care: ['Clean with warm soapy water and microfiber cloth'],
    price: 38000,
    media: [
      {
        src: '/images/products/titanium-prism-ring-1.webp',
        alt: 'Titanium Prism Signet Ring, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/titanium-prism-ring-2.webp',
        alt: 'Titanium Prism Signet Ring, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Ring Size',
        kind: 'size',
        values: [
          {
            value: '7',
          },
          {
            value: '8',
          },
          {
            value: '9',
          },
          {
            value: '10',
          },
        ],
      },
      {
        key: 'color',
        label: 'Finish',
        kind: 'color',
        values: [
          {
            value: 'Brushed Titanium',
            swatch: '#7e838e',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-033-v1',
        sku: 'PRY-JWL-033-TIT-7',
        options: {
          size: '7',
          color: 'Brushed Titanium',
        },
        stock: 6,
      },
      {
        id: 'p-033-v2',
        sku: 'PRY-JWL-033-TIT-8',
        options: {
          size: '8',
          color: 'Brushed Titanium',
        },
        stock: 10,
      },
      {
        id: 'p-033-v3',
        sku: 'PRY-JWL-033-TIT-9',
        options: {
          size: '9',
          color: 'Brushed Titanium',
        },
        stock: 8,
      },
      {
        id: 'p-033-v4',
        sku: 'PRY-JWL-033-TIT-10',
        options: {
          size: '10',
          color: 'Brushed Titanium',
        },
        stock: 5,
      },
    ],
    tags: ['ring', 'jewelry', 'titanium', 'signet'],
    collectionSlugs: ['titanium-forms'],
    badges: ['bestseller'],
    rating: {
      average: 4.9,
      count: 22,
    },
    featured: true,
    createdAt: '2026-08-10T14:00:00.000Z',
  },
  {
    id: 'p-034',
    slug: 'spectral-refraction-pendant',
    name: 'Spectral Refraction Pendant',
    category: 'jewelry',
    subcategory: 'necklaces',
    summary: 'Optical crystal glass triangular prism suspended on a 55cm titanium box chain.',
    description:
      'A genuine optical equilateral prism suspended in an architectural titanium cage. When hit by natural sunlight, it projects a vibrant rainbow onto surfaces.',
    details: [
      'Precision-cut K9 optical crystal prism',
      'Surgical titanium wire cage setting',
      '55cm rounded box chain with lobster clasp and 5cm extender',
      'Laser-engraved PRYSM hallmark tag',
    ],
    materials: 'K9 Optical Crystal, Grade-5 Titanium',
    care: ['Avoid hard impact', 'Clean with optical glass solution'],
    price: 45000,
    media: [
      {
        src: '/images/products/spectral-refraction-pendant-1.webp',
        alt: 'Spectral Refraction Pendant, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/spectral-refraction-pendant-2.webp',
        alt: 'Spectral Refraction Pendant, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Chain Finish',
        kind: 'color',
        values: [
          {
            value: 'Polished Titanium',
            swatch: '#8f95a3',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-034-v1',
        sku: 'PRY-JWL-034-POL-OS',
        options: {
          color: 'Polished Titanium',
        },
        stock: 12,
      },
    ],
    tags: ['necklace', 'pendant', 'crystal', 'jewelry'],
    collectionSlugs: ['titanium-forms', 'prism-chroma'],
    badges: ['new'],
    rating: {
      average: 5,
      count: 18,
    },
    featured: false,
    createdAt: '2026-08-25T11:00:00.000Z',
  },
  {
    id: 'p-035',
    slug: 'liquid-titanium-bangle',
    name: 'Liquid Titanium Bangle',
    category: 'jewelry',
    subcategory: 'bracelets',
    summary: 'Twisted Mobius-strip cuff bracelet in seamless hand-polished titanium.',
    description:
      'Designed around the continuous topology of a Mobius strip. The flowing organic contour creates an endless loop of light reflection around the wrist.',
    details: [
      'Seamless Mobius strip continuous geometry',
      'Hand-polished mirror surface finish',
      'Ergonomic oval wrist contour',
      'Flex-tension cuff design fits wrists 15cm–19cm',
    ],
    materials: '100% Grade-5 Titanium',
    care: ['Polish with included jeweler cloth'],
    price: 52000,
    media: [
      {
        src: '/images/products/liquid-titanium-bangle-1.webp',
        alt: 'Liquid Titanium Bangle, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/liquid-titanium-bangle-2.webp',
        alt: 'Liquid Titanium Bangle, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'size',
        label: 'Wrist Size',
        kind: 'size',
        values: [
          {
            value: 'Small (16cm)',
          },
          {
            value: 'Medium (18cm)',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-035-v1',
        sku: 'PRY-JWL-035-SML',
        options: {
          size: 'Small (16cm)',
        },
        stock: 7,
      },
      {
        id: 'p-035-v2',
        sku: 'PRY-JWL-035-MED',
        options: {
          size: 'Medium (18cm)',
        },
        stock: 11,
      },
    ],
    tags: ['bracelet', 'cuff', 'titanium', 'jewelry'],
    collectionSlugs: ['titanium-forms'],
    badges: ['bestseller'],
    rating: {
      average: 4.8,
      count: 15,
    },
    featured: false,
    createdAt: '2026-07-22T15:00:00.000Z',
  },
  {
    id: 'p-036',
    slug: 'prismatic-geometric-studs',
    name: 'Prismatic Geometric Stud Earrings',
    category: 'jewelry',
    subcategory: 'earrings',
    summary: 'Faceted titanium pyramid stud earrings with iridescent PVD coating.',
    description:
      'Micro-sculpted pyramid studs with an iridescent rainbow physical vapor deposition (PVD) finish. Secure friction-post titanium butterfly backs ensure comfortable daily wear.',
    details: [
      'Micro-faceted 6mm pyramid silhouette',
      'Permanent rainbow PVD vacuum coating',
      'Hypoallergenic titanium post and butterfly back',
      'Sold as an identical pair',
    ],
    materials: '100% Titanium with Rainbow PVD Finish',
    care: ['Clean with warm water and soft cloth'],
    price: 29000,
    compareAtPrice: 35000,
    media: [
      {
        src: '/images/products/prismatic-geometric-studs-1.webp',
        alt: 'Prismatic Geometric Stud Earrings, front view',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/prismatic-geometric-studs-2.webp',
        alt: 'Prismatic Geometric Stud Earrings, detail view',
        width: 1200,
        height: 1600,
      },
    ],
    optionGroups: [
      {
        key: 'color',
        label: 'Finish',
        kind: 'color',
        values: [
          {
            value: 'Rainbow Spectrum',
            swatch: '#926bb0',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'p-036-v1',
        sku: 'PRY-JWL-036-RNB-OS',
        options: {
          color: 'Rainbow Spectrum',
        },
        stock: 14,
      },
    ],
    tags: ['earrings', 'studs', 'jewelry', 'sale', 'titanium'],
    collectionSlugs: ['titanium-forms', 'prism-chroma'],
    badges: ['sale'],
    rating: {
      average: 4.7,
      count: 14,
    },
    featured: false,
    createdAt: '2026-07-08T09:00:00.000Z',
  },
]
