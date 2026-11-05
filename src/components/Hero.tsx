import { ArrowDown, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Stars } from './Primitives'
import { assetUrl } from '../lib/assets'
import { SceneAtmosphere } from './VisualEffects'

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
    <div className="hero-content page-shell relative">
      <div className="hero-eyebrow"><span className="live-dot" />28 GRAMOS RECORDS<span className="eyebrow-divider">/</span>MÚSICA & CULTURA</div>
      <h1 id="hero-title"><span className="hero-line"><span className="hero-line-text">EL SONIDO.</span></span><span className="hero-line"><span className="hero-line-text">LA NOCHE.</span></span><span className="hero-line hero-line-last"><span className="hero-last-line hero-line-text">LOS 28.<svg aria-hidden="true" viewBox="0 0 450 25" preserveAspectRatio="none"><path pathLength="1" d="M5 18Q170 0 442 12M45 23Q270 9 420 20" /></svg></span></span></h1>
      <p className="hero-description">Música que nos conecta.<br />Noches que se quedan contigo.</p>
      <div className="hero-buttons flex flex-wrap items-center gap-5">
        <a href="#musica" className="button button-light">Explorar la música<ArrowRight size={18} /></a>
        <a href="#eventos" className="hero-secondary">Ver eventos<ArrowUpIcon /></a>
      </div>
    </div>
    <div className="hero-stamp" aria-hidden="true"><span>EL MISMO CÓDIGO.</span><strong>28</strong><Stars /><span>OTRA FRECUENCIA.</span></div>
    <div className="hero-bottom page-shell"><span>SONIDO PROPIO. IDENTIDAD COMPARTIDA.</span><a href="#musica" aria-label="Descubrir la música de 28 Gramos"><span>DESLIZA Y ENTRA</span><ArrowDown size={17} /></a></div>
  </section>
}

function ArrowUpIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
}

export function IdentityStrip() {
  return <div className="identity-strip" data-ambient aria-hidden="true"><div className="identity-strip-track">{[0, 1].map(copy => <div className="identity-strip-group" key={copy}><span>28 GRAMOS RECORDS</span><Stars /><span>MÚSICA SIN ETIQUETAS</span><Stars /><span>LA FAMILIA SE RECONOCE</span><Stars /></div>)}</div></div>
}
