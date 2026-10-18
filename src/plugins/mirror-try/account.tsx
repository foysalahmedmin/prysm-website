'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  back,
  changePassword,
  closeView,
  deleteTrial,
  forgotPassword,
  logIn,
  logInWithGoogle,
  logOut,
  requestReset,
  resendCode,
  resetPassword,
  showView,
  signUp,
  updateProfile,
  verifyCode,
  type MirrorTryState,
  type View,
} from './controller'
import { OtpField, PasswordField, PrimaryButton, TextField } from './fields'
import { Notice } from './notice'
import { useMirrorTryState } from './hooks'
import {
  BookmarkIcon,
  CameraIcon,
  ChevronLeftIcon,
  CloseIcon,
  GoogleMark,
  Spinner,
  TrashIcon,
  UserIcon,
} from './icons'
import { checkEmail, checkIdentifier, checkName, checkPassword, checkPhone } from './validate'

type Errors<K extends string> = Partial<Record<K | 'form', string>>

/** Runs a submit: validates, shows the first problem, then waits on the account call. */
function useSubmit<K extends string>() {
  const [errors, setErrors] = useState<Errors<K>>({})
  const [busy, setBusy] = useState(false)

  const run = async (
    event: FormEvent<HTMLFormElement>,
    checks: Partial<Record<K, string | null>>,
    action: () => Promise<string | null>,
  ) => {
    event.preventDefault()
    if (busy) return
    const form = event.currentTarget
    const found: Errors<K> = {}
    for (const [key, problem] of Object.entries(checks) as [K, string | null][]) {
      if (problem) found[key] = problem
    }
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setBusy(true)
    const failure = await action()
    // A successful call usually moves to another screen and unmounts this one.
    if (form.isConnected) {
      setBusy(false)
      if (failure) setErrors({ form: failure } as Errors<K>)
    }
  }

  return { errors, busy, run }
}

function Screen({
  title,
  onBack,
  onSubmit,
  submitLabel,
  busy,
  formError,
  footer,
  children,
}: {
  title: string
  onBack?: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel: string
  busy: boolean
  formError?: string
  footer?: ReactNode
  children: ReactNode
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => heading.current?.focus(), [])

  return (
    <form className="screen" noValidate onSubmit={onSubmit} aria-labelledby="mt-screen-title">
      <div className="card">
        <div className="head">
          {onBack ? (
            <button type="button" className="square" aria-label="Back" onClick={onBack}>
              <ChevronLeftIcon size={22} />
            </button>
          ) : null}
          <h3 id="mt-screen-title" ref={heading} tabIndex={-1}>
            {title}
          </h3>
          <button type="button" className="square end" aria-label="Close" onClick={closeView}>
            <CloseIcon size={22} />
          </button>
        </div>
        <Notice variant="banner" />
        {formError ? (
          <p className="form-error" role="alert">
            {formError}
          </p>
        ) : null}
        {children}
      </div>
      <div className="actions">
        <PrimaryButton type="submit" busy={busy}>
          {submitLabel}
        </PrimaryButton>
        {footer}
      </div>
    </form>
  )
}

function SwitchLink({ prompt, label, to }: { prompt: string; label: string; to: View }) {
  return (
    <p className="quiet">
      {prompt}{' '}
      <button type="button" className="text-link" onClick={() => showView(to)}>
        {label}
      </button>
    </p>
  )
}

function GoogleButton() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <div className="divider">or</div>
      <button
        type="button"
        className="google"
        aria-busy={busy || undefined}
        onClick={async () => {
          if (busy) return
          setBusy(true)
          setError(null)
          const failure = await logInWithGoogle()
          setBusy(false)
          if (failure) setError(failure)
        }}
      >
        {busy ? <Spinner size={18} /> : <GoogleMark />}
        Continue with Google
      </button>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  )
}

function LoginScreen() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const { errors, busy, run } = useSubmit<'identifier' | 'password'>()

  return (
    <Screen
      title="Login"
      onBack={back}
      submitLabel="Login"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(
          event,
          {
            identifier: checkIdentifier(identifier),
            password: password ? null : 'Enter your password',
          },
          () => logIn(identifier, password),
        )
      }
      footer={<SwitchLink prompt="Don’t have an account?" label="Sign Up" to="signup" />}
    >
      <div className="fields">
        <TextField
          name="identifier"
          label="Email/Phone Number"
          autoComplete="username"
          placeholder="john@gmail.com"
          value={identifier}
          error={errors.identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />
        <PasswordField
          name="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="button" className="aside" onClick={() => forgotPassword(identifier)}>
          Forgot Password
        </button>
        <GoogleButton />
      </div>
    </Screen>
  )
}

