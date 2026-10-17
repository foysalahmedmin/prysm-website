'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Check, Plus, ShoppingBag, Sparkle, Trash, User } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import type { Address } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'
import { useSessionStore } from '@/stores/session-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

function AuthGuard({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated)
  const login = useSessionStore((s) => s.login)

  if (!hydrated) {
    return (
      <div className="glass mx-auto max-w-md rounded-3xl p-10 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Loading Account...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="glass glass-strong mx-auto max-w-md rounded-3xl border border-white/80 p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ink/10 text-ink">
          <User size={28} />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">Sign In Required</h2>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Please sign in or use demo access to view your private archive dashboard.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href={routes.login}>Sign In to Account</Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => login('collector@prysm.luxury', 'Elena Rostova')}
          >
            Quick Demo Login
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export function AccountDashboardView() {
  const customer = useSessionStore((s) => s.customer)
  const addresses = useSessionStore((s) => s.addresses)
  const logout = useSessionStore((s) => s.logout)
  const orders = useOrdersStore((s) => s.orders)

  const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0]
  const latestOrder = orders[0]

  return (
    <AuthGuard>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="glass glass-strong flex flex-col justify-between gap-4 rounded-3xl border border-white/80 p-8 shadow-xl sm:flex-row sm:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">PRYSM CLIENT ARCHIVE</span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Welcome, {customer?.name ?? 'Collector'}
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-soft">{customer?.email}</p>
          </div>
          <div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="glass rounded-2xl border border-white/80 p-6 shadow-md">
            <span className="font-mono text-xs uppercase text-ink-faint">Total Acquisitions</span>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{orders.length}</p>
            <p className="mt-1 font-text text-xs text-ink-soft">Lifetime verified orders</p>
          </div>

          <div className="glass rounded-2xl border border-white/80 p-6 shadow-md">
            <span className="font-mono text-xs uppercase text-ink-faint">Client Standing</span>
            <p className="mt-2 font-display text-3xl font-bold text-ink">Photonic Tier</p>
            <p className="mt-1 font-text text-xs text-ink-soft">Complimentary worldwide transit</p>
          </div>

          <div className="glass rounded-2xl border border-white/80 p-6 shadow-md">
            <span className="font-mono text-xs uppercase text-ink-faint">Saved Addresses</span>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{addresses.length}</p>
            <p className="mt-1 font-text text-xs text-ink-soft">Active delivery destinations</p>
          </div>
        </div>

        {/* Latest Order & Address Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Latest Order */}
          <div className="glass glass-strong rounded-3xl border border-white/80 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/40 pb-4">
              <h2 className="font-display text-lg font-bold text-ink">Recent Acquisition</h2>
              <Link href={routes.orders} className="font-mono text-xs uppercase text-ink hover:underline">
                View All &rarr;
              </Link>
            </div>

            {latestOrder ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-ink">{latestOrder.number}</span>
                  <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-semibold uppercase text-canvas">
                    {latestOrder.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-ink-faint">
                  Placed on {new Date(latestOrder.createdAt).toLocaleDateString()} • {latestOrder.lines.length} items
                </p>
                <p className="font-mono text-sm font-semibold text-ink">
                  Total: {formatMoney(latestOrder.totals.total, MONEY)}
                </p>
                <div className="pt-2">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/account/orders/${latestOrder.id}`}>View Acquisition Details</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <ShoppingBag size={32} className="mx-auto text-ink-faint" />
                <p className="mt-2 font-text text-sm text-ink-soft">No acquisitions recorded yet.</p>
                <div className="mt-4">
                  <Button asChild size="sm">
                    <Link href={routes.shop}>Discover Collection</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Primary Address */}
          <div className="glass glass-strong rounded-3xl border border-white/80 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/40 pb-4">
              <h2 className="font-display text-lg font-bold text-ink">Primary Destination</h2>
              <Link href={routes.addresses} className="font-mono text-xs uppercase text-ink hover:underline">
                Manage &rarr;
              </Link>
            </div>

            {defaultAddr ? (
              <div className="mt-4 font-text text-sm text-ink space-y-1">
                <p className="font-semibold">{defaultAddr.name}</p>
                <p>{defaultAddr.line1}</p>
                {defaultAddr.line2 ? <p>{defaultAddr.line2}</p> : null}
                <p>
                  {defaultAddr.city}, {defaultAddr.region} {defaultAddr.postcode}
                </p>
                <p>{defaultAddr.country}</p>
                {defaultAddr.phone ? <p className="font-mono text-xs text-ink-faint">{defaultAddr.phone}</p> : null}
              </div>
            ) : (
              <div className="py-8 text-center font-text text-sm text-ink-soft">
                No delivery address saved.
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export function AccountOrdersView() {
  const orders = useOrdersStore((s) => s.orders)

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/40 pb-4">
          <h1 className="font-display text-2xl font-bold text-ink">Acquisition History ({orders.length})</h1>
          <Link href={routes.trackOrder} className="font-mono text-xs uppercase text-ink hover:underline">
            Track via Courier Radar &rarr;
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="glass glass-strong rounded-3xl p-12 text-center shadow-xl">
            <ShoppingBag size={40} className="mx-auto text-ink-faint" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">No Orders Placed</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Explore the archive boutique and acquire your first PRYSM garment.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href={routes.shop}>Explore Collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="glass glass-strong rounded-3xl border border-white/80 p-6 shadow-xl transition-all hover:bg-white/70"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-white/40 pb-4 sm:flex-row sm:items-center">
                  <div>
                    <span className="font-mono text-xs uppercase text-ink-faint">Order Number</span>
                    <p className="font-mono text-lg font-bold text-ink">{order.number}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold uppercase text-canvas">
                      {order.status}
                    </span>
                    <span className="font-mono text-sm font-bold text-ink">
                      {formatMoney(order.totals.total, MONEY)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    {order.lines.slice(0, 3).map((line) => (
                      <div
                        key={line.variantId}
                        className="h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-surface"
                      >
                        {line.image ? (
                          <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                    ))}
                    {order.lines.length > 3 ? (
                      <span className="font-mono text-xs text-ink-faint">+{order.lines.length - 3} more</span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/account/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

export function AccountOrderDetailView({ id }: { id: string }) {
  const orders = useOrdersStore((s) => s.orders)
  const order = orders.find((o) => o.id === id) ?? orders[0]

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/40 pb-4">
          <div>
            <Link href={routes.orders} className="font-mono text-xs text-ink-soft hover:text-ink">
              &larr; Back to Orders
            </Link>
            <h1 className="mt-2 font-display text-2xl font-bold text-ink">
              Acquisition {order?.number ?? id}
            </h1>
          </div>
          {order ? (
            <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold uppercase text-canvas">
              {order.status}
            </span>
          ) : null}
        </div>

        {order ? (
          <div className="glass glass-strong rounded-3xl border border-white/80 p-8 shadow-2xl">
            <h2 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Itemized Artifacts</h2>
            <ul className="mt-4 divide-y divide-white/40">
              {order.lines.map((line) => (
                <li key={line.variantId} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    {line.image ? (
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                        <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                      </div>
                    ) : null}
                    <div>
                      <p className="font-text text-sm font-semibold text-ink">{line.title}</p>
                      <p className="font-mono text-xs text-ink-faint">
                        Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-ink">
                    {formatMoney(line.unitPrice * line.quantity, MONEY)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/40 pt-6 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Destination</h3>
                <div className="mt-2 font-text text-sm text-ink">
                  <p className="font-semibold">{order.address.name}</p>
                  <p>{order.address.line1}</p>
                  {order.address.line2 ? <p>{order.address.line2}</p> : null}
                  <p>
                    {order.address.city}, {order.address.region} {order.address.postcode}
                  </p>
                  <p>{order.address.country}</p>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Payment & Transit</h3>
                <div className="mt-2 font-text text-sm text-ink">
                  <p className="font-semibold">{order.payment.brand} ending in •••• {order.payment.last4}</p>
                  <p className="mt-1 font-mono text-xs text-ink-soft">Courier: {order.shippingMethod.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/40 pt-6">
              <dl className="space-y-2 font-text text-sm">
                <div className="flex justify-between text-ink-soft">
                  <dt>Subtotal</dt>
                  <dd className="font-mono text-ink">{formatMoney(order.totals.subtotal, MONEY)}</dd>
                </div>
                {order.totals.discount > 0 ? (
                  <div className="flex justify-between text-emerald-600">
                    <dt>Promotional Savings</dt>
                    <dd className="font-mono">-{formatMoney(order.totals.discount, MONEY)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between text-ink-soft">
                  <dt>Delivery</dt>
                  <dd className="font-mono text-ink">
                    {order.totals.shipping === 0 ? 'Complimentary' : formatMoney(order.totals.shipping, MONEY)}
                  </dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>Estimated Tax (8%)</dt>
                  <dd className="font-mono text-ink">{formatMoney(order.totals.tax, MONEY)}</dd>
                </div>
                <div className="flex justify-between border-t border-white/60 pt-3 font-display text-lg font-bold text-ink">
                  <dt>Total</dt>
                  <dd className="font-mono">{formatMoney(order.totals.total, MONEY)}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-8 text-center text-ink-soft">Order not found.</div>
        )}
      </div>
    </AuthGuard>
  )
}

export function AccountAddressesView() {
  const addresses = useSessionStore((s) => s.addresses)
  const addAddress = useSessionStore((s) => s.addAddress)
  const deleteAddress = useSessionStore((s) => s.deleteAddress)
  const setDefaultAddress = useSessionStore((s) => s.setDefaultAddress)

  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('Sweden')
  const [phone, setPhone] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addAddress({
      name,
      line1,
      line2: line2 || undefined,
      city,
      region,
      postcode,
      country,
      phone: phone || undefined,
      isDefault: addresses.length === 0,
    })
    setIsAdding(false)
    setName('')
    setLine1('')
    setLine2('')
    setCity('')
    setRegion('')
    setPostcode('')
    setPhone('')
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/40 pb-4">
          <h1 className="font-display text-2xl font-bold text-ink">Delivery Addresses ({addresses.length})</h1>
          <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
            <Plus size={16} className="mr-1.5" />
            {isAdding ? 'Cancel' : 'Add New Destination'}
          </Button>
        </div>

        {isAdding ? (
          <form onSubmit={handleAdd} className="glass glass-strong rounded-3xl border border-white/80 p-6 shadow-xl">
            <h2 className="font-display text-lg font-bold text-ink mb-4">New Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Address Line 1</label>
                <input
                  type="text"
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="108 Spectral Way"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Address Line 2</label>
                <input
                  type="text"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="Suite 4B"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Stockholm"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Region</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Stockholm"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="111 22"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Sweden"
                  className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button type="submit" size="sm">Save Address</Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : null}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="glass glass-strong rounded-3xl border border-white/80 p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-text font-bold text-ink">{addr.name}</span>
                  {addr.isDefault ? (
                    <span className="rounded-full bg-accent-cyan/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-ink">
                      Primary
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 font-text text-sm text-ink-soft space-y-0.5">
                  <p>{addr.line1}</p>
                  {addr.line2 ? <p>{addr.line2}</p> : null}
                  <p>
                    {addr.city}, {addr.region} {addr.postcode}
                  </p>
                  <p>{addr.country}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/40 pt-4">
                {!addr.isDefault && addr.id ? (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id!)}
                    className="font-mono text-xs text-ink hover:underline"
                  >
                    Set as Primary
                  </button>
                ) : (
                  <span />
                )}
                {addr.id ? (
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id!)}
                    aria-label={`Delete ${addr.name}`}
                    className="text-ink-soft hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  )
}

export function AccountProfileView() {
  const customer = useSessionStore((s) => s.customer)
  const updateProfile = useSessionStore((s) => s.updateProfile)

  const [name, setName] = useState(customer?.name ?? '')
  const [email, setEmail] = useState(customer?.email ?? '')
  const [phone, setPhone] = useState(customer?.phone ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, email, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AuthGuard>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="border-b border-white/40 pb-4">
          <h1 className="font-display text-2xl font-bold text-ink">Personal Profile</h1>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Manage credentials and confidential showroom communications.
          </p>
        </div>

        {saved ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-700">
            Profile changes successfully saved to your archive record.
          </div>
        ) : null}

        <form onSubmit={handleSave} className="glass glass-strong rounded-3xl border border-white/80 p-8 shadow-xl space-y-5">
          <div>
            <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs uppercase text-ink-soft">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+46 8 123 4567"
              className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" size="md">
              Update Profile Record
            </Button>
          </div>
        </form>
      </div>
    </AuthGuard>
  )
}
