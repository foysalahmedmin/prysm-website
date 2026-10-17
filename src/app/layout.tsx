import type { Metadata } from 'next'
import './globals.css'
import { brand } from '@/config/brand'
import { env } from '@/config/env'
import { MirrorTryHost } from '@/integration/mirror-try'
import { StoreHydrator } from '@/stores/hydration'

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s — ${brand.name}` },
  description: brand.description,
  robots: env.demoMode ? { index: false, follow: false } : undefined,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <MirrorTryHost>
          <StoreHydrator />
          {children}
        </MirrorTryHost>
      </body>
    </html>
  )
}
