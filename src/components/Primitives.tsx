import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg>
}

export function Stars({ className = '' }: { className?: string }) {
  return <span className={`stars ${className}`} aria-hidden="true">
    {Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 24 24" fill="currentColor"><path d="m12 1.5 3.12 6.32 6.98 1.02-5.05 4.92 1.19 6.95L12 17.43l-6.24 3.28 1.19-6.95L1.9 8.84l6.98-1.02Z" /></svg>)}
  </span>
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>
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
