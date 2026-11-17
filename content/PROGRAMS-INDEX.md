# Índice maestro de programas — Estudia en Madrid

> Catálogo de programas (Grado / Doble Grado / Máster / Postgrado) según
> el handoff del rastreo del sitio (`HANDOFF_eMM.md`), agrupado en 6
> categorías: Administración, Derecho, Ingeniería, Salud, Tecnología y
> Educación.
>
> Estado: 🟢 redactado y confiable · 🟠 redactado pero universidad pendiente
> de confirmar (no publicar) · ⚪ pendiente (esperando info del cliente)
>
> **Última actualización: 2026-11-17.**
>
> ⚠️ **Historial de idas y vueltas sobre universidades socias — leer antes
> de tocar nada de UDIT/U-tad:**
> 1. El cliente confirmó que **"Grado en ADE" y "Grado en Administración
>    de Empresas" son el mismo programa** (UAX) — se fusionaron en una
>    sola ficha.
> 2. El cliente confirmó que **"Grado en Diseño de Producto" (U-tad) y
>    "Grado en Diseño Industrial" (UAX) son el mismo grado** — el título
>    oficial de la UAX ya combina ambos nombres. Se fusionaron.
> 3. El cliente dijo que **ya no trabajan con U-tad** → se corrigieron las
>    fichas que la mencionaban.
> 4. El cliente dijo después que **tampoco trabajan con UDIT** → se
>    eliminó por completo la categoría Tecnología y se marcó "Grado en
>    Animación" como pendiente.
> 5. **El cliente corrigió esto último: SÍ trabajan con UDIT.** Solo
>    U-tad queda confirmado como NO socia. Se restauró la categoría
>    Tecnología (7 fichas) y "Grado en Animación" vuelve a atribuirse a
>    UDIT.
>
> **Estado actual: UDIT = socia confirmada. U-tad = NO es socia.** Si en
> algún momento esto se vuelve a corregir, buscar `UDIT` y `U-tad` en todo
> `content/` antes de asumir nada.

## ⚠️ Decisiones pendientes para el cliente (leer antes de publicar)

1. ~~**"Grado en ADE" vs. "Grado en Administración de Empresas (UAX)"**~~
   — **RESUELTO: el cliente confirmó que es el mismo programa.** Se
   eliminó `administracion/grado-ade.md`; queda una sola ficha en
   `administracion/grado-administracion-empresas-uax.md`.
2. **"Máster en Inteligencia Artificial" (presencial) vs. "...Online"**
   (Ingeniería) — no hay evidencia de que UAX tenga una versión presencial
   de IA distinta de la online. La ficha presencial quedó con universidad
   "pendiente de confirmar" en vez de inventar datos. El cliente aclaró que
   no todos los másteres tienen ambas modalidades — cada uno es un caso a
   verificar por separado, así que esto sigue sin resolverse.
3. **"Máster en Ciberseguridad" (Madrid, Derecho) vs. "...(Málaga)"
   (Ingeniería)** — confirmado que son programas distintos (Nebrija en
   Madrid, UAX Mare Nostrum en Málaga). No es duplicado.
4. **Ciberseguridad Málaga — posible doble ficha interna** — UAX Mare
   Nostrum parece tener dos variantes de marketing casi idénticas (una
   "online", otra con examen presencial en Málaga). Sin confirmar si son
   dos programas reales o el mismo con dos nombres.
5. ~~**"Grado en Diseño de Producto" (U-tad) vs. "Grado en Diseño
   Industrial" (UAX)**~~ — **RESUELTO: fusionados.** El título oficial de
   la UAX es "Grado en Ingeniería en Diseño Industrial y Desarrollo de
   Producto" — un solo grado. Se eliminó `ingenieria/grado-diseno-producto.md`
   (que estaba mal atribuido a U-tad); queda una sola ficha en
   `ingenieria/grado-diseno-industrial.md`.
6. ~~**"Grado en Animación" — universidad sin confirmar**~~ —
   **RESUELTO: el cliente confirmó que sí trabajan con UDIT.** La ficha
   vuelve a atribuirse a UDIT (`ingenieria/grado-animacion.md`).
