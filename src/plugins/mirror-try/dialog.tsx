'use client'

import {
  ArrowClockwise,
  Camera,
  Check,
  ShoppingBag,
  Sparkle,
  UploadSimple,
  User,
  Warning,
  X,
} from '@phosphor-icons/react'
import { Dialog } from 'radix-ui'
import { useCallback, useId, useRef, useState } from 'react'
import { sampleModels, type SampleModel } from './models'
import { useMirrorTry } from './provider'
import type { FidelityMode, UserAdjustment } from './types'

export function MirrorTryDialog() {
  const { adapter, state, close, setVariant, addToCart, labels } = useMirrorTry()
  const titleId = useId()
  const descId = useId()

  const isOpen = state.status !== 'idle'
  const isOpening = state.status === 'opening'
  const isError = state.status === 'error'

  const product = state.product
  const request = state.request
  const activeVariantId = request?.variantId ?? product?.variants[0]?.id

  // Fidelity mode (L1 models, L2 upload, L3 camera)
  const [mode, setMode] = useState<FidelityMode>('models')
  const [selectedModelId, setSelectedModelId] = useState<string>(sampleModels[0].id)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [adjust, setAdjust] = useState<UserAdjustment>({ x: 0, y: 0, scale: 1, rotation: 0 })
  const [cameraActive, setCameraActive] = useState<boolean>(false)
  const [isFlashing, setIsFlashing] = useState<boolean>(false)
  const [actionFeedback, setActionFeedback] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeModel: SampleModel =
    sampleModels.find((m) => m.id === selectedModelId) ?? sampleModels[0]

  // Derived status announcement for screen readers
  const statusAnnouncement =
    actionFeedback ||
    (state.status === 'ready'
      ? 'Try-on viewport ready.'
      : isOpening
        ? 'Calibrating lens...'
        : isError
          ? 'Error loading try-on.'
          : '')

  // Sync mode changes with adapter
  const handleModeChange = useCallback(
    (newMode: FidelityMode) => {
      setMode(newMode)
      adapter.setMode?.(newMode)
      if (newMode !== 'camera') {
        setCameraActive(false)
        adapter.setCameraActive?.(false)
      }
    },
    [adapter],
  )

  // Handle photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setUserPhoto(dataUrl)
      adapter.setUserPhoto?.(dataUrl)
      handleModeChange('upload')
      setActionFeedback('Photo uploaded successfully.')
    }
    reader.readAsDataURL(file)
  }

  // Handle camera toggle
  const toggleCamera = async () => {
    if (cameraActive) {
      setCameraActive(false)
      adapter.setCameraActive?.(false)
      return
    }

    try {
      setCameraActive(true)
      adapter.setCameraActive?.(true)
      setActionFeedback('Camera preview active.')
      if (navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 800 } },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      }
    } catch {
      // Graceful fallback if permission denied or unavailable
      setActionFeedback('Camera permission denied or camera unavailable.')
    }
  }

  // Handle Capture Look with flash
  const handleCapture = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 140)

    adapter.capture?.()
    setActionFeedback('Look captured and saved to tray.')
  }

  // Garment overlay image fallback
  const garmentOverlaySrc =
    product?.images[0]?.src ||
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><path d="M50 20 L80 50 L120 50 L150 20 L180 60 L150 80 L150 220 L50 220 L50 80 L20 60 Z" fill="%234f46e5" opacity="0.85"/></svg>`

  // Overlay transform style based on active mode
  const overlayStyle: React.CSSProperties =
    mode === 'models'
      ? {
          position: 'absolute',
          left: `${activeModel.torsoAnchor.x * 100}%`,
          top: `${activeModel.torsoAnchor.y * 100}%`,
          transform: `translate(-50%, -50%) scale(${activeModel.torsoAnchor.scale}) rotate(${activeModel.torsoAnchor.rotation}deg)`,
          width: '55%',
          maxWidth: '320px',
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }
      : mode === 'upload'
        ? {
            position: 'absolute',
            left: `calc(50% + ${adjust.x}px)`,
            top: `calc(48% + ${adjust.y}px)`,
            transform: `translate(-50%, -50%) scale(${adjust.scale}) rotate(${adjust.rotation}deg)`,
            width: '55%',
            maxWidth: '320px',
            cursor: 'grab',
          }
        : {
            position: 'absolute',
            left: '50%',
            top: '48%',
            transform: 'translate(-50%, -50%) scale(1)',
            width: '55%',
            maxWidth: '320px',
          }

  // Format cart button text: supports brand specific nouns like "Add to Bag", "Add to Cart", "Add to Basket"
  const cartButtonText = labels.addToCartAction || labels.addToCart

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay data-mt-part="overlay" className="mt-overlay" />
        <Dialog.Content
          data-mt-part="panel"
          className="mt-panel"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          {/* Polite live region for screen readers */}
          <div data-mt-part="status" className="sr-only" aria-live="polite">
            {statusAnnouncement}
          </div>

          {/* Header */}
          <header data-mt-part="header" className="mt-header">
            <div className="mt-header-copy">
              <Dialog.Title id={titleId} className="mt-title">
                {labels.title}
              </Dialog.Title>
              <Dialog.Description id={descId} className="mt-subtitle">
                {product?.name ? `${product.name} · ${labels.subtitle}` : labels.subtitle}
              </Dialog.Description>
            </div>
            <Dialog.Close
              data-mt-part="close"
              className="mt-close-button"
              aria-label={labels.close}
            >
              <X size={20} weight="bold" />
            </Dialog.Close>
          </header>

          {isError ? (
            <div data-mt-part="error-view" className="mt-error-box">
              <Warning size={36} className="mt-error-icon" />
              <h3>{state.error?.message || 'Unable to load try-on.'}</h3>
              <p>This item or fitting configuration is temporarily unavailable.</p>
              <button
                type="button"
                data-mt-part="close"
                className="mt-btn-primary"
                onClick={() => close()}
              >
                Return to Shop
              </button>
            </div>
          ) : (
            <div className="mt-content-body">
              {/* Main Viewport */}
              <div
                data-mt-part="viewport"
                className={`mt-viewport ${isFlashing ? 'is-flashing' : ''}`}
                tabIndex={0}
                role="region"
                aria-label="Fitting preview viewport"
                onKeyDown={(e) => {
                  if (mode !== 'upload') return
                  if (e.key === 'ArrowUp') setAdjust((a) => ({ ...a, y: a.y - 5 }))
                  if (e.key === 'ArrowDown') setAdjust((a) => ({ ...a, y: a.y + 5 }))
                  if (e.key === 'ArrowLeft') setAdjust((a) => ({ ...a, x: a.x - 5 }))
                  if (e.key === 'ArrowRight') setAdjust((a) => ({ ...a, x: a.x + 5 }))
                  if (e.key === '+' || e.key === '=')
                    setAdjust((a) => ({ ...a, scale: Math.min(2, a.scale + 0.05) }))
                  if (e.key === '-')
                    setAdjust((a) => ({ ...a, scale: Math.max(0.5, a.scale - 0.05) }))
                }}
              >
                {/* L1: Sample Models Background */}
                {mode === 'models' && (
                  <div className="mt-model-bg-wrapper">
                    <div
                      className="mt-model-silhouette"
                      style={{
                        backgroundImage: `url(${activeModel.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }}
                    />
                  </div>
                )}

                {/* L2: User Upload Photo Background */}
                {mode === 'upload' && (
                  <div className="mt-upload-bg-wrapper">
                    {userPhoto ? (
                      <img src={userPhoto} alt="Uploaded portrait" className="mt-uploaded-image" />
                    ) : (
                      <div className="mt-upload-placeholder">
                        <UploadSimple size={48} />
                        <p>Upload a clear portrait photo to see the fit on you</p>
                        <button
                          type="button"
                          className="mt-btn-secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Photo
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* L3: Camera Stream / Video Feed */}
                {mode === 'camera' && (
                  <div className="mt-camera-bg-wrapper">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="mt-camera-video"
                    />
                    {!cameraActive && (
                      <div className="mt-camera-placeholder">
                        <Camera size={48} />
                        <p>Camera is off. Start preview to align with the silhouette guide.</p>
                        <button
                          type="button"
                          className="mt-btn-secondary"
                          onClick={toggleCamera}
                        >
                          Start Camera
                        </button>
                      </div>
                    )}
                    {/* Torso Guide Outline */}
                    <div className="mt-camera-guide" aria-hidden="true">
                      <svg viewBox="0 0 100 120" className="mt-guide-svg">
                        <ellipse cx="50" cy="20" rx="14" ry="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path d="M25 45 C25 35 75 35 75 45 L85 110 L15 110 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Garment Overlay */}
                <div
                  data-mt-part="garment-overlay"
                  className="mt-garment-overlay"
                  style={overlayStyle}
                >
                  <img
                    src={garmentOverlaySrc}
                    alt={product?.name ?? 'Garment try-on'}
                    className="mt-garment-img"
                    draggable={false}
                  />
                </div>

                {/* Scan sweep dynamic animation line */}
                <div data-mt-part="scan" className="mt-scan-sweep" aria-hidden="true" />

                {/* Loading spinner when opening */}
                {isOpening && (
                  <div className="mt-opening-curtain" aria-hidden="true">
                    <Sparkle size={32} className="animate-spin" />
                    <span>Calibrating lens...</span>
                  </div>
                )}
              </div>

              {/* Sidebar / Controls Panel */}
              <div data-mt-part="controls" className="mt-controls-panel">
                {/* Mode Selector (L1 / L2 / L3) */}
                <div data-mt-part="mode-selector" className="mt-mode-selector" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'models'}
                    className={`mt-mode-tab ${mode === 'models' ? 'is-active' : ''}`}
                    onClick={() => handleModeChange('models')}
                  >
                    <User size={16} />
                    <span>{labels.modelsMode}</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'upload'}
                    className={`mt-mode-tab ${mode === 'upload' ? 'is-active' : ''}`}
                    onClick={() => handleModeChange('upload')}
                  >
                    <UploadSimple size={16} />
                    <span>{labels.uploadMode}</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'camera'}
                    className={`mt-mode-tab ${mode === 'camera' ? 'is-active' : ''}`}
                    onClick={() => handleModeChange('camera')}
                  >
                    <Camera size={16} />
                    <span>{labels.cameraMode}</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileUpload}
                  aria-label="Upload photo"
                />

                {/* L1: Model Pickers */}
                {mode === 'models' && (
                  <div className="mt-section mt-models-section">
                    <label className="mt-section-label">Select Model</label>
                    <div className="mt-model-pills" role="radiogroup">
                      {sampleModels.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          role="radio"
                          aria-checked={selectedModelId === m.id}
                          className={`mt-model-pill ${selectedModelId === m.id ? 'is-active' : ''}`}
                          onClick={() => {
                            setSelectedModelId(m.id)
                            adapter.setModel?.(m.id)
                          }}
                        >
                          <span className="mt-model-name">{m.name}</span>
                          <span className="mt-model-height">{m.height}</span>
                        </button>
                      ))}
                    </div>

                    {/* Size recommendation badge */}
                    <div data-mt-part="size" className="mt-size-hint">
                      <Sparkle size={14} className="mt-sparkle-icon" />
                      <span>{activeModel.name}&apos;s Fit: <strong>{activeModel.sampleSize}</strong></span>
                    </div>
                  </div>
                )}

                {/* L2: Upload Adjust Controls */}
                {mode === 'upload' && (
                  <div className="mt-section mt-upload-section">
                    <div className="mt-upload-actions-row">
                      <button
                        type="button"
                        className="mt-btn-sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadSimple size={14} />
                        <span>Change Photo</span>
                      </button>
                      <button
                        type="button"
                        className="mt-btn-sm"
                        onClick={() => setAdjust({ x: 0, y: 0, scale: 1, rotation: 0 })}
                      >
                        <ArrowClockwise size={14} />
                        <span>Reset Fit</span>
                      </button>
                    </div>

                    <div className="mt-sliders-grid">
                      <label className="mt-slider-row">
                        <span>Scale: {Math.round(adjust.scale * 100)}%</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.05"
                          value={adjust.scale}
                          onChange={(e) => setAdjust((a) => ({ ...a, scale: parseFloat(e.target.value) }))}
                          aria-label="Overlay scale"
                        />
                      </label>
                      <label className="mt-slider-row">
                        <span>Rotate: {adjust.rotation}°</span>
                        <input
                          type="range"
                          min="-45"
                          max="45"
                          step="1"
                          value={adjust.rotation}
                          onChange={(e) => setAdjust((a) => ({ ...a, rotation: parseInt(e.target.value, 10) }))}
                          aria-label="Overlay rotation"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* L3: Camera Controls */}
                {mode === 'camera' && (
                  <div className="mt-section mt-camera-section">
                    <button
                      type="button"
                      className={`mt-btn-block ${cameraActive ? 'is-active' : ''}`}
                      onClick={toggleCamera}
                    >
                      <Camera size={16} />
                      <span>{cameraActive ? 'Pause Camera Feed' : 'Enable Live Camera'}</span>
                    </button>
                    <p className="mt-disclaimer">
                      Privacy notice: Video is processed locally in your browser. No frames or biometric data leave your device.
                    </p>
                  </div>
                )}

                {/* Product Variant Switcher */}
                {product && product.variants.length > 0 && (
                  <div data-mt-part="variant" className="mt-section mt-variants-section">
                    <label className="mt-section-label">Garment Variant</label>
                    <div className="mt-variant-chips" role="radiogroup">
                      {product.variants.map((v) => {
                        const isSelected = v.id === activeVariantId
                        const optSummary = Object.values(v.options).join(' / ') || v.id
                        return (
                          <button
                            key={v.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            className={`mt-variant-chip ${isSelected ? 'is-active' : ''}`}
                            onClick={() => setVariant(v.id)}
                          >
                            <span>{optSummary}</span>
                            {isSelected && <Check size={14} className="mt-check-icon" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Snapshot Capture Action */}
                <div data-mt-part="capture" className="mt-capture-row">
                  <button
                    type="button"
                    className="mt-capture-btn"
                    onClick={handleCapture}
                  >
                    <Camera size={18} weight="bold" />
                    <span>{labels.captureAction}</span>
                  </button>
                </div>

                {/* Saved Looks Tray */}
                {state.looks && state.looks.length > 0 && (
                  <div data-mt-part="looks" className="mt-section mt-looks-section">
                    <label className="mt-section-label">Saved Looks ({state.looks.length})</label>
                    <div className="mt-looks-tray">
                      {state.looks.map((look) => (
                        <div key={look.id} className="mt-look-thumbnail">
                          <img src={look.imageDataUrl} alt="Captured look" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions: Add to Cart & Close */}
                <div data-mt-part="actions" className="mt-actions-footer">
                  <button
                    type="button"
                    className="mt-btn-primary"
                    onClick={() => {
                      if (activeVariantId) {
                        addToCart(activeVariantId)
                      }
                    }}
                  >
                    <ShoppingBag size={18} weight="bold" />
                    <span>{cartButtonText}</span>
                  </button>

                  <button
                    type="button"
                    className="mt-btn-ghost"
                    onClick={() => close()}
                  >
                    {labels.close}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
