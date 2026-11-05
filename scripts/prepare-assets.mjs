import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = process.argv[2]
if (!source) throw new Error('Uso: node scripts/prepare-assets.mjs <directorio-de-referencias>')
const output = path.resolve('public/images')
await fs.mkdir(output, { recursive: true })

const sources = {
  collective: 'WhatsApp Image 2026-10-21 at 12.56.55 PM (5).jpeg',
  portrait: 'WhatsApp Image 2026-10-21 at 12.56.56 PM.jpeg',
  logo: 'WhatsApp Image 2026-10-21 at 12.56.55 PM (1).jpeg',
  festival: 'WhatsApp Image 2026-10-21 at 12.56.53 PM.jpeg',
  jaredsson: 'WhatsApp Image 2026-10-21 at 12.56.55 PM (2).jpeg',
}

for (const name of ['collective', 'portrait']) {
  for (const width of [700, 1220]) {
    await sharp(path.join(source, sources[name])).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, `${name}-${width}.webp`))
  }
}
for (const name of ['logo', 'festival', 'jaredsson']) {
  await sharp(path.join(source, sources[name])).rotate().webp({ quality: name === 'logo' ? 94 : 85 }).toFile(path.join(output, `${name}.webp`))
}

// Official album artwork, verified against the release page on Apple Music.
const artwork = 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/09/68/09/09680949-f22b-dbcd-6e7d-c99a15c76298/artwork.jpg/1000x1000bb.jpg'
const response = await fetch(artwork)
if (!response.ok) throw new Error(`No se pudo descargar la portada: ${response.status}`)
await sharp(Buffer.from(await response.arrayBuffer())).resize(1000, 1000, { fit: 'inside' }).webp({ quality: 88 }).toFile(path.join(output, '5-estrellas.webp'))
await sharp(path.join(source, sources.collective)).resize(1200, 630, { fit: 'cover', position: 'north' }).jpeg({ quality: 86 }).toFile(path.join(output, 'social.jpg'))
await sharp(path.join(source, sources.logo)).extract({ left: 145, top: 0, width: 355, height: 290 }).resize(96, 96, { fit: 'contain', background: '#080808' }).png().toFile('public/favicon.png')
console.log('Recursos optimizados en public/images. Originales conservados.')
