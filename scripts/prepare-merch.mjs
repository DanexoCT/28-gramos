import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = process.argv[2]
if (!source) throw new Error('Uso: node scripts/prepare-merch.mjs <directorio-de-merch>')
const output = 'public/images/merch'
await fs.mkdir(output, { recursive: true })

// Editorial order: the garment, the people wearing it, then the details.
const shots = [
  ['portrait', 'WhatsApp Image 2026-10-21 at 12.56.56 PM.jpeg', 'Sudadera y gorra negras con el logotipo de 28 Gramos', 'EL CÓDIGO SE PORTA.', 'hero'],
  ['neon', '115856', 'Espalda de una sudadera de 28 Gramos entre luces violetas', 'DE ESPALDAS. DE FRENTE.', 'tall'],
  ['snake', '114546', 'Detalle del 28 estampado en una playera junto a una serpiente', 'EL SELLO.', 'detail'],
  ['wanted', '114652', 'Detalle de las cinco estrellas y la palabra wanted en una prenda negra', 'CINCO ESTRELLAS.', 'detail'],
  ['girls', '110937', 'Dos personas con playeras negras de 28 Gramos en un evento', 'LA NOCHE ES DE LOS 28.', 'standard'],
  ['crew', '111919', 'La clica reunida con playeras y sudaderas de 28 Gramos en blanco y negro', 'LOS MISMOS COLORES.', 'wide'],
  ['hand', '114803', 'Primer plano de una serpiente sobre una mano y una prenda de 28 Gramos', 'DE CERCA.', 'detail'],
  ['back', '114519', 'Estampado grande en la espalda de una sudadera con luz cálida', 'HASTA EN LA ESPALDA.', 'portrait'],
  ['hoodie', '114704', 'Sudadera de 28 Gramos y gorras negras bajo luces de color', 'CAPUCHA ARRIBA.', 'portrait'],
  ['boxing', '120213', 'Conjunto de boxeo negro con el logotipo de 28 Gramos en el short', 'TAMBIÉN EN EL RING.', 'portrait'],
  ['bag', '111928', 'Bolsa negra con el logotipo de 28 Gramos frente a una mesa', 'EL 28 VA CONTIGO.', 'wide'],
  ['red-crew', '111941', 'Grupo con diferentes playeras de 28 Gramos bajo iluminación roja', 'MISMO CÓDIGO.', 'wide'],
  ['friends', '110924', 'Tres personas en un evento, una con playera negra de 28 Gramos', 'PUESTO PA’ LA CALLE.', 'standard'],
  ['night', '111900', 'Playeras y sudadera de 28 Gramos en una fotografía nocturna en blanco y negro', 'CERO POSE.', 'standard'],
  ['red-bag', '111955', 'Bolsa estampada de 28 Gramos sobre una mesa bajo luz roja', 'DEL ESTUDIO A LA CALLE.', 'standard'],
  ['ring-crew', '120029', 'Grupo junto a un ring de boxeo con prendas de 28 Gramos', 'CON LOS MÍOS.', 'wide'],
  ['display', '111400', 'Playeras de 28 Gramos colgadas en una exhibición', 'EL SELLO EN LA PARED.', 'wide'],
  ['hangout', '114621', 'Sudadera con el logotipo blanco y rojo de 28 Gramos durante una reunión', 'SIN FILTRO.', 'portrait'],
  ['drop', '114747', 'Retrato con sudadera de 28 Gramos y el texto Nuevo Drop', 'EL 28 AL FRENTE.', 'portrait'],
  ['close-up', '114821', 'Detalle del estampado de una sudadera negra junto a una serpiente', 'TRAZO PROPIO.', 'slim'],
  ['street', '115834', 'Sticker de 28 Gramos sobre una señal intervenida con graffiti', 'EL SELLO EN LA CALLE.', 'slim'],
  ['patches', '110637', 'Detalle de parches y una etiqueta sobre una bolsa verde', 'LOS DETALLES CUENTAN.', 'closing'],
  ['blue', '115939', 'Playera de 28 Gramos fotografiada frente a una alberca bajo luz azul', 'DESPUÉS DEL RUIDO.', 'portrait'],
]
const photos = []
let totalBytes = 0
for (const [id, file, alt, caption, layout] of shots) {
  const original = path.join(source, file.endsWith('.jpeg') ? file : `Captura de pantalla 2026-11-13 ${file}.png`)
  const full = await sharp(original).rotate().resize({ width: 960, withoutEnlargement: true }).webp({ quality: 83 }).toFile(`${output}/${id}.webp`)
  const thumbnail = await sharp(original).rotate().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${output}/${id}-400.webp`)
  totalBytes += full.size + thumbnail.size
  photos.push({ id, alt, caption, layout, width: full.width, height: full.height })
}
const data = `import { assetUrl } from '../lib/assets'\n\n// Images supplied by the brand. Rebuild with scripts/prepare-merch.mjs.\nexport const merchPhotos = ${JSON.stringify(photos, null, 2)}.map(photo => ({\n  ...photo,\n  src: assetUrl(\`images/merch/\${photo.id}.webp\`),\n  thumbnail: assetUrl(\`images/merch/\${photo.id}-400.webp\`),\n}))\n`
await fs.writeFile('src/data/merch.ts', data)
console.log(JSON.stringify({ photos: photos.length, webpBytes: totalBytes }))
