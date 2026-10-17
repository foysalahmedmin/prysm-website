import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  // Tests that opt into the node environment (for example the lint fence test) have no window.
  if (typeof window !== 'undefined') window.localStorage.clear()
})
