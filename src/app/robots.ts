import type { MetadataRoute } from 'next'
import { env } from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  if (env.demoMode) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${env.siteUrl}/sitemap.xml` }
}
