'use client'

import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Footer } from '@/components/layout/footer'
import { GlassBagDrawer } from '@/components/layout/glass-bag-drawer'
import { GlassNav } from '@/components/layout/glass-nav'
import { GlassSearchOverlay } from '@/components/layout/glass-search-overlay'
import { PageTransition } from '@/lib/motion'
import { useCartStore } from '@/stores/cart-store'

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const lineCount = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0))

  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-ink">
      <AnnouncementBar />
      <GlassNav cartCount={lineCount} />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <GlassSearchOverlay />
      <GlassBagDrawer />
    </div>
  )
}
