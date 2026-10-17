import type { Store } from '@/domain'

export const stores: Store[] = [
  {
    id: 's-001',
    name: 'PRYSM SoHo Flagship',
    address: '482 Broome Street',
    city: 'New York, NY 10013',
    country: 'United States',
    phone: '+1 212 555 0192',
    hours: [
      'Monday – Saturday: 11:00 – 19:00',
      'Sunday: 12:00 – 18:00',
      'Private styling consultations available by appointment',
    ],
  },
  {
    id: 's-002',
    name: 'PRYSM Le Marais Atelier',
    address: '28 Rue Vieille-du-Temple',
    city: '75004 Paris',
    country: 'France',
    phone: '+33 1 42 68 55 00',
    hours: [
      'Tuesday – Saturday: 10:30 – 19:30',
      'Sunday: 13:00 – 19:00',
      'Closed Mondays',
    ],
  },
  {
    id: 's-003',
    name: 'PRYSM Aoyama Gallery',
    address: '5-7-22 Minamiaoyama, Minato-ku',
    city: 'Tokyo 107-0062',
    country: 'Japan',
    phone: '+81 3 5468 0199',
    hours: [
      'Daily: 11:00 – 20:00',
      'Virtual Spectral Chamber on 2nd Floor',
    ],
  },
]
