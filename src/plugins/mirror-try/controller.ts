import * as api from './api'
import * as camera from './camera'
import { measurementsFor, scanFor } from './fit'
import type { Account, Measurements, MirrorTryConfig, MirrorTryProduct, TrialRecord } from './types'

/**
 * Everything the plugin knows, in one place, outside React. Store pages talk to it through
 * `openMirrorTry`; the panel renders it and calls the actions below.
 */

export type View =
  | 'trial'
  | 'login'
  | 'signup'
  | 'forgot'
  | 'otp'
  | 'new-password'
  | 'profile'
  | 'edit-profile'
  | 'change-password'

/**
 * idle → requesting → measuring → initiating → live → ended
 *                  ↘ blocked     ↘ ready (no piece chosen yet)
 */
export type Phase =
  'idle' | 'requesting' | 'blocked' | 'measuring' | 'ready' | 'initiating' | 'live' | 'ended'

export interface MirrorTryState {
  config: MirrorTryConfig | null
  /** True once the panel has been opened in this page view; it then stays mounted. */
  mounted: boolean
  open: boolean
  maximized: boolean
  product: MirrorTryProduct | null
  view: View
  phase: Phase
  cameraError: string | null
  hasCameraChoice: boolean
  /** Scan progress, 0 to 100. */
  progress: number
  /** The custom measurements form is open. */
  sheet: boolean
  measurements: Measurements | null
  startedAt: number | null
  endedAt: number | null
  savedTrialId: string | null
  saving: boolean
  user: Account | null
  history: TrialRecord[]
  /** What to finish once the shopper has logged in. */
  pending: 'save-trial' | 'save-session' | null
  /** The email or phone number a password reset is for. */
  resetFor: string | null
  resetSentTo: string | null
  notice: { id: number; text: string } | null
  focusLauncher: boolean
}

const INITIAL: MirrorTryState = {
  config: null,
  mounted: false,
  open: false,
  maximized: false,
  product: null,
  view: 'trial',
  phase: 'idle',
  cameraError: null,
  hasCameraChoice: false,
  progress: 0,
  sheet: false,
  measurements: null,
  startedAt: null,
  endedAt: null,
  savedTrialId: null,
  saving: false,
  user: null,
  history: [],
  pending: null,
  resetFor: null,
  resetSentTo: null,
  notice: null,
  focusLauncher: false,
}

/** How long the demo takes to measure and to start a trial. */
export const TIMING = { scanTick: 150, initiate: 2400 }

let state = INITIAL
const listeners = new Set<() => void>()
let scanTimer: ReturnType<typeof setInterval> | null = null
let initiateTimer: ReturnType<typeof setTimeout> | null = null
let initiated = false
let noticeId = 0

