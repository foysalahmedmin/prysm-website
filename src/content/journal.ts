import type { JournalPost } from '@/domain'

export const journal: JournalPost[] = [
  {
    slug: 'how-to-choose-your-size',
    title: 'How to choose your size',
    excerpt: 'Three measurements and one trick for checking fit.',
    publishedAt: '2026-09-15T09:00:00.000Z',
    readingMinutes: 4,
    cover: {
      src: '/images/placeholder.svg',
      alt: 'A tape measure on fabric',
      width: 1200,
      height: 800,
    },
    body: ['Measure your chest, waist and hips.', 'Compare them with the size guide.'],
  },
]
