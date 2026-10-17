'use client'

import { useRef, useState } from 'react'
import { Button, OptionPicker, QuantityStepper, Dialog } from '@/components/ui'
import { usePointerAngle } from '@/lib/motion'
import { Sparkle } from '@/components/icons'

export function PointerAngleDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  usePointerAngle(cardRef)

  return (
    <div
      ref={cardRef}
      className="glass-strong prismatic-edge flex max-w-sm cursor-crosshair flex-col items-center justify-center rounded-2xl p-6 text-center transition-transform hover:scale-[1.02]"
    >
      <Sparkle size={32} className="mb-2 text-[var(--color-ink)]" />
      <h3 className="text-lg font-medium text-[var(--color-ink)]">Dynamic Prismatic Edge</h3>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        Move your pointer around this card. The edge refraction angle tracks cursor position.
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
        <h4 className="mb-3 text-sm font-medium text-[var(--color-ink-soft)]">
          Size Options (52px Rounded Squares)
        </h4>
        <OptionPicker
          label="Select Size"
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
        <h4 className="mb-3 text-sm font-medium text-[var(--color-ink-soft)]">
          Quantity Stepper (Pill Glass)
        </h4>
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
          <p className="text-sm text-[var(--color-ink-soft)]">
            PRYSM modals enter with glass-strong background and 8px blur-in.
          </p>
          <Button variant="secondary" className="w-full">
            Confirm Action
          </Button>
        </div>
      </Dialog>

      <Dialog
        trigger={
          <Button variant="secondary" className="glass">
            Open Drawer (Side Sheet)
          </Button>
        }
        title="Shopping Drawer"
        description="Slides from the right edge with glass scrim."
        closeLabel="Close drawer"
        side="right"
      >
        <div className="space-y-4 p-4">
          <p className="text-sm text-[var(--color-ink-soft)]">Drawer content with focus trap.</p>
        </div>
      </Dialog>
    </div>
  )
}

export function MotionReplayDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="space-y-4">
      <Button variant="secondary" className="glass" onClick={() => setKey((k) => k + 1)}>
        Replay Page Transition Animation
      </Button>
      <div
        key={key}
        className="prysm-page-transition glass max-w-md rounded-2xl p-6 text-sm text-[var(--color-ink-soft)]"
      >
        Page transition enters with smooth cross-fade and 8px blur reduction (300ms glide).
      </div>
    </div>
  )
}
