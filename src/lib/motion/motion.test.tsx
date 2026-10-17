import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useReveal } from './use-reveal'
import { usePointerAngle } from './use-pointer-angle'
import { LightField } from './light-field'
import { PageTransition } from './page-transition'

describe('PRYSM Motion Kit', () => {
  let matchMediaListeners: ((e: MediaQueryListEvent) => void)[] = []
  let matchesReducedMotion = false

  beforeEach(() => {
    matchMediaListeners = []
    matchesReducedMotion = false

    vi.stubGlobal('matchMedia', (query: string) => {
      const isReduced = query.includes('prefers-reduced-motion')
      return {
        matches: isReduced ? matchesReducedMotion : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
          if (isReduced) matchMediaListeners.push(listener)
        }),
        removeEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
          if (isReduced) {
            matchMediaListeners = matchMediaListeners.filter((l) => l !== listener)
          }
        }),
        dispatchEvent: vi.fn(),
      }
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('useReveal', () => {
    it('returns isRevealed: true immediately when prefers-reduced-motion is true', () => {
      matchesReducedMotion = true
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(null)
        return useReveal(ref)
      })

      expect(result.current.isRevealed).toBe(true)
    })

    it('respects IntersectionObserver when reduced motion is false', () => {
      matchesReducedMotion = false
      let observerCallback: IntersectionObserverCallback = () => {}
      const mockDisconnect = vi.fn()
      const mockObserve = vi.fn()

      class MockIntersectionObserver {
        constructor(cb: IntersectionObserverCallback) {
          observerCallback = cb
        }
        observe = mockObserve
        unobserve = vi.fn()
        disconnect = mockDisconnect
      }
      vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

      const element = document.createElement('div')
      const { result, unmount } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element)
        return useReveal(ref)
      })

      expect(result.current.isRevealed).toBe(false)
      expect(mockObserve).toHaveBeenCalledWith(element)

      act(() => {
        observerCallback(
          [{ isIntersecting: true, target: element } as unknown as IntersectionObserverEntry],
          {} as IntersectionObserver,
        )
      })

      expect(result.current.isRevealed).toBe(true)

      unmount()
      expect(mockDisconnect).toHaveBeenCalled()
    })
  })

  describe('usePointerAngle', () => {
    it('sets --angle to 0deg and does not track pointer when prefers-reduced-motion is true', () => {
      matchesReducedMotion = true
      const element = document.createElement('div')

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(element)
        usePointerAngle(ref)
      })

      expect(element.style.getPropertyValue('--angle')).toBe('0deg')
    })

    it('calculates pointer angle and updates --angle on pointermove, and cleans up on unmount', () => {
      matchesReducedMotion = false
      const element = document.createElement('div')
      element.getBoundingClientRect = () =>
        ({
          left: 100,
          top: 100,
          width: 200,
          height: 100,
          right: 300,
          bottom: 200,
        }) as DOMRect

      const addSpy = vi.spyOn(window, 'addEventListener')
      const removeSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element)
        usePointerAngle(ref)
      })

      expect(addSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), expect.anything())

      // Simulate pointer event
      act(() => {
        window.dispatchEvent(
          new MouseEvent('pointermove', {
            clientX: 200, // center x is 200
            clientY: 250, // center y is 150 -> dy=100, dx=0 -> 90deg
          }),
        )
      })

      expect(element.style.getPropertyValue('--angle')).toContain('deg')

      unmount()
      expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
    })
  })

  describe('LightField', () => {
    it('renders four blurred color blobs', () => {
      const { container } = render(<LightField />)
      const field = container.querySelector('[data-light-field]')
      expect(field).toBeInTheDocument()
      expect(field?.querySelectorAll('[data-blob]').length).toBe(4)
    })

    it('sets data-reduced-motion when reduced motion matches', () => {
      matchesReducedMotion = true
      const { container } = render(<LightField />)
      const field = container.querySelector('[data-light-field]')
      expect(field).toHaveAttribute('data-reduced-motion', 'true')
    })

    it('pauses when document is hidden', () => {
      matchesReducedMotion = false
      const { container } = render(<LightField />)
      const field = container.querySelector('[data-light-field]')
      expect(field).not.toHaveAttribute('data-paused')

      act(() => {
        Object.defineProperty(document, 'hidden', { value: true, configurable: true })
        document.dispatchEvent(new Event('visibilitychange'))
      })

      expect(field).toHaveAttribute('data-paused', 'true')

      act(() => {
        Object.defineProperty(document, 'hidden', { value: false, configurable: true })
        document.dispatchEvent(new Event('visibilitychange'))
      })

      expect(field).not.toHaveAttribute('data-paused')
    })
  })

  describe('PageTransition', () => {
    it('renders children with transition container', () => {
      render(
        <PageTransition>
          <div>Page Content</div>
        </PageTransition>,
      )
      expect(screen.getByText('Page Content')).toBeInTheDocument()
    })

    it('marks reduced motion attribute when prefers-reduced-motion is active', () => {
      matchesReducedMotion = true
      const { container } = render(
        <PageTransition>
          <div>Page Content</div>
        </PageTransition>,
      )
      const transition = container.querySelector('[data-page-transition]')
      expect(transition).toHaveAttribute('data-reduced-motion', 'true')
    })
  })
})
