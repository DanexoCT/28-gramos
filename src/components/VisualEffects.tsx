import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { MotionConfig, motion, useMotionValue, useScroll, useSpring } from 'motion/react'

interface VisualEffectsState {
  enabled: boolean
  paused: boolean
  reduced: boolean
  toggle: () => void
}

const VisualEffectsContext = createContext<VisualEffectsState>({ enabled: false, paused: false, reduced: false, toggle: () => {} })

function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function readMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useVisualEffects() {
  return useContext(VisualEffectsContext)
}

export function VisualEffectsProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribeMotionPreference, readMotionPreference, () => false)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const container = useRef<HTMLDivElement>(null)
  const enabled = !reduced && !paused && !hidden

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.inView = String(entry.isIntersecting)
      }
    }, { rootMargin: '80px' })
    container.current?.querySelectorAll('[data-ambient]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <VisualEffectsContext.Provider value={{ enabled, paused, reduced, toggle: () => setPaused(value => !value) }}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'}>
      <div ref={container} className="site-experience" data-motion={enabled ? 'on' : 'off'}>
        {enabled && <ScrollProgress />}
        {children}
        {enabled && <CursorAccent />}
      </div>
    </MotionConfig>
  </VisualEffectsContext.Provider>
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}

function CursorAccent() {
  const [finePointer, setFinePointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const x = useSpring(mouseX, { stiffness: 420, damping: 34, mass: .5 })
  const y = useSpring(mouseY, { stiffness: 420, damping: 34, mass: .5 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => { setFinePointer(query.matches); setVisible(false) }
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!finePointer) return
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setVisible(true)
    }
    const over = (event: PointerEvent) => {
      setInteractive(event.target instanceof Element && Boolean(event.target.closest('a, button, summary')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('blur', leave)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('blur', leave)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [finePointer, mouseX, mouseY])

  if (!finePointer) return null
  return <motion.div className="cursor-accent" data-interactive={interactive} style={{ x, y }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: .18 }} aria-hidden="true"><span className="cursor-ring" /><span className="cursor-cross" /></motion.div>
}

export function SceneAtmosphere({ festival = false }: { festival?: boolean }) {
  return <div className={`scene-atmosphere ${festival ? 'scene-atmosphere-festival' : 'scene-atmosphere-hero'}`} aria-hidden="true">
    {festival && <><span className="stage-beam stage-beam-one" /><span className="stage-beam stage-beam-two" /></>}
    {[0, 1, 2, 3].map(index => <span key={index} className={`scene-spark scene-spark-${index}`} />)}
  </div>
}

export function SoundBars() {
  return <span className="sound-bars" aria-hidden="true">{[0, 1, 2, 3, 4].map(index => <span key={index} />)}</span>
}
