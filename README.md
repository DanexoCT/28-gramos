# 28 Gramos Records

Landing editorial de 28 Gramos Records: música, 28Fest, colectivo, streetwear y contacto. Construida con React, TypeScript, Vite, Tailwind CSS, Motion y Lucide, utilizando el logotipo y las fotografías reales de la marca.

## Qué incluye

- Hero fotográfico y navegación responsive con menú móvil.
- Lanzamiento destacado con portada oficial, enlaces de escucha y tracklist desplegable.
- Archivo de 28Fest y estado de los eventos calculado según la fecha de Ciudad de México.
- Galería con ampliación de imágenes, cierre con Escape y restauración del foco.
- Sección editorial de prendas y contacto mediante el Instagram oficial.
- Tipografías locales, imágenes WebP, metadatos sociales y animaciones que respetan movimiento reducido.

No requiere claves de API, cuentas adicionales ni backend.

## Requisitos

Entorno verificado: Node.js 24.22.0 y npm 11.19.1. Las versiones de las dependencias están fijadas en `package-lock.json`.

## Desarrollo

```sh
git clone https://github.com/DanexoCT/28-gramos.git
cd 28-gramos
npm ci
npm run dev
```

En Windows PowerShell, utiliza `npm.cmd` si la política del equipo bloquea `npm.ps1`.

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia Vite en desarrollo. |
| `npm run build` | Comprueba TypeScript y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run test:e2e` | Ejecuta las pruebas de navegador y accesibilidad. |

## Estructura

```text
public/                  Logotipo, fotografías, portada y favicon
src/components/          Navegación, secciones, galería y diálogos
src/data/content.ts      Artistas, lanzamientos, eventos y enlaces
src/styles.css           Sistema visual y ajustes responsive
scripts/prepare-assets.mjs  Preparación de recursos optimizados
tests/landing.spec.ts    Pruebas de interacción y accesibilidad
playwright.config.ts    Configuración de los cuatro tamaños de pantalla
```

## Contenido

Edita `src/data/content.ts` para cambiar enlaces, artistas, lanzamientos, fotografías y eventos. Cada evento admite nombre, edición, fecha ISO `AAAA-MM-DD`, lugar, dirección, imagen y enlace de información. El estado se calcula con la fecha del visitante en la zona `America/Mexico_City`; una fecha vacía significa «por anunciar». No hay venta, precios históricos ni audio simulado.

- Instagram oficial: https://www.instagram.com/28gramosrecords/
- Música y portada verificadas: https://music.apple.com/us/album/5-estrellas/6810184416
- Enlace alternativo: https://music.amazon.co.uk/albums/B0HJ8FF33S
- La edición Halloween de 28Fest corresponde al 17 de octubre de 2026 y figura como archivo. Fecha, lugar y fotografías proceden de las referencias facilitadas.

Las imágenes optimizadas ya están incluidas en `public/`. Para regenerarlas a partir de los originales proporcionados:

```sh
node scripts/prepare-assets.mjs "ruta/al/directorio/de/referencias"
```

## Publicación

`npm run build` genera `dist/`, compatible con hosting estático. Publica el contenido de esa carpeta. Para subdirectorios, configura `base` en `vite.config.ts`.

No faltan datos para servir la landing como está. Al elegir dominio, añade la URL canónica y convierte `og:image` y `twitter:image` de `index.html` en URLs absolutas de ese dominio. La próxima fecha, enlaces de entradas y catálogo se añaden únicamente cuando estén confirmados.

## Verificación

Primero genera la compilación de producción:

```sh
npm run build
npm run test:e2e
```

La suite ejecuta ocho pruebas en cuatro tamaños: 1440, 768, 390 y 320 px. Comprueba navegación, tracklist, diálogos, recursos, fechas, movimiento reducido, recortes, desbordamiento y reglas de accesibilidad WCAG mediante axe.

Las pruebas usan Microsoft Edge si está instalado en Windows. En otros entornos, instala Chromium antes de ejecutarlas:

```sh
npx playwright install chromium
```

Los resultados y capturas se guardan en `test-results/` y están excluidos de Git, al igual que `node_modules/`, `dist/`, archivos de entorno y otros archivos generados.
