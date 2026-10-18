import { act, render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { reset } from './controller'
import { MirrorTry, MirrorTryTrigger } from './index'
import type { MirrorTryProduct } from './types'

const config = { storeId: 'test', storeName: 'Test Store' }
const coat: MirrorTryProduct = {
  id: 'coat',
  name: 'Wool Coat',
  category: 'clothing',
  subcategory: 'outerwear',
}

/** The plugin renders into open shadow roots; Testing Library queries one at a time. */
function inside(host: Element | null) {
  if (!host?.shadowRoot) throw new Error('No shadow root')
  return within(host.shadowRoot as unknown as HTMLElement)
}

afterEach(() => act(() => reset()))

describe('Mirror Try on a store page', () => {
  it('keeps its UI inside a shadow root, away from store styles', () => {
    const { container } = render(<MirrorTry config={config} />)
    const host = container.querySelector('[data-mirror-try]')
    expect(host?.shadowRoot).toBeTruthy()
    expect(container.textContent).toBe('')
    expect(inside(host).getByRole('button', { name: /Virtual Trial/ })).toBeVisible()
  })

  it('opens from a product trigger with that product, and minimises back to the card', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <>
        <MirrorTry config={config} />
        <MirrorTryTrigger product={coat} />
      </>,
    )
    const plugin = inside(container.querySelector('[data-mirror-try]'))
    const trigger = inside(container.querySelector('[data-mirror-try-trigger]'))

    await user.click(trigger.getByRole('button', { name: 'Try on: Wool Coat' }))

    const panel = plugin.getByRole('dialog', { name: 'Virtual Trial' })
    expect(panel).toBeVisible()
    expect(within(panel).getByText('Wool Coat')).toBeInTheDocument()
    expect(within(panel).getByRole('button', { name: 'Enable Camera' })).toBeVisible()
    expect(plugin.queryByRole('button', { name: /^Virtual Trial/ })).toBeNull()

    await user.click(within(panel).getByRole('button', { name: 'Minimize' }))
    expect(plugin.getByRole('button', { name: /Virtual Trial/ })).toBeVisible()
  })

  it('shows its own login, with Google, from the account button', async () => {
    const user = userEvent.setup()
    const { container } = render(<MirrorTry config={config} />)
    const plugin = inside(container.querySelector('[data-mirror-try]'))

    await user.click(plugin.getByRole('button', { name: /Virtual Trial/ }))
    await user.click(plugin.getByRole('button', { name: 'Log in or sign up' }))

    expect(plugin.getByRole('heading', { name: 'Login' })).toBeVisible()
    expect(plugin.getByLabelText('Email/Phone Number')).toBeVisible()
    expect(plugin.getByRole('button', { name: 'Continue with Google' })).toBeVisible()

    await user.click(plugin.getByRole('button', { name: 'Login' }))
    expect(plugin.getByText('Enter your email or phone number')).toBeVisible()
  })

  it('offers no trigger for pieces it cannot try on', () => {
    const { container } = render(
      <MirrorTryTrigger
        product={{ id: 'bag', name: 'Tote', category: 'bags', subcategory: 'bags' }}
      />,
    )
    expect(container.querySelector('[data-mirror-try-trigger]')).toBeNull()
  })
})
