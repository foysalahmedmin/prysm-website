'use client'

import { useCallback, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { css } from './styles'

/**
 * Renders the plugin inside a shadow root, the way an iframe would keep it apart: the store's CSS
 * cannot reach in, the plugin's cannot leak out, and every store sees the same pixels.
 */

let shared: CSSStyleSheet | null | undefined

function sharedSheet(): CSSStyleSheet | null {
  if (shared !== undefined) return shared
  try {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css)
    shared = sheet
  } catch {
    shared = null
  }
  return shared
}

function adopt(root: ShadowRoot): boolean {
  const sheet = 'adoptedStyleSheets' in root ? sharedSheet() : null
  if (!sheet) return false
  root.adoptedStyleSheets = [sheet]
  return true
}

interface ShadowProps {
  as?: 'div' | 'span'
  className?: string
  style?: CSSProperties
  data?: Record<`data-${string}`, string>
  children: ReactNode
}

export function Shadow({ as: Tag = 'div', className, style, data, children }: ShadowProps) {
  const [mount, setMount] = useState<{ root: ShadowRoot; adopted: boolean } | null>(null)

  const host = useCallback((element: HTMLElement | null) => {
    if (!element) return
    const root = element.shadowRoot ?? element.attachShadow({ mode: 'open' })
    setMount((current) => (current?.root === root ? current : { root, adopted: adopt(root) }))
  }, [])

  return (
    <Tag ref={host} className={className} style={style} {...data}>
      {mount
        ? createPortal(
            <>
              {mount.adopted ? null : <style>{css}</style>}
              {children}
            </>,
            mount.root,
          )
        : null}
    </Tag>
  )
}

/** Fonts must be declared on the page itself to work inside a shadow root. */
export function ensureFont(assetBase: string) {
  if (typeof document === 'undefined' || document.querySelector('style[data-mirror-try-font]')) {
    return
  }
  const style = document.createElement('style')
  style.setAttribute('data-mirror-try-font', '')
  style.textContent = `@font-face{font-family:'Mirror Try Urbanist';src:url('${assetBase}/urbanist.woff2') format('woff2');font-weight:300 800;font-style:normal;font-display:swap}`
  document.head.appendChild(style)
}
