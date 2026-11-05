import { ArrowDown, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Stars } from './Primitives'
import { assetUrl } from '../lib/assets'
import { SceneAtmosphere } from './VisualEffects'
import { DistrictRadar, WantedHud } from './StreetDetails'
import { HerbLeaf } from './HerbDetails'

export function Hero() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  return <section id="inicio" className="hero relative" data-ambient data-entered={entered} aria-labelledby="hero-title">
    <div className="hero-photo" aria-hidden="true"><img src={assetUrl('images/collective-1220.webp')} srcSet={`${assetUrl('images/collective-700.webp')} 700w, ${assetUrl('images/collective-1220.webp')} 1220w`} sizes="(max-width: 767px) 100vw, 70vw" alt="" width="1220" height="1224" fetchPriority="high" /></div>
    <div className="hero-shade" aria-hidden="true" />
    <SceneAtmosphere />
    <WantedHud />
    <div className="hero-content page-shell relative">
      <div className="hero-eyebrow"><span className="live-dot" /><span>28 GRAMOS RECORDS</span><span className="eyebrow-divider">/</span><span className="hero-category">SONIDO UNDERGROUND</span></div>
      <h1 id="hero-title"><span className="hero-line"><span className="hero-line-text">LA CALLE.</span></span><span className="hero-line"><span className="hero-line-text">EL BAJO.</span></span><span className="hero-line hero-line-last"><span className="hero-last-line hero-line-text">LOS 28.<svg aria-hidden="true" viewBox="0 0 450 25" preserveAspectRatio="none"><path pathLength="1" d="M5 18Q170 0 442 12M45 23Q270 9 420 20" /></svg></span></span></h1>
      <p className="hero-description">Bajo cabrón. Letras sin filtro.<br />Hasta que retumbe la cuadra.</p>
      <div className="hero-buttons flex flex-wrap items-center gap-5">
        <a href="#musica" className="button button-light">Escucha a los 28<ArrowRight size={18} /></a>
        <a href="#eventos" className="hero-secondary">Ver eventos<ArrowUpIcon /></a>
      </div>
    </div>
    <DistrictRadar />
    <div className="hero-bottom page-shell"><span>BAJO PESADO. CERO POSE.</span><a href="#musica" aria-label="Descubrir la música de 28 Gramos"><span>ENTRA EN EL RUIDO</span><ArrowDown size={17} /></a></div>
  </section>
}

function ArrowUpIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
}

export function IdentityStrip() {
  return <div className="identity-strip" data-ambient aria-hidden="true"><div className="identity-strip-track">{[0, 1].map(copy => <div className="identity-strip-group" key={copy}><span>28 GRAMOS RECORDS</span><Stars /><span>BAJO PESADO. CERO POSE.</span><HerbLeaf className="strip-herb" /><span>PURO 28. SIN FILTRO.</span><Stars /></div>)}</div></div>
}