7. **"Máster en Psicopedagogía" presencial vs. online** (Educación) — no
   hay evidencia de que UAX ofrezca versión presencial (su único máster de
   esta área es 100% online). Podría ser: (a) un duplicado/error de
   catalogación, o (b) un programa real de otra universidad (Villanueva,
   Universidad Europea o Comillas ofrecen versión presencial) mal asociado
   en el catálogo. Sin resolver — no publicar la ficha presencial sin
   confirmar.
8. **"Postgrado en Tecnología Educativa" vs. "Máster Oficial en Tecnología
   Educativa y Competencias Digitales para Docentes"** (Educación) —
   evidencia fuerte de que es el **mismo programa UAX** con dos URLs
   distintas en el sitio actual (una de ellas retirada de la categoría
   Educación). Recomendado fusionar en una sola ficha antes de publicar.
9. **Robótica (UCJC)** (Ingeniería) — universidad nueva, fuera del patrón
   habitual del catálogo (UAX, CEU San Pablo, Nebrija). Confirmar que
   Estudia en Madrid realmente tiene convenio con UCJC.
10. **"Máster Oficial en Big Data y Business Analytics"** (Tecnología) —
    probable solapamiento con "Máster Universitario en Big Data Online"
    (Ingeniería, UAX) y "Máster en Business Analytics" (Administración,
    Nebrija) — estos dos últimos SÍ están confirmados como reales y
    distintos entre sí. El de Tecnología sigue sin universidad confirmada
    — ver nota interna del archivo, tiene 3 candidatos posibles.
11. **Varios programas sin página indexada en el sitio actual**: Grado en
    Fisioterapia, Grado en CAFYD (ambos standalone), Máster en Dirección y
    Gestión Sanitaria eHealth, Grado en Robótica, Grado en Diseño
    Industrial, y toda la categoría Tecnología. Confirmar si ya existen en
    el sitio (no indexadas) o si son contenido enteramente nuevo a
    publicar.

**Ningún precio de programa está confirmado** salvo Odontología Digital
(dato directo del cliente). Fechas de inicio exactas y planes de estudio
completos (asignatura por asignatura) tampoco están confirmados en la
mayoría de los casos — WebSearch da fragmentos, no la ficha completa de
la universidad. Cada archivo `.md` tiene su propia nota interna con el
detalle de qué falta específicamente.

## Administración (7/7 🟢 — se fusionó Grado en ADE)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en ADE / Administración de Empresas | UAX (fusionado, ver #1) | `administracion/grado-administracion-empresas-uax.md` |
| Grado en ADE y Relaciones Internacionales | UAX | `administracion/grado-ade-relaciones-internacionales.md` |
| MBA | UAX (inferida, no confirmada) | `administracion/mba.md` |
| Máster en Business Analytics | Universidad Nebrija (confirmado, snippet real del sitio) | `administracion/master-business-analytics.md` |
| Máster Universitario en Dirección Financiera Online | UAX (inferida) | `administracion/master-direccion-financiera-online.md` |
| Máster Universitario en Dirección de Proyectos Online | UAX (inferida) | `administracion/master-direccion-proyectos-online.md` |
| Máster Universitario en Sistemas Integrados de Gestión | UAX (inferida, ambiguo con Univ. Europea) | `administracion/master-sistemas-integrados-gestion.md` |

## Derecho (8/9 🟢 · 1 ⚪)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Derecho | Universidad Nebrija | `derecho/grado-derecho.md` |
| Doble Grado en Derecho y ADE | Universidad Nebrija | `derecho/doble-grado-derecho-ade.md` |
| Convalidación de título de abogado latinoamericano | — | ⚪ esperando info del cliente (tiene 3 versiones: presencial/online/semipresencial) |
| Máster Universitario en Acceso a la Abogacía y la Procura | Universidad Nebrija (inferida) | `derecho/master-acceso-abogacia-procura.md` |
| Máster Universitario en Criminalística | CEU San Pablo | `derecho/master-criminalistica.md` |
| Máster Universitario en Dirección de RRHH Online | Universidad Nebrija | `derecho/master-direccion-rrhh-online.md` |
| Máster en Ciberseguridad (Madrid) | Universidad Nebrija — título propio, no oficial | `derecho/master-ciberseguridad.md` |
| Máster en Derecho Internacional Humanitario | Universidad Nebrija | `derecho/master-derecho-internacional-humanitario.md` |
| Máster en Sostenibilidad y Compliance | CEU San Pablo — título propio, no oficial | `derecho/master-sostenibilidad-compliance.md` |

