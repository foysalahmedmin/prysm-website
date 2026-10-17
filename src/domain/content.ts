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
  'try-on',
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
  tryOn: z.object({ cta: z.string().min(1) }),
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
