import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { GlassNav } from './glass-nav'

describe('GlassNav', () => {
  it('renders brand wordmark, navigation links and cart button', () => {
    render(
      <GlassNav
        brandName="PRYSM"
        links={[
          { href: '/new-arrivals', label: 'New in' },
          { href: '/shop/clothing', label: 'Clothing' },
          { href: '/lookbook', label: 'Lookbook' },
        ]}
        cartLabel="Bag"
        cartCount={2}
      />,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'PRYSM' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'New in' })).toHaveAttribute('href', '/new-arrivals')
    expect(screen.getByRole('link', { name: 'Clothing' })).toHaveAttribute('href', '/shop/clothing')
    expect(screen.getByRole('link', { name: 'Lookbook' })).toHaveAttribute('href', '/lookbook')
    expect(screen.getByRole('button', { name: 'Bag (2)' })).toBeInTheDocument()
  })

  it('can open mobile menu sheet with toggle button', async () => {
    render(
      <GlassNav
        brandName="PRYSM"
        links={[{ href: '/shop', label: 'Shop' }]}
        cartLabel="Bag"
        cartCount={0}
      />,
    )

    const menuBtn = screen.getByRole('button', { name: 'Open menu' })
    await userEvent.click(menuBtn)
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
  })
})
