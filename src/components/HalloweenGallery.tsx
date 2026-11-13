import { useState } from 'react'
import { ArrowUpRight, Camera, MapPin, Maximize2 } from 'lucide-react'
import { halloweenPhotos } from '../data/halloween'
import { brand, formatEventDate, type LabelEvent } from '../data/content'
import { ExternalAnchor, Reveal } from './Primitives'
import { Modal } from './Modal'
import './HalloweenGallery.css'

type EventPhoto = (typeof halloweenPhotos)[number]

function HalloweenPhoto({ photo, index, featured = false, onSelect }: {
  photo: EventPhoto; index: number; featured?: boolean; onSelect: (photo: EventPhoto) => void
}) {
  return <Reveal className={`halloween-frame ${featured ? 'halloween-feature' : ''}`}><figure>
    <button className="halloween-photo-button" onClick={() => onSelect(photo)} aria-label={`Ampliar Halloween: ${photo.alt}`}>
      <img src={photo.src} srcSet={`${photo.thumbnail} 400w, ${photo.src} ${photo.width}w`} sizes={featured ? '(max-width: 767px) 100vw, 60vw' : '(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 25vw'} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={photo.alt} />
      <span className="halloween-expand" aria-hidden="true"><Maximize2 size={16} /></span>
    </button>
    <figcaption><span>{String(index + 1).padStart(2, '0')} / {photo.category}</span>{featured && <span>{photo.caption}</span>}</figcaption>
    {index === 0 && <span className="halloween-photo-tape" aria-hidden="true">28FEST / HALLOWEEN EDITION</span>}
  </figure></Reveal>
}

export function HalloweenGallery({ event }: { event: LabelEvent }) {
  const [selected, setSelected] = useState<EventPhoto | null>(null)

  return <section id="halloween-2026" className="halloween-gallery section-space" data-ambient aria-labelledby="halloween-title">
    <div className="page-shell">
      <Reveal>
        <div className="halloween-topline"><span><Camera size={15} aria-hidden="true" />28FEST / ARCHIVO FOTOGRÁFICO</span><span>{event.date && formatEventDate(event.date).toUpperCase()}</span></div>
        <div className="halloween-heading"><div><p className="halloween-edition">HALLOWEEN EDITION</p><h2 id="halloween-title">ASÍ RETUMBÓ<br /><span>LA TERRAZA.</span></h2></div><div className="halloween-intro"><p>El escenario. Los disfraces. La clica.<br />Una noche que dejó marca.</p><span><MapPin size={14} aria-hidden="true" />{event.venue} · Zapopan</span></div></div>
      </Reveal>
      <div className="halloween-contact-sheet"><span>BAJO PESADO. NOCHE LARGA.</span><span>{halloweenPhotos.length} MOMENTOS / 2026</span></div>
      <div className="halloween-lead">{halloweenPhotos.slice(0, 2).map((photo, index) => <HalloweenPhoto key={photo.id} photo={photo} index={index} featured onSelect={setSelected} />)}</div>
      <div className="halloween-collage">{halloweenPhotos.slice(2).map((photo, index) => <HalloweenPhoto key={photo.id} photo={photo} index={index + 2} onSelect={setSelected} />)}</div>
      <Reveal className="halloween-outro"><div><span>ESTA NOCHE YA ES HISTORIA.</span><p>Nos vemos en la próxima.</p></div><ExternalAnchor href={brand.instagram} className="button button-outline">Sigue las próximas fechas<ArrowUpRight size={17} aria-hidden="true" /></ExternalAnchor></Reveal>
    </div>
    {selected && <Modal title={`28FEST / ${selected.caption}`} onClose={() => setSelected(null)}><img className="dialog-image" src={selected.src} width={selected.width} height={selected.height} alt={selected.alt} /><div className="dialog-caption"><strong>HALLOWEEN EDITION · {event.date && formatEventDate(event.date).toUpperCase()}</strong><p>{selected.caption} · {event.venue}</p></div></Modal>}
  </section>
}