function SignUpScreen() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const { errors, busy, run } = useSubmit<keyof typeof form>()
  const bind = (key: keyof typeof form) => ({
    name: key,
    value: form[key],
    error: errors[key],
    onChange: (event: { target: { value: string } }) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  })

  return (
    <Screen
      title="Sign Up"
      onBack={back}
      submitLabel="Sign Up"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(
          event,
          {
            name: checkName(form.name),
            email: checkEmail(form.email),
            phone: checkPhone(form.phone),
            password: checkPassword(form.password),
            confirm: form.confirm === form.password ? null : 'The passwords do not match',
          },
          () =>
            signUp({
              name: form.name,
              email: form.email,
              phone: form.phone,
              password: form.password,
            }),
        )
      }
      footer={<SwitchLink prompt="Already have an account?" label="Login" to="login" />}
    >
      <div className="fields">
        <TextField
          label="Full Name"
          autoComplete="name"
          placeholder="John Smith"
          {...bind('name')}
        />
        <div className="row">
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="john@gmail.com"
            {...bind('email')}
          />
          <TextField
            label="Phone Number (Optional)"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 010 0199"
            {...bind('phone')}
          />
        </div>
        <div className="row">
          <PasswordField label="Password" autoComplete="new-password" {...bind('password')} />
          <PasswordField
            label="Confirm Password"
            autoComplete="new-password"
            {...bind('confirm')}
          />
        </div>
        <GoogleButton />
      </div>
    </Screen>
  )
}

function ForgotScreen({ prefill }: { prefill: string | null }) {
  const [identifier, setIdentifier] = useState(prefill ?? '')
  const { errors, busy, run } = useSubmit<'identifier'>()
  return (
    <Screen
      title="Reset Password"
      onBack={back}
      submitLabel="Send Code"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(event, { identifier: checkIdentifier(identifier) }, () => requestReset(identifier))
      }
    >
      <div className="fields">
        <p className="hint">
          Enter the email or phone number on your account. We will send you a 4-digit code.
        </p>
        <TextField
          name="identifier"
          label="Email/Phone Number"
          autoComplete="username"
          value={identifier}
          error={errors.identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />
      </div>
    </Screen>
  )
}

function OtpScreen({ sentTo }: { sentTo: string | null }) {
  const [code, setCode] = useState('')
  const [resending, setResending] = useState(false)
  const { errors, busy, run } = useSubmit<'code'>()
  return (
    <Screen
      title="Reset Password"
      onBack={back}
      submitLabel="Submit"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(event, { code: /^\d{4}$/.test(code) ? null : 'Enter all 4 digits' }, () =>
          verifyCode(code),
        )
      }
      footer={
        <p className="quiet">
          Did not get it?{' '}
          <button
            type="button"
            className="text-link"
            aria-busy={resending || undefined}
            onClick={async () => {
              if (resending) return
              setResending(true)
              await resendCode()
              setResending(false)
            }}
          >
            Send a new code
          </button>
        </p>
      }
    >
      <div className="fields">
        {sentTo ? <p className="hint">We sent a code to {sentTo}.</p> : null}
        <OtpField label="Enter OTP" value={code} error={errors.code} onChange={setCode} />
      </div>
    </Screen>
  )
}

function NewPasswordScreen() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const { errors, busy, run } = useSubmit<'password' | 'confirm'>()
  return (
    <Screen
      title="Reset Password"
      onBack={back}
      submitLabel="Save"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(
          event,
          {
            password: checkPassword(password),
            confirm: confirm === password ? null : 'The passwords do not match',
          },
          () => resetPassword(password),
        )
      }
    >
      <div className="fields">
        <PasswordField
          name="password"
          label="New Password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordField
          name="confirm"
          label="Confirm Password"
          autoComplete="new-password"
          value={confirm}
          error={errors.confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </div>
    </Screen>
  )
}

