import { beforeEach, describe, expect, it } from 'vitest'
import { useSessionStore } from './session-store'

describe('useSessionStore', () => {
  beforeEach(() => {
    useSessionStore.getState().clearSession()
  })

  it('starts unauthenticated by default', () => {
    expect(useSessionStore.getState().isAuthenticated).toBe(false)
    expect(useSessionStore.getState().customer).toBeNull()
  })

  it('logs in and logs out successfully', () => {
    useSessionStore.getState().login('collector@example.luxury', 'Elena')
    expect(useSessionStore.getState().isAuthenticated).toBe(true)
    expect(useSessionStore.getState().customer?.email).toBe('collector@example.luxury')
    expect(useSessionStore.getState().customer?.name).toBe('Elena')

    useSessionStore.getState().logout()
    expect(useSessionStore.getState().isAuthenticated).toBe(false)
    expect(useSessionStore.getState().customer).toBeNull()
  })

  it('registers a new customer and sets authenticated', () => {
    useSessionStore.getState().register('Alexander Wright', 'alex@example.com')
    expect(useSessionStore.getState().isAuthenticated).toBe(true)
    expect(useSessionStore.getState().customer?.name).toBe('Alexander Wright')
    expect(useSessionStore.getState().customer?.email).toBe('alex@example.com')
  })

  it('manages addresses: add, set default, and delete', () => {
    const newAddr = useSessionStore.getState().addAddress({
      name: 'Elena Work',
      line1: '500 Tech Boulevard',
      city: 'Stockholm',
      region: 'Stockholm',
      postcode: '112 34',
      country: 'Sweden',
      isDefault: false,
    })

    expect(useSessionStore.getState().addresses.some((a) => a.id === newAddr.id)).toBe(true)

    useSessionStore.getState().setDefaultAddress(newAddr.id!)
    const active = useSessionStore.getState().addresses.find((a) => a.id === newAddr.id)
    expect(active?.isDefault).toBe(true)

    useSessionStore.getState().deleteAddress(newAddr.id!)
    expect(useSessionStore.getState().addresses.some((a) => a.id === newAddr.id)).toBe(false)
  })
})
