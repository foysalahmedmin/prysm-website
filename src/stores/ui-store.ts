import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistOptions } from './persist'

type Panel = 'cart' | 'search' | 'menu'

const MAX_RECENT_SEARCHES = 5
const MAX_RECENTLY_VIEWED = 8

interface UiState {
  open: Panel | null
  openPanel: (panel: Panel) => void
  closePanel: () => void
  recentSearches: string[]
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  recentlyViewedIds: string[]
  recordProductView: (productId: string) => void
  clearRecentlyViewed: () => void
}

/** One panel at a time: opening the cart closes search and the menu. Stores recent search history and recently viewed products. */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      open: null,
      openPanel: (panel) => set({ open: panel }),
      closePanel: () => set({ open: null }),
      recentSearches: [],
      addRecentSearch: (query) => {
        const trimmed = query.trim()
        if (!trimmed) return
        set((state) => {
          const filtered = state.recentSearches.filter(
            (item) => item.toLowerCase() !== trimmed.toLowerCase(),
          )
          return {
            recentSearches: [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES),
          }
        })
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
      recentlyViewedIds: [],
      recordProductView: (productId) => {
        if (!productId) return
        set((state) => {
          const filtered = state.recentlyViewedIds.filter((id) => id !== productId)
          return {
            recentlyViewedIds: [productId, ...filtered].slice(0, MAX_RECENTLY_VIEWED),
          }
        })
      },
      clearRecentlyViewed: () => set({ recentlyViewedIds: [] }),
    }),
    {
      ...persistOptions('ui'),
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        recentlyViewedIds: state.recentlyViewedIds,
      }),
    },
  ),
)
