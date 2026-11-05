import { ArrowDown, ArrowRight } from 'lucide-react'
import { Stars } from './Primitives'

export function Hero() {
  return <section id="inicio" className="hero relative" aria-labelledby="hero-title">
    <div className="hero-photo" aria-hidden="true"><img src="/images/collective-1220.webp" srcSet="/images/collective-700.webp 700w, /images/collective-1220.webp 1220w" sizes="(max-width: 767px) 100vw, 70vw" alt="" width="1220" height="1224" fetchPriority="high" /></div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-content page-shell relative">
      <div className="hero-eyebrow"><span className="live-dot" />28 GRAMOS RECORDS<span className="eyebrow-divider">/</span>MÚSICA & CULTURA</div>
      <h1 id="hero-title">EL SONIDO.<br />LA NOCHE.<br /><span className="hero-last-line">LOS 28.<svg aria-hidden="true" viewBox="0 0 450 25" preserveAspectRatio="none"><path d="M5 18Q170 0 442 12M45 23Q270 9 420 20" /></svg></span></h1>
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
  return <div className="identity-strip" aria-hidden="true"><div><span>28 GRAMOS RECORDS</span><Stars /><span>MÚSICA SIN ETIQUETAS</span><Stars /><span>LA FAMILIA SE RECONOCE</span><Stars /><span>28 GRAMOS RECORDS</span></div></div>
}
