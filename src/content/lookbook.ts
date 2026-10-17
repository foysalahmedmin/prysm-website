import type { LookbookContent } from '@/domain'

export const lookbook: LookbookContent = {
  season: 'Autumn / Winter 2026',
  title: 'Refractive Solstice',
  description: 'Explorations in optical volume, liquid textiles, and spectral tailoring.',
  looks: [
    {
      id: 'look-01',
      title: 'Look 01 — Spectral Trench & Tailored Pant',
      description:
        'The Spectral Trench Coat layered over fluid tailored trousers in refractive ink.',
      media: {
        src: '/images/lookbook/look-01.webp',
        alt: 'The Spectral Trench Coat over tailored trousers, laid out on a prismatic backdrop',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['spectral-trench-coat', 'refractive-tailored-trousers'],
    },
    {
      id: 'look-02',
      title: 'Look 02 — Double-Breasted Refractive Blazer',
      description: 'Structured silk-organza tailoring paired with iridescent column skirt.',
      media: {
        src: '/images/lookbook/look-02.webp',
        alt: 'The Refractive Double-Breasted Blazer with the iridescent pleated column skirt, laid out on a prismatic backdrop',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['refractive-double-breasted-blazer', 'iridescent-pleated-column-skirt'],
    },
    {
      id: 'look-03',
      title: 'Look 03 — Liquid Silk Duster & Titanium Signet',
      description:
        'Unstructured liquid silk duster accented with hand-turned titanium prism signet ring.',
      media: {
        src: '/images/lookbook/look-03.webp',
        alt: 'The Liquid Silk Duster beside the titanium prism signet ring, laid out on a prismatic backdrop',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['liquid-silk-duster', 'titanium-prism-signet-ring'],
    },
  ],
}
