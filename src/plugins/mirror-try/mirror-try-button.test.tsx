import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MockMirrorTryAdapter } from './mock-adapter'
import { MirrorTryButton } from './mirror-try-button'
import { MirrorTryProvider, useMirrorTry } from './provider'
import type { MirrorTryProduct } from './types'

const product = (subcategory: string, name: string): MirrorTryProduct => ({
  id: 'p-001',
  name,
  category: 'clothing',
  subcategory,
  images: [],
  variants: [],
})

const coat = product('outerwear', 'Longline Coat')
const trousers = product('trousers', 'Wool Trousers')

function Status() {
  const { state } = useMirrorTry()
  return <output data-testid="status">{state.status}</output>
}

const setup = (subject: MirrorTryProduct, label?: string) => {
  const adapter = new MockMirrorTryAdapter({ readyDelayMs: 0 })
  render(
    <MirrorTryProvider adapter={adapter}>
      <MirrorTryButton product={subject} source="pdp" label={label} />
      <Status />
    </MirrorTryProvider>,
  )
  return adapter
}

describe('MirrorTryButton', () => {
  it('opens a Mirror Try session for the product when clicked', async () => {
    const adapter = setup(coat)
    await userEvent.click(screen.getByRole('button', { name: 'Try on: Longline Coat' }))

    await expect.poll(() => screen.getByTestId('status').textContent).toBe('ready')
    expect(adapter.getState().request).toMatchObject({ productId: 'p-001', source: 'pdp' })
  })

  it('uses the plugin default label unless the store overrides it', () => {
    setup(coat, 'See it on you')
    expect(screen.getByRole('button', { name: 'See it on you: Longline Coat' })).toBeInTheDocument()
  })

  it('renders nothing for a product the plugin cannot try on', () => {
    setup(trousers)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('throws a clear error when used outside the provider', () => {
    expect(() => render(<MirrorTryButton product={coat} source="pdp" />)).toThrow(
      /MirrorTryProvider/,
    )
  })
})
