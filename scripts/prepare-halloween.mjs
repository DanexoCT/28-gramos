import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = process.argv[2]
if (!source) throw new Error('Uso: node scripts/prepare-halloween.mjs <directorio-del-evento>')
const output = 'public/images/halloween-2026'
await fs.mkdir(output, { recursive: true })

// Editorial sequence, using only the 37 photographs provided for this event.
const shots = [
  ['111316', 'Presentación con guitarra, vestuario de Halloween y chispas en el escenario', 'BAJO, LUCES Y FUEGO.', 'EN VIVO'],
  ['111551', 'Artista del show de fuego con abanicos encendidos en la terraza', 'LA NOCHE EN LLAMAS.', 'SHOW'],
  ['110551', 'Vocalistas y guitarrista en el escenario bajo luces azules y verdes', 'EL BAJO ARRIBA.', 'EN VIVO'],
  ['110611', 'Público frente al escenario iluminado de azul y fucsia', 'DESDE EL PÚBLICO.', 'LA CLICA'],
  ['110731', 'Guitarrista y contrabajista durante la presentación en vivo', 'LAS CUERDAS.', 'EN VIVO'],
  ['111057', 'Tres vocalistas con micrófonos sobre el escenario', 'MICROS ABIERTOS.', 'EN VIVO'],
  ['111233', 'Vocalista con el rostro cubierto entre haces de luz azul', 'SIN BAJARLE.', 'EN VIVO'],
  ['111248', 'Vocalista con gorra y lentes durante su presentación', 'EN EL MICRO.', 'EN VIVO'],
  ['111439', 'Vocalista con conjunto estampado y bailarinas en el escenario', 'LA TERRAZA RETUMBA.', 'EN VIVO'],
  ['111452', 'Vocalista con paliacate junto a otra persona sobre el escenario', 'A RAS DEL ESCENARIO.', 'EN VIVO'],
  ['111741', 'Vocalista cantando con un show de fuego y luces azules al fondo', 'HASTA EL ÚLTIMO TRACK.', 'EN VIVO'],
  ['111646', 'Vista vertical del escenario desde el público', 'PRIMERA FILA.', 'LA CLICA'],
  ['111606', 'Retrato de una persona con lentes bajo luces azules', 'BAJO LAS LUCES.', 'RETRATOS'],
  ['111110', 'Persona con guitarra, lentes y una corona decorativa levantando el brazo', 'EL SHOW SIGUE.', 'EN VIVO'],
  ['111429', 'Personas junto al escenario durante una presentación nocturna', 'DESDE ABAJO.', 'LA CLICA'],
  ['111506', 'Primer plano de dos personas con paliacate, gorra y maquillaje', 'DE CERCA.', 'RETRATOS'],
  ['111531', 'Vocalista con conjunto estampado y otros participantes sobre el escenario', 'LA NOCHE NO PARA.', 'EN VIVO'],
  ['111628', 'Retrato en blanco y negro de dos asistentes con prendas y accesorios del 28', 'EL MISMO CÓDIGO.', 'RETRATOS'],
  ['111003', 'Detalle de un chaleco y un conjunto estampado con accesorios de 28 Gramos', 'EL SELLO PRESENTE.', 'DETALLES'],
  ['111016', 'Fotógrafo con chamarra de 28 Gramos capturando la fiesta', 'DETRÁS DE LA CÁMARA.', 'LA CLICA'],
  ['111136', 'Asistentes grabando y compartiendo momentos bajo luces violetas', 'LOS NUESTROS.', 'LA CLICA'],
  ['111159', 'Pantalla de un teléfono que graba una presentación con micrófonos', 'OTRA MIRADA.', 'DETALLES'],
  ['111048', 'Tres asistentes con vestuario negro, alas y accesorios de Halloween', 'LA NOCHE SE VISTE.', 'DISFRACES'],
  ['111121', 'Grupo de asistentes con sombreros, máscaras y disfraces de Halloween', 'SIN PASAR DESAPERCIBIDOS.', 'DISFRACES'],
  ['111223', 'Asistente con vestuario rosa y blanco posando durante la fiesta', 'EN LA TERRAZA.', 'DISFRACES'],
  ['111300', 'Asistentes con disfraces y una persona con traje de Spider-Man', 'TODOS EN LA MISMA NOCHE.', 'DISFRACES'],
  ['111307', 'Asistente con disfraz táctico y máscara de calavera', 'HALLOWEEN EDITION.', 'DISFRACES'],
  ['111706', 'Asistentes con disfraces negros y azules entre el público', 'FUERA DE PERSONAJE.', 'DISFRACES'],
  ['111725', 'Dos asistentes posando, una con abanico rojo y otra con chaleco', 'CERO POSE.', 'RETRATOS'],
  ['111754', 'Grupo de asistentes riendo y celebrando con sus disfraces', 'CON LOS MÍOS.', 'LA CLICA'],
  ['111342', 'Dos participantes con guantes de boxeo rodeados por el público', 'TAMBIÉN HUBO GUANTES.', 'LA CLICA'],
  ['110637', 'Detalle de parches y una etiqueta sobre una bolsa verde', 'EL SELLO EN LOS DETALLES.', 'DETALLES'],
  ['110839', 'Persona con gorra, lentes y maquillaje de Halloween junto a un encendedor', 'ENTRE LUCES.', 'RETRATOS'],
  ['110759', 'Moledor abierto, papel y un cartel de 28Fest sobre una mesa', 'ENTRE TOMAS.', 'DETALLES'],
  ['110924', 'Tres asistentes junto a la escalera, uno con maquillaje y otro con playera del 28', 'LA CLICA EN HALLOWEEN.', 'LA CLICA'],
  ['110937', 'Dos asistentes con playeras de 28 Gramos durante el evento', 'EL 28 AL FRENTE.', 'LA CLICA'],
  ['111400', 'Playeras de la marca expuestas durante el evento', 'EL CÓDIGO TAMBIÉN SE PORTA.', 'MERCH'],
]
if (shots.length !== 37 || new Set(shots.map(s => s[0])).size !== 37) throw new Error('Revisar selección de fotos')
const shared = { '110637': 'patches', '110924': 'friends', '110937': 'girls', '111400': 'display' }
const photos = []
let generatedBytes = 0
let reusedPhotos = 0
for (const [id, alt, caption, category] of shots) {
  const filename = `Captura de pantalla 2026-11-13 ${id}.png`
  const original = path.join(source, filename)
  let srcPath = `images/halloween-2026/${id}.webp`
  let full
  if (shared[id]) {
    try {
      const supplied = await fs.readFile(original)
      const merchOriginal = await fs.readFile(path.join(source, '..', 'merch', filename))
      if (supplied.equals(merchOriginal)) {
        const existing = await sharp(`public/images/merch/${shared[id]}.webp`).metadata()
        await fs.access(`public/images/merch/${shared[id]}-400.webp`)
        full = { width: existing.width, height: existing.height }
        srcPath = `images/merch/${shared[id]}.webp`
        reusedPhotos++
      }
    } catch { /* A fresh checkout can regenerate the event assets independently. */ }
  }
  if (!full) {
    full = await sharp(original).rotate().resize({ width: 960, withoutEnlargement: true }).webp({ quality: 83 }).toFile(`${output}/${id}.webp`)
    const small = await sharp(original).rotate().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${output}/${id}-400.webp`)
    generatedBytes += full.size + small.size
  }
  photos.push({ id, alt, caption, category, srcPath, width: full.width, height: full.height })
}
const data = `import { assetUrl } from '../lib/assets'\n\n// Supplied event photographs. Regenerate with scripts/prepare-halloween.mjs.\nexport const halloweenPhotos = ${JSON.stringify(photos, null, 2)}.map(photo => ({\n  ...photo, src: assetUrl(photo.srcPath), thumbnail: assetUrl(photo.srcPath.replace('.webp', '-400.webp')),\n}))\n`
await fs.writeFile('src/data/halloween.ts', data)
console.log(JSON.stringify({ photos: photos.length, reusedPhotos, generatedBytes }))
