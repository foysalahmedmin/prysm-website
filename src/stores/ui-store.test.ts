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

  it('records recently viewed products without duplicates and caps size', () => {
    const { recordProductView } = useUiStore.getState()
    recordProductView('p-01')
    recordProductView('p-02')
    recordProductView('p-03')
    recordProductView('p-01') // moves to front
    recordProductView('p-04')
    recordProductView('p-05')
    recordProductView('p-06')
    recordProductView('p-07')
    recordProductView('p-08')
    recordProductView('p-09')

    const viewed = useUiStore.getState().recentlyViewedIds
    expect(viewed[0]).toBe('p-09')
    expect(viewed).toContain('p-01')
    expect(viewed).not.toContain('p-02') // pushed out by cap of 8
    expect(viewed.length).toBeLessThanOrEqual(8)
  })

  it('clears recently viewed products', () => {
    const { recordProductView, clearRecentlyViewed } = useUiStore.getState()
    recordProductView('p-01')
    clearRecentlyViewed()
    expect(useUiStore.getState().recentlyViewedIds).toEqual([])
  })
})
