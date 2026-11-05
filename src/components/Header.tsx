import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { brand, navigation } from '../data/content'
import { assetUrl } from '../lib/assets'
import { ExternalAnchor, InstagramIcon as Instagram } from './Primitives'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  return <header className="site-header">
    <div className="header-inner page-shell flex items-center justify-between">
      <a className="brand-logo" href="#inicio" aria-label="28 Gramos Records — Inicio" onClick={() => setOpen(false)}><img src={assetUrl('images/logo.webp')} alt="28 Gramos Records" width="682" height="486" /></a>
      <nav ref={nav} id="main-navigation" aria-label="Navegación principal" className={`main-navigation ${open ? 'is-open' : ''}`}>
        {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <ExternalAnchor href={brand.instagram} className="mobile-instagram"><Instagram size={18} />Instagram<ArrowUpRight size={17} /></ExternalAnchor>
      </nav>
      <div className="header-actions flex items-center gap-4">
        <ExternalAnchor className="header-instagram" href={brand.instagram} aria-label="28 Gramos Records en Instagram"><Instagram size={17} /><span>Instagram</span><ArrowUpRight size={14} /></ExternalAnchor>
        <button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>
}
