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
- Fotografía real aprobada por el cliente (hero, campus, equipo) — hoy son
  bloques placeholder con etiqueta.
- Logos oficiales de las universidades socias (hoy placeholders con
  nombre).
- Guías/artículos del blog — la sección `/guias` está lista (tabs,
  filtros, grid) pero sin contenido publicado todavía.

El número de universidades con convenio (4: UAX, Nebrija, CEU San Pablo,
UCJC) y el conteo de programas por área/universidad se calculan en vivo
desde `content/programas/`, no están hardcodeados.
