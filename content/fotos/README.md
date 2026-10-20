# Fotos oficiales del sitio

Las fotos del sitio son **fotos oficiales de las universidades** (kit de
prensa, oficina de comunicación) o fotos reales de Estudia en Madrid —
nunca imágenes generadas con IA ni fotos de stock haciéndose pasar por un
campus. Se publican en blanco y negro.

Mientras una universidad no tiene fotos cargadas, su lugar lo ocupa una
placa tipográfica (`components/shared/TypePlate.tsx`) con su sigla, año de
fundación y campus — datos reales, no una imagen inventada.

## Cómo agregar una foto

1. Copiá el original (JPG/PNG, horizontal, idealmente ≥ 2000 px de ancho)
   a `fotos-originales/` en la raíz del repo. Esa carpeta no se sube a git.
2. Agregá una entrada a `content/fotos/fotos.json`:

   ```json
   {
     "id": "uax-ciudad-sanitaria-01",
     "archivo": "uax-ciudad-sanitaria.jpg",
     "universidad": "uax",
     "areas": ["salud"],
     "tema": "clinica",
     "alt": "Hospital de simulación de la Ciudad Sanitaria de la UAX",
     "credito": "Foto: Universidad Alfonso X el Sabio",
     "foco": [50, 40]
   }
   ```

3. Corré `npm run fotos`. Genera las versiones en blanco y negro (WebP,
   640 / 1024 / 1600 / 2400 px) en `public/assets/fotos/` y actualiza
   `content/fotos/fotos.generated.json`, que es lo que lee el sitio.
4. `npm run build` y desplegar como siempre.

## Campos

| Campo | Obligatorio | Qué hace |
|---|---|---|
| `id` | sí | Nombre único en kebab-case; es el nombre de los archivos generados. |
| `archivo` | sí | Nombre del original dentro de `fotos-originales/`. |
| `alt` | sí | Descripción de la foto (accesibilidad y SEO). También se usa como pie de foto. |
| `credito` | sí | Autoría, p. ej. `"Foto: Universidad Nebrija"`. Se muestra junto a la foto. |
| `universidad` | no | `uax`, `nebrija` o `ceu-san-pablo`. Sin esto la foto no aparece en fichas ni en páginas de universidad. |
| `areas` | no | Áreas que ilustra (`salud`, `ingenieria`, `derecho`, `administracion`, `educacion`). Una foto **sin áreas** es una foto general del campus y sirve para cualquier programa de esa universidad. |
| `tema` | no | Etiqueta libre: `campus`, `laboratorio`, `clinica`, `biblioteca`, `investigacion`… |
| `foco` | no | Punto de interés `[x, y]` en % (por defecto `[50, 50]`). Los recortes se anclan ahí para no cortar caras ni fachadas. |
| `usos` | no | Lugares fijos del sitio: `home-hero`, `home-cierre`, `nosotros`. Reemplazan las imágenes provisorias de esas secciones. |

## Dónde aparece cada foto

- **Ficha de programa:** una foto de su universidad con su área (p. ej. la
  clínica para Odontología); si no hay, una foto general de ese campus.
  Cuando hay varias candidatas se reparten entre fichas, para que no se
  repita la misma foto en todos los programas.
- **Página de universidad:** la primera foto general como portada, y el
  resto en la galería "El campus por dentro".
- **Listado de universidades y programas destacados del inicio:** la foto
  principal de cada universidad.

## Licencias

Antes de publicar una foto, confirmá que la universidad autoriza su uso
(lo habitual es pedir el kit de prensa a su oficina de comunicación a
través del contacto del convenio) y cargá el crédito que pidan.
