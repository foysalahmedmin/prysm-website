import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import {
  CartLine,
  FilterPanel,
  Gallery,
  ProductCard,
  ReviewSummary,
  type CartLineProps,
  type FilterPanelProps,
  type ProductCardProps,
} from '@/components/commerce'
import { products } from '@/data/products'
import { DEFAULT_QUERY } from '@/domain'
import { computeFacets } from '@/features/catalog/query'
import type { QuoteLine } from '@/features/cart/quote'

/**
 * Behaviour every storefront's commerce components must keep, however they look.
 * Identical in all three projects; only the components under test differ.
 */

const money = { currency: 'USD', locale: 'en-US' } as const

const cardLabels: ProductCardProps['labels'] = {
  sale: 'Sale price',
  original: 'Original price',
  save: 'Save to wishlist',
  badges: { new: 'New', bestseller: 'Bestseller', limited: 'Limited', sale: 'Sale' },
}

const coat = {
  ...products[0]!,
  badges: ['new'] as ('new' | 'bestseller' | 'limited' | 'sale')[],
}
const sweater = {
  ...products[0]!,
  slug: 'test-sweater',
  name: 'Test Sweater',
  price: 12800,
  compareAtPrice: 15800,
}

const card = (product: typeof coat, extra: Partial<ProductCardProps> = {}) => (
  <ProductCard
    product={product}
    href={`/products/${product.slug}`}
    money={money}
    saved={false}
    onToggleSaved={() => {}}
    labels={cardLabels}
    {...extra}
  />
)

