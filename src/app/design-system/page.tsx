import type { Metadata } from 'next'
import { GlassNav, Rail } from '@/components/layout'
import { Button, Tabs, TextField } from '@/components/ui'
import {
  ArrowRight,
  Check,
  Faders,
  Heart,
  MagnifyingGlass,
  Minus,
  Plus,
  ShoppingBag,
  Sparkle,
  X,
} from '@/components/icons'
import { contrastRatio } from '@/lib/a11y/contrast'
import { LightField } from '@/lib/motion'
import { CommerceDemos, MirrorTryDemo } from './commerce-demos'
import { tokens } from './ds-tokens'
import {
  MotionReplayDemo,
  OverlayDemos,
  RevealDemo,
  SelectionControlsDemo,
} from './interactive-demos'

export const metadata: Metadata = {
  title: 'Design System — PRYSM',
  description: 'Living style guide for PRYSM.',
  robots: { index: false, follow: false },
}

/** Name, role and what it is measured against. Hex values and ratios are read from tokens.css. */
const COLOURS: { token: string; label: string; role: string; against?: string }[] = [
  { token: '--color-canvas', label: 'Canvas', role: 'Page background' },
  { token: '--color-surface', label: 'Surface', role: 'Cards, fields, panels' },
  {
    token: '--color-ink',
    label: 'Ink',
    role: 'Text and primary buttons',
    against: '--color-canvas',
  },
  {
    token: '--color-ink-soft',
    label: 'Ink soft',
    role: 'Secondary text',
    against: '--color-canvas',
  },
  {
    token: '--color-ink-faint',
    label: 'Ink faint',
    role: 'Captions, placeholders',
    against: '--color-canvas',
  },
  {
    token: '--color-border-strong',
    label: 'Border strong',
    role: 'Field boundary',
    against: '--color-surface',
  },
  { token: '--color-accent', label: 'Accent', role: 'Selection tint, never text' },
  { token: '--color-focus', label: 'Focus', role: 'Focus ring', against: '--color-canvas' },
  {
    token: '--color-danger',
    label: 'Danger',
    role: 'Errors and sale price',
    against: '--color-canvas',
  },
  {
    token: '--color-success',
    label: 'Success',
    role: 'In stock, confirmed',
    against: '--color-canvas',
  },
]

const RADII = ['--radius-xs', '--radius-sm', '--radius-md', '--radius-lg', '--radius-xl']

