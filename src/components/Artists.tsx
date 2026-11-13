import { ArrowUpRight, Play } from 'lucide-react'
import { artists } from '../data/artists'
import { ExternalAnchor, Reveal, SpotifyIcon } from './Primitives'
import { AppleMusicIcon, AmazonMusicIcon } from './PlatformIcons'

export function Artists() {
  return <section id="artistas" className="artists-section section-space page-shell" aria-labelledby="artists-title">
    <Reveal><div className="section-topline"><span className="micro-copy">28 GRAMOS RECORDS / ARTISTAS</span><span className="micro-copy">TRES VOCES. EL MISMO CÓDIGO.</span></div>
      <h2 id="artists-title" className="section-title">LOS QUE <span className="outline-text">SUENAN.</span></h2>
      <p className="artists-intro">La clica tiene nombre. Métete en su sonido.</p>
    </Reveal>
    <div className="artist-grid">{artists.map((artist, index) => <Reveal key={artist.id} className="artist-card-wrap"><article className="artist-card" aria-labelledby={`artist-${artist.id}`}>
      <div className="artist-image"><img src={artist.image} alt={artist.imageAlt} width="640" height="640" loading="lazy" /><span aria-hidden="true">28GR / 0{index + 1}</span></div>
      <div className="artist-body"><h3 id={`artist-${artist.id}`}>{artist.name}</h3><p className="artist-description">{artist.description}</p>
        <h4>EN LA ROTACIÓN <span>/ SPOTIFY</span></h4>
        <ol className="artist-tracks">{artist.tracks.map((track, i) => <li key={track.id}><ExternalAnchor href={`https://open.spotify.com/track/${track.id}`}><span className="artist-track-index">0{i + 1}</span><span className="artist-track-copy"><strong>{track.title}</strong><small>{track.credit}</small></span><Play size={14} aria-hidden="true" /></ExternalAnchor></li>)}</ol>
        <h4>LANZAMIENTOS</h4><div className="artist-releases">{artist.releases.map(release => <ExternalAnchor key={release.title} href={release.url}><span><strong>{release.title}</strong><small>{release.type}</small></span><ArrowUpRight size={16} aria-hidden="true" /></ExternalAnchor>)}</div>
        <div className="artist-platforms" aria-label={`Escuchar a ${artist.name}`}>
          <ExternalAnchor href={`https://open.spotify.com/artist/${artist.spotify}`}><SpotifyIcon size={18} />Spotify<ArrowUpRight size={15} aria-hidden="true" /></ExternalAnchor>
          <ExternalAnchor href={artist.apple}><AppleMusicIcon size={18} />Apple Music<ArrowUpRight size={15} aria-hidden="true" /></ExternalAnchor>
          <ExternalAnchor href={artist.amazon}><AmazonMusicIcon size={18} />Amazon Music<ArrowUpRight size={15} aria-hidden="true" /></ExternalAnchor>
        </div>
      </div>
    </article></Reveal>)}</div>
    <p className="artists-source-note">Selección de temas populares del perfil de cada artista en Spotify. Consulta: 13 nov 2026.</p>
  </section>
}