describe('ProductCard', () => {
  it('links to the product by name and shows the first image with its alt text', () => {
    render(card(coat))
    expect(screen.getByRole('link', { name: new RegExp(coat.name) })).toHaveAttribute(
      'href',
      `/products/${coat.slug}`,
    )
    expect(screen.getByRole('img', { name: coat.media[0]!.alt })).toBeInTheDocument()
  })

  it('shows badges with their labels from props', () => {
    render(card(coat))
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('labels the sale and original price', () => {
    const { container } = render(card(sweater))
    expect(container).toHaveTextContent('Sale price $128')
    expect(container).toHaveTextContent('Original price $158')
  })

  it('renders whatever the host puts in the try-on slot, and nothing when there is none', () => {
    const { unmount } = render(
      card(coat, { tryOnSlot: <button type="button">Host add-on</button> }),
    )
    expect(screen.getByRole('button', { name: 'Host add-on' })).toBeInTheDocument()
    unmount()
    render(card(coat))
    expect(screen.queryByRole('button', { name: 'Host add-on' })).toBeNull()
  })

  it('exposes the wishlist state with aria-pressed and reports the toggle', async () => {
    const onToggleSaved = vi.fn()
    render(card(coat, { saved: true, onToggleSaved }))
    const toggle = screen.getByRole('button', { name: 'Save to wishlist' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(toggle)
    expect(onToggleSaved).toHaveBeenCalledWith(coat.id)
  })
})

describe('CartLine', () => {
  const base: QuoteLine = {
    productId: 'p-006',
    variantId: 'p-006-v1',
    slug: 'silk-scarf',
    category: 'accessories',
    subcategory: 'scarves',
    name: 'Silk Scarf',
    image: { src: '/images/placeholder.svg', alt: 'Silk Scarf, front', width: 1200, height: 1500 },
    options: { color: 'Slate' },
    quantity: 2,
    unitPrice: 9500,
    lineTotal: 19000,
  }
  const labels: CartLineProps['labels'] = {
    quantity: { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
    remove: 'Remove',
    outOfStock: 'Out of stock',
    limitedStock: 'Only some are left',
  }
  const line = (extra: Partial<QuoteLine> = {}, props: Partial<CartLineProps> = {}) => (
    <ul>
      <CartLine
        line={{ ...base, ...extra }}
        href="/products/silk-scarf"
        money={money}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        labels={labels}
        {...props}
      />
    </ul>
  )

  it('shows the product, its options and the line total', () => {
    render(line())
    expect(screen.getByRole('link', { name: 'Silk Scarf' })).toHaveAttribute(
      'href',
      '/products/silk-scarf',
    )
    expect(screen.getByText('Slate')).toBeInTheDocument()
    expect(screen.getByText('$190')).toBeInTheDocument()
  })

  it('reports quantity changes with the variant id', async () => {
    const onQuantityChange = vi.fn()
    render(line({}, { onQuantityChange }))
    await userEvent.click(screen.getByRole('button', { name: 'Increase quantity' }))
    expect(onQuantityChange).toHaveBeenCalledWith('p-006-v1', 3)
  })

  it('removes a line with an accessible name that includes the product', async () => {
    const onRemove = vi.fn()
    render(line({}, { onRemove }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove: Silk Scarf' }))
    expect(onRemove).toHaveBeenCalledWith('p-006-v1')
  })

  it('explains an out-of-stock line and offers no quantity control', () => {
    render(line({ issue: 'out-of-stock', quantity: 0, lineTotal: 0 }))
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
    expect(screen.queryByRole('group', { name: 'Quantity' })).toBeNull()
  })

  it('explains a limited-stock line', () => {
    render(line({ issue: 'limited-stock' }))
    expect(screen.getByText('Only some are left')).toBeInTheDocument()
  })

  it('renders an extra action slot', () => {
    render(line({}, { extra: <a href="https://example.com/try">See it on you</a> }))
    expect(screen.getByRole('link', { name: 'See it on you' })).toBeInTheDocument()
  })
})

describe('FilterPanel', () => {
  const facets = computeFacets(products.filter((p) => p.category === 'clothing'))
  const labels: FilterPanelProps['labels'] = {
    title: 'Filters',
    subcategory: 'Type',
    size: 'Size',
    colour: 'Colour',
    price: 'Price',
    onSale: 'On sale',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price',
    clear: 'Clear all',
  }

  function Harness({ onChange }: { onChange: FilterPanelProps['onChange'] }) {
    const [query, setQuery] = useState(DEFAULT_QUERY)
    return (
      <FilterPanel
        facets={facets}
        query={query}
        money={money}
        labels={labels}
        onChange={(next) => {
          onChange(next)
          setQuery((current) => ({ ...current, ...next }))
        }}
        onClear={() => setQuery(DEFAULT_QUERY)}
      />
    )
  }

  it('is a named form with grouped controls', () => {
    render(<Harness onChange={() => {}} />)
    expect(screen.getByRole('form', { name: 'Filters' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Size' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Colour' })).toBeInTheDocument()
  })

  it('toggles sizes and colours, keeping the other selections', async () => {
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    const size1 = facets.sizes.includes('S') ? 'S' : (facets.sizes[0] ?? 'S')
    const size2 = facets.sizes.includes('M') ? 'M' : (facets.sizes[1] ?? 'M')
    await userEvent.click(screen.getByLabelText(size1))
    await userEvent.click(screen.getByLabelText(size2))
    expect(onChange).toHaveBeenLastCalledWith({ sizes: [size1, size2] })
    await userEvent.click(screen.getByLabelText(size1))
    expect(onChange).toHaveBeenLastCalledWith({ sizes: [size2] })
    if (facets.colors.length > 0) {
      const color = facets.colors[0]!.value
      await userEvent.click(screen.getByLabelText(color))
      expect(onChange).toHaveBeenLastCalledWith({ colors: [color] })
    }
  })

  it('switches the sale filter', async () => {
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('On sale'))
    expect(onChange).toHaveBeenLastCalledWith({ onSale: true })
  })

  it('converts price inputs from major to minor units', async () => {
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Minimum price'), '50')
    expect(onChange).toHaveBeenLastCalledWith({ minPrice: 5000 })
  })

  it('clears every filter', async () => {
    render(<Harness onChange={() => {}} />)
    const size1 = facets.sizes.includes('S') ? 'S' : (facets.sizes[0] ?? 'S')
    await userEvent.click(screen.getByLabelText(size1))
    expect(screen.getByLabelText(size1)).toBeChecked()
    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByLabelText(size1)).not.toBeChecked()
  })
})

describe('Gallery', () => {
  const media = [
    { src: '/a.svg', alt: 'Front', width: 1200, height: 1500 },
    { src: '/b.svg', alt: 'Detail', width: 1200, height: 1500 },
  ]
  const labels = {
    group: 'Product images',
    previous: 'Previous image',
    next: 'Next image',
    position: (current: number, total: number) => `Image ${current} of ${total}`,
  }

  it('steps through the images, announces the position and disables at the ends', async () => {
    render(<Gallery media={media} labels={labels} />)
    expect(screen.getByRole('img', { name: 'Front' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Next image' }))
    expect(screen.getByRole('img', { name: 'Detail' })).toBeInTheDocument()
    expect(screen.getByText('Image 2 of 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next image' })).toBeDisabled()
  })
})

describe('ReviewSummary', () => {
  it('shows the average, the count and a text row per star level', () => {
    render(
      <ReviewSummary
        rating={{ average: 4.7, count: 10 }}
        distribution={{ 5: 7, 4: 2, 3: 1, 2: 0, 1: 0 }}
        labels={{
          heading: 'Reviews',
          outOf: (average) => `${average} out of 5`,
          count: (count) => `${count} reviews`,
          stars: (stars, count) => `${stars} stars: ${count}`,
        }}
      />,
    )
    expect(screen.getByRole('region', { name: 'Reviews' })).toBeInTheDocument()
    expect(screen.getByText('4.7 out of 5')).toBeInTheDocument()
    expect(screen.getByText('10 reviews')).toBeInTheDocument()
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getByText('5 stars: 7')).toBeInTheDocument()
  })
})
