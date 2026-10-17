'use client'

import { Button, Dialog } from '@/components/ui'

export function DialogDemo() {
  return (
    <Dialog
      trigger={<Button>Open dialog</Button>}
      title="Example dialog"
      description="Focus is trapped until it closes."
      closeLabel="Close"
    >
      <p>Dialog body</p>
    </Dialog>
  )
}
