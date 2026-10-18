import { beforeEach, describe, expect, it } from 'vitest'
import * as api from './api'

beforeEach(() => {
  api.setLatency(0)
  window.localStorage.clear()
})

describe('the demo account service', () => {
  it('lets the presenter log in with the account from the design files', async () => {
    const user = await api.logIn('john@gmail.com', 'John123!')
    expect(user.name).toBe('John Doe')
    expect(api.currentUser()?.id).toBe(user.id)
    expect(user).not.toHaveProperty('secret')
  })

  it('accepts a phone number in place of the email', async () => {
    await expect(api.logIn('555 010 0199', 'John123!')).resolves.toMatchObject({
      email: 'john@gmail.com',
    })
  })

  it('rejects a wrong password', async () => {
    await expect(api.logIn('john@gmail.com', 'nope12345')).rejects.toMatchObject({
      code: 'invalid-credentials',
    })
  })

  it('signs a new shopper up and refuses a second account on the same email', async () => {
    const user = await api.signUp({
      name: 'Ada Park',
      email: 'Ada@Example.com',
      password: 'abc12345',
    })
    expect(user.email).toBe('ada@example.com')
    api.logOut()
    expect(api.currentUser()).toBeNull()
    await expect(
      api.signUp({ name: 'Ada Two', email: 'ada@example.com', password: 'abc12345' }),
    ).rejects.toMatchObject({ code: 'email-taken' })
  })

  it('resets a password with a four-digit code', async () => {
    await expect(api.requestReset('john@gmail.com')).resolves.toBe('j•••@gmail.com')
    await expect(api.verifyCode('john@gmail.com', '12')).rejects.toMatchObject({
      code: 'invalid-code',
    })
    await api.verifyCode('john@gmail.com', '8483')
    await api.resetPassword('john@gmail.com', 'NewPass99')
    await expect(api.logIn('john@gmail.com', 'NewPass99')).resolves.toBeTruthy()
  })

  it('does not reset a password for an unknown account', async () => {
    await expect(api.requestReset('nobody@example.com')).rejects.toMatchObject({
      code: 'not-found',
    })
  })

  it('signs in with Google without a password', async () => {
    const user = await api.logInWithGoogle()
    expect(user.provider).toBe('google')
    await expect(api.logIn(user.email, 'anything1')).rejects.toMatchObject({
      code: 'invalid-credentials',
    })
  })

  it('keeps, lists and deletes saved trials per account', async () => {
    const user = await api.logIn('john@gmail.com', 'John123!')
    const saved = await api.saveTrial(user.id, {
      productId: 'p-1',
      productName: 'Wool Coat',
      size: 'M',
      storeName: 'Test Store',
      thumbnail: null,
      durationSec: 14,
    })
    expect(api.listTrials(user.id)).toEqual([saved])
    await api.deleteTrial(user.id, saved.id)
    expect(api.listTrials(user.id)).toEqual([])
  })
})
