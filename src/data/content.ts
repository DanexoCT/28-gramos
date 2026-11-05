export interface Artist {
  id: string
  name: string
}

export interface ExternalLink {
  label: string
  url: string
}

export interface Track {
  title: string
  featuring?: string
}

export interface Release {
  id: string
  title: string
  artist: Artist
  artwork: string
  releasedOn: string
  tracks: Track[]
  platforms: ExternalLink[]
  source: string
}

export type EventStatus = 'próximo' | 'realizado' | 'por anunciar'

export interface LabelEvent {
  id: string
  name: string
  edition: string | null
  date: string | null
  venue: string | null
  address?: string
  image: string | null
  infoUrl?: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
}

export const brand = {
  name: '28 Gramos Records',
  instagram: 'https://www.instagram.com/28gramosrecords/',
  handle: '@28gramosrecords',
}

export const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Música', href: '#musica' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'El colectivo', href: '#colectivo' },
  { label: 'Contacto', href: '#contacto' },
]

export const featuredRelease: Release = {
  id: '5-estrellas',
  title: '5 ESTRELLAS',
  artist: { id: 'orlando-doble-o', name: 'Orlando Doble O' },
  artwork: '/images/5-estrellas.webp',
  releasedOn: '2026-10-01',
  source: 'https://music.apple.com/us/album/5-estrellas/6810184416',
  platforms: [
    { label: 'Apple Music', url: 'https://music.apple.com/us/album/5-estrellas/6810184416' },
    { label: 'Amazon Music', url: 'https://music.amazon.co.uk/albums/B0HJ8FF33S' },
  ],
  tracks: [
    { title: 'AMOR DE DISCOTEK', featuring: 'Jaredsson, ANDREWELL' },
    { title: 'RON AL VASO', featuring: 'McChakker, Danny BR' },
    { title: 'OYE GIRL' },
    { title: 'GALACTIC' },
    { title: 'SHORTY' },
    { title: 'miami bitch', featuring: 'Comboe1, Jaredsson' },
    { title: 'ES IA' },
    { title: 'DIOSA' },
    { title: 'DURO', featuring: 'Jaredsson' },
    { title: 'KBRONES', featuring: 'Jaredsson' },
    { title: 'MAÑOSO V2' },
    { title: 'QUIEN ES TU CLICA', featuring: 'JaguarG' },
    { title: 'TM' },
    { title: 'KAWAZAKI', featuring: 'Roblessed' },
    { title: 'TU MALIANT' },
  ],
}

export const events: LabelEvent[] = [
  {
    id: 'next-28fest',
    name: '28Fest',
    edition: null,
    date: null,
    venue: null,
    image: null,
    infoUrl: brand.instagram,
  },
  {
    id: '28fest-halloween-2026',
    name: '28Fest',
    edition: 'Halloween Edition',
    date: '2026-10-17',
    venue: 'Terraza Diamante',
    address: 'Colima 105, El Mante, Zapopan',
    image: '/images/jaredsson.webp',
  },
]

/** Dates in the supplied flyers are calendar dates in Mexico City. */
export function getEventStatus(event: LabelEvent, now = new Date()): EventStatus {
  if (!event.date) return 'por anunciar'
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
  return event.date < today ? 'realizado' : 'próximo'
}

export function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`)).replaceAll('.', '')
}

export const gallery: GalleryImage[] = [
  {
    src: '/images/collective-1220.webp',
    alt: 'El colectivo reunido con sudaderas y gorras de 28 Gramos Records',
    caption: 'LOS 28, DESDE ADENTRO.',
  },
  {
    src: '/images/portrait-1220.webp',
    alt: 'Retrato con gorra negra y sudadera del logotipo gótico de 28 Gramos',
    caption: 'LA IDENTIDAD SE LLEVA PUESTA.',
  },
]
