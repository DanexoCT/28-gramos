import { ArrowUpRight, ChevronDown, Disc3, Music2 } from 'lucide-react'
import { featuredRelease as release, formatEventDate } from '../data/content'
import { ExternalAnchor, Reveal, SectionLabel, SpotifyIcon, Stars } from './Primitives'
import { SoundBars } from './VisualEffects'

export function Music() {
  return <section id="musica" className="music-section section-space page-shell" data-ambient aria-labelledby="music-title">
    <Reveal><div className="section-topline"><SectionLabel number="01">SONIDO SIN FILTRO</SectionLabel><span className="music-topline-note"><SoundBars /><span className="micro-copy">DÉJALO RETUMBAR.</span></span></div>
      <h2 id="music-title" className="section-title">BAJO <span className="outline-text">PESADO.</span></h2>
    </Reveal>
    <div className="release-grid">
      <Reveal className="release-artwork"><div className="artwork-frame"><img src={release.artwork} alt="Portada de 5 ESTRELLAS, de Orlando Doble O" width="1000" height="1000" loading="lazy" /><div className="artwork-label"><Disc3 size={15} /><span>28 GRAMOS RECORDS × VAST GROOVE RECORDS</span></div></div><span className="artwork-side-note" aria-hidden="true">PONLO A RETUMBAR. / 28GR</span></Reveal>
      <Reveal className="release-info">
        <div className="release-kicker"><span className="tiny-red-line" />EN LA ROTACIÓN<span>ÁLBUM / {release.releasedOn.slice(0, 4)}</span></div>
        <Stars className="release-stars" />
        <h3>{release.title}</h3>
        <p className="artist-name">{release.artist.name}</p>
        <p className="release-description">{release.tracks.length} tracks. Cero relleno.<br />{release.artist.name}. Crudo y sin filtro.</p>
        <div className="release-metadata"><span>{release.tracks.length} TRACKS</span><span>{formatEventDate(release.releasedOn).toUpperCase()}</span></div>
        <div className="platform-links">{release.platforms.map(platform => <ExternalAnchor key={platform.label} href={platform.url} className={`button ${platform.label === 'Spotify' ? 'button-spotify' : 'button-outline'}`}>{platform.label === 'Spotify' ? <SpotifyIcon size={18} /> : <Music2 size={17} />}{platform.label}<ArrowUpRight size={17} /></ExternalAnchor>)}</div>
        <details className="tracklist"><summary>EXPLORAR LOS {release.tracks.length} TRACKS<ChevronDown size={17} aria-hidden="true" /></summary><ol>{release.tracks.map(track => <li key={track.title}><span>{track.title}{track.featuring && <small>FT. {track.featuring}</small>}</span></li>)}</ol></details>
        <p className="release-credit">℗ 2026 28GramosRecords & VastGrooveRecords</p>
      </Reveal>
    </div>
  </section>
}
