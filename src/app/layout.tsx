import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist_Mono, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { SkipLink } from '@/components/layout/skip-link'
import { ToastContainer } from '@/components/ui/toast-container'
import { brand } from '@/config/brand'
import { env } from '@/config/env'
import { MirrorTryHost } from '@/integration/mirror-try'
import { StoreHydrator } from '@/stores/hydration'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
})
const text = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#e9eef4',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s — ${brand.name}` },
  description: brand.description,
  robots: env.demoMode ? { index: false, follow: false } : undefined,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: env.siteUrl,
    description: brand.description,
  }

  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-canvas font-text text-ink antialiased selection:bg-accent/30 selection:text-ink">
        <SkipLink />
        <MirrorTryHost>
          <StoreHydrator />
          {children}
          <ToastContainer />
        </MirrorTryHost>
      </body>
    </html>
  )
}
