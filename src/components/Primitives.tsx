import { motion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useVisualEffects } from './VisualEffects'

export function SpotifyIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.42a.63.63 0 0 1-.87.22c-2.39-1.46-5.4-1.79-8.95-.98a.63.63 0 1 1-.28-1.23c3.89-.89 7.22-.51 9.88 1.12.3.18.4.57.22.87Zm1.23-2.75a.79.79 0 0 1-1.08.26c-2.73-1.68-6.89-2.17-10.11-1.19a.79.79 0 1 1-.46-1.51c3.68-1.12 8.28-.57 11.39 1.36.37.23.49.71.26 1.08Zm.11-2.86C14.65 8.87 9.25 8.69 6.12 9.64a.95.95 0 1 1-.55-1.82c3.59-1.09 9.55-.88 13.33 1.36a.95.95 0 0 1-.97 1.63Z" /></svg>
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg>
}

export function Stars({ className = '' }: { className?: string }) {
  return <span className={`stars ${className}`} aria-hidden="true">
    {Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 24 24" fill="currentColor"><path d="m12 1.5 3.12 6.32 6.98 1.02-5.05 4.92 1.19 6.95L12 17.43l-6.24 3.28 1.19-6.95L1.9 8.84l6.98-1.02Z" /></svg>)}
  </span>
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { enabled } = useVisualEffects()
  return <motion.div className={`reveal-element ${className}`} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
}

export function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? 'section-label-light' : ''}`}><span>{number} /</span>{children}</div>
}

export function ExternalAnchor({ children, className = '', ...props }: ComponentProps<'a'>) {
  return <a className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}<span className="sr-only"> (se abre en una nueva pestaña)</span></a>
}

export function TextLink({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  return <ExternalAnchor href={href} className={`text-link ${className}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></ExternalAnchor>
}
