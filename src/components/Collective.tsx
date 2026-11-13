import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { gallery, type GalleryImage } from '../data/content'
import { Reveal, SectionLabel, Stars } from './Primitives'
import { Modal } from './Modal'
import { assetUrl } from '../lib/assets'
import { HerbLeaf } from './HerbDetails'

export function Collective() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  return <>
    <section id="colectivo" className="collective-section section-space page-shell" data-ambient aria-labelledby="collective-title">
      <Reveal><div className="section-topline"><SectionLabel number="03">LA CLICA</SectionLabel><span className="micro-copy">LOS MISMOS. EL MISMO CÓDIGO.</span></div>
        <div className="collective-heading"><h2 id="collective-title" className="section-title">LA CLICA.<br />PURO 28.</h2><div className="collective-intro"><div className="collective-symbols"><Stars /><HerbLeaf className="collective-herb" /></div><p>Los tuyos se reconocen sin hablar.<br />Mismo código. El bajo por delante.</p><span className="brand-signature">Con los míos, hasta el último track.</span></div></div>
      </Reveal>
      <div className="collective-gallery">
        {gallery.map((photo, index) => <Reveal key={photo.src} className={`gallery-photo gallery-photo-${index}`}><button className="photo-button" onClick={() => setSelected(photo)} aria-label={`Ampliar: ${photo.alt}`}><img src={photo.src} srcSet={`${assetUrl(`images/${index === 0 ? 'collective' : 'portrait'}-700.webp`)} 700w, ${photo.src} 1220w`} sizes={index === 0 ? '(max-width: 767px) 100vw, 62vw' : '(max-width: 767px) 75vw, 32vw'} alt={photo.alt} width="1220" height={index === 0 ? '1224' : '1214'} loading="lazy" /><span className="image-expand"><Maximize2 size={18} aria-hidden="true" /></span></button><div className="photo-caption"><span>28GR / 0{index + 1}</span><span>{photo.caption}</span></div></Reveal>)}
        <div className="collective-seal" aria-hidden="true"><span>LA MISMA</span><strong>CLICA</strong><Stars /></div>
      </div>
    </section>
    {selected && <Modal title={selected.caption} onClose={() => setSelected(null)}><img className="dialog-image" src={selected.src} alt={selected.alt} width="1220" height="1224" /></Modal>}
  </>
}
