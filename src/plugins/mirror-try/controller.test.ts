import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setLatency } from './api'
import * as camera from './camera'
import * as mirrorTry from './controller'
import type { MirrorTryProduct } from './types'

vi.mock('./camera', () => ({
  start: vi.fn(async () => {}),
  stop: vi.fn(),
  attach: vi.fn(),
  hasChoice: vi.fn(async () => false),
  switchCamera: vi.fn(async () => {}),
  capture: vi.fn(() => 'data:image/jpeg;base64,frame'),
  describe: vi.fn(() => 'Camera access is blocked.'),
}))

const coat: MirrorTryProduct = {
  id: 'coat',
  name: 'Wool Coat',
  category: 'clothing',
  subcategory: 'outerwear',
  sizes: ['S', 'M', 'L'],
}
const skirt: MirrorTryProduct = {
  id: 'skirt',
  name: 'Linen Skirt',
  category: 'clothing',
  subcategory: 'skirts',
}

const state = () => mirrorTry.getState()
/** Scan (about 7.5s) plus the start-up pause, with room to spare. */
const toLive = () => vi.advanceTimersByTimeAsync(16_000)

beforeEach(() => {
  vi.useFakeTimers()
  setLatency(0)
  mirrorTry.reset()
  mirrorTry.init({ storeId: 'test', storeName: 'Test Store' })
})

afterEach(() => {
  mirrorTry.reset()
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('opening the window', () => {
  it('opens without a product from the floating card', () => {
    mirrorTry.open()
    expect(state()).toMatchObject({ open: true, mounted: true, product: null, phase: 'idle' })
  })

  it('carries the product a trigger was pressed on', () => {
    mirrorTry.open(coat)
    expect(state().product).toEqual(coat)
    mirrorTry.minimize()
    expect(state()).toMatchObject({ open: false, product: coat, focusLauncher: true })
  })
})

describe('a trial', () => {
  it('measures, starts and runs once the camera is on', async () => {
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    expect(state().phase).toBe('measuring')

    await toLive()
    expect(state().phase).toBe('live')
    expect(state().measurements).toMatchObject({ bodyPart: 'upper', size: 'M', source: 'scan' })
    expect(state().startedAt).not.toBeNull()
  })

  it('waits for a piece when it was opened from the floating card', async () => {
    mirrorTry.open()
    await mirrorTry.enableCamera()
    await toLive()
    expect(state().phase).toBe('ready')

    mirrorTry.open(skirt)
    expect(state().phase).toBe('initiating')
    expect(state().measurements?.bodyPart).toBe('lower')
  })

  it('uses typed measurements straight away', async () => {
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    mirrorTry.openSheet()
    mirrorTry.submitMeasurements({
      bodyPart: 'upper',
      size: 'L',
      fit: 'relaxed',
      values: { chest: 104 },
      source: 'custom',
    })
    expect(state()).toMatchObject({ phase: 'initiating', sheet: false })
    expect(state().measurements).toMatchObject({ size: 'L', source: 'custom' })
  })

  it('holds the trial while the measurements form is open', async () => {
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    mirrorTry.openSheet()
    await toLive()
    expect(state().phase).toBe('measuring')
    mirrorTry.closeSheet()
    expect(state().phase).toBe('initiating')
  })

  it('switches piece mid-trial', async () => {
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    await toLive()
    mirrorTry.open(skirt)
    expect(state()).toMatchObject({ phase: 'initiating', product: skirt })
  })

  it('explains a blocked camera', async () => {
    vi.mocked(camera.start).mockRejectedValueOnce(new DOMException('no', 'NotAllowedError'))
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    expect(state()).toMatchObject({ phase: 'blocked', cameraError: 'Camera access is blocked.' })
  })
})

describe('saving', () => {
  it('asks a guest to log in, then saves the session it was asked to', async () => {
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    await toLive()
    mirrorTry.endTrial()
    expect(state().phase).toBe('ended')

    await mirrorTry.saveSession()
    expect(state()).toMatchObject({ view: 'login', pending: 'save-session' })

    const failure = mirrorTry.logIn('john@gmail.com', 'John123!')
    await vi.runAllTimersAsync()
    expect(await failure).toBeNull()
    expect(state()).toMatchObject({ phase: 'idle', view: 'trial', pending: null })
    expect(state().history).toHaveLength(1)
    expect(state().history[0]).toMatchObject({
      productName: 'Wool Coat',
      size: 'M',
      storeName: 'Test Store',
      thumbnail: 'data:image/jpeg;base64,frame',
    })
    expect(camera.stop).toHaveBeenCalled()
  })

  it('saves during a trial and then ends without asking again', async () => {
    const login = mirrorTry.logIn('john@gmail.com', 'John123!')
    await vi.runAllTimersAsync()
    await login
    mirrorTry.open(coat)
    await mirrorTry.enableCamera()
    await toLive()

    const saving = mirrorTry.saveTrial()
    await vi.runAllTimersAsync()
    await saving
    expect(state().savedTrialId).not.toBeNull()

    mirrorTry.endTrial()
    expect(state().phase).toBe('idle')
    expect(state().history).toHaveLength(1)
  })

  it('reports a wrong password to the form', async () => {
    const result = mirrorTry.logIn('john@gmail.com', 'wrong-pass1')
    await vi.runAllTimersAsync()
    expect(await result).toMatch(/not right/)
    expect(state().user).toBeNull()
  })
})
