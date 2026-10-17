import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MockMirrorTryAdapter } from './mock-adapter'
import { MirrorTryProvider, useMirrorTry } from './provider'
import { TryOnButton } from './try-on-button'

const ring = {
  id: 'p-011',
  name: 'Signet Ring',
  tryOn: { type: 'ring', anchor: 'hand', sizeAware: true },
} as const
const trousers = { id: 'p-004', name: 'Wool Trousers', tryOn: null }

function Status() {
  const { state } = useMirrorTry()
  return <output data-testid="status">{state.status}</output>
}

const setup = (product: typeof ring | typeof trousers) => {
  const adapter = new MockMirrorTryAdapter({ readyDelayMs: 0 })
  render(
    <MirrorTryProvider adapter={adapter}>
      <TryOnButton product={product} source="pdp" label="Try on" />
      <Status />
    </MirrorTryProvider>,
  )
  return adapter
}

describe('TryOnButton', () => {
  it('opens a Mirror Try session for the product when clicked', async () => {
    const adapter = setup(ring)
    await userEvent.click(screen.getByRole('button', { name: 'Try on: Signet Ring' }))

    await expect.poll(() => screen.getByTestId('status').textContent).toBe('ready')
    expect(adapter.getState().request).toMatchObject({ productId: 'p-011', source: 'pdp' })
  })

  it('renders nothing for a product that cannot be tried on', () => {
    setup(trousers)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('throws a clear error when used outside the provider', () => {
    expect(() => render(<TryOnButton product={ring} source="pdp" label="Try on" />)).toThrow(
      /MirrorTryProvider/,
    )
  })
})
