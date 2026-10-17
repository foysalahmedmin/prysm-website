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
        className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 focus:outline-none"
      >
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            Account & Preferences
          </h2>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Manage orders, delivery addresses, and personal security.
          </p>
        </div>
        <Suspense
          fallback={<div className="glass mb-8 h-12 max-w-md animate-pulse rounded-full" />}
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
