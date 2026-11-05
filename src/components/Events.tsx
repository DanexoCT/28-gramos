import { useEffect, useState } from 'react'
import { ArrowUpRight, MapPin, Plus } from 'lucide-react'
import { brand, events, formatEventDate, getEventStatus, type LabelEvent } from '../data/content'
import { ExternalAnchor, Reveal, SectionLabel, Stars } from './Primitives'
import { Modal } from './Modal'
import { assetUrl } from '../lib/assets'
import { SceneAtmosphere } from './VisualEffects'

export function Events() {
  const [now, setNow] = useState(() => new Date())
  const [selected, setSelected] = useState<LabelEvent | null>(null)
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  const next = events.find(event => getEventStatus(event, now) === 'próximo')
  const archive = events.filter(event => getEventStatus(event, now) === 'realizado')

  return <section id="eventos" className="events-section section-space" data-ambient aria-labelledby="events-title">
    <SceneAtmosphere festival />
    <div className="page-shell">
      <Reveal><div className="section-topline"><SectionLabel number="02">LA NOCHE SE PRENDE</SectionLabel><Stars /></div></Reveal>
      <div className="event-layout">
        <Reveal className="event-copy">
          <div className="event-wordmark" aria-hidden="true">28<span>Fest</span><span className="wordmark-underline" /></div>
          <span className="event-pill">{next ? 'PRÓXIMA FECHA' : 'LA NOCHE NO SE ACABA'}</span>
          <h2 id="events-title">{next ? <>{next.name}<br /><span>{next.edition}</span></> : <>La próxima fecha<br />se anuncia <span>aquí.</span></>}</h2>
          {next && next.date ? <p className="event-description">{formatEventDate(next.date)} · {next.venue}</p> : <p className="event-description">Perreo abajo. El bajo arriba.<br />La próxima se prende con los 28.</p>}
          <ExternalAnchor href={next?.infoUrl ?? brand.instagram} className="button button-pink">{next?.infoUrl ? 'Información del evento' : 'Cacha la próxima fecha'}<ArrowUpRight size={18} /></ExternalAnchor>
          <span className="event-handle">{brand.handle}</span>
        </Reveal>
        <Reveal className="event-archive">
          {archive.map(event => <article key={event.id}>
            <div className="archive-heading"><span>NOCHES QUE DEJARON MARCA</span><span>{event.date ? formatEventDate(event.date).toUpperCase() : ''}</span></div>
            <button className="poster-button" onClick={() => setSelected(event)} aria-label={`Ver flyer de ${event.name}, ${event.edition}, evento realizado`}>
              <div className="poster-pink" aria-hidden="true"><img src={assetUrl('images/festival.webp')} alt="" width="1071" height="1600" loading="lazy" /></div>
              {event.image && <img className="poster-main" src={event.image} alt="Flyer de Jaredsson en 28Fest, Halloween Edition, 17 de octubre de 2026" width="1209" height="1209" loading="lazy" />}
              <span className="poster-expand"><Plus size={20} aria-hidden="true" /><span>VER FLYER</span></span>
              <span className="archive-sticker mission-complete">MISIÓN<br /><strong>CUMPLIDA.</strong></span>
            </button>
            <div className="archive-caption"><div><h3>{event.name} / {event.edition}</h3><p><MapPin size={13} aria-hidden="true" />{event.venue} · Zapopan</p></div><span className="status-badge">REALIZADO</span></div>
          </article>)}
        </Reveal>
      </div>
    </div>
    {selected && <Modal title={`${selected.name} · ${selected.edition} · Archivo`} onClose={() => setSelected(null)}>
      {selected.image && <img className="dialog-image" src={selected.image} alt={`Flyer original de Jaredsson en ${selected.name}, ${selected.edition}`} width="1209" height="1209" />}
      <div className="dialog-caption"><strong>EVENTO REALIZADO · {selected.date && formatEventDate(selected.date).toUpperCase()}</strong><p>{selected.venue} · {selected.address}</p><p>Pieza de archivo. Esta edición finalizó; no hay venta de accesos activa.</p></div>
    </Modal>}
  </section>
}
