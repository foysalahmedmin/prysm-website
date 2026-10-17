import { describe, expect, it } from 'vitest'
import {
  HomeContentSchema,
  LookbookContentSchema,
  PolicyContentSchema,
  SizeGuideContentSchema,
} from './content'

describe('editorial content schemas', () => {
  it('validates a complete HomeContent object', () => {
    const validHome = {
      hero: {
        eyecatch: 'Autumn / Winter 2026',
        headline: 'Formed from light, worn in motion.',
        body: 'A study in refractive tailoring and spectral silks.',
        cta: { label: 'Explore the collection', href: '/shop' },
        media: { src: '/images/hero.webp', alt: 'Refractive tailoring', width: 1920, height: 1080 },
      },
      featuredRail: {
        title: 'Curated Selection',
        subtitle: 'Key pieces engineered for virtual fitting',
        productSlugs: ['spectral-silk-shirt', 'refractive-trench'],
      },
      categories: [
        {
          slug: 'clothing',
          title: 'Clothing',
          subtitle: 'Upper-body focus',
          media: { src: '/images/cat-clothing.webp', alt: 'Clothing category', width: 800, height: 1000 },
        },
      ],
      editorial: {
        title: 'The Optics of Liquid Silk',
        body: 'Textiles woven to refract ambient light across the collarbone and shoulders.',
        quote: 'Structure without rigidity.',
        media: { src: '/images/editorial.webp', alt: 'Silk weaving close-up', width: 1200, height: 800 },
        cta: { label: 'Read the monograph', href: '/journal/optics-of-liquid-silk' },
      },
      mirrorTryExplainer: {
        title: 'Interactive Fitting',
        subtitle: 'Experience precise upper-body drape before acquisition',
        steps: [
          { step: 1, title: 'Choose Garment', description: 'Select any jacket, shirt, or knit' },
          { step: 2, title: 'Activate Lens', description: 'Real-time drape calculation' },
          { step: 3, title: 'Inspect Silhouette', description: 'Examine fit across movement' },
        ],
        cta: { label: 'Try in the Spectral Chamber' },
      },
      journalTeasers: {
        title: 'From the Studio',
        postSlugs: ['light-absorption', 'physics-of-silk'],
      },
      newsletter: {
        title: 'Private Dispatch',
        description: 'New releases, fabric studies, and private trunk showings.',
        placeholder: 'Enter your email',
        cta: 'Subscribe',
      },
    }

    expect(HomeContentSchema.parse(validHome).hero.headline).toBe('Formed from light, worn in motion.')
  })

  it('validates a LookbookContent object', () => {
    const validLookbook = {
      season: 'Autumn / Winter 2026',
      title: 'Spectral Lightwear',
      description: 'A study in reflective drape and structured volume.',
      looks: [
        {
          id: 'look-01',
          title: 'Look 01: Refractive Trench & Liquid Pant',
          description: 'Layered technical organza over fluid liquid silk.',
          media: { src: '/images/look-01.webp', alt: 'Model wearing trench', width: 1200, height: 1600 },
          productSlugs: ['refractive-trench', 'liquid-pant'],
        },
      ],
    }

    expect(LookbookContentSchema.parse(validLookbook).looks).toHaveLength(1)
  })

  it('validates PolicyContent and SizeGuideContent', () => {
    const policy = {
      title: 'Shipping & Delivery',
      lastUpdated: '2026-10-17',
      sections: [
        {
          heading: 'Standard Dispatch',
          body: ['Orders are prepared within 24 hours from our climate-controlled ateliers.'],
        },
      ],
    }
    expect(PolicyContentSchema.parse(policy).sections).toHaveLength(1)

    const sizeGuide = {
      title: 'Garment Sizing Matrix',
      description: 'Measurements taken flat in centimetres.',
      tables: [
        {
          title: 'Upper-Body (Jackets & Shirts)',
          columns: ['Size', 'Chest (cm)', 'Shoulder (cm)', 'Sleeve (cm)'],
          rows: [
            ['S', '96', '44', '63'],
            ['M', '102', '46', '65'],
            ['L', '108', '48', '67'],
          ],
        },
      ],
    }
    expect(SizeGuideContentSchema.parse(sizeGuide).tables[0].columns).toHaveLength(4)
  })
})
