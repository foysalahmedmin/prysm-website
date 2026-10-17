import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCartStore } from './cart-store'
import { StoreHydrator, useHydrated } from './hydration'

function Probe() {
  return <span data-testid="hydrated">{String(useHydrated())}</span>
}

describe('hydration', () => {
  it('reports hydrated once mounted on the client', () => {
    const { getByTestId } = render(<Probe />)
    expect(getByTestId('hydrated').textContent).toBe('true')
  })

  it('restores the saved cart when the hydrator mounts', async () => {
    useCartStore.setState({ lines: [] })
    window.localStorage.setItem(
      'prysm:cart',
      JSON.stringify({
        state: { lines: [{ productId: 'p-001', variantId: 'v1', quantity: 2 }] },
        version: 1,
      }),
    )

    render(<StoreHydrator />)

    await expect
      .poll(() => useCartStore.getState().lines)
      .toEqual([{ productId: 'p-001', variantId: 'v1', quantity: 2 }])
  })
})
