import { Price, Tabs, TextField } from '@/components/ui'
import { DialogDemo } from './dialog-demo'

// Living style guide. Every section carries data-ds-section so e2e can assert coverage.
// Each store extends this page with every component and state in its own design system.
export default function DesignSystemPage() {
  return (
    <>
      <h1>Design system</h1>
      <section data-ds-section="forms" aria-labelledby="ds-forms">
        <h2 id="ds-forms">Forms</h2>
        <TextField label="Email" hint="We never share it" />
        <TextField label="Postcode" error="Enter a valid postcode" />
      </section>
      <section data-ds-section="commerce" aria-labelledby="ds-commerce">
        <h2 id="ds-commerce">Commerce</h2>
        <Price
          amount={26000}
          compareAt={32000}
          currency="USD"
          locale="en-US"
          labels={{ sale: 'Sale price', original: 'Original price' }}
        />
      </section>
      <section data-ds-section="navigation" aria-labelledby="ds-nav">
        <h2 id="ds-nav">Navigation</h2>
        <Tabs
          label="Example tabs"
          items={[
            { value: 'a', label: 'Details', content: 'Detail text' },
            { value: 'b', label: 'Care', content: 'Care text' },
          ]}
        />
      </section>
      <section data-ds-section="overlays" aria-labelledby="ds-overlays">
        <h2 id="ds-overlays">Overlays</h2>
        <DialogDemo />
      </section>
    </>
  )
}
