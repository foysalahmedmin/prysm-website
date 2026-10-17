// Creates the empty page for every static route. Safe to re-run: it never overwrites a file.
// Usage: node scripts/scaffold-pages.mjs
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const GROUP = {
  storefront: '(storefront)',
  checkout: '(checkout)',
  auth: '(auth)',
  account: '(account)',
}

// [route group, path under the group ('' = the group root), PageId, component name]
const pages = [
  ['storefront', '', 'home', 'HomePage'],
  ['storefront', 'shop', 'shop', 'ShopPage'],
  ['storefront', 'collections', 'collections', 'CollectionsPage'],
  ['storefront', 'search', 'search', 'SearchPage'],
  ['storefront', 'sale', 'sale', 'SalePage'],
  ['storefront', 'new-arrivals', 'new-arrivals', 'NewArrivalsPage'],
  ['storefront', 'lookbook', 'lookbook', 'LookbookPage'],
  ['storefront', 'wishlist', 'wishlist', 'WishlistPage'],
  ['storefront', 'cart', 'cart', 'CartPage'],
  ['storefront', 'track-order', 'track-order', 'TrackOrderPage'],
  ['storefront', 'about', 'about', 'AboutPage'],
  ['storefront', 'journal', 'journal', 'JournalPage'],
  ['storefront', 'contact', 'contact', 'ContactPage'],
  ['storefront', 'faq', 'faq', 'FaqPage'],
  ['storefront', 'shipping-returns', 'shipping-returns', 'ShippingReturnsPage'],
  ['storefront', 'size-guide', 'size-guide', 'SizeGuidePage'],
  ['storefront', 'stores', 'stores', 'StoresPage'],
  ['storefront', 'privacy', 'privacy', 'PrivacyPage'],
  ['storefront', 'terms', 'terms', 'TermsPage'],
  ['checkout', 'checkout', 'checkout', 'CheckoutPage'],
  ['checkout', 'checkout/success', 'checkout-success', 'CheckoutSuccessPage'],
  ['auth', 'account/login', 'login', 'LoginPage'],
  ['auth', 'account/register', 'register', 'RegisterPage'],
  ['auth', 'account/forgot-password', 'forgot-password', 'ForgotPasswordPage'],
  ['account', 'account', 'account', 'AccountPage'],
  ['account', 'account/orders', 'orders', 'OrdersPage'],
  ['account', 'account/addresses', 'addresses', 'AddressesPage'],
  ['account', 'account/profile', 'profile', 'ProfilePage'],
]

const template = (id, name) => `import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('${id}')

export default function ${name}() {
  return <PageShell id="${id}" />
}
`

const layout = `export default function Layout({ children }: { children: React.ReactNode }) {
  return <main id="main">{children}</main>
}
`

let created = 0
for (const group of Object.values(GROUP)) {
  const file = join('src/app', group, 'layout.tsx')
  if (!existsSync(file)) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, layout)
    created++
  }
}
for (const [group, path, id, name] of pages) {
  const file = join('src/app', GROUP[group], path, 'page.tsx')
  if (existsSync(file)) continue
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, template(id, name))
  created++
}
console.log(`Created ${created} files.`)
