import { createJSONStorage } from 'zustand/middleware'
import { brand } from '@/config/brand'

/**
 * Shared persist options. `skipHydration` keeps the server render and the first client render
 * identical; <StoreHydrator /> restores saved state after mount. Keys are brand-prefixed so
 * demo stores served from the same origin never read each other's data.
 */
export function persistOptions(name: string) {
  return {
    name: `${brand.id}:${name}`,
    version: 1,
    skipHydration: true,
    storage: createJSONStorage(() => localStorage),
  }
}
