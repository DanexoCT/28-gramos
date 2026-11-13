import { assetUrl } from '../lib/assets'

// Images supplied by the brand. Rebuild with scripts/prepare-merch.mjs.
export const merchPhotos = [
  {
    "id": "portrait",
    "alt": "Sudadera y gorra negras con el logotipo de 28 Gramos",
    "caption": "EL CÓDIGO SE PORTA.",
    "layout": "hero",
    "width": 960,
    "height": 955
  },
  {
    "id": "neon",
    "alt": "Espalda de una sudadera de 28 Gramos entre luces violetas",
    "caption": "DE ESPALDAS. DE FRENTE.",
    "layout": "tall",
    "width": 858,
    "height": 1170
  },
  {
    "id": "snake",
    "alt": "Detalle del 28 estampado en una playera junto a una serpiente",
    "caption": "EL SELLO.",
    "layout": "detail",
    "width": 960,
    "height": 1026
  },
  {
    "id": "wanted",
    "alt": "Detalle de las cinco estrellas y la palabra wanted en una prenda negra",
    "caption": "CINCO ESTRELLAS.",
    "layout": "detail",
    "width": 960,
    "height": 1015
  },
  {
    "id": "girls",
    "alt": "Dos personas con playeras negras de 28 Gramos en un evento",
    "caption": "LA NOCHE ES DE LOS 28.",
    "layout": "standard",
    "width": 960,
    "height": 769
  },
  {
    "id": "crew",
    "alt": "La clica reunida con playeras y sudaderas de 28 Gramos en blanco y negro",
    "caption": "LOS MISMOS COLORES.",
    "layout": "wide",
    "width": 960,
    "height": 666
  },
  {
    "id": "hand",
    "alt": "Primer plano de una serpiente sobre una mano y una prenda de 28 Gramos",
    "caption": "DE CERCA.",
    "layout": "detail",
    "width": 844,
    "height": 1438
  },
  {
    "id": "back",
    "alt": "Estampado grande en la espalda de una sudadera con luz cálida",
    "caption": "HASTA EN LA ESPALDA.",
    "layout": "portrait",
    "width": 960,
    "height": 977
  },
  {
    "id": "hoodie",
    "alt": "Sudadera de 28 Gramos y gorras negras bajo luces de color",
    "caption": "CAPUCHA ARRIBA.",
    "layout": "portrait",
    "width": 960,
    "height": 977
  },
  {
    "id": "boxing",
    "alt": "Conjunto de boxeo negro con el logotipo de 28 Gramos en el short",
    "caption": "TAMBIÉN EN EL RING.",
    "layout": "portrait",
    "width": 754,
    "height": 890
  },
  {
    "id": "bag",
    "alt": "Bolsa negra con el logotipo de 28 Gramos frente a una mesa",
    "caption": "EL 28 VA CONTIGO.",
    "layout": "wide",
    "width": 960,
    "height": 669
  },
  {
    "id": "red-crew",
    "alt": "Grupo con diferentes playeras de 28 Gramos bajo iluminación roja",
    "caption": "MISMO CÓDIGO.",
    "layout": "wide",
    "width": 960,
    "height": 669
  },
  {
    "id": "friends",
    "alt": "Tres personas en un evento, una con playera negra de 28 Gramos",
    "caption": "PUESTO PA’ LA CALLE.",
    "layout": "standard",
    "width": 960,
    "height": 748
  },
  {
    "id": "night",
    "alt": "Playeras y sudadera de 28 Gramos en una fotografía nocturna en blanco y negro",
    "caption": "CERO POSE.",
    "layout": "standard",
    "width": 960,
    "height": 684
  },
  {
    "id": "red-bag",
    "alt": "Bolsa estampada de 28 Gramos sobre una mesa bajo luz roja",
    "caption": "DEL ESTUDIO A LA CALLE.",
    "layout": "standard",
    "width": 960,
    "height": 644
  },
  {
    "id": "ring-crew",
    "alt": "Grupo junto a un ring de boxeo con prendas de 28 Gramos",
    "caption": "CON LOS MÍOS.",
    "layout": "wide",
    "width": 960,
    "height": 1085
  },
  {
    "id": "display",
    "alt": "Playeras de 28 Gramos colgadas en una exhibición",
    "caption": "EL SELLO EN LA PARED.",
    "layout": "wide",
    "width": 960,
    "height": 640
  },
  {
    "id": "hangout",
    "alt": "Sudadera con el logotipo blanco y rojo de 28 Gramos durante una reunión",
    "caption": "SIN FILTRO.",
    "layout": "portrait",
    "width": 960,
    "height": 1033
  },
  {
    "id": "drop",
    "alt": "Retrato con sudadera de 28 Gramos y el texto Nuevo Drop",
    "caption": "EL 28 AL FRENTE.",
    "layout": "portrait",
    "width": 858,
    "height": 1434
  },
  {
    "id": "close-up",
    "alt": "Detalle del estampado de una sudadera negra junto a una serpiente",
    "caption": "TRAZO PROPIO.",
    "layout": "slim",
    "width": 848,
    "height": 1448
  },
  {
    "id": "street",
    "alt": "Sticker de 28 Gramos sobre una señal intervenida con graffiti",
    "caption": "EL SELLO EN LA CALLE.",
    "layout": "slim",
    "width": 870,
    "height": 1278
  },
  {
    "id": "patches",
    "alt": "Detalle de parches y una etiqueta sobre una bolsa verde",
    "caption": "LOS DETALLES CUENTAN.",
    "layout": "closing",
    "width": 960,
    "height": 717
  },
  {
    "id": "blue",
    "alt": "Playera de 28 Gramos fotografiada frente a una alberca bajo luz azul",
    "caption": "DESPUÉS DEL RUIDO.",
    "layout": "portrait",
    "width": 748,
    "height": 870
  }
].map(photo => ({
  ...photo,
  src: assetUrl(`images/merch/${photo.id}.webp`),
  thumbnail: assetUrl(`images/merch/${photo.id}-400.webp`),
}))
