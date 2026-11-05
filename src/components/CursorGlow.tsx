import { useEffect, useRef, useSyncExternalStore } from 'react'

const pointerQuery = '(hover: hover) and (pointer: fine)'

function subscribePointer(onChange: () => void) {
  const query = window.matchMedia(pointerQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function hasFinePointer() {
  return window.matchMedia(pointerQuery).matches
}

/** A small, stationary-in-relation-to-the-pointer light. No trail or cursor replacement. */
export function CursorGlow() {
  const finePointer = useSyncExternalStore(subscribePointer, hasFinePointer, () => false)
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = glow.current
    if (!finePointer || !layer) return
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    const paint = () => {
      frame = 0
      layer.style.transform = `translate3d(${pointerX - 18}px, ${pointerY - 18}px, 0)`
      layer.dataset.visible = 'true'
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointerX = event.clientX
      pointerY = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const hide = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      layer.dataset.visible = 'false'
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', hide)
    document.documentElement.addEventListener('pointerleave', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', hide)
      document.documentElement.removeEventListener('pointerleave', hide)
    }
  }, [finePointer])

  return finePointer ? <div ref={glow} className="cursor-glow" data-visible="false" aria-hidden="true" /> : null
}
