import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FilterChips } from './filter-chips'

describe('FilterChips', () => {
  it('renders active filter chips and handles remove and clear', async () => {
    const onRemove = vi.fn()
    const onClear = vi.fn()
    render(
      <FilterChips
        chips={[
          { key: 'size-m', label: 'Size: M' },
          { key: 'color-slate', label: 'Colour: Slate' },
        ]}
        onRemove={onRemove}
        onClear={onClear}
        clearLabel="Clear all"
      />,
    )

    expect(screen.getByText('Size: M')).toBeInTheDocument()
    expect(screen.getByText('Colour: Slate')).toBeInTheDocument()

    const removeBtn = screen.getByRole('button', { name: 'Remove filter: Size: M' })
    await userEvent.click(removeBtn)
    expect(onRemove).toHaveBeenCalledWith('size-m')

    const clearBtn = screen.getByRole('button', { name: 'Clear all' })
    await userEvent.click(clearBtn)
    expect(onClear).toHaveBeenCalled()
  })

  it('renders nothing when there are no chips', () => {
    const { container } = render(
      <FilterChips chips={[]} onRemove={() => {}} onClear={() => {}} clearLabel="Clear all" />,
    )
    expect(container.firstChild).toBeNull()
  })
})
