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

  it('records recent searches without duplicates and caps size', () => {
    const { addRecentSearch } = useUiStore.getState()
    addRecentSearch('jacket')
    addRecentSearch('coat')
    addRecentSearch('jacket') // moves to front, no duplicate
    addRecentSearch('sweater')
    addRecentSearch('cardigan')
    addRecentSearch('blazer')
    addRecentSearch('trench')

    const searches = useUiStore.getState().recentSearches
    expect(searches[0]).toBe('trench')
    expect(searches[1]).toBe('blazer')
    expect(searches).not.toContain('coat') // pushed out by cap of 5
    expect(searches.length).toBeLessThanOrEqual(5)
  })

  it('clears recent searches', () => {
    const { addRecentSearch, clearRecentSearches } = useUiStore.getState()
    addRecentSearch('merino')
    clearRecentSearches()
    expect(useUiStore.getState().recentSearches).toEqual([])
  })
})
