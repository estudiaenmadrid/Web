# Índice maestro de programas — Estudia en Madrid

> Catálogo de 68 programas (Grado / Doble Grado / Máster / Postgrado) según
> el handoff del rastreo del sitio (`HANDOFF_eMM.md`), agrupado en 6
> categorías. Se excluyen del catálogo principal 4 "Especialista" y 3
> "Técnico/FP" (nivel no universitario) — listados aparte al final.
>
> Estado: 🟢 redactado · ⚪ pendiente (esperando info del cliente)
>
> **Última actualización: 2026-09-03 — catálogo redactado casi al 100%**
> (66 de 68; solo falta Convalidación de título, pendiente de info del
> cliente). Investigado con WebSearch (WebFetch/curl a dominios externos
> están bloqueados en este entorno) — ver `_CONTENT-SPEC.md`.

## ⚠️ Decisiones pendientes para el cliente (leer antes de publicar)

Estos son los hallazgos que requieren una decisión humana antes de subir
contenido al sitio — no son errores de redacción, son ambigüedades reales
del catálogo que ninguna búsqueda pudo resolver del todo:

1. **"Grado en ADE" vs. "Grado en Administración de Empresas (UAX)"**
   (Administración) — toda búsqueda de "Grado en ADE" resuelve a la misma
   URL que "Administración de Empresas UAX". Probablemente son el mismo
   programa duplicado en el catálogo original. Ambos archivos existen,
   ninguno se borró.
2. **"Máster en Inteligencia Artificial" (presencial) vs. "...Online"**
   (Ingeniería) — no hay evidencia de que UAX tenga una versión presencial
   de IA distinta de la online. La ficha presencial quedó con universidad
   "pendiente de confirmar" en vez de inventar datos.
3. **"Máster en Ciberseguridad" (Madrid, Derecho) vs. "...(Málaga)"
   (Ingeniería)** — confirmado que son programas distintos (universidades/
   sedes distintas: Nebrija en Madrid, UAX Mare Nostrum en Málaga). No es
   duplicado.
4. **Ciberseguridad Málaga — posible doble ficha interna** — UAX Mare
   Nostrum parece tener dos variantes de marketing casi idénticas (una
   "online", otra con examen presencial en Málaga). Sin confirmar si son
   dos programas reales o el mismo con dos nombres.
5. **"Máster Oficial en Big Data y Business Analytics" (Tecnología)** —
   probable solapamiento/triplicado con "Máster Universitario en Big Data
   Online" (Ingeniería) y "Máster en Business Analytics" (Administración).
   Se identificaron 3 candidatos distintos sin poder confirmar cuál es el
   programa real. **El más urgente de resolver antes de publicar.**
6. **"Grado en Diseño de Producto" (U-tad) vs. "Grado en Diseño Industrial"
   (UAX)** (Ingeniería) — podrían ser el mismo grado con nombres distintos
   ("Diseño Industrial y Desarrollo de Producto" es el título oficial de
   UAX). Sin confirmar.
7. **"Grado en Animación" (Ingeniería)** — dos universidades de Madrid
   (UDIT y U-tad) ofrecen un grado casi idéntico; no se pudo determinar
   cuál tiene convenio con Estudia en Madrid. Ficha redactada con
   universidad "pendiente de confirmar".
8. **"Máster en Psicopedagogía" presencial vs. online** (Educación) — no
   hay evidencia de que UAX ofrezca versión presencial (su único máster de
   esta área es 100% online, con exámenes presenciales opcionales). La
   ficha "presencial" quedó marcada como no publicable sin confirmación.
9. **"Postgrado en Tecnología Educativa" vs. "Máster Oficial en Tecnología
   Educativa y Competencias Digitales para Docentes"** (Educación) —
   evidencia fuerte de que es el **mismo programa UAX** con dos URLs
   distintas en el sitio actual (una de ellas retirada de la categoría
   Educación). Recomendado fusionar en una sola ficha antes de publicar.
10. **Robótica (UCJC) y Diseño de Producto (U-tad)** (Ingeniería) — son
    universidades nuevas, fuera del patrón habitual del catálogo (UAX,
    CEU San Pablo, Nebrija, UDIT). Confirmar si Estudia en Madrid
    realmente tiene convenio con UCJC y U-tad antes de publicar.
11. **Varios programas sin página indexada en el sitio actual**: Grado en
    Fisioterapia, Grado en CAFYD (ambos standalone), Máster en Dirección y
    Gestión Sanitaria eHealth, Grado en Robótica, Grado en Diseño de
    Producto, Grado en Diseño Industrial. Confirmar si ya existen en el
    sitio (no indexadas) o si son contenido enteramente nuevo a publicar.

**Ningún precio de programa está confirmado** salvo Odontología Digital
(dato directo del cliente). Fechas de inicio exactas y planes de estudio
completos (asignatura por asignatura) tampoco están confirmados en la
mayoría de los casos — WebSearch da fragmentos, no la ficha completa de
la universidad. Cada archivo `.md` tiene su propia nota interna con el
detalle de qué falta específicamente.

