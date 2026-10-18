import type { Account, TrialRecord } from './types'

/**
 * A stand-in for the hosted Mirror Try service. It keeps accounts and trial history in this
 * browser's storage and answers after a short delay, so the interface shows its real loading
 * states. Swap this module for HTTP calls when the service is live; nothing else changes.
 */

export type ApiErrorCode =
  'invalid-credentials' | 'email-taken' | 'phone-taken' | 'not-found' | 'invalid-code'

export class ApiError extends Error {
  constructor(readonly code: ApiErrorCode) {
    super(code)
    this.name = 'ApiError'
  }
}

interface StoredAccount extends Account {
  /** A one-way digest. The hosted service hashes on the server; the demo does it here. */
  secret: string | null
}

interface Database {
  accounts: StoredAccount[]
  sessionUserId: string | null
  trials: Record<string, TrialRecord[]>
}

const STORAGE_KEY = 'mirror-try:v1'
const HISTORY_LIMIT = 24

let latency = 450
let memory: Database | null = null

/** Tests set this to 0. */
export function setLatency(ms: number) {
  latency = ms
}

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, latency))

function digest(text: string): string {
  // FNV-1a, twice with different seeds. Enough to keep a demo password out of plain sight.
  let a = 0x811c9dc5
  let b = 0x01000193 ^ 0x5bd1e995
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i)
    a = Math.imul(a ^ code, 0x01000193) >>> 0
    b = Math.imul(b ^ code, 0x5bd1e995) >>> 0
  }
  return `${a.toString(16).padStart(8, '0')}${b.toString(16).padStart(8, '0')}`
}

const secretFor = (password: string) => digest(`mirror-try:${password}`)

/** The demo account from the design files, so a presenter can log in on any store. */
const SEED: StoredAccount = {
  id: 'acc-john-doe',
  name: 'John Doe',
  email: 'john@gmail.com',
  phone: '+1 555 010 0199',
  provider: 'password',
  secret: secretFor('John123!'),
}

const GOOGLE_DEMO = {
  name: 'Jamie Rivera',
  email: 'jamie.rivera@gmail.com',
}

function fresh(): Database {
  return { accounts: [{ ...SEED }], sessionUserId: null, trials: {} }
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

function read(): Database {
  const store = storage()
  if (!store) return (memory ??= fresh())
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return fresh()
    const parsed = JSON.parse(raw) as Database
    if (!Array.isArray(parsed.accounts) || typeof parsed.trials !== 'object') return fresh()
    if (!parsed.accounts.some((account) => account.id === SEED.id)) {
      parsed.accounts.unshift({ ...SEED })
    }
    return parsed
  } catch {
    return fresh()
  }
}

function write(db: Database) {
  const store = storage()
  if (!store) {
    memory = db
    return
  }
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // Storage is full or blocked. The change lasts until the next read, like a dropped request.
  }
}

const normaliseEmail = (email: string) => email.trim().toLowerCase()
const digits = (phone: string) => phone.replace(/\D/g, '')

function findByIdentifier(db: Database, identifier: string): StoredAccount | undefined {
  const value = identifier.trim()
  if (value.includes('@')) {
    const email = normaliseEmail(value)
    return db.accounts.find((account) => account.email === email)
  }
  const phone = digits(value)
  if (phone.length < 6) return undefined
  return db.accounts.find((account) => account.phone && digits(account.phone).endsWith(phone))
}

function publicAccount(account: StoredAccount): Account {
  const { id, name, email, phone, provider } = account
  return { id, name, email, phone, provider }
}

function startSession(db: Database, account: StoredAccount): Account {
  write({ ...db, sessionUserId: account.id })
  return publicAccount(account)
}

/** Masks an email or phone number for "we sent a code to …" messages. */
export function maskIdentifier(identifier: string): string {
  const value = identifier.trim()
  if (value.includes('@')) {
    const [name = '', domain = ''] = value.split('@')
    return `${name.slice(0, 1)}${'•'.repeat(Math.max(2, name.length - 1))}@${domain}`
  }
  const phone = digits(value)
  return `•••• ${phone.slice(-4)}`
}

export function currentUser(): Account | null {
  const db = read()
  const account = db.accounts.find((candidate) => candidate.id === db.sessionUserId)
  return account ? publicAccount(account) : null
}

