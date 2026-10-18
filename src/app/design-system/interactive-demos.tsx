'use client'

import { useState } from 'react'
import { Button, Dialog, OptionPicker, QuantityStepper } from '@/components/ui'
import { Reveal } from '@/lib/motion'

export function RevealDemo() {
  const [run, setRun] = useState(0)

  return (
    <div className="space-y-4 border border-ink/10 bg-surface p-6">
      <Button variant="secondary" onClick={() => setRun((n) => n + 1)}>
        Replay reveal
      </Button>
      <ul key={run} className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Reveal as="li" key={i} delay={i * 90}>
            <div className="flex aspect-3/4 items-end border border-ink/10 bg-canvas p-3 text-sm text-ink-soft">
              Rises in, {i * 90}ms
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="text-sm text-ink-soft">
        Each block fades up 16px the first time it scrolls into view, staggered by 90ms.
      </p>
    </div>
  )
}

export function SelectionControlsDemo() {
  const [selectedSize, setSelectedSize] = useState('m')
  const [qty, setQty] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-medium text-ink-soft">Sizes</h4>
        <OptionPicker
          label="Select size"
          options={[
            { value: 'xs', label: 'XS', unavailable: true },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL', unavailable: true },
          ]}
          value={selectedSize}
          onValueChange={setSelectedSize}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-ink-soft">Quantity</h4>
        <QuantityStepper
          value={qty}
          min={1}
          max={10}
          onChange={setQty}
          labels={{
            group: 'Quantity',
            decrease: 'Decrease quantity',
            increase: 'Increase quantity',
          }}
        />
      </div>
    </div>
  )
}

export function OverlayDemos() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dialog
        trigger={<Button variant="primary">Open dialog</Button>}
        title="Example dialog"
        description="Focus is trapped until it closes."
        closeLabel="Close"
      >
        <div className="space-y-3 p-4">
          <p className="text-sm text-ink-soft">
            Dialogs sit on a strong glass pane over a dimmed page.
          </p>
          <Button variant="secondary" className="w-full">
            Confirm
          </Button>
        </div>
      </Dialog>

      <Dialog
        trigger={<Button variant="secondary">Open drawer</Button>}
        title="Bag"
        description="Slides in from the right edge."
        closeLabel="Close drawer"
        side="right"
      >
        <div className="space-y-4 p-4">
          <p className="text-sm text-ink-soft">Drawer content with a focus trap.</p>
        </div>
      </Dialog>
    </div>
  )
}

export function MotionReplayDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="space-y-4 border border-ink/10 bg-surface p-6">
      <Button variant="secondary" onClick={() => setKey((k) => k + 1)}>
        Replay page transition
      </Button>
      <div key={key} className="prysm-page-transition glass max-w-md p-6 text-sm text-ink-soft">
        A page fades in and settles 10px upward over 300ms. Reduced motion shortens it to a plain
        120ms fade.
      </div>
    </div>
  )
}