## Ingeniería (20/20 🟢 — se fusionó Diseño de Producto/Industrial)

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
| Grado en Robótica | UCJC (confirmar convenio, ver #9) | `ingenieria/grado-robotica.md` |
| Grado en Diseño Industrial y Desarrollo de Producto | UAX (fusionado con "Diseño de Producto", ver #5) | `ingenieria/grado-diseno-industrial.md` |
| Grado en Animación | UDIT (confirmado, ver #6) | `ingenieria/grado-animacion.md` |
| Máster en Ingeniería Industrial | UAX | `ingenieria/master-ingenieria-industrial.md` |
| Máster Universitario en Inteligencia Artificial Online | UAX | `ingenieria/master-inteligencia-artificial-online.md` |
| Máster en Inteligencia Artificial (presencial) | Pendiente de confirmar — probable duplicado (ver #2) | `ingenieria/master-inteligencia-artificial.md` |
| Máster Universitario en Big Data Online | UAX (confirmado, snippet real del sitio) | `ingenieria/master-big-data-online.md` |
| Máster Online en Bioinformática | UAX | `ingenieria/master-bioinformatica-online.md` |
| Máster Universitario en Energías Renovables Online | UAX | `ingenieria/master-energias-renovables-online.md` |
| Máster en Ciberseguridad (Málaga) | UAX Mare Nostrum, Málaga (ver #3/#4) | `ingenieria/master-ciberseguridad-malaga.md` |
| Máster Online Oficial en Marketing Digital | UAX | `ingenieria/master-marketing-digital-online.md` |
| Máster Universitario en Prevención de Riesgos Laborales | UAX | `ingenieria/master-prevencion-riesgos-laborales.md` |

## Salud (10/10 🟢)

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

## Tecnología (6/7 🟢 · 1 sin universidad confirmada — RESTAURADA, ver aviso arriba)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Diseño Audiovisual e Ilustración | UDIT | `tecnologia/grado-diseno-audiovisual-ilustracion.md` |
| Grado en Diseño Multimedia y Gráfico | UDIT | `tecnologia/grado-diseno-multimedia-grafico.md` |
| Grado en Diseño de Interiores | UDIT | `tecnologia/grado-diseno-interiores.md` |
| Grado en Diseño y Desarrollo de Videojuegos | UDIT (confirmar nombre exacto del título) | `tecnologia/grado-diseno-desarrollo-videojuegos.md` |
| Máster Oficial en Big Data y Business Analytics | Sin confirmar — ver #10, hallazgo crítico | `tecnologia/master-big-data-business-analytics.md` |
| Máster Universitario en UX y Diseño de Productos Digitales | UDIT | `tecnologia/master-ux-diseno-productos-digitales.md` |
| Máster Universitario en Marketing Deportivo Online | Universidad Europea (Escuela Real Madrid) | `tecnologia/master-marketing-deportivo-online.md` |

## Educación (12/12 🟢, incluye el que vivía sin categoría)

| Programa | Universidad | Archivo |
|---|---|---|
| Grado en Maestro en Educación Primaria Online | UAX (confianza alta, no confirmación directa) | `educacion/grado-maestro-educacion-primaria-online.md` |
| Grado en Pedagogía Online | UAX (confianza media) | `educacion/grado-pedagogia-online.md` |
| Grado en Musicología Online | UAX | `educacion/grado-musicologia-online.md` |
| Máster en Educación Bilingüe | UAX (confirmado) | `educacion/master-educacion-bilingue.md` |
| Máster en Psicopedagogía (presencial) | Pendiente — ver #7 | `educacion/master-psicopedagogia-presencial.md` |
| Máster en Psicopedagogía (online) | UAX (confirmado) | `educacion/master-psicopedagogia-online.md` |
| Máster en Pedagogía Instrumental | UAX (confirmado) | `educacion/master-pedagogia-instrumental.md` |
| Máster Universitario en Neuropsicología Aplicada a la Educación | UAX | `educacion/master-neuropsicologia-aplicada-educacion.md` |
| Máster Universitario en Educación Emocional | UAX | `educacion/master-educacion-emocional.md` |
| Máster Universitario en Liderazgo y Dirección de Centros Educativos | UAX (confianza media, UNIR tiene uno igual de nombre) | `educacion/master-liderazgo-direccion-centros-educativos.md` |
| Postgrado en Tecnología Educativa | UAX (posible fusión, ver #8) | `educacion/postgrado-tecnologia-educativa.md` |
| Máster Oficial en Tecnología Educativa y Competencias Digitales para Docentes | UAX (posible fusión, ver #8) | `educacion/master-tecnologia-educativa-competencias-digitales-docentes.md` |

## Excluidos del catálogo (no son parte de la oferta real de la agencia)

- **Programas de Técnico / Técnico Superior (FP)** de Salud — la agencia
  no trabaja con formación profesional, solo con grados y másteres
  universitarios.
- **Especialista en Gestión de Proyectos, Liderazgo y Emprendimiento**,
  **Especialista en Gestión de Calidad y RSC**, **Especialista en
  Comunicación Empresarial e Institucional**, **Especialista en Logística
  Integral** — nivel "Especialista", fuera del alcance definido desde el
  handoff original.
- **Cualquier programa real de U-tad** — confirmado que no son socios.

## Programas fuera del catálogo original del sitio

- **Máster en Odontología Digital (UAX)** — 🟢 redactado a partir de docx
  oficial provisto por el cliente.
- **Convalidación de título de abogado latinoamericano** — ⚪ el cliente
  confirmó que tiene **tres versiones** (presencial, online y
  semipresencial) y va a mandar la información — sigue pendiente de
  recibirla.

## Guías de trámites (pilar SEO, nuevo — 2026-11-17)

Carpeta `content/guias/`, enfocadas en long-tail queries de estudiantes
latinoamericanos (sobre todo venezolanos, el público mayoritario de la
agencia). Ver nota interna de cada archivo para fuentes y datos
pendientes de verificar oficialmente.

| Página | Tipo | Archivo |
|---|---|---|
| Soy venezolano y quiero estudiar en España | Pilar | `guias/soy-venezolano-y-quiero-estudiar-en-espana.md` |
| Visado de estudiante España-Venezuela | Spoke | `guias/visado-estudiante-espana-venezuela.md` |
| Homologar el bachillerato venezolano en España | Spoke | `guias/homologar-bachillerato-venezolano-espana.md` |
| Trabajar con visado de estudiante en España | Spoke | `guias/trabajar-con-visado-de-estudiante-en-espana.md` |
| Qué hacer si deniegan la visa de estudiante | Spoke | `guias/que-hacer-si-deniegan-visa-estudiante-espana.md` |
| Becas y descuentos para venezolanos | Spoke | `guias/becas-venezolanos-estudiar-en-espana.md` |
| Quedarte a trabajar en España después de estudiar | Spoke | `guias/quedarte-a-trabajar-en-espana-despues-de-estudiar.md` |

**Las 6 guías spoke que menciona el pilar ya están todas redactadas.**
Varias tienen cifras con fuentes contradictorias (ver nota interna de
cada una) que hay que confirmar con fuente oficial antes de publicar —
sobre todo el límite de horas de trabajo (20h vs. 30h semanales) y la
duración de la autorización de búsqueda de empleo (12 vs. 24 meses).

⚠️ **Hallazgo durante la investigación de estas guías:** la página en vivo
`estudiaenmadrid.com/universidades/udit` dice "convenio con Estudia" — en
este caso coincide con lo que el cliente confirmó (UDIT sí es socia), así
que no es un error, a diferencia de lo que se pensó en un momento de esta
sesión.