function set(patch: Partial<MirrorTryState>) {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

export function getState(): MirrorTryState {
  return state
}

export function getServerState(): MirrorTryState {
  return INITIAL
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Tests only: back to a fresh page view. */
export function reset() {
  snapshot = null
  clearTimers()
  camera.stop()
  state = INITIAL
  listeners.forEach((listener) => listener())
}

function clearTimers() {
  if (scanTimer) clearInterval(scanTimer)
  if (initiateTimer) clearTimeout(initiateTimer)
  scanTimer = null
  initiateTimer = null
  initiated = false
}

export function notify(text: string) {
  noticeId += 1
  set({ notice: { id: noticeId, text } })
}

export function dismissNotice(id: number) {
  if (state.notice?.id === id) set({ notice: null })
}

const firstName = (user: Account) => user.name.split(' ')[0] || user.name

// ——— Set-up and window ———————————————————————————————————————————————

export function init(config: MirrorTryConfig) {
  const user = api.currentUser()
  set({ config, user, history: user ? api.listTrials(user.id) : [] })
}

/** Opens the panel. With a product, the trial switches to that piece. */
export function open(product?: MirrorTryProduct | null) {
  const patch: Partial<MirrorTryState> = { open: true, mounted: true, focusLauncher: false }
  if (product) {
    const changed = state.product?.id !== product.id
    patch.product = product
    patch.view = 'trial'
    patch.pending = null
    if (changed && state.measurements) {
      patch.measurements = measurementsFor(product, state.measurements)
    }
    set(patch)
    if (changed && ['ready', 'initiating', 'live', 'ended'].includes(state.phase)) {
      set({ sheet: false })
      startInitiating()
    }
    return
  }
  set(patch)
}

export function minimize() {
  set({ open: false, maximized: false, focusLauncher: true })
}

export function toggleMaximize() {
  set({ maximized: !state.maximized })
}

export function launcherFocused() {
  if (state.focusLauncher) set({ focusLauncher: false })
}

// ——— Camera and trial ———————————————————————————————————————————————

export async function enableCamera() {
  if (state.phase === 'requesting') return
  set({ phase: 'requesting', cameraError: null })
  try {
    await camera.start()
  } catch (error) {
    set({ phase: 'blocked', cameraError: camera.describe(error) })
    return
  }
  startScan()
  void camera.hasChoice().then((hasCameraChoice) => set({ hasCameraChoice }))
}

export async function switchCamera() {
  try {
    await camera.switchCamera()
  } catch (error) {
    notify(camera.describe(error))
  }
}

function startScan() {
  clearTimers()
  set({ phase: 'measuring', progress: 0, measurements: null, sheet: false })
  scanTimer = setInterval(() => {
    const progress = Math.min(100, state.progress + 1.2 + Math.random() * 1.6)
    set({ progress })
    if (progress < 100) return
    if (scanTimer) clearInterval(scanTimer)
    scanTimer = null
    if (!state.sheet) applyMeasurements(scanFor(state.product))
  }, TIMING.scanTick)
}

function applyMeasurements(measurements: Measurements) {
  clearTimers()
  set({ measurements, sheet: false, progress: 100 })
  if (state.product) startInitiating()
  else set({ phase: 'ready' })
}

function startInitiating() {
  clearTimers()
  set({ phase: 'initiating', startedAt: null, endedAt: null, savedTrialId: null })
  initiateTimer = setTimeout(() => {
    initiateTimer = null
    initiated = true
    if (!state.sheet) goLive()
  }, TIMING.initiate)
}

function goLive() {
  initiated = false
  set({ phase: 'live', startedAt: Date.now() })
}

export function openSheet() {
  set({ sheet: true })
}

/** Closing the form without submitting carries on with whatever was running behind it. */
export function closeSheet() {
  set({ sheet: false })
  if (state.phase === 'measuring' && state.progress >= 100)
    applyMeasurements(scanFor(state.product))
  else if (state.phase === 'initiating' && initiated) goLive()
}

export function submitMeasurements(measurements: Measurements) {
  applyMeasurements({ ...measurements, source: 'custom' })
}

function elapsedSeconds(): number {
  if (!state.startedAt) return 0
  return Math.max(0, Math.round(((state.endedAt ?? Date.now()) - state.startedAt) / 1000))
}

/**
 * The frame to keep with a saved trial, taken when the shopper asks to save (or ends the trial),
 * not later: by then they may be on the login screen with the camera out of view.
 */
let snapshot: string | null = null

async function storeTrial(): Promise<boolean> {
  const { user, product, measurements, config } = state
  if (!user) return false
  set({ saving: true })
  try {
    const record = await api.saveTrial(user.id, {
      productId: product?.id ?? null,
      productName: product?.name ?? 'Size check',
      size: measurements?.size ?? null,
      storeName: config?.storeName ?? '',
      thumbnail: snapshot ?? camera.capture(),
      durationSec: elapsedSeconds(),
    })
    snapshot = null
    set({ savedTrialId: record.id, history: [record, ...state.history], saving: false })
    return true
  } catch {
    set({ saving: false })
    notify('The trial was not saved. Try again.')
    return false
  }
}

/** The "Save" button on the camera while a trial runs. */
export async function saveTrial() {
  if (state.saving || state.savedTrialId) return
  snapshot = camera.capture()
  if (!state.user) {
    set({ pending: 'save-trial', view: 'login' })
    notify('Log in to save this trial')
    return
  }
  if (await storeTrial()) notify('Saved to your trial history')
}

export function endTrial() {
  if (state.phase !== 'live') return
  if (!state.savedTrialId) snapshot = camera.capture()
  set({ endedAt: Date.now() })
  if (state.savedTrialId) finish('Trial ended. It is in your trial history.')
  else set({ phase: 'ended' })
}

export async function saveSession() {
  if (state.saving) return
  if (!state.user) {
    set({ pending: 'save-session', view: 'login' })
    notify('Log in to save this session')
    return
  }
  if (await storeTrial()) finish('Session saved to your trial history')
}

export function discardSession() {
  finish('Trial ended')
}

function finish(message: string) {
  snapshot = null
  clearTimers()
  camera.stop()
  set({
    phase: 'idle',
    progress: 0,
    sheet: false,
    measurements: null,
    startedAt: null,
    endedAt: null,
    savedTrialId: null,
    hasCameraChoice: false,
  })
  notify(message)
}

// ——— Account ———————————————————————————————————————————————————————

const BACK: Record<View, View> = {
  trial: 'trial',
  login: 'trial',
  signup: 'login',
  forgot: 'login',
  otp: 'forgot',
  'new-password': 'otp',
  profile: 'trial',
  'edit-profile': 'profile',
  'change-password': 'edit-profile',
}

export function showView(view: View) {
  set({ view, sheet: false })
}

export function back() {
  set({ view: BACK[state.view] })
}

export function closeView() {
  set({ view: 'trial', pending: null })
}

export function openAccount() {
  set({ view: state.user ? 'profile' : 'login', sheet: false })
}

const API_MESSAGES: Record<api.ApiErrorCode, string> = {
  'invalid-credentials': 'That email, phone number or password is not right.',
  'email-taken': 'An account already uses this email. Log in instead.',
  'phone-taken': 'An account already uses this phone number. Log in instead.',
  'not-found': 'We could not find an account with that email or phone number.',
  'invalid-code': 'Enter the 4-digit code we sent you.',
}

function messageFor(error: unknown): string {
  return error instanceof api.ApiError
    ? API_MESSAGES[error.code]
    : 'Something went wrong. Try again.'
}

/** Runs an account call. Resolves to an error message for the form, or null on success. */
async function attempt(task: () => Promise<void>): Promise<string | null> {
  try {
    await task()
    return null
  } catch (error) {
    return messageFor(error)
  }
}

async function signedIn(user: Account) {
  const pending = state.pending
  set({ user, history: api.listTrials(user.id), pending: null })
  if (pending === 'save-trial' && state.phase === 'live') {
    set({ view: 'trial' })
    if (await storeTrial()) notify(`Welcome, ${firstName(user)}. Trial saved.`)
    return
  }
  if (pending === 'save-session' && state.phase === 'ended') {
    set({ view: 'trial' })
    if (await storeTrial()) finish(`Welcome, ${firstName(user)}. Session saved.`)
    return
  }
  set({ view: 'profile' })
  notify(`Welcome, ${firstName(user)}`)
}

export function logIn(identifier: string, password: string) {
  return attempt(async () => signedIn(await api.logIn(identifier, password)))
}

export function logInWithGoogle() {
  return attempt(async () => signedIn(await api.logInWithGoogle()))
}

export function signUp(input: api.SignUpInput) {
  return attempt(async () => signedIn(await api.signUp(input)))
}

export function logOut() {
  api.logOut()
  set({ user: null, history: [], view: 'trial', pending: null })
  notify('You are logged out')
}

/** "Forgot Password" on the login screen, carrying over whatever was typed there. */
export function forgotPassword(identifier: string) {
  set({ view: 'forgot', resetFor: identifier.trim() || null })
}

export function requestReset(identifier: string) {
  return attempt(async () => {
    const sentTo = await api.requestReset(identifier)
    set({ resetFor: identifier.trim(), resetSentTo: sentTo, view: 'otp' })
  })
}

export function resendCode() {
  return attempt(async () => {
    if (!state.resetFor) return
    await api.requestReset(state.resetFor)
    notify(`We sent a new code to ${state.resetSentTo ?? 'you'}`)
  })
}

export function verifyCode(code: string) {
  return attempt(async () => {
    await api.verifyCode(state.resetFor ?? '', code)
    set({ view: 'new-password' })
  })
}

export function resetPassword(password: string) {
  return attempt(async () => {
    await api.resetPassword(state.resetFor ?? '', password)
    set({ view: 'login' })
    notify('Password changed. Log in with your new password.')
  })
}

export function updateProfile(input: api.ProfileInput) {
  return attempt(async () => {
    if (!state.user) return
    const user = await api.updateProfile(state.user.id, input)
    set({ user, view: 'profile' })
    notify('Profile saved')
  })
}

export function changePassword(current: string, next: string) {
  return attempt(async () => {
    if (!state.user) return
    await api.changePassword(state.user.id, current, next)
    set({ view: 'profile' })
    notify('Password changed')
  })
}

export async function deleteTrial(trialId: string) {
  const user = state.user
  if (!user) return
  const before = state.history
  set({ history: before.filter((trial) => trial.id !== trialId) })
  try {
    await api.deleteTrial(user.id, trialId)
    notify('Trial removed')
  } catch {
    set({ history: before })
    notify('The trial was not removed. Try again.')
  }
}
