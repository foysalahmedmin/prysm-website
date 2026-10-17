import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart-store'
import { useMirrorTry } from './index'
import { MirrorTryHost } from './host'
import { toMirrorTryProduct } from './to-plugin-product'

const sample = toMirrorTryProduct(products[0]!)
const variantId = sample.variants[0]!.id

function Driver() {
  const { open, addToCart } = useMirrorTry()
  return (
    <button
      type="button"
      onClick={async () => {
        await open({ productId: sample.id, variantId, source: 'pdp' }, sample)
        addToCart(variantId)
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
      .toEqual([{ productId: sample.id, variantId, quantity: 1 }])
  })
})