export async function logIn(identifier: string, password: string): Promise<Account> {
  await wait()
  const db = read()
  const account = findByIdentifier(db, identifier)
  if (!account || account.secret === null || account.secret !== secretFor(password)) {
    throw new ApiError('invalid-credentials')
  }
  return startSession(db, account)
}

export async function logInWithGoogle(): Promise<Account> {
  await wait()
  const db = read()
  let account = db.accounts.find((candidate) => candidate.email === GOOGLE_DEMO.email)
  if (!account) {
    account = {
      id: `acc-${Date.now().toString(36)}`,
      name: GOOGLE_DEMO.name,
      email: GOOGLE_DEMO.email,
      provider: 'google',
      secret: null,
    }
    db.accounts.push(account)
  }
  return startSession(db, account)
}

export interface SignUpInput {
  name: string
  email: string
  phone?: string
  password: string
}

export async function signUp(input: SignUpInput): Promise<Account> {
  await wait()
  const db = read()
  const email = normaliseEmail(input.email)
  if (db.accounts.some((account) => account.email === email)) throw new ApiError('email-taken')
  const phone = input.phone?.trim() || undefined
  if (
    phone &&
    db.accounts.some((account) => account.phone && digits(account.phone) === digits(phone))
  ) {
    throw new ApiError('phone-taken')
  }
  const account: StoredAccount = {
    id: `acc-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: input.name.trim(),
    email,
    phone,
    provider: 'password',
    secret: secretFor(input.password),
  }
  db.accounts.push(account)
  return startSession(db, account)
}

export function logOut() {
  write({ ...read(), sessionUserId: null })
}

/** Starts a password reset. Returns where the code went. */
export async function requestReset(identifier: string): Promise<string> {
  await wait()
  const account = findByIdentifier(read(), identifier)
  if (!account) throw new ApiError('not-found')
  return maskIdentifier(identifier.includes('@') ? account.email : (account.phone ?? identifier))
}

/** The demo accepts any four digits; the hosted service checks the code it sent. */
export async function verifyCode(identifier: string, code: string): Promise<void> {
  await wait()
  if (!findByIdentifier(read(), identifier)) throw new ApiError('not-found')
  if (!/^\d{4}$/.test(code)) throw new ApiError('invalid-code')
}

export async function resetPassword(identifier: string, password: string): Promise<void> {
  await wait()
  const db = read()
  const account = findByIdentifier(db, identifier)
  if (!account) throw new ApiError('not-found')
  account.secret = secretFor(password)
  account.provider = 'password'
  write(db)
}

export interface ProfileInput {
  name: string
  email: string
  phone?: string
}

export async function updateProfile(userId: string, input: ProfileInput): Promise<Account> {
  await wait()
  const db = read()
  const account = db.accounts.find((candidate) => candidate.id === userId)
  if (!account) throw new ApiError('not-found')
  const email = normaliseEmail(input.email)
  if (db.accounts.some((other) => other.id !== userId && other.email === email)) {
    throw new ApiError('email-taken')
  }
  account.name = input.name.trim()
  account.email = email
  account.phone = input.phone?.trim() || undefined
  write(db)
  return publicAccount(account)
}

export async function changePassword(userId: string, current: string, next: string): Promise<void> {
  await wait()
  const db = read()
  const account = db.accounts.find((candidate) => candidate.id === userId)
  if (!account) throw new ApiError('not-found')
  if (account.secret !== null && account.secret !== secretFor(current)) {
    throw new ApiError('invalid-credentials')
  }
  account.secret = secretFor(next)
  write(db)
}

export function listTrials(userId: string): TrialRecord[] {
  return read().trials[userId] ?? []
}

export async function saveTrial(
  userId: string,
  trial: Omit<TrialRecord, 'id' | 'createdAt'>,
): Promise<TrialRecord> {
  await wait()
  const db = read()
  const record: TrialRecord = {
    ...trial,
    id: `trial-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    createdAt: Date.now(),
  }
  db.trials[userId] = [record, ...(db.trials[userId] ?? [])].slice(0, HISTORY_LIMIT)
  write(db)
  return record
}

export async function deleteTrial(userId: string, trialId: string): Promise<void> {
  await wait()
  const db = read()
  db.trials[userId] = (db.trials[userId] ?? []).filter((trial) => trial.id !== trialId)
  write(db)
}
