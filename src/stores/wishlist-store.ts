import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistOptions } from './persist'

interface WishlistState {
  productIds: string[]
  toggle: (productId: string) => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      clear: () => set({ productIds: [] }),
    }),
    { ...persistOptions('wishlist'), partialize: (state) => ({ productIds: state.productIds }) },
  ),
)

export const selectIsSaved = (productId: string) => (state: Pick<WishlistState, 'productIds'>) =>
  state.productIds.includes(productId)
