import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...rest }: InputProps) {
  return <input className={cn(className)} {...rest} />
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
    <div data-invalid={error ? '' : undefined}>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint ? <p id={hintId}>{hint}</p> : null}
      {error ? (
        <p id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
