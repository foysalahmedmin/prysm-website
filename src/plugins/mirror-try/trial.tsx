'use client'

import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { attach } from './camera'
import {
  closeSheet,
  discardSession,
  enableCamera,
  endTrial,
  minimize,
  openSheet,
  saveSession,
  saveTrial,
  submitMeasurements,
  switchCamera,
  type MirrorTryState,
  type Phase,
} from './controller'
import { PrimaryButton, SelectField, TextField } from './fields'
import { Notice } from './notice'
import {
  BODY_PART_OPTIONS,
  DEFAULT_SIZES,
  FIELDS,
  FIT_OPTIONS,
  SCAN_RESULT,
  checkMeasurement,
  fieldLabel,
  scanFor,
} from './fit'
import { useClock, useMirrorTryState } from './hooks'
import {
  BookmarkIcon,
  BulbIcon,
  CameraIcon,
  CameraOffIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  PlayIcon,
  Spinner,
  SwitchCameraIcon,
} from './icons'
import type { BodyPart, FitPreference, MeasurementKey } from './types'

const CAMERA_ON: Phase[] = ['measuring', 'ready', 'initiating', 'live', 'ended']

const PRIVACY =
  'We do not store or use any of your data to train our AI or save the history of your session unless you save your trial to check later.'

/** What a screen reader hears as the trial moves on. */
const ANNOUNCE: Record<Phase, string> = {
  idle: '',
  requesting: 'Waiting for camera access',
  blocked: 'The camera did not start',
  measuring: 'Camera on. Measuring your size.',
  ready: 'Your measurements are ready',
  initiating: 'Starting your trial',
  live: 'Your trial has started',
  ended: 'Trial ended. Save the session to keep it.',
}

export function TrialScreen() {
  const state = useMirrorTryState()
  return (
    <>
      <Stage state={state} />
      <div className="dock" data-sheet={state.sheet ? '' : undefined}>
        {state.sheet ? <MeasurementSheet state={state} /> : <DockNote state={state} />}
        {/* A fresh button per step: the click that opens the form must not also submit it. */}
        <DockActions key={state.sheet ? 'sheet' : state.phase} state={state} />
      </div>
      <p className="sr-only" aria-live="polite">
        {ANNOUNCE[state.phase]}
      </p>
    </>
  )
}

