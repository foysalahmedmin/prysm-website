import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import {
  Accordion,
  Button,
  Dialog,
  OptionPicker,
  Price,
  QuantityStepper,
  Tabs,
  TextField,
} from '@/components/ui'

/**
 * Behaviour every storefront's primitives must keep, however they look.
 * This file is identical in all three projects; only the components under test differ.
 * Query by role and name only, never by class or DOM shape.
 */

describe('Button', () => {
  it('is a real button that defaults to type=button', () => {
    render(<Button>Add to bag</Button>)
    expect(screen.getByRole('button', { name: 'Add to bag' })).toHaveAttribute('type', 'button')
  })

  it('does not fire onClick while disabled or loading', async () => {
    const onClick = vi.fn()
    render(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button loading onClick={onClick}>
          Loading
        </Button>
      </>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Disabled' }))
    await userEvent.click(screen.getByRole('button', { name: 'Loading' }))
    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Loading' })).toHaveAttribute('aria-busy', 'true')
  })

  it('can render as a link without losing its role', () => {
    render(
      <Button asChild>
        <a href="https://example.com/demo">Shop</a>
      </Button>,
    )
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute(
      'href',
      'https://example.com/demo',
    )
  })
})

describe('TextField', () => {
  it('connects the label to the input', () => {
    render(<TextField label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('announces hint and error with the field and marks it invalid', () => {
    render(<TextField label="Email" hint="We never share it" error="Enter a valid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('We never share it Enter a valid email')
  })

  it('is not marked invalid without an error', () => {
    render(<TextField label="Email" />)
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid')
  })
})

describe('Dialog', () => {
  const setup = () =>
    render(
      <Dialog
        trigger={<button>Open bag</button>}
        title="Your bag"
        description="Review your pieces"
        closeLabel="Close"
      >
        <p>Contents</p>
      </Dialog>,
    )

  it('opens as a named dialog from its trigger', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: 'Open bag' }))
    expect(screen.getByRole('dialog', { name: 'Your bag' })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Review your pieces')
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    setup()
    const trigger = screen.getByRole('button', { name: 'Open bag' })
    await userEvent.click(trigger)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('closes from the close button', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: 'Open bag' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

describe('Tabs', () => {
  it('moves between tabs with the arrow keys and shows the matching panel', async () => {
    render(
      <Tabs
        label="Product information"
        items={[
          { value: 'details', label: 'Details', content: 'Detail text' },
          { value: 'care', label: 'Care', content: 'Care text' },
        ]}
      />,
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Detail text')
    await userEvent.click(screen.getByRole('tab', { name: 'Details' }))
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Care' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Care text')
  })
})

describe('Accordion', () => {
  it('toggles a section and reports its state', async () => {
    render(<Accordion items={[{ value: 'ship', title: 'Shipping', content: 'Ships in 2 days' }]} />)
    const trigger = screen.getByRole('button', { name: 'Shipping' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Ships in 2 days')).toBeVisible()
  })
})

describe('QuantityStepper', () => {
  const labels = { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' }

  function Controlled({ min, max, start }: { min?: number; max?: number; start: number }) {
    const [value, setValue] = useState(start)
    return <QuantityStepper value={value} onChange={setValue} min={min} max={max} labels={labels} />
  }

  it('steps up and down', async () => {
    render(<Controlled start={2} />)
    await userEvent.click(screen.getByRole('button', { name: 'Increase quantity' }))
    expect(screen.getByRole('status')).toHaveTextContent('3')
    await userEvent.click(screen.getByRole('button', { name: 'Decrease quantity' }))
    await userEvent.click(screen.getByRole('button', { name: 'Decrease quantity' }))
    expect(screen.getByRole('status')).toHaveTextContent('1')
  })

  it('disables the controls at the limits', () => {
    render(<Controlled start={1} min={1} max={1} />)
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeDisabled()
  })
})

describe('OptionPicker', () => {
  const options = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L', unavailable: true },
  ]

  it('is a named radio group', () => {
    render(<OptionPicker label="Size" options={options} />)
    expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('selects with the keyboard and reports the change', async () => {
    const onValueChange = vi.fn()
    render(<OptionPicker label="Size" options={options} value="S" onValueChange={onValueChange} />)
    await userEvent.tab()
    // Hold the key: Radix selects on focus only while an arrow key is down, and Radix moves
    // focus on a timer, so a press-and-release in one step would release too early.
    await userEvent.keyboard('{ArrowRight>}')
    await userEvent.keyboard('{/ArrowRight}')
    expect(onValueChange).toHaveBeenCalledWith('M')
  })

  it('does not let a shopper pick an unavailable option', async () => {
    const onValueChange = vi.fn()
    render(<OptionPicker label="Size" options={options} onValueChange={onValueChange} />)
    await userEvent.click(screen.getByRole('radio', { name: 'L' }))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})

describe('Price', () => {
  const base = {
    currency: 'USD',
    locale: 'en-US',
    labels: { sale: 'Sale price', original: 'Original price' },
  } as const

  it('formats a regular price', () => {
    render(<Price amount={12800} {...base} />)
    expect(screen.getByText('$128')).toBeInTheDocument()
  })

  it('labels the sale and original prices for screen readers', () => {
    const { container } = render(<Price amount={26000} compareAt={32000} {...base} />)
    expect(container).toHaveTextContent('Sale price $260 Original price $320')
  })

  it('ignores a compare-at price that is not higher', () => {
    const { container } = render(<Price amount={26000} compareAt={26000} {...base} />)
    expect(container).not.toHaveTextContent('Original price')
  })
})
