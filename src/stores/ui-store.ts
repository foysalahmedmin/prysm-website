import { create } from 'zustand'

type Panel = 'cart' | 'search' | 'menu'

const MAX_RECENT_SEARCHES = 5

interface UiState {
  open: Panel | null
  openPanel: (panel: Panel) => void
  closePanel: () => void
  recentSearches: string[]
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
}

/** One panel at a time: opening the cart closes search and the menu. Stores recent search history. */
export const useUiStore = create<UiState>()((set) => ({
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
}))
