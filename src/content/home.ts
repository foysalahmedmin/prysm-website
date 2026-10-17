import type { HomeContent } from '@/domain'

export const home: HomeContent = {
  hero: {
    eyecatch: 'Autumn / Winter 2026',
    headline: 'Formed from light, worn in motion.',
    body: 'A study in refractive tailoring, spectral organza, and liquid silks.',
    cta: { label: 'Explore the collection', href: '/shop' },
    media: {
      src: '/images/products/spectral-trench-1.webp',
      alt: 'Model in iridescent tailored trench under prismatic illumination',
      width: 1920,
      height: 1080,
    },
  },
  featuredRail: {
    title: 'Curated Radiance',
    subtitle: 'Signature upper-body silhouettes engineered for virtual try-on',
    productSlugs: [
      'spectral-trench-coat',
      'refractive-silk-blazer',
      'liquid-silk-button-down',
      'holographic-mesh-tee',
    ],
  },
  categories: [
    {
      slug: 'clothing',
      title: 'Clothing',
      subtitle: 'Refractive tailoring & lightwear',
      media: {
        src: '/images/products/refractive-blazer-1.webp',
        alt: 'Refractive silk blazer drape',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      subtitle: 'Prismatic leather & optical nylon',
      media: {
        src: '/images/products/glass-clasp-crossbody-1.webp',
        alt: 'Glass-clasp crossbody bag detail',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'jewelry',
      title: 'Jewelry',
      subtitle: 'Titanium & spectral crystal forms',
      media: {
        src: '/images/products/titanium-prism-ring-1.webp',
        alt: 'Titanium prism signet ring reflection',
        width: 800,
        height: 1067,
      },
    },
  ],
  editorial: {
    title: 'The Physics of Liquid Silk',
    body: 'Spun from high-twist mulberry fibres infused with micronised silica, our signature liquid silk moves like running water and refracts ambient sunlight with every gesture.',
    quote: 'Structure without rigidity, radiance without ostentation.',
    media: {
      src: '/images/products/liquid-silk-duster-1.webp',
      alt: 'Macro view of liquid silk drape',
      width: 1200,
      height: 800,
    },
    cta: { label: 'Read the fabric monograph', href: '/journal/the-physics-of-liquid-silk' },
  },
  mirrorTryExplainer: {
    title: 'Virtual Fitting in Real Light',
    subtitle: 'Inspect drape, shoulder structure, and sleeve length through the Mirror Try plugin',
    steps: [
      {
        step: 1,
        title: 'Select Garment',
        description: 'Choose any upper-body tailoring piece, knit, or overshirt.',
      },
      {
        step: 2,
        title: 'Activate Lens',
        description: 'Our calibrated drape engine simulates real fabric weight and collar volume.',
      },
      {
        step: 3,
        title: 'Review Silhouette',
        description: 'Observe fabric movement and fit across neutral body archetypes.',
      },
    ],
    cta: { label: 'Open in Spectral Chamber' },
  },
  journalTeasers: {
    title: 'From the Studio',
    postSlugs: ['the-physics-of-liquid-silk', 'light-absorption-in-modern-textiles'],
  },
  newsletter: {
    title: 'The Prism Dispatch',
    description: 'New capsule drops, technical textile journals, and invitations to private trunk viewings.',
    placeholder: 'Enter your email address',
    cta: 'Join Dispatch',
  },
}