## Administración (8/8 🟢)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en ADE | UAX (¿duplicado de la siguiente? ver #1) | `administracion/grado-ade.md` |
| Grado en ADE y Relaciones Internacionales | UAX | `administracion/grado-ade-relaciones-internacionales.md` |
| Grado en Administración de Empresas | UAX | `administracion/grado-administracion-empresas-uax.md` |
| MBA | UAX (inferida, no confirmada) | `administracion/mba.md` |
| Máster en Business Analytics | Universidad Nebrija | `administracion/master-business-analytics.md` |
| Máster Universitario en Dirección Financiera Online | UAX (inferida) | `administracion/master-direccion-financiera-online.md` |
| Máster Universitario en Dirección de Proyectos Online | UAX (inferida) | `administracion/master-direccion-proyectos-online.md` |
| Máster Universitario en Sistemas Integrados de Gestión | UAX (inferida, ambiguo con Univ. Europea) | `administracion/master-sistemas-integrados-gestion.md` |

## Derecho (8/9 🟢 · 1 ⚪)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Derecho | Universidad Nebrija | `derecho/grado-derecho.md` |
| Doble Grado en Derecho y ADE | Universidad Nebrija | `derecho/doble-grado-derecho-ade.md` |
| Convalidación de título de abogado latinoamericano | — | ⚪ esperando info del cliente |
| Máster Universitario en Acceso a la Abogacía y la Procura | Universidad Nebrija (inferida) | `derecho/master-acceso-abogacia-procura.md` |
| Máster Universitario en Criminalística | CEU San Pablo | `derecho/master-criminalistica.md` |
| Máster Universitario en Dirección de RRHH Online | Universidad Nebrija | `derecho/master-direccion-rrhh-online.md` |
| Máster en Ciberseguridad (Madrid) | Universidad Nebrija — título propio, no oficial | `derecho/master-ciberseguridad.md` |
| Máster en Derecho Internacional Humanitario | Universidad Nebrija | `derecho/master-derecho-internacional-humanitario.md` |
| Máster en Sostenibilidad y Compliance | CEU San Pablo — título propio, no oficial | `derecho/master-sostenibilidad-compliance.md` |