function formatElapsed(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${String(seconds % 60).padStart(2, '0')}s`
}

function Elapsed({ startedAt, endedAt }: { startedAt: number; endedAt: number | null }) {
  const now = useClock()
  const end = endedAt ?? now * 1000
  const seconds = Math.max(0, Math.floor((end - startedAt) / 1000))
  return (
    <span className="pill start">
      <PlayIcon size={15} />
      <span className="sr-only">Trial time </span>
      {formatElapsed(seconds)}
    </span>
  )
}

function Skeleton({ progress }: { progress: number }) {
  const drawn = Math.min(1, progress / 55)
  const lines: [number, number, number, number][] = [
    [50, 35, 40, 40],
    [50, 35, 60, 40],
    [40, 40, 60, 40],
    [40, 40, 33, 50],
    [33, 50, 43, 56],
    [60, 40, 67, 50],
    [67, 50, 57, 56],
    [40, 40, 50, 47],
    [60, 40, 50, 47],
    [50, 47, 43, 56],
    [50, 47, 57, 56],
    [43, 56, 57, 56],
  ]
  const joints: [number, number][] = [
    [50, 35],
    [40, 40],
    [60, 40],
    [33, 50],
    [67, 50],
    [50, 47],
    [43, 56],
    [57, 56],
  ]
  return (
    <svg
      className="skeleton"
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lines.map(([x1, y1, x2, y2], index) => (
        <line
          key={index}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawn}
        />
      ))}
      {progress > 6
        ? joints.map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={0.55}
              style={{ animationDelay: `${index * 0.12}s` }}
            />
          ))
        : null}
    </svg>
  )
}

function Stage({ state }: { state: MirrorTryState }) {
  const { phase, product, measurements } = state
  const cameraOn = CAMERA_ON.includes(phase)

  return (
    <div className="stage">
      {cameraOn ? (
        <video ref={attach} autoPlay playsInline muted aria-label="Your camera" />
      ) : (
        <div className="placeholder">
          {phase === 'requesting' ? (
            <>
              <span className="tile">
                <Spinner size={26} />
              </span>
              <p>Allow camera access in your browser to continue.</p>
            </>
          ) : phase === 'blocked' ? (
            <span className="tile" data-tone="warn">
              <CameraOffIcon size={30} />
            </span>
          ) : (
            <span className="tile">
              <CameraIcon size={30} />
            </span>
          )}
        </div>
      )}

      {phase === 'measuring' ? <Skeleton progress={state.progress} /> : null}

      {product ? (
        <span className="pill product">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- the plugin cannot rely on a store's framework; the store sends a thumbnail
            <img src={product.image.src} alt="" />
          ) : null}
          <span className="text">
            <span className="sr-only">Trying on </span>
            {product.name}
            {measurements && phase !== 'measuring' ? (
              <span className="size"> · Size {measurements.size}</span>
            ) : null}
          </span>
        </span>
      ) : null}

      {cameraOn && state.hasCameraChoice ? (
        <button
          type="button"
          className="pill flip"
          aria-label="Switch camera"
          onClick={() => void switchCamera()}
        >
          <SwitchCameraIcon size={18} />
        </button>
      ) : null}

      {phase === 'measuring' ? (
        <span className="pill center">
          <Spinner size={15} />
          Measuring Size {Math.floor(state.progress)}%
        </span>
      ) : null}
      {phase === 'initiating' ? (
        <span className="pill center">
          <Spinner size={15} />
          Initiating Trial
        </span>
      ) : null}
      {phase === 'ready' && measurements ? (
        <span className="pill center">
          <CheckCircleIcon size={16} />
          Size {measurements.size} ·{' '}
          {FIT_OPTIONS.find((fit) => fit.value === measurements.fit)?.label} fit
        </span>
      ) : null}

      <span
        className="notice-slot"
        data-top={['measuring', 'initiating', 'ready'].includes(phase) ? '' : undefined}
      >
        <Notice variant="pill" />
      </span>

      {(phase === 'live' || phase === 'ended') && state.startedAt ? (
        <Elapsed startedAt={state.startedAt} endedAt={state.endedAt} />
      ) : null}
      {phase === 'live' ? (
        <button
          type="button"
          className="pill end"
          onClick={() => void saveTrial()}
          disabled={Boolean(state.savedTrialId)}
          aria-busy={state.saving || undefined}
        >
          {state.saving ? <Spinner size={15} /> : <CheckCircleIcon size={16} />}
          {state.savedTrialId ? 'Saved' : 'Save'}
        </button>
      ) : null}
    </div>
  )
}

function Note({ icon, tone, children }: { icon: ReactNode; tone?: 'warn'; children: ReactNode }) {
  return (
    <div className="note" data-tone={tone}>
      <span className="icon">{icon}</span>
      <p>{children}</p>
    </div>
  )
}

function DockNote({ state }: { state: MirrorTryState }) {
  switch (state.phase) {
    case 'idle':
    case 'requesting':
      return <Note icon={<InfoIcon size={18} />}>{PRIVACY}</Note>
    case 'blocked':
      return (
        <Note icon={<CameraOffIcon size={18} />} tone="warn">
          {state.cameraError}
        </Note>
      )
    case 'measuring':
      return (
        <Note icon={<BulbIcon size={18} />}>
          If you already know your measurements, add them for faster processing and a faster result.
        </Note>
      )
    case 'ready':
      return (
        <Note icon={<CheckCircleIcon size={18} />}>
          Your measurements are ready. Choose Try on under any piece in the store to see it on you.
        </Note>
      )
    case 'initiating':
      return null
    case 'live':
      return (
        <Note icon={<BookmarkIcon size={18} />}>
          Save the history of your trial to check later. We do not save or use your data to train
          our model.
        </Note>
      )
    case 'ended':
      return (
        <Note icon={<BookmarkIcon size={18} />}>
          Save this session to check your trial again later. We do not save or use your data to
          train our model.
        </Note>
      )
  }
}

/** Set when the step's button had focus as the step changed, so the next button takes it over. */
let dockHadFocus = false

function DockActions({ state }: { state: MirrorTryState }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (dockHadFocus) node?.querySelector('button')?.focus()
    dockHadFocus = false
    return () => {
      const root = node?.getRootNode() as Document | ShadowRoot | undefined
      const active = root?.activeElement
      dockHadFocus = Boolean(node && active && node.contains(active))
    }
  }, [])

  return (
    <div ref={ref} className="dock-actions">
      <DockButtons state={state} />
    </div>
  )
}

function DockButtons({ state }: { state: MirrorTryState }) {
  if (state.sheet) {
    return (
      <PrimaryButton type="submit" form="mt-measurements">
        Submit
      </PrimaryButton>
    )
  }
  switch (state.phase) {
    case 'idle':
      return <PrimaryButton onClick={() => void enableCamera()}>Enable Camera</PrimaryButton>
    case 'requesting':
      return <PrimaryButton busy>Enable Camera</PrimaryButton>
    case 'blocked':
      return <PrimaryButton onClick={() => void enableCamera()}>Try Again</PrimaryButton>
    case 'measuring':
      return <PrimaryButton onClick={openSheet}>Add Custom Info</PrimaryButton>
    case 'ready':
      return <PrimaryButton onClick={minimize}>Browse the Store</PrimaryButton>
    case 'initiating':
      return <PrimaryButton onClick={openSheet}>Change Custom Measurement</PrimaryButton>
    case 'live':
      return <PrimaryButton onClick={endTrial}>End Trial</PrimaryButton>
    case 'ended':
      return (
        <>
          <PrimaryButton busy={state.saving} onClick={() => void saveSession()}>
            Save Session
          </PrimaryButton>
          <p className="quiet">
            <button type="button" className="text-link" onClick={discardSession}>
              End without saving
            </button>
          </p>
        </>
      )
  }
}

type Values = Record<MeasurementKey, string>

function MeasurementSheet({ state }: { state: MirrorTryState }) {
  const start = state.measurements ?? scanFor(state.product)
  const sizes = state.product?.sizes?.length ? state.product.sizes : DEFAULT_SIZES
  const [bodyPart, setBodyPart] = useState<BodyPart>(start.bodyPart)
  const [size, setSize] = useState(sizes.includes(start.size) ? start.size : (sizes[0] ?? 'M'))
  const [fit, setFit] = useState<FitPreference>(start.fit)
  const [values, setValues] = useState<Values>(() => {
    const filled = {} as Values
    for (const key of Object.keys(SCAN_RESULT) as MeasurementKey[]) {
      filled[key] = String(start.values[key] ?? SCAN_RESULT[key])
    }
    return filled
  })
  const [errors, setErrors] = useState<Partial<Record<MeasurementKey, string>>>({})
  const keys = FIELDS[bodyPart]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found: Partial<Record<MeasurementKey, string>> = {}
    for (const key of keys) {
      const problem = checkMeasurement(key, values[key])
      if (problem) found[key] = problem
    }
    setErrors(found)
    const firstBad = keys.find((key) => found[key])
    if (firstBad) {
      const form = event.currentTarget
      form.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus()
      return
    }
    const numbers: Partial<Record<MeasurementKey, number>> = {}
    for (const key of keys) numbers[key] = Number(values[key].trim().replace(',', '.'))
    submitMeasurements({ bodyPart, size, fit, values: numbers, source: 'custom' })
  }

  const pairs: MeasurementKey[][] = []
  for (let index = 0; index < keys.length; index += 2) pairs.push(keys.slice(index, index + 2))

  return (
    <form
      id="mt-measurements"
      className="sheet"
      aria-labelledby="mt-measurements-title"
      noValidate
      onSubmit={submit}
    >
      <div className="head">
        <h3 id="mt-measurements-title">Custom Body Measurements</h3>
        <button
          type="button"
          className="square small end"
          aria-label="Close measurements"
          onClick={closeSheet}
        >
          <CloseIcon size={20} />
        </button>
      </div>
      <div className="sheet-scroll">
        <div className="fields">
          <SelectField
            label="Body Part"
            options={BODY_PART_OPTIONS}
            value={bodyPart}
            onChange={(event) => setBodyPart(event.target.value as BodyPart)}
          />
          <div className="row">
            <SelectField
              label="Size"
              options={sizes.map((value) => ({ value, label: value }))}
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
            <SelectField
              label="Fit"
              options={FIT_OPTIONS}
              value={fit}
              onChange={(event) => setFit(event.target.value as FitPreference)}
            />
          </div>
          {pairs.map((pair) => (
            <div className="row" key={pair.join('-')}>
              {pair.map((key) => (
                <TextField
                  key={key}
                  name={key}
                  label={fieldLabel(key, bodyPart)}
                  suffix="cm"
                  inputMode="decimal"
                  autoComplete="off"
                  value={values[key]}
                  error={errors[key]}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
