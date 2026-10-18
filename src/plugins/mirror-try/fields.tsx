'use client'

import {
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ClipboardEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react'
import { ChevronDownIcon, EyeIcon, EyeOffIcon, Spinner } from './icons'

interface Shell {
  label: string
  error?: string | null
}

function useFieldIds(error?: string | null) {
  const id = useId()
  const errorId = `${id}-error`
  return {
    id,
    errorId,
    described: {
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
    },
  }
}

function FieldError({ id, error }: { id: string; error?: string | null }) {
  return error ? (
    <p id={id} className="error">
      {error}
    </p>
  ) : null
}

export function TextField({
  label,
  error,
  suffix,
  ...input
}: Shell & { suffix?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const { id, errorId, described } = useFieldIds(error)
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {suffix ? <span className="sr-only"> ({suffix})</span> : null}
      </label>
      <div className="control">
        <input
          id={id}
          className="input"
          data-suffix={suffix ? '' : undefined}
          {...described}
          {...input}
        />
        {suffix ? (
          <span className="suffix" aria-hidden="true">
            {suffix}
          </span>
        ) : null}
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  )
}

export function PasswordField({
  label,
  error,
  ...input
}: Shell & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  const { id, errorId, described } = useFieldIds(error)
  const [visible, setVisible] = useState(false)
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          className="input"
          type={visible ? 'text' : 'password'}
          data-reveal=""
          {...described}
          {...input}
        />
        <button
          type="button"
          className="reveal"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? <EyeOffIcon size={19} /> : <EyeIcon size={19} />}
        </button>
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  )
}

export function SelectField({
  label,
  error,
  options,
  ...select
}: Shell & {
  options: { value: string; label: string }[]
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const { id, errorId, described } = useFieldIds(error)
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <select id={id} className="input" {...described} {...select}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="chevron" size={18} />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  )
}

const OTP_LENGTH = 4

export function OtpField({
  label,
  error,
  value,
  onChange,
}: Shell & { value: string; onChange: (value: string) => void }) {
  const groupId = useId()
  const errorId = `${groupId}-error`
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? '')

  const put = (index: number, digit: string) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join('').slice(0, OTP_LENGTH))
  }

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      put(index - 1, '')
      inputs.current[index - 1]?.focus()
      event.preventDefault()
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    event.preventDefault()
    onChange(pasted)
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  return (
    <div className="field">
      <span className="label" id={groupId}>
        {label}
      </span>
      <div
        className="otp"
        role="group"
        aria-labelledby={groupId}
        aria-describedby={error ? errorId : undefined}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element
            }}
            className="input"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
            aria-invalid={error ? true : undefined}
            value={digit}
            onKeyDown={onKeyDown(index)}
            onPaste={onPaste}
            onChange={(event) => {
              const digitTyped = event.target.value.replace(/\D/g, '').slice(-1)
              put(index, digitTyped)
              if (digitTyped && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus()
            }}
          />
        ))}
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  )
}

export function PrimaryButton({
  busy,
  children,
  className,
  disabled,
  type = 'button',
  onClick,
  ...button
}: { busy?: boolean; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  // A busy button keeps focus (no `disabled`) but ignores presses until the work is done.
  return (
    <button
      {...button}
      type={type}
      className={className ? `btn ${className}` : 'btn'}
      aria-busy={busy || undefined}
      aria-disabled={busy || undefined}
      disabled={disabled}
      onClick={(event) => {
        if (busy) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
    >
      {busy ? <Spinner size={18} /> : null}
      {children}
    </button>
  )
}
