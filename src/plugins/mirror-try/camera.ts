/**
 * The shopper's camera. One stream at a time, shown in whichever <video> the panel has mounted, and
 * stopped the moment a trial ends. Frames never leave the browser unless the shopper saves a trial.
 */

let stream: MediaStream | null = null
let video: HTMLVideoElement | null = null
let deviceId: string | null = null

export class CameraError extends Error {
  constructor(readonly code: 'unsupported' | 'insecure') {
    super(code)
    this.name = 'CameraError'
  }
}

function show(element: HTMLVideoElement, source: MediaStream | null) {
  if (element.srcObject === source) return
  element.srcObject = source
  if (source) void element.play().catch(() => {})
}

export async function start(nextDeviceId?: string): Promise<void> {
  if (typeof window !== 'undefined' && window.isSecureContext === false) {
    throw new CameraError('insecure')
  }
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    throw new CameraError('unsupported')
  }
  const size = { width: { ideal: 1280 }, height: { ideal: 720 } }
  const next = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: nextDeviceId
      ? { ...size, deviceId: { exact: nextDeviceId } }
      : { ...size, facingMode: 'user' },
  })
  stop()
  stream = next
  deviceId = next.getVideoTracks()[0]?.getSettings().deviceId ?? nextDeviceId ?? null
  if (video) show(video, next)
}

export function stop() {
  stream?.getTracks().forEach((track) => track.stop())
  stream = null
  if (video) show(video, null)
}

export function isOn(): boolean {
  return stream !== null
}

/** A ref callback for the panel's <video>. */
export function attach(element: HTMLVideoElement | null) {
  video = element
  if (element) show(element, stream)
}

export async function hasChoice(): Promise<boolean> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter((device) => device.kind === 'videoinput').length > 1
  } catch {
    return false
  }
}

/** Moves to the next camera, for laptops with a second camera plugged in. */
export async function switchCamera(): Promise<void> {
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => device.kind === 'videoinput',
  )
  if (devices.length < 2) return
  const index = devices.findIndex((device) => device.deviceId === deviceId)
  const next = devices[(index + 1) % devices.length]
  if (next) await start(next.deviceId)
}

/** A mirrored 5:3 JPEG of the current frame, as the shopper sees it. */
export function capture(width = 240): string | null {
  if (!video || video.videoWidth === 0 || video.videoHeight === 0) return null
  const height = Math.round((width * 3) / 5)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return null
  const scale = Math.max(width / video.videoWidth, height / video.videoHeight)
  const drawWidth = video.videoWidth * scale
  const drawHeight = video.videoHeight * scale
  context.translate(width, 0)
  context.scale(-1, 1)
  context.drawImage(
    video,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  )
  try {
    return canvas.toDataURL('image/jpeg', 0.72)
  } catch {
    return null
  }
}

/** Turns a failed start into a sentence that tells the shopper what to do. */
export function describe(error: unknown): string {
  if (error instanceof CameraError) {
    return error.code === 'insecure'
      ? 'The camera only works on a secure (https) page. Open the store over https and try again.'
      : 'This browser cannot open a camera. Try a current version of Chrome, Safari, Edge or Firefox.'
  }
  const name = error instanceof DOMException || error instanceof Error ? error.name : ''
  switch (name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Camera access is blocked. Allow the camera for this site in your browser settings, then try again.'
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'No camera was found. Connect a camera and try again.'
    case 'NotReadableError':
    case 'AbortError':
      return 'Another app is using your camera. Close it and try again.'
    default:
      return 'The camera did not start. Try again.'
  }
}
