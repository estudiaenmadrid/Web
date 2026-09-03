# Especificación de contenido — fichas de programa

> Guía de referencia para redactar cada ficha de programa del catálogo de
> Estudia en Madrid. Leer esto completo antes de escribir contenido.

## Contexto de negocio

Estudia en Madrid es una agencia que conecta a estudiantes latinoamericanos
con universidades privadas de Madrid (y algún programa fuera de Madrid,
como Criminalística en Málaga). Gestiona elección de programa, visado de
estudiante, becas/descuentos y trámites administrativos. Contacto:
WhatsApp +34 677 055 769. No hay dirección física publicada.

**Importante:** el sitio actual (`estudiaenmadrid.com`) tiene un bug de
contenido conocido: 14 páginas indexadas muestran el contenido completo de
"Máster Universitario en Energías Renovables" en lugar del suyo propio (el
título de la página es correcto, el cuerpo no). Si al buscar un programa
encontrás que el contenido no coincide con el título, o parece ser sobre
energías renovables, **no lo uses** — es el bug, no contenido real de ese
programa. Marcalo como "contenido actual inválido (bug)" en la nota interna
y redactá desde cero con lo que encuentres de fuentes de la universidad.

## Restricción técnica de esta sesión

`WebFetch` y `curl` a dominios externos están bloqueados en este entorno
(error `EGRESS_BLOCKED`), incluido `estudiaenmadrid.com` y los sitios de
las universidades. **La única herramienta de investigación externa
disponible es `WebSearch`.** Usala así:
- `"{programa}" site:estudiaenmadrid.com` — para ver si el snippet indexado
  trae contenido real (y no el bug) de la página actual.
- `"{programa}" {universidad si se conoce} Madrid` — para encontrar la
  ficha oficial de la universidad y sacar duración, ECTS, modalidad, plan
  de estudios, salidas profesionales.
- Si no se conoce la universidad, buscar `"{programa}" Madrid universidad
  privada` para identificarla.

WebSearch devuelve fragmentos/snippets, no la página completa — no vas a
poder armar tablas exhaustivas de plan de estudios en todos los casos. Está
bien. **Nunca inventes cifras (ECTS, precio, fechas, duración) que no
aparezcan en un resultado de búsqueda.** Si no se encuentra un dato,
escribí la sección igual pero marcá el campo como pendiente en la nota
interna al final del archivo, en vez de rellenarlo con un valor plausible.

## Plantilla de archivo

Ruta: `content/programas/{categoria-slug}/{programa-slug}.md`

Slugs de categoría (sin tildes/ñ): `administracion`, `derecho`,
`ingenieria`, `salud`, `tecnologia`, `educacion`.

Estructura (ver `content/programas/salud/master-odontologia-digital.md` y
`content/programas/derecho/master-criminalistica.md` como ejemplos ya
redactados en este mismo repo — abrilos como referencia de tono y nivel de
detalle):

```markdown
---
title_seo: "{Nombre del programa} en Madrid | {Universidad si se sabe} - Estudia en Madrid"
meta_description: "..."
slug: /programas/{categoria-slug}/{programa-slug}/
categoria: {Categoría en español, con mayúscula}
nombre_oficial_titulo: "{título oficial si difiere del nombre comercial}"
universidad: "{Universidad, o 'Pendiente de confirmar' si no se encontró}"
ciudad: Madrid (o la que corresponda)
modalidad: Presencial | Online | Semipresencial | Pendiente de confirmar
ects_total: {número o "Pendiente de confirmar"}
duracion: "..."
fecha_inicio: "..."
ultima_actualizacion: "2026-09-03"
schema_type: Course
fuente: "{de dónde salió la info: WebSearch + sitio de la universidad / estudiaenmadrid.com actual, etc.}"
---

# {Título H1 con programa + Madrid + universidad si se sabe}

## Qué es este programa
(2-4 párrafos: qué es, para quién, qué lo diferencia)

## Datos generales
(tabla con lo que se haya confirmado)

## Plan de estudios / contenidos principales
(lo que se haya podido reconstruir — módulos, asignaturas o bloques temáticos)

## Salidas profesionales
(lista)

## Requisitos de acceso
(lista)

## Por qué elegir este programa
(3-5 bullets con diferenciales, si hay info suficiente para no ser genérico)

## Llamada a la acción
> Párrafo estándar invitando a escribir por WhatsApp al +34 677 055 769,
> adaptado al programa.

---
*Nota interna (no publicar): fuente(s) usada(s), qué campos quedaron sin
confirmar, y cualquier ambigüedad del catálogo (p. ej. posible duplicado,
programa no localizado, universidad no identificada) que el equipo deba
resolver.*
```

## Reglas de tono

- Español neutro-latino (el público es LatAm), tono cercano pero profesional.
- Nunca prometer plazas, becas o resultados de visado garantizados.
- No inventar cifras de empleabilidad ni rankings sin fuente.
- Si un programa no se encuentra en ninguna búsqueda (ni en el sitio actual
  ni en universidades de Madrid), escribir igual una ficha básica con lo
  que dice el nombre del programa, y dejarlo explícitamente marcado como
  **"programa no localizado — confirmar con el cliente si sigue vigente"**
  en la nota interna. No inventar universidad ni detalles.

## Al terminar cada programa

No hace falta hacer `git add`/`commit` — eso lo maneja otro proceso.
Simplemente escribir cada archivo `.md` en su ruta final. Al terminar tu
lote completo, devolvé un resumen: qué archivos creaste, qué universidad
identificaste para cada uno, y qué preguntas/vacíos quedaron pendientes
para el cliente.
