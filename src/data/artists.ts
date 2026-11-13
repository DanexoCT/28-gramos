import { assetUrl } from '../lib/assets'

// Profiles and Spotify artist embeds checked on 2026-11-13. This is a curated
// snapshot, not live analytics; no listener counts or combined platform ranking.
export const artists = [
  {
    id: 'jaguarg', name: 'JaguarG', image: 'artist-jaguarg.webp',
    imageAlt: 'JaguarG de espaldas al público, en la imagen de referencia proporcionada',
    description: 'Su álbum JAGUARG y el single Peonía llevan su nombre. Con Orlando Doble O firma QUIEN ES TU CLICA y Noches Frías.',
    spotify: '4yFP4cWnWznQzzdgbBdHDY', apple: 'https://music.apple.com/us/artist/jaguarg/1602882203', amazon: 'https://music.amazon.in/artists/B09PLCN4JV/jaguarg',
    tracks: [
      { title: 'QUIEN ES TU CLICA', id: '43her2LEyNnNtyn1HQc49f', credit: 'Con Orlando Doble O' },
      { title: 'Noches Frías', id: '4kfbjuHNc4ANgrw9NSeqvS', credit: 'Con Orlando Doble O' },
      { title: 'Peonía', id: '5bU5VNQ0HFhAwGrbQKwono', credit: 'JaguarG' },
    ],
    releases: [
      { title: 'JAGUARG', type: 'ÁLBUM · 2025', url: 'https://music.apple.com/us/album/jaguarg/1799223008' },
      { title: 'Peonía', type: 'SINGLE · 2026', url: 'https://music.apple.com/us/album/peon%C3%ADa-single/6807943065' },
    ],
  },
  {
    id: 'orlando', name: 'Orlando Doble O', image: 'artist-orlando.webp',
    imageAlt: 'Imagen del perfil de Orlando Doble O en Spotify',
    description: 'La voz detrás de 5 ESTRELLAS: 15 tracks junto a la clica. Su catálogo también incluye Haciendolo Real y Estrella del Ghetto.',
    spotify: '5qLP4ibkcPEwLSE7nUBDFl', apple: 'https://music.apple.com/us/artist/orlando-doble-o/1608123222', amazon: 'https://music.amazon.co.uk/artists/B09RVNW6N6/orlando-doble-o',
    tracks: [
      { title: 'miami bitch', id: '01PYvK8yX5fQPT4pI57kMW', credit: 'Con comboe1 y JAREDSSON' },
      { title: 'OYE GIRL', id: '63s005gbD6Lylopaehr8A5', credit: 'Orlando Doble O' },
      { title: 'RON AL VASO', id: '3XFGOdu7T7M28LjBvKLuMg', credit: 'Con McChakker y Danny BR' },
    ],
    releases: [
      { title: '5 ESTRELLAS', type: 'ÁLBUM · 2026', url: 'https://music.apple.com/us/album/5-estrellas/6810184416' },
      { title: 'Haciendolo Real', type: 'SINGLE · 2026', url: 'https://distrokid.com/hyperfollow/orlandodobleo/haciendolo-real' },
    ],
  },
  {
    id: 'jaredsson', name: 'JAREDSSON', image: 'artist-jaredsson.webp',
    imageAlt: 'Portada de Cargo Lo Mio, de JAREDSSON',
    description: 'Cargo Lo Mio, Fanssyy y Castigo forman parte de su catálogo. En 5 ESTRELLAS comparte micro en miami bitch, AMOR DE DISCOTEK, KBRONES y DURO.',
    spotify: '2Sjwk0JjjIqJbvmm7n6sdr', apple: 'https://music.apple.com/us/artist/jaredsson/1636555248', amazon: 'https://music.amazon.com/artists/B0B7P9X92J/jaredsson',
    tracks: [
      { title: 'miami bitch', id: '01PYvK8yX5fQPT4pI57kMW', credit: 'Con Orlando Doble O y comboe1' },
      { title: 'AMOR DE DISCOTEK', id: '2GWQ8uZ7LuoWLpNvtoQ4mR', credit: 'Con Orlando Doble O y ANDREWELL' },
      { title: 'KBRONES', id: '42yPRpdAdeCn5kSafKvKb3', credit: 'Con Orlando Doble O' },
    ],
    releases: [
      { title: 'Cargo Lo Mio', type: 'SINGLE · 2026', url: 'https://open.spotify.com/track/03N5CUy0xOBl7cQ4zcf4e3' },
      { title: 'Castigo', type: 'SINGLE · 2026', url: 'https://music.amazon.com/albums/B0GPFHMFKW' },
    ],
  },
].map(artist => ({ ...artist, image: assetUrl(`images/${artist.image}`) }))
