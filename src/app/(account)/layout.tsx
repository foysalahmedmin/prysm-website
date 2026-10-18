import { Suspense } from 'react'
import { AccountNav } from '@/components/layout/account-nav'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Footer } from '@/components/layout/footer'
import { GlassBagDrawer } from '@/components/layout/glass-bag-drawer'
import { GlassNav } from '@/components/layout/glass-nav'
import { GlassSearchOverlay } from '@/components/layout/glass-search-overlay'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <AnnouncementBar />
      <GlassNav />
      <main
        id="main-content"
        tabIndex={-1}
        className="page-container flex-1 pt-10 pb-20 focus:outline-none md:pt-14"
      >
        <p className="mb-6 font-display text-lg text-ink-soft">My account</p>
        <Suspense
          fallback={<div className="mb-8 h-11 max-w-md animate-pulse border-b border-ink/10" />}
        >
          <AccountNav />
        </Suspense>
        {children}
      </main>
      <Footer />
      <GlassSearchOverlay />
      <GlassBagDrawer />
    </div>
  )
}
