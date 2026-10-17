import { create } from 'zustand'

type Panel = 'cart' | 'search' | 'menu'

interface UiState {
  open: Panel | null
  openPanel: (panel: Panel) => void
  closePanel: () => void
}

/** One panel at a time: opening the cart closes search and the menu. Not persisted. */
export const useUiStore = create<UiState>()((set) => ({
  open: null,
  openPanel: (panel) => set({ open: panel }),
  closePanel: () => set({ open: null }),
}))
