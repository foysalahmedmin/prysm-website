import type { HomeContent } from '@/domain'

export const home: HomeContent = {
  hero: {
    eyecatch: 'Autumn / Winter 2026',
    headline: 'Formed from light, worn in motion.',
    body: 'A study in refractive tailoring, spectral organza, and liquid silks.',
    cta: { label: 'Explore the collection', href: '/shop' },
    media: {
      src: '/images/home/hero.webp',
      alt: 'Three tailored coats, a blazer, a trench and a duster, laid out on a pale prismatic backdrop',
      width: 1920,
      height: 1080,
    },
  },
  featuredRail: {
    title: 'Signature pieces',
    subtitle: 'Our most-loved upper-body pieces, ready to try on.',
    productSlugs: [
      'spectral-trench-coat',
      'refractive-double-breasted-blazer',
      'spectral-silk-button-down',
      'holographic-mesh-tee',
    ],
  },
  categories: [
    {
      slug: 'clothing',
      title: 'Clothing',
      subtitle: 'Refractive tailoring & lightwear',
      media: {
        src: '/images/home/category-clothing.webp',
        alt: 'A double-breasted blazer in deep ink on a soft spectrum backdrop',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      subtitle: 'Prismatic leather & optical nylon',
      media: {
        src: '/images/home/category-accessories.webp',
        alt: 'A glass-clasp crossbody bag above a technical belt on a soft spectrum backdrop',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'jewelry',
      title: 'Jewelry',
      subtitle: 'Titanium & spectral crystal forms',
      media: {
        src: '/images/home/category-jewelry.webp',
        alt: 'A titanium signet ring above a refraction pendant on a soft spectrum backdrop',
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
      src: '/images/home/editorial.webp',
      alt: 'Close view of the neck and shoulders of a sand-coloured silk duster',
      width: 1200,
      height: 800,
    },
    cta: { label: 'Read the story', href: '/journal/the-physics-of-liquid-silk' },
  },
  mirrorTryExplainer: {
    title: 'Virtual Fitting in Real Light',
    subtitle:
      'Try a piece on with your camera before you order. Mirror Try measures you and shows the fit live.',
    steps: [
      {
        step: 1,
        title: 'Choose Try on',
        description: 'Every top, knit, coat and trouser has a Try on button.',
      },
      {
        step: 2,
        title: 'Turn on your camera',
        description:
          'Mirror Try reads your size in a few seconds, or you type your measurements in.',
      },
      {
        step: 3,
        title: 'See it on you',
        description: 'Move and turn in the light, then save the trial to check it later.',
      },
    ],
    cta: { label: 'Open Mirror Try' },
  },
  journalTeasers: {
    title: 'From the Studio',
    postSlugs: ['the-physics-of-liquid-silk', 'light-absorption-in-modern-textiles'],
  },
  newsletter: {
    title: 'Stay in the light',
    description:
      'New capsule drops, technical textile journals, and invitations to private trunk viewings.',
    placeholder: 'Email address',
    cta: 'Subscribe',
  },
}
