import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { brand } from '../data/content'
import { assetUrl } from '../lib/assets'
import { ExternalAnchor, InstagramIcon as Instagram, Reveal, SectionLabel, Stars } from './Primitives'

export function Footer() {
  return <footer id="contacto" className="footer section-space page-shell" aria-labelledby="contact-title">
    <Reveal><div className="section-topline"><SectionLabel number="05">TIRA LÍNEA</SectionLabel><Stars /></div><div className="footer-headline"><h2 id="contact-title">PURO 28.<br />SIN <span className="outline-text">FILTRO.</span></h2><ExternalAnchor href={brand.instagram} className="contact-arrow" aria-label="Contactar con 28 Gramos Records en Instagram"><ArrowUpRight strokeWidth={1.2} aria-hidden="true" /></ExternalAnchor></div><div className="contact-row"><p>Música, fechas y prendas. Tira DM.</p><ExternalAnchor href={brand.instagram} className="footer-instagram"><Instagram size={19} />{brand.handle}<ArrowUpRight size={18} /></ExternalAnchor></div></Reveal>
    <div className="footer-bottom"><a href="#inicio" className="footer-logo" aria-label="28 Gramos Records — volver al inicio"><img src={assetUrl('images/logo.webp')} alt="28 Gramos Records" width="682" height="486" loading="lazy" /></a><div className="footer-note"><span>28 GRAMOS RECORDS</span><span>BAJO. CALLE. LEALTAD.</span></div><a href="#inicio" className="back-to-top">VOLVER ARRIBA<ArrowUp size={16} aria-hidden="true" /></a></div>
  </footer>
}
