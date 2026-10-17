import type { Review } from '@/domain'

export const reviews: Review[] = [
  {
    id: 'r-001',
    productId: 'p-001',
    author: 'Amira K.',
    rating: 5,
    title: 'Sits exactly as pictured',
    body: 'The shoulder line is sharp and the length is right. The try-on preview matched the real fit.',
    createdAt: '2026-09-30T10:00:00.000Z',
    verified: true,
  },
  {
    id: 'r-002',
    productId: 'p-001',
    author: 'Daniel R.',
    rating: 4,
    title: 'Warm without the bulk',
    body: 'Runs slightly long. I sized down and it works well.',
    createdAt: '2026-10-04T10:00:00.000Z',
    verified: true,
  },
  {
    id: 'r-003',
    productId: 'p-009',
    author: 'Sofia M.',
    rating: 5,
    title: 'Looks better on than in photos',
    body: 'Trying it on first took away the guesswork. The chain length is perfect.',
    createdAt: '2026-10-06T10:00:00.000Z',
    verified: true,
  },
  {
    id: 'r-004',
    productId: 'p-010',
    author: 'Lena P.',
    rating: 5,
    title: 'My everyday earrings',
    body: 'Light, polished and they do not tarnish.',
    createdAt: '2026-08-12T10:00:00.000Z',
    verified: false,
  },
]
