import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart-store'
import { useMirrorTry } from './index'
import { MirrorTryHost } from './host'
import { toMirrorTryProduct } from './to-plugin-product'

const coat = toMirrorTryProduct(products.find((p) => p.slug === 'longline-coat')!)

function Driver() {
  const { open, addToCart } = useMirrorTry()
  return (
    <button
      type="button"
      onClick={async () => {
        await open({ productId: coat.id, variantId: 'p-001-v2', source: 'pdp' }, coat)
        addToCart('p-001-v2')
      }}
    >
      drive
    </button>
  )
}

describe('MirrorTryHost', () => {
  it('adds to the store cart when the plugin reports an add-to-cart from inside a try-on', async () => {
    useCartStore.setState(useCartStore.getInitialState())
    const { getByRole } = render(
      <MirrorTryHost>
        <Driver />
      </MirrorTryHost>,
    )
    getByRole('button', { name: 'drive' }).click()

    await expect
      .poll(() => useCartStore.getState().lines)
      .toEqual([{ productId: 'p-001', variantId: 'p-001-v2', quantity: 1 }])
  })
})
