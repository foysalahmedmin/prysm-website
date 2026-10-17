import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'glass glass-strong h-12 w-full rounded-[16px] px-4 font-text text-ink placeholder:text-ink-faint',
        'border border-border-strong transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus focus-visible:border-transparent',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...rest}
    />
  )
}

export interface TextFieldProps extends Omit<InputProps, 'id'> {
  label: string
  hint?: string
  error?: string
}

/** A labelled input. Hint and error text are announced with the field via aria-describedby. */
export function TextField({ label, hint, error, className, ...rest }: TextFieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5" data-invalid={error ? '' : undefined}>
      <label htmlFor={id} className="font-text text-sm font-medium text-ink">
        {label}
      </label>
      <Input
        id={id}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="font-text text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="font-text text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
