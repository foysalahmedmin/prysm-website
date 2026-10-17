import type { Metadata } from 'next'
import { Button, TextField, Tabs } from '@/components/ui'
import { GlassNav, Rail } from '@/components/layout'
import { LightField } from '@/lib/motion'
import {
  ArrowRight,
  ShoppingBag,
  Check,
  X,
  Heart,
  Minus,
  Plus,
  MagnifyingGlass,
  Faders,
  Sparkle,
} from '@/components/icons'
import {
  PointerAngleDemo,
  SelectionControlsDemo,
  OverlayDemos,
  MotionReplayDemo,
} from './interactive-demos'
import { CommerceDemos, MirrorTryDemo } from './commerce-demos'

export const metadata: Metadata = {
  title: 'Design System — PRYSM',
  description: 'Living style guide and design system specification for PRYSM.',
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl space-y-24 px-4 pb-32 sm:px-8">
      {/* Light Field Background */}
      <LightField />

      {/* Header */}
      <header className="border-b border-[var(--color-line)] pt-16 pb-8">
        <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs tracking-wider text-[var(--color-ink-soft)] uppercase">
          <Sparkle size={14} className="text-[var(--color-ink)]" />
          PRYSM Design System · Glassmorphism
        </div>
        <h1 className="text-4xl font-[var(--font-display)] font-light tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Design system
        </h1>
        <p className="mt-3 max-w-2xl text-lg font-light text-[var(--color-ink-soft)]">
          Optical glassmorphism founded on refraction, translucent depth layers, precision edge
          spectra, and fluid micro-interactions.
        </p>
      </header>

      {/* 1. Colour */}
      <section data-ds-section="colour" aria-labelledby="ds-colour" className="space-y-6">
        <div>
          <h2 id="ds-colour" className="text-2xl font-normal text-[var(--color-ink)]">
            Colour
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Carefully calibrated tokens ensuring contrast standards (ink: 16.5:1 on canvas, 13.5:1
            on glass-strong).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {[
            { name: '--color-canvas', hex: '#FAF9F6', label: 'Canvas', contrast: '16.5:1' },
            { name: '--color-surface', hex: '#FFFFFF', label: 'Surface', contrast: '16.8:1' },
            { name: '--color-ink', hex: '#1F2421', label: 'Ink (Primary)', contrast: '16.5:1' },
            { name: '--color-ink-soft', hex: '#404E4D', label: 'Ink Soft', contrast: '8.4:1' },
            { name: '--color-ink-faint', hex: '#6B7F7D', label: 'Ink Faint', contrast: '4.6:1' },
            { name: '--color-line', hex: '#E5E2DC', label: 'Border Line', contrast: 'Hairline' },
            { name: '--color-accent', hex: '#A85751', label: 'Accent Rose', contrast: '4.8:1' },
            { name: '--color-focus', hex: '#0055FF', label: 'Focus Ring', contrast: '4.9:1' },
            { name: '--light-rose', hex: '#FFDCE6', label: 'Light Rose', contrast: 'Blob' },
            { name: '--light-ice', hex: '#DCF2FF', label: 'Light Ice', contrast: 'Blob' },
            { name: '--light-citrine', hex: '#FFF5D2', label: 'Light Citrine', contrast: 'Blob' },
            { name: '--light-lavender', hex: '#EBE4FF', label: 'Light Lavender', contrast: 'Blob' },
          ].map((token) => (
            <div key={token.name} className="glass space-y-2 rounded-xl p-3">
              <div
                className="h-14 rounded-lg border border-[var(--color-line)] shadow-inner"
                style={{ backgroundColor: token.hex }}
              />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[var(--color-ink)]">{token.label}</div>
                <div className="truncate font-mono text-[10px] text-[var(--color-ink-soft)]">
                  {token.name}
                </div>
                <div className="text-[10px] text-[var(--color-ink-faint)]">{token.contrast}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography */}
      <section data-ds-section="typography" aria-labelledby="ds-typography" className="space-y-6">
        <div>
          <h2 id="ds-typography" className="text-2xl font-normal text-[var(--color-ink)]">
            Typography
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Fraunces display typography with Plus Jakarta Sans body and JetBrains Mono data
            numerals.
          </p>
        </div>

        <div className="glass space-y-6 divide-y divide-[var(--color-line)] rounded-2xl p-6">
          <div className="pt-2">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Display · 48px Light
            </span>
            <div className="mt-1 text-5xl font-[var(--font-display)] font-light text-[var(--color-ink)]">
              Prismatic Precision
            </div>
          </div>
          <div className="pt-4">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Heading 1 · 36px
            </span>
            <div className="mt-1 text-4xl font-light text-[var(--color-ink)]">
              Refractive Silhouettes
            </div>
          </div>
          <div className="pt-4">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Heading 2 · 24px
            </span>
            <div className="mt-1 text-2xl font-normal text-[var(--color-ink)]">
              Light Absorption & Transparency
            </div>
          </div>
          <div className="pt-4">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Heading 3 · 18px Medium
            </span>
            <div className="mt-1 text-lg font-medium text-[var(--color-ink)]">
              Component Specification Guidelines
            </div>
          </div>
          <div className="pt-4">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Body · 16px Regular
            </span>
            <p className="mt-1 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)]">
              Every garment in our catalog is engineered with optically clear materials that respond
              dynamically to ambient illumination.
            </p>
          </div>
          <div className="pt-4">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Mono Numeral · 14px
            </span>
            <div className="mt-1 font-mono text-sm text-[var(--color-ink)]">
              SKU: PRY-2026-X99 · LATENCY: 12ms · PRICE: $420.00
            </div>
          </div>
        </div>
      </section>

      {/* 3. Surfaces */}
      <section data-ds-section="surfaces" aria-labelledby="ds-surfaces" className="space-y-6">
        <div>
          <h2 id="ds-surfaces" className="text-2xl font-normal text-[var(--color-ink)]">
            Surfaces
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Backdrop filter glass surfaces with hairline border lines and spectral refraction.
          </p>
        </div>

        <div className="light-field" data-ds-surface="light-field" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="glass glass-strong space-y-2 rounded-2xl p-6" data-ds-surface="glass">
            <h3 className="text-base font-medium text-[var(--color-ink)]">Glass (Standard)</h3>
            <p className="text-sm text-[var(--color-ink-soft)]">
              46% opacity fill with 24px blur and hairline border. Designed for product cards and
              secondary surfaces.
            </p>
          </div>

          <div
            className="glass glass-strong space-y-2 rounded-2xl p-6"
            data-ds-surface="glass-strong"
          >
            <h3 className="text-base font-medium text-[var(--color-ink)]">Glass Strong</h3>
            <p className="text-sm text-[var(--color-ink-soft)]">
              78% opacity fill with 32px blur. Used for overlays, drawers, floating navigation, and
              text readability.
            </p>
          </div>

          <div
            className="glass-strong prismatic-edge space-y-2 rounded-2xl p-6"
            data-ds-surface="prismatic-edge"
          >
            <h3 className="text-base font-medium text-[var(--color-ink)]">Prismatic Edge</h3>
            <p className="text-sm text-[var(--color-ink-soft)]">
              Refractive spectral edge highlighting corners with conic gradient refraction.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Buttons and links */}
      <section data-ds-section="buttons" aria-labelledby="ds-buttons" className="space-y-6">
        <div>
          <h2 id="ds-buttons" className="text-2xl font-normal text-[var(--color-ink)]">
            Buttons and links
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Pill-shaped interactive elements across sizes and functional states.
          </p>
        </div>

        <div className="glass space-y-6 rounded-2xl p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Pill</Button>
            <Button variant="secondary">Secondary Pill</Button>
            <Button variant="ghost">Ghost Action</Button>
            <Button variant="secondary" className="glass">
              Glass Pill
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-4">
            <Button size="sm">Small (36px)</Button>
            <Button size="md">Medium (44px)</Button>
            <Button size="lg">Large (52px)</Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-4">
            <Button disabled>Disabled Pill</Button>
            <Button loading>Loading State</Button>
            <Button variant="primary" className="focus-visible:ring-2">
              Focused Pill
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Forms */}
      <section data-ds-section="forms" aria-labelledby="ds-forms" className="space-y-6">
        <div>
          <h2 id="ds-forms" className="text-2xl font-normal text-[var(--color-ink)]">
            Forms
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Accessible inputs with glass backgrounds and unambiguous aria validation attributes.
          </p>
        </div>

        <div className="glass grid grid-cols-1 gap-6 rounded-2xl p-6 md:grid-cols-3">
          <TextField
            label="Email Address"
            placeholder="you@domain.com"
            hint="We only send order confirmation updates."
          />
          <TextField
            label="Postal Code"
            defaultValue="ABC-99"
            error="Please enter a valid 5-digit postal code."
          />
          <TextField
            label="Account Reference"
            defaultValue="PRY-98210"
            disabled
            hint="Managed by administrative system."
          />
        </div>
      </section>

      {/* 6. Selection controls */}
      <section data-ds-section="selection" aria-labelledby="ds-selection" className="space-y-6">
        <div>
          <h2 id="ds-selection" className="text-2xl font-normal text-[var(--color-ink)]">
            Selection controls
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Rounded size squares with unavailable diagonal strikethroughs and numeric steppers.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <SelectionControlsDemo />
        </div>
      </section>

      {/* 7. Navigation */}
      <section data-ds-section="navigation" aria-labelledby="ds-navigation" className="space-y-6">
        <div>
          <h2 id="ds-navigation" className="text-2xl font-normal text-[var(--color-ink)]">
            Navigation
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Floating glass nav bar, content tabs, and horizontally swipeable rails.
          </p>
        </div>

        <div className="space-y-6">
          <div className="glass space-y-4 rounded-2xl p-6">
            <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
              Floating Pill Nav (GlassNav)
            </h3>
            <GlassNav
              brandName="PRYSM"
              links={[
                { href: '/shop', label: 'Shop' },
                { href: '/collections', label: 'Collections' },
                { href: '/journal', label: 'Journal' },
              ]}
              cartLabel="Bag"
              cartCount={2}
            />
          </div>

          <div className="glass space-y-4 rounded-2xl p-6">
            <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
              Product Specification Tabs
            </h3>
            <Tabs
              label="Product Specifications"
              items={[
                {
                  value: 'details',
                  label: 'Garment Details',
                  content:
                    'Engineered with double-faced Japanese membrane nylon and refractive taped seams.',
                },
                {
                  value: 'care',
                  label: 'Care Instructions',
                  content: 'Spot clean only with microfiber cloth. Avoid high heat or steam iron.',
                },
                {
                  value: 'shipping',
                  label: 'Complimentary Shipping',
                  content: 'Delivered in carbon-neutral glassine packaging within 2 business days.',
                },
              ]}
            />
          </div>

          <div className="glass space-y-4 rounded-2xl p-6">
            <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
              Horizontal Rail
            </h3>
            <Rail label="Curated for you" previousLabel="Previous items" nextLabel="Next items">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="glass flex h-32 w-48 items-center justify-center rounded-xl font-mono text-sm text-[var(--color-ink-soft)]"
                >
                  Rail Item {idx}
                </div>
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* 8. Overlays */}
      <section data-ds-section="overlays" aria-labelledby="ds-overlays" className="space-y-6">
        <div>
          <h2 id="ds-overlays" className="text-2xl font-normal text-[var(--color-ink)]">
            Overlays
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Focus-trapped modals and slide drawers with glass scrims and 8px blur-in transitions.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <OverlayDemos />
        </div>
      </section>

      {/* 9. Feedback */}
      <section data-ds-section="feedback" aria-labelledby="ds-feedback" className="space-y-6">
        <div>
          <h2 id="ds-feedback" className="text-2xl font-normal text-[var(--color-ink)]">
            Feedback
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Glass toast notifications, soft white shimmers, and informative empty/error states.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Toast Pill */}
          <div className="glass flex flex-col justify-between space-y-4 rounded-2xl p-5">
            <div>
              <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
                Toast Notification
              </span>
              <div className="glass-strong mt-3 inline-flex items-center gap-3 rounded-full border border-[var(--color-line)] px-4 py-2.5 shadow-lg">
                <Check size={16} className="text-emerald-600" />
                <span className="text-sm font-medium text-[var(--color-ink)]">
                  Added to shopping bag
                </span>
              </div>
            </div>
            <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-indigo-400" />
          </div>

          {/* Skeleton Shimmer */}
          <div className="glass space-y-3 rounded-2xl p-5">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
              Skeleton Shimmer
            </span>
            <div className="h-28 animate-pulse rounded-xl bg-white/40" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/40" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/40" />
          </div>

          {/* Error Banner */}
          <div className="glass space-y-2 rounded-2xl border-l-4 border-red-600 p-5">
            <span className="font-mono text-xs font-semibold text-red-700 uppercase">
              Error State
            </span>
            <h4 className="text-sm font-medium text-[var(--color-ink)]">Payment Session Expired</h4>
            <p className="text-xs text-[var(--color-ink-soft)]">
              Your cryptographic checkout authorization timed out. Please refresh to continue.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Commerce */}
      <section data-ds-section="commerce" aria-labelledby="ds-commerce">
        <div className="mb-6">
          <h2 id="ds-commerce" className="text-2xl font-normal text-[var(--color-ink)]">
            Commerce
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Full component suite covering product discovery, cart adjustments, and customer
            feedback.
          </p>
        </div>
        <CommerceDemos />
      </section>

      {/* 11. Mirror Try */}
      <section data-ds-section="mirror-try" aria-labelledby="ds-mirror-try" className="space-y-6">
        <div>
          <h2 id="ds-mirror-try" className="text-2xl font-normal text-[var(--color-ink)]">
            Mirror Try
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            &ldquo;The Lens&rdquo; theme trigger: translucent glass chip with hairline border and
            camera sparkle indicator.
          </p>
        </div>
        <MirrorTryDemo />
      </section>

      {/* 12. Motion */}
      <section data-ds-section="motion" aria-labelledby="ds-motion" className="space-y-6">
        <div>
          <h2 id="ds-motion" className="text-2xl font-normal text-[var(--color-ink)]">
            Motion
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Dynamic light field drift on a 26s loop, pointer-tracking prismatic angles, and
            reduced-motion resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PointerAngleDemo />
          <MotionReplayDemo />
        </div>
      </section>

      {/* 13. Icons */}
      <section data-ds-section="icons" aria-labelledby="ds-icons" className="space-y-6">
        <div>
          <h2 id="ds-icons" className="text-2xl font-normal text-[var(--color-ink)]">
            Icons
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Light weight Phosphor icons calibrated with 1.5px stroke weight.
          </p>
        </div>

        <div className="glass grid grid-cols-3 gap-6 rounded-2xl p-6 text-center sm:grid-cols-4 md:grid-cols-6">
          {[
            { name: 'ArrowRight', comp: <ArrowRight size={24} /> },
            { name: 'ShoppingBag', comp: <ShoppingBag size={24} /> },
            { name: 'Check', comp: <Check size={24} /> },
            { name: 'Close', comp: <X size={24} /> },
            { name: 'Heart', comp: <Heart size={24} /> },
            { name: 'Minus', comp: <Minus size={24} /> },
            { name: 'Plus', comp: <Plus size={24} /> },
            { name: 'Search', comp: <MagnifyingGlass size={24} /> },
            { name: 'Sliders', comp: <Faders size={24} /> },
            { name: 'Sparkle', comp: <Sparkle size={24} /> },
          ].map((icon) => (
            <div
              key={icon.name}
              className="flex flex-col items-center justify-center rounded-xl p-3 transition-colors hover:bg-white/30"
            >
              <div className="mb-2 text-[var(--color-ink)]">{icon.comp}</div>
              <span className="font-mono text-xs text-[var(--color-ink-soft)]">{icon.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
