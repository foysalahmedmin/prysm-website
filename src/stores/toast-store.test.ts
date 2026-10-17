import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useToastStore } from './toast-store'

beforeEach(() => {
  useToastStore.setState({ toasts: [] })
  vi.useRealTimers()
})

describe('toast store', () => {
  it('adds a toast and allows manual dismissal', () => {
    const id = useToastStore.getState().showToast({ message: 'Added to bag', type: 'success' })
    expect(useToastStore.getState().toasts).toHaveLength(1)
    expect(useToastStore.getState().toasts[0].message).toBe('Added to bag')

    useToastStore.getState().dismissToast(id)
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })

  it('accepts string shorthand message', () => {
    useToastStore.getState().showToast('Item saved to wishlist')
    expect(useToastStore.getState().toasts[0].message).toBe('Item saved to wishlist')
    expect(useToastStore.getState().toasts[0].type).toBe('info')
  })

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers()
    useToastStore.getState().showToast({ message: 'Auto disappear', duration: 3000 })
    expect(useToastStore.getState().toasts).toHaveLength(1)

    vi.advanceTimersByTime(3100)
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })
})
