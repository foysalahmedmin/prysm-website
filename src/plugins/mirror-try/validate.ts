/** Form checks. Each returns a message to show under the field, or null when the value is fine. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function checkName(value: string): string | null {
  return value.trim().length >= 2 ? null : 'Enter your full name'
}

export function checkEmail(value: string): string | null {
  if (!value.trim()) return 'Enter your email'
  return EMAIL.test(value.trim()) ? null : 'Enter an email like name@example.com'
}

/** Optional: empty is fine, otherwise 7 to 15 digits. */
export function checkPhone(value: string): string | null {
  if (!value.trim()) return null
  const digits = value.replace(/\D/g, '').length
  return digits >= 7 && digits <= 15 ? null : 'Enter a phone number with 7 to 15 digits'
}

export function checkIdentifier(value: string): string | null {
  const text = value.trim()
  if (!text) return 'Enter your email or phone number'
  if (text.includes('@')) return checkEmail(text)
  return text.replace(/\D/g, '').length >= 7 ? null : 'Enter a valid email or phone number'
}

export function checkPassword(value: string): string | null {
  if (value.length < 8) return 'Use at least 8 characters'
  if (!/\d/.test(value) || !/[a-z]/i.test(value)) return 'Use letters and at least one number'
  return null
}