const heading = 'font-display text-2xl font-medium tracking-tight text-ink'
const lede = 'mt-1 text-sm text-ink-soft'
const panel = 'border border-ink/10 bg-surface p-6'
const caption = 'text-xs text-ink-soft'

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section data-ds-section={id} aria-labelledby={`ds-${id}`} className="space-y-6">
      <div>
        <h2 id={`ds-${id}`} className={heading}>
          {title}
        </h2>
        <p className={lede}>{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl space-y-20 px-4 pb-32 sm:px-8">
      <LightField />

      <header className="border-b border-ink/10 pt-16 pb-8">
        <p className="text-sm text-ink-soft">PRYSM · glass and hairline</p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Design system
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Black, white and grey. One small radius, hairlines instead of shadows, and a frosted pane
          for anything that sits over a photograph.
        </p>
      </header>

      <Section
        id="colour"
        title="Colour"
        description="Black and white only. Red and green appear for errors, sale prices and confirmations, nowhere else."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {COLOURS.map((item) => {
            const hex = tokens[item.token]!
            const ratio = item.against
              ? contrastRatio(hex, tokens[item.against]!).toFixed(1)
              : undefined
            return (
              <div key={item.token} className={`${panel} space-y-3 p-3`}>
                <div className="h-14 border border-ink/10" style={{ backgroundColor: hex }} />
                <div>
                  <p className="text-sm font-medium text-ink">{item.label}</p>
                  <p className="font-mono text-[11px] text-ink-soft">{item.token}</p>
                  <p className="font-mono text-[11px] text-ink-soft">
                    {hex}
                    {ratio ? ` · ${ratio}:1` : ''}
                  </p>
                  <p className={`${caption} mt-1`}>{item.role}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Bricolage Grotesque for display, Hanken Grotesk for text, Geist Mono for codes and figures. Sentence case, medium weight, no uppercase."
      >
        <div className={`${panel} divide-y divide-ink/10`}>
          {[
            [
              'Display · 60px medium',
              'font-display text-5xl font-medium tracking-tight md:text-6xl',
              'Formed from light',
            ],
            [
              'Page title · 48px medium',
              'font-display text-4xl font-medium tracking-tight md:text-5xl',
              'Shop all',
            ],
            [
              'Section title · 36px medium',
              'font-display text-3xl font-medium tracking-tight md:text-4xl',
              'Signature pieces',
            ],
            [
              'Card title · 20px medium',
              'font-display text-xl font-medium',
              'Spectral Silk Button-Down',
            ],
            [
              'Body · 16px regular',
              'text-base leading-relaxed text-ink-soft',
              'Cut from compact silk, lined in cupro, finished with taped seams.',
            ],
            ['Small · 14px regular', 'text-sm text-ink-soft', 'Free shipping on orders over $150.'],
          ].map(([label, cls, sample]) => (
            <div key={label} className="py-4 first:pt-0 last:pb-0">
              <p className={`${caption} mb-1`}>{label}</p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
          <div className="pt-4">
            <p className={`${caption} mb-1`}>Mono · 14px</p>
            <p className="font-mono text-sm text-ink">SKU PRY-2026-X99 · $420.00</p>
          </div>
        </div>
      </Section>

      <Section
        id="surfaces"
        title="Surfaces"
        description="A hairline panel for content, frosted glass for anything over a photograph. No drop shadows."
      >
        <div className="light-field" data-ds-surface="light-field" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="relative isolate overflow-hidden border border-ink/10 p-6 md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/hero.webp"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-ink/10 bg-surface p-6" data-ds-surface="panel">
              <h3 className="font-display text-lg font-medium text-ink">Hairline panel</h3>
              <p className="mt-2 text-sm text-ink-soft">
                White, 1px line at 10% ink. Product cards, forms, summaries.
              </p>
            </div>
            <div className="glass p-6" data-ds-surface="glass">
              <h3 className="font-display text-lg font-medium text-ink">Glass</h3>
              <p className="mt-2 text-sm text-ink-soft">
                62% white, 18px blur, hairline. Chrome that floats: navigation, chips.
              </p>
            </div>
            <div className="glass glass-strong p-6" data-ds-surface="glass-strong">
              <h3 className="font-display text-lg font-medium text-ink">Glass strong</h3>
              <p className="mt-2 text-sm text-ink-soft">
                86% white. The only fill allowed to carry text over a photograph.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          {RADII.map((token) => (
            <div key={token} className={`${panel} p-3`}>
              <div
                className="h-12 border border-ink bg-canvas"
                style={{ borderRadius: `var(${token})` }}
              />
              <p className="mt-2 font-mono text-[11px] text-ink-soft">{token}</p>
              <p className="font-mono text-[11px] text-ink-soft">{tokens[token]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="buttons"
        title="Buttons and links"
        description="A 4px radius, three heights, and solid ink, glass or text only."
      >
        <div className={`${panel} space-y-6`}>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-ink/10 pt-4">
            <Button size="sm">Small, 44px</Button>
            <Button size="md">Medium, 48px</Button>
            <Button size="lg">Large, 56px</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-ink/10 pt-4">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <a
              href="#ds-buttons"
              className="text-sm font-medium text-ink underline underline-offset-4"
            >
              Text link
            </a>
          </div>
        </div>
      </Section>

      <Section
        id="forms"
        title="Forms"
        description="A white field with a 25% ink border that darkens on hover and on focus. Hints and errors are announced with the field."
      >
        <div className={`${panel} grid gap-6 md:grid-cols-3`}>
          <TextField
            label="Email address"
            placeholder="you@example.com"
            hint="We only send order confirmations."
          />
          <TextField
            label="Postal code"
            defaultValue="ABC-99"
            error="Enter a valid 5-digit postal code."
          />
          <TextField label="Order number" defaultValue="PRY-98210" disabled hint="Set by us." />
        </div>
      </Section>

      <Section
        id="selection"
        title="Selection controls"
        description="Size keys with a struck-through unavailable state, and a quantity stepper."
      >
        <div className={panel}>
          <SelectionControlsDemo />
        </div>
      </Section>

      <Section
        id="navigation"
        title="Navigation"
        description="A flat glass bar, filled-ink tabs and a rail with arrow buttons."
      >
        <div className="space-y-6">
          <div className={`${panel} space-y-4`}>
            <h3 className={caption}>Header bar</h3>
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
          <div className={`${panel} space-y-4`}>
            <h3 className={caption}>Tabs</h3>
            <Tabs
              label="Product information"
              items={[
                {
                  value: 'details',
                  label: 'Details',
                  content: 'Double-faced technical nylon with taped seams and a concealed placket.',
                },
                {
                  value: 'care',
                  label: 'Care',
                  content: 'Spot clean with a microfibre cloth. Do not tumble dry.',
                },
                {
                  value: 'shipping',
                  label: 'Shipping',
                  content: 'Ships in recycled packaging within two business days.',
                },
              ]}
            />
          </div>
          <div className={`${panel} space-y-4`}>
            <h3 className={caption}>Rail</h3>
            <Rail label="Recently viewed" previousLabel="Previous items" nextLabel="Next items">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="flex h-32 w-48 shrink-0 items-center justify-center border border-ink/10 bg-canvas font-mono text-sm text-ink-soft"
                >
                  Item {idx}
                </div>
              ))}
            </Rail>
          </div>
        </div>
      </Section>

      <Section
        id="overlays"
        title="Overlays"
        description="A centred dialog and a right-hand drawer. Focus is trapped and Escape closes them."
      >
        <div className={panel}>
          <OverlayDemos />
        </div>
      </Section>

      <Section
        id="feedback"
        title="Feedback"
        description="Toasts, loading skeletons and error messages. Colour is only used for state."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className={`${panel} space-y-3`}>
            <p className={caption}>Toast</p>
            <div className="glass glass-strong inline-flex items-center gap-3 px-4 py-2.5 text-sm text-ink">
              <Check size={16} aria-hidden="true" className="text-success" />
              Added to your bag
            </div>
          </div>
          <div className={`${panel} space-y-3`}>
            <p className={caption}>Skeleton</p>
            <div className="h-24 animate-pulse bg-ink/5" />
            <div className="h-3 w-3/4 animate-pulse bg-ink/5" />
            <div className="h-3 w-1/2 animate-pulse bg-ink/5" />
          </div>
          <div className="border border-l-4 border-ink/10 border-l-danger bg-surface p-6">
            <p className="text-xs font-medium text-danger">Error</p>
            <h4 className="mt-1 text-sm font-medium text-ink">Payment session expired</h4>
            <p className="mt-1 text-sm text-ink-soft">
              Your session timed out. Refresh the page to continue.
            </p>
          </div>
        </div>
      </Section>

      <section data-ds-section="commerce" aria-labelledby="ds-commerce">
        <div className="mb-6">
          <h2 id="ds-commerce" className={heading}>
            Commerce
          </h2>
          <p className={lede}>
            Product cards with a full-bleed picture, cart lines, filters and reviews.
          </p>
        </div>
        <CommerceDemos />
      </section>

      <Section
        id="mirror-try"
        title="Mirror Try"
        description="The plugin's trigger, the same in every store, and the store's own way to open it without a product."
      >
        <MirrorTryDemo />
      </Section>

      <Section
        id="motion"
        title="Motion"
        description="Opacity and transform only. Content rises into view as it scrolls in, pages fade in, and everything stops for people who ask for reduced motion."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <RevealDemo />
          <MotionReplayDemo />
        </div>
      </Section>

      <Section
        id="icons"
        title="Icons"
        description="Phosphor, light weight. Icons sit beside text or inside a labelled button, never alone."
      >
        <div
          className={`${panel} grid grid-cols-3 gap-6 text-center sm:grid-cols-5 md:grid-cols-9`}
        >
          {[
            { name: 'ArrowRight', comp: <ArrowRight size={24} /> },
            { name: 'ShoppingBag', comp: <ShoppingBag size={24} /> },
            { name: 'Check', comp: <Check size={24} /> },
            { name: 'Close', comp: <X size={24} /> },
            { name: 'Heart', comp: <Heart size={24} /> },
            { name: 'Minus', comp: <Minus size={24} /> },
            { name: 'Plus', comp: <Plus size={24} /> },
            { name: 'Search', comp: <MagnifyingGlass size={24} /> },
            { name: 'Filters', comp: <Faders size={24} /> },
            { name: 'Sparkle', comp: <Sparkle size={24} /> },
          ].map((icon) => (
            <div key={icon.name} className="flex flex-col items-center justify-center p-3">
              <div className="mb-2 text-ink">{icon.comp}</div>
              <span className="font-mono text-xs text-ink-soft">{icon.name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
