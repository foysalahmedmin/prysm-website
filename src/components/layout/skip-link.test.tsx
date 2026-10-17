import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkipLink } from './skip-link'

describe('SkipLink', () => {
  it('renders skip link targeting #main-content by default', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Skip to content' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('supports custom href and text', () => {
    render(<SkipLink href="#catalog">Skip to catalog</SkipLink>)
    const link = screen.getByRole('link', { name: 'Skip to catalog' })
    expect(link).toHaveAttribute('href', '#catalog')
  })

  it('is visually hidden until focused (has sr-only)', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Skip to content' })
    expect(link.className).toContain('sr-only')
  })
})
