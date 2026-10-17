import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Rail } from './rail'

describe('Rail', () => {
  it('renders items in a horizontally scrollable rail with accessible navigation', async () => {
    render(
      <Rail label="Selected for tonight" previousLabel="Previous cards" nextLabel="Next cards">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </Rail>,
    )

    expect(screen.getByRole('region', { name: 'Selected for tonight' })).toBeInTheDocument()
    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()

    const prev = screen.getByRole('button', { name: 'Previous cards' })
    const next = screen.getByRole('button', { name: 'Next cards' })
    expect(prev).toBeInTheDocument()
    expect(next).toBeInTheDocument()

    await userEvent.click(next)
    await userEvent.click(prev)
  })
})
