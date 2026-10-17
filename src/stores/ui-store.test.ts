import { beforeEach, describe, expect, it } from 'vitest'
import { useUiStore } from './ui-store'

beforeEach(() => {
  useUiStore.setState(useUiStore.getInitialState())
})

describe('ui store', () => {
  it('opens one panel at a time', () => {
    useUiStore.getState().openPanel('cart')
    useUiStore.getState().openPanel('search')
    expect(useUiStore.getState().open).toBe('search')
  })

  it('closes the open panel', () => {
    useUiStore.getState().openPanel('menu')
    useUiStore.getState().closePanel()
    expect(useUiStore.getState().open).toBeNull()
  })
})