## Ingeniería (21/21 🟢)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Ingeniería Informática | UAX | `ingenieria/grado-ingenieria-informatica.md` |
| Grado en Ingeniería Biomédica | UAX | `ingenieria/grado-ingenieria-biomedica.md` |
| Grado en Ingeniería Aeroespacial | UAX | `ingenieria/grado-ingenieria-aeroespacial.md` |
| Grado en Ingeniería Matemática | UAX | `ingenieria/grado-ingenieria-matematica.md` |
| Grado en Ingeniería Mecánica | UAX | `ingenieria/grado-ingenieria-mecanica.md` |
| Doble Grado en Ingeniería Matemática e Informática | UAX | `ingenieria/doble-grado-ingenieria-matematica-informatica.md` |
| Grado en Física | UAX | `ingenieria/grado-fisica.md` |
| Grado en Inteligencia Artificial | UAX | `ingenieria/grado-inteligencia-artificial.md` |
| Grado en Robótica | UCJC (confirmar convenio, ver #10) | `ingenieria/grado-robotica.md` |
| Grado en Diseño de Producto | U-tad (confirmar convenio, ver #6/#10) | `ingenieria/grado-diseno-producto.md` |
| Grado en Diseño Industrial | UAX (posible fusión con el anterior, ver #6) | `ingenieria/grado-diseno-industrial.md` |
| Grado en Animación | Pendiente de confirmar — UDIT o U-tad (ver #7) | `ingenieria/grado-animacion.md` |
| Máster en Ingeniería Industrial | UAX | `ingenieria/master-ingenieria-industrial.md` |
| Máster Universitario en Inteligencia Artificial Online | UAX | `ingenieria/master-inteligencia-artificial-online.md` |
| Máster en Inteligencia Artificial (presencial) | Pendiente de confirmar — probable duplicado (ver #2) | `ingenieria/master-inteligencia-artificial.md` |
| Máster Universitario en Big Data Online | UAX | `ingenieria/master-big-data-online.md` |
| Máster Online en Bioinformática | UAX | `ingenieria/master-bioinformatica-online.md` |
| Máster Universitario en Energías Renovables Online | UAX | `ingenieria/master-energias-renovables-online.md` |
| Máster en Ciberseguridad (Málaga) | UAX Mare Nostrum, Málaga (ver #3/#4) | `ingenieria/master-ciberseguridad-malaga.md` |
| Máster Online Oficial en Marketing Digital | UAX | `ingenieria/master-marketing-digital-online.md` |
| Máster Universitario en Prevención de Riesgos Laborales | UAX | `ingenieria/master-prevencion-riesgos-laborales.md` |

## Salud (10/12 🟢; 3 FP excluidos del alcance)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Psicología | UAX | `salud/grado-psicologia.md` |
| Grado en Fisioterapia | UAX (sin página indexada, ver #11) | `salud/grado-fisioterapia.md` |
| Grado en Biomedicina | UAX | `salud/grado-biomedicina.md` |
| Grado en Ciencias de la Actividad Física y del Deporte | UAX (sin página indexada, ver #11) | `salud/grado-ciencias-actividad-fisica-deporte.md` |
| Doble Grado en Deporte y Fisioterapia | UAX | `salud/doble-grado-deporte-fisioterapia.md` |
| Doble Grado en Deporte y Nutrición | UAX | `salud/doble-grado-deporte-nutricion.md` |
| Máster en Trastornos del Comportamiento Alimentario | UAX | `salud/master-trastornos-comportamiento-alimentario.md` |
| Máster en Dirección y Gestión Sanitaria (eHealth) | UAX (sin página indexada, ver #11) | `salud/master-direccion-gestion-sanitaria-ehealth.md` |
| Máster en Dirección y Gestión de Servicios de Enfermería | UAX | `salud/master-direccion-gestion-servicios-enfermeria.md` |
| Máster en Odontología Digital | UAX | `salud/master-odontologia-digital.md` |
| *Técnico en Cuidados Auxiliares de Enfermería (FP, excluido)* | — | — |
| *Técnico en Farmacia y Parafarmacia (FP, excluido)* | — | — |
| *Técnico Superior en Higiene Bucodental (FP, excluido)* | — | — |

## Tecnología (7/7 🟢)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Diseño Audiovisual e Ilustración | UDIT | `tecnologia/grado-diseno-audiovisual-ilustracion.md` |
| Grado en Diseño Multimedia y Gráfico | UDIT | `tecnologia/grado-diseno-multimedia-grafico.md` |
| Grado en Diseño de Interiores | UDIT | `tecnologia/grado-diseno-interiores.md` |
| Grado en Diseño y Desarrollo de Videojuegos | UDIT (confirmar nombre exacto del título) | `tecnologia/grado-diseno-desarrollo-videojuegos.md` |
| Máster Oficial en Big Data y Business Analytics | Sin confirmar — ver #5, hallazgo crítico | `tecnologia/master-big-data-business-analytics.md` |
| Máster Universitario en UX y Diseño de Productos Digitales | UDIT | `tecnologia/master-ux-diseno-productos-digitales.md` |
| Máster Universitario en Marketing Deportivo Online | Universidad Europea (Escuela Real Madrid) | `tecnologia/master-marketing-deportivo-online.md` |

## Educación (12/12 🟢, incluye el que vivía sin categoría)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Maestro en Educación Primaria Online | UAX (confianza alta, no confirmación directa) | `educacion/grado-maestro-educacion-primaria-online.md` |
| Grado en Pedagogía Online | UAX (confianza media) | `educacion/grado-pedagogia-online.md` |
| Grado en Musicología Online | UAX | `educacion/grado-musicologia-online.md` |
| Máster en Educación Bilingüe | UAX (confirmado) | `educacion/master-educacion-bilingue.md` |
| Máster en Psicopedagogía (presencial) | Pendiente — probable error de catalogación (ver #8) | `educacion/master-psicopedagogia-presencial.md` |
| Máster en Psicopedagogía (online) | UAX (confirmado) | `educacion/master-psicopedagogia-online.md` |
| Máster en Pedagogía Instrumental | UAX (confirmado) | `educacion/master-pedagogia-instrumental.md` |
| Máster Universitario en Neuropsicología Aplicada a la Educación | UAX | `educacion/master-neuropsicologia-aplicada-educacion.md` |
| Máster Universitario en Educación Emocional | UAX | `educacion/master-educacion-emocional.md` |
| Máster Universitario en Liderazgo y Dirección de Centros Educativos | UAX (confianza media, UNIR tiene uno igual de nombre) | `educacion/master-liderazgo-direccion-centros-educativos.md` |
| Postgrado en Tecnología Educativa | UAX (posible fusión, ver #9) | `educacion/postgrado-tecnologia-educativa.md` |
| Máster Oficial en Tecnología Educativa y Competencias Digitales para Docentes | UAX (posible fusión, ver #9) | `educacion/master-tecnologia-educativa-competencias-digitales-docentes.md` |

## Excluidos del catálogo principal — nivel Especialista (4, no redactados)

- Especialista en Gestión de Proyectos, Liderazgo y Emprendimiento
- Especialista en Gestión de Calidad y RSC
- Especialista en Comunicación Empresarial e Institucional
- Especialista en Logística Integral

## Programas fuera del catálogo original del sitio

- **Máster en Odontología Digital (UAX)** — 🟢 redactado a partir de docx
  oficial provisto por el cliente.
- **Convalidación de título de abogado latinoamericano** — ⚪ el cliente
  mencionó este programa; sigue esperando que envíe la información.
