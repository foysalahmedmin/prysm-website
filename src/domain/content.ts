import { z } from 'zod'
import { MediaSchema } from './catalog'

export const PAGE_IDS = [
  'home',
  'shop',
  'category',
  'collections',
  'collection',
  'product',
  'search',
  'sale',
  'new-arrivals',
  'lookbook',
  'cart',
  'checkout',
  'checkout-success',
  'wishlist',
  'track-order',
  'login',
  'register',
  'forgot-password',
  'account',
  'orders',
  'order',
  'addresses',
  'profile',
  'about',
  'journal',
  'journal-post',
  'contact',
  'faq',
  'shipping-returns',
  'size-guide',
  'stores',
  'privacy',
  'terms',
] as const

export const PageIdSchema = z.enum(PAGE_IDS)
export type PageId = z.infer<typeof PageIdSchema>

export const PageContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})
export type PageContent = z.infer<typeof PageContentSchema>

const NavLinkSchema = z.object({ label: z.string().min(1), href: z.string().startsWith('/') })
export type NavLink = z.infer<typeof NavLinkSchema>

export const SiteContentSchema = z.object({
  announcement: z.string().nullable(),
  nav: z.array(NavLinkSchema).min(1),
  footer: z.object({
    groups: z.array(z.object({ title: z.string().min(1), links: z.array(NavLinkSchema).min(1) })),
    legal: z.string().min(1),
  }),
  newsletter: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    cta: z.string().min(1),
  }),
})
export type SiteContent = z.infer<typeof SiteContentSchema>

export const FaqItemSchema = z.object({
  id: z.string().min(1),
  group: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
})
export type FaqItem = z.infer<typeof FaqItemSchema>

export const JournalPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.iso.datetime(),
  readingMinutes: z.number().int().positive(),
  cover: MediaSchema,
  body: z.array(z.string().min(1)).min(1),
})
export type JournalPost = z.infer<typeof JournalPostSchema>

export const StoreSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  hours: z.array(z.string().min(1)).min(1),
})
export type Store = z.infer<typeof StoreSchema>

export const HomeContentSchema = z.object({
  hero: z.object({
    eyecatch: z.string().min(1),
    headline: z.string().min(1),
    body: z.string().min(1),
    cta: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
    media: MediaSchema,
  }),
  featuredRail: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    productSlugs: z.array(z.string().min(1)).min(1),
  }),
  categories: z
    .array(
      z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        subtitle: z.string().min(1),
        media: MediaSchema,
      }),
    )
    .min(1),
  editorial: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    quote: z.string().optional(),
    media: MediaSchema,
    cta: z
      .object({
        label: z.string().min(1),
        href: z.string().min(1),
      })
      .optional(),
  }),
  mirrorTryExplainer: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    steps: z
      .array(
        z.object({
          step: z.number().int().positive(),
          title: z.string().min(1),
          description: z.string().min(1),
        }),
      )
      .min(1),
    cta: z.object({
      label: z.string().min(1),
    }),
  }),
  journalTeasers: z.object({
    title: z.string().min(1),
    postSlugs: z.array(z.string().min(1)).min(1),
  }),
  newsletter: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    placeholder: z.string().min(1),
    cta: z.string().min(1),
  }),
})
export type HomeContent = z.infer<typeof HomeContentSchema>

export const LookbookContentSchema = z.object({
  season: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  looks: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        media: MediaSchema,
        productSlugs: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
})
export type LookbookContent = z.infer<typeof LookbookContentSchema>

export const PolicyContentSchema = z.object({
  title: z.string().min(1),
  lastUpdated: z.string().min(1),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        body: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
})
export type PolicyContent = z.infer<typeof PolicyContentSchema>

export const SizeGuideContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tables: z
    .array(
      z.object({
        title: z.string().min(1),
        columns: z.array(z.string().min(1)).min(1),
        rows: z.array(z.array(z.string().min(1)).min(1)).min(1),
      }),
    )
    .min(1),
})
export type SizeGuideContent = z.infer<typeof SizeGuideContentSchema>