function EditProfileScreen({ state }: { state: MirrorTryState }) {
  const user = state.user
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })
  const { errors, busy, run } = useSubmit<keyof typeof form>()
  const bind = (key: keyof typeof form) => ({
    name: key,
    value: form[key],
    error: errors[key],
    onChange: (event: { target: { value: string } }) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  })

  return (
    <Screen
      title="Edit Profile"
      onBack={back}
      submitLabel="Save"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(
          event,
          {
            name: checkName(form.name),
            email: checkEmail(form.email),
            phone: checkPhone(form.phone),
          },
          () => updateProfile(form),
        )
      }
      footer={
        user?.provider === 'password' ? (
          <p className="quiet">
            <button type="button" className="text-link" onClick={() => showView('change-password')}>
              Change Password
            </button>
          </p>
        ) : null
      }
    >
      <div className="fields">
        <TextField label="Full Name" autoComplete="name" {...bind('name')} />
        <div className="row">
          <TextField label="Email" type="email" autoComplete="email" {...bind('email')} />
          <TextField
            label="Phone Number (Optional)"
            type="tel"
            autoComplete="tel"
            {...bind('phone')}
          />
        </div>
      </div>
    </Screen>
  )
}

function ChangePasswordScreen() {
  const [form, setForm] = useState({ current: '', password: '', confirm: '' })
  const { errors, busy, run } = useSubmit<keyof typeof form>()
  const bind = (key: keyof typeof form) => ({
    name: key,
    value: form[key],
    error: errors[key],
    onChange: (event: { target: { value: string } }) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  })
  return (
    <Screen
      title="Change Password"
      onBack={back}
      submitLabel="Save"
      busy={busy}
      formError={errors.form}
      onSubmit={(event) =>
        run(
          event,
          {
            current: form.current ? null : 'Enter your current password',
            password: checkPassword(form.password),
            confirm: form.confirm === form.password ? null : 'The passwords do not match',
          },
          () => changePassword(form.current, form.password),
        )
      }
    >
      <div className="fields">
        <PasswordField
          label="Current Password"
          autoComplete="current-password"
          {...bind('current')}
        />
        <div className="row">
          <PasswordField label="New Password" autoComplete="new-password" {...bind('password')} />
          <PasswordField
            label="Confirm Password"
            autoComplete="new-password"
            {...bind('confirm')}
          />
        </div>
      </div>
    </Screen>
  )
}

const dateFormat = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
})

function ProfileScreen({ state }: { state: MirrorTryState }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => heading.current?.focus(), [])
  const user = state.user
  if (!user) return null

  return (
    <div className="screen">
      <div className="card profile">
        <div className="head">
          <button type="button" className="square end" aria-label="Close" onClick={closeView}>
            <CloseIcon size={22} />
          </button>
        </div>
        <Notice variant="banner" />
        <span className="avatar" aria-hidden="true">
          <UserIcon size={38} strokeWidth={1.4} />
        </span>
        <h3 className="name" ref={heading} tabIndex={-1}>
          {user.name}
        </h3>
        <p className="email">{user.email}</p>
        <PrimaryButton className="small" onClick={() => showView('edit-profile')}>
          Edit Profile
        </PrimaryButton>

        <section className="history" aria-labelledby="mt-history-title">
          <h4 id="mt-history-title" className="history-label">
            <BookmarkIcon size={16} />
            Your Trial History
          </h4>
          {state.history.length === 0 ? (
            <p className="empty">No saved trials yet. Save a trial to find it here later.</p>
          ) : (
            <ul className="trials">
              {state.history.map((trial) => (
                <li key={trial.id} className="trial">
                  {trial.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element -- a data URL captured from the camera
                    <img className="thumb" src={trial.thumbnail} alt="" />
                  ) : (
                    <span className="thumb">
                      <CameraIcon size={18} />
                    </span>
                  )}
                  <div className="meta">
                    <p className="trial-name">{trial.productName}</p>
                    <p className="trial-when">
                      {[
                        trial.size ? `Size ${trial.size}` : null,
                        trial.storeName,
                        dateFormat.format(trial.createdAt),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="square small"
                    aria-label={`Delete ${trial.productName} trial`}
                    onClick={() => void deleteTrial(trial.id)}
                  >
                    <TrashIcon size={19} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="quiet profile-foot">
          <button type="button" className="text-link" onClick={logOut}>
            Log out
          </button>
        </p>
      </div>
    </div>
  )
}

export function AccountScreen({ view }: { view: Exclude<View, 'trial'> }) {
  const state = useMirrorTryState()
  switch (view) {
    case 'login':
      return <LoginScreen />
    case 'signup':
      return <SignUpScreen />
    case 'forgot':
      return <ForgotScreen prefill={state.resetFor} />
    case 'otp':
      return <OtpScreen sentTo={state.resetSentTo} />
    case 'new-password':
      return <NewPasswordScreen />
    case 'profile':
      return <ProfileScreen state={state} />
    case 'edit-profile':
      return <EditProfileScreen state={state} />
    case 'change-password':
      return <ChangePasswordScreen />
  }
}
