import { useState } from 'react'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { brand, gallery, type GalleryImage } from '../data/content'
import { ExternalAnchor, Reveal, SectionLabel, Stars } from './Primitives'
import { Modal } from './Modal'

export function Collective() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  return <>
    <section id="colectivo" className="collective-section section-space page-shell" aria-labelledby="collective-title">
      <Reveal><div className="section-topline"><SectionLabel number="03">EL COLECTIVO</SectionLabel><span className="micro-copy">LOS DE SIEMPRE. LOS 28.</span></div>
        <div className="collective-heading"><h2 id="collective-title" className="section-title">LA FAMILIA<br /><span className="outline-text">SE RECONOCE.</span></h2><div className="collective-intro"><Stars /><p>Un mismo sonido, distintas voces.<br />La música nos junta. La identidad nos conecta.</p><span className="handwritten">Esto se vive desde adentro.</span></div></div>
      </Reveal>
      <div className="collective-gallery">
        {gallery.map((photo, index) => <Reveal key={photo.src} className={`gallery-photo gallery-photo-${index}`}><button className="photo-button" onClick={() => setSelected(photo)} aria-label={`Ampliar: ${photo.alt}`}><img src={photo.src} srcSet={index === 0 ? '/images/collective-700.webp 700w, /images/collective-1220.webp 1220w' : '/images/portrait-700.webp 700w, /images/portrait-1220.webp 1220w'} sizes={index === 0 ? '(max-width: 767px) 100vw, 62vw' : '(max-width: 767px) 75vw, 32vw'} alt={photo.alt} width="1220" height={index === 0 ? '1224' : '1214'} loading="lazy" /><span className="image-expand"><Maximize2 size={18} aria-hidden="true" /></span></button><div className="photo-caption"><span>28GR / 0{index + 1}</span><span>{photo.caption}</span></div></Reveal>)}
        <div className="collective-seal" aria-hidden="true"><span>UNA MISMA</span><strong>FAMILIA</strong><Stars /></div>
      </div>
    </section>
    <section className="merch-section" aria-labelledby="merch-title">
      <div className="merch-photo"><img src="/images/portrait-1220.webp" alt="Detalle de la sudadera negra con el logotipo original de 28 Gramos" width="1220" height="1214" loading="lazy" /></div>
      <Reveal className="merch-copy"><SectionLabel number="04" light>CULTURA QUE SE LLEVA PUESTA</SectionLabel><h2 id="merch-title">EL MISMO<br />CÓDIGO.<span>FUERA DEL ESTUDIO.</span></h2><p>Sudaderas, gorras y una identidad compartida.<br />Las prendas de los 28, desde adentro.</p><ExternalAnchor href={brand.instagram} className="button button-dark">Consultar disponibilidad<ArrowUpRight size={18} /></ExternalAnchor><span className="merch-small">DIRECTO CON EL COLECTIVO, EN INSTAGRAM.</span></Reveal>
    </section>
    {selected && <Modal title={selected.caption} onClose={() => setSelected(null)}><img className="dialog-image" src={selected.src} alt={selected.alt} width="1220" height="1224" /></Modal>}
  </>
}
