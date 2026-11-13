import { useState } from 'react'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { brand } from '../data/content'
import { merchPhotos } from '../data/merch'
import { ExternalAnchor, Reveal, SectionLabel, Stars } from './Primitives'
import { Modal } from './Modal'
import './Merch.css'

export function Merch() {
  const [selected, setSelected] = useState<(typeof merchPhotos)[number] | null>(null)

  return <section id="merch" className="merch-lookbook section-space" data-ambient aria-labelledby="merch-title">
    <div className="page-shell">
      <Reveal>
        <div className="section-topline"><SectionLabel number="04">EL CÓDIGO SE PORTA</SectionLabel><span className="merch-archive-label">28GR / ARCHIVO VISUAL</span></div>
        <div className="merch-heading"><div><span className="merch-kicker">MERCH / 28 GRAMOS</span><h2 id="merch-title">EL CÓDIGO<br /><span>SE PORTA.</span></h2></div><div className="merch-intro"><Stars /><p>Prendas, detalles y los nuestros.<br />El 28, puesto en la calle.</p><span className="brand-signature">Puesto pa’ la calle.</span></div></div>
      </Reveal>
      <div className="merch-contact-sheet"><span>DE CERCA. SIN POSE.</span><span>{merchPhotos.length} TOMAS / 28GR</span></div>
      <div className="merch-collage">
        {merchPhotos.map((photo, index) => <Reveal key={photo.id} className={`merch-frame merch-frame-${photo.layout} merch-shot-${photo.id}`}><figure>
          <button className="merch-image-button" onClick={() => setSelected(photo)} aria-label={`Ampliar merch: ${photo.alt}`}>
            <img src={photo.src} srcSet={`${photo.thumbnail} 400w, ${photo.src} ${photo.width}w`} sizes={photo.layout === 'hero' || photo.layout === 'closing' ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 50vw, 33vw'} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
            <span className="merch-expand" aria-hidden="true"><Maximize2 size={16} /></span>
          </button>
          <figcaption><span>{String(index + 1).padStart(2, '0')} / 28GR</span><span className="merch-caption-copy">{photo.caption}</span></figcaption>
          {index === 0 && <span className="merch-tape" aria-hidden="true">28 GRAMOS RECORDS / STREETWEAR</span>}
        </figure></Reveal>)}
      </div>
      <Reveal className="merch-outro"><div><span className="merch-kicker">LLEVA EL CÓDIGO.</span><p>¿Cuál va contigo?</p></div><ExternalAnchor href={brand.instagram} className="button button-light">Pregunta por las prendas<ArrowUpRight size={18} aria-hidden="true" /></ExternalAnchor><span className="merch-contact-note">TIRA DM A {brand.handle.toUpperCase()}</span></Reveal>
    </div>
    {selected && <Modal title={selected.caption} onClose={() => setSelected(null)}><img className="dialog-image" src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} /></Modal>}
  </section>
}
