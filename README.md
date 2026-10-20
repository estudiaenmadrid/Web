# Estudia en Madrid — sitio web

Rediseño del sitio de marketing de Estudia en Madrid, implementado en
Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP, a partir del
handoff de diseño (`Información para maquetar EEM`).

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # eslint
npm run fotos   # procesa las fotos oficiales (ver content/fotos/README.md)
```

## Estructura

- `app/` — rutas (App Router): home, `/programas`, `/programas/[categoria]`,
  `/programas/[categoria]/[programa]`, `/nosotros`, `/universidades`,
  `/guias`.
- `components/` — UI compartida: header/footer/loader/transición de página,
  primitivas de motion (reveal on scroll, pixel-hover, scramble text),
  tarjetas de programa/testimonio.
- `lib/content.ts` — parsea `content/programas/**/*.md` (frontmatter +
  cuerpo) con `gray-matter` + `marked` y arma el catálogo de programas por
  área. **Nunca publica la "Nota interna (no publicar)"** que cada ficha
  trae al final (se recorta automáticamente).
- `lib/testimonials.ts` — parsea los testimonios curados de
  `content/testimonios.md`.
- `lib/photos.ts` + `scripts/fotos.mjs` — fotos oficiales en blanco y negro,
  generadas desde `content/fotos/fotos.json` con `npm run fotos`.
- `data/areas.ts` — las 5 áreas reales del catálogo (Derecho,
  Administración, Ingeniería, Salud, Educación — sin "Tecnología", que el
  cliente confirmó que no es parte de la oferta real).
- `content/` — contenido editorial en Markdown, fuente de verdad para
  programas y testimonios (no tocar la estructura de frontmatter sin
  actualizar `lib/content.ts`).

## Pendiente de contenido real (marcado explícitamente en el sitio)

Estos campos no tienen fuente confirmada todavía y se muestran con un
marcador "A CONFIRMAR" o como placeholder, en vez de inventarse:

- Años operando y número de estudiantes matriculados (stats del hero,
  "Quiénes somos").
- País(es) de operación (sección "Quiénes somos").
- Fotos oficiales de las universidades. El circuito ya está listo
  (`npm run fotos`, ver `content/fotos/README.md`): mientras no haya fotos
  cargadas, cada universidad se muestra con una placa tipográfica. El sitio
  no usa ninguna imagen generada con IA.
- Logos oficiales de las universidades socias.

El número de universidades con convenio (4: UAX, Nebrija, CEU San Pablo, UDIT)
y el conteo de programas por área/universidad se calculan en vivo desde
`content/programas/`, no están hardcodeados.
