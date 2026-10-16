export type AreaSlug =
  | "administracion"
  | "derecho"
  | "ingenieria"
  | "salud"
  | "educacion";

export interface Area {
  slug: AreaSlug;
  name: string;
  num: string;
  intro: string;
  /** Longer, second paragraph shown in the area page body (the punchy `intro` above stays short for the display headline treatment). */
  extended: string;
  /** Fluid clamp() sized per name length so long words (e.g. "Administración") don't overflow the viewport at the wordmark-scale H1 treatment. */
  headingSize: string;
}

export const AREAS: Area[] = [
  {
    slug: "derecho",
    name: "Derecho",
    num: "01",
    intro:
      "Si ya ejerces o ya estudiaste Derecho, tu expediente vale. Y si empiezas de cero, puedes hacerlo en una privada española con convenio directo.",
    extended:
      "Trabajamos el área de Derecho con convenio directo con Universidad Nebrija y Universidad CEU San Pablo. Nebrija concentra la oferta más amplia (grado, dobles grados y la mayoría de másteres), mientras que CEU San Pablo aporta programas más especializados como Criminalística. Si tu título de abogado es de otro país, la convalidación suele ser el camino más rápido y económico frente a empezar el grado desde cero: revisamos tu plan de estudios de origen y te decimos con qué materias entrarías directo y cuáles tendrías que cursar para completar el título español. También trabajamos casos de estudiantes que quieren especializarse después de graduados, con másteres orientados a Recursos Humanos, Ciberseguridad o Derecho Internacional Humanitario. Si tu objetivo es ejercer como abogado en España y no solo especializarte, la convalidación académica y la homologación del título para el ejercicio profesional son dos trámites distintos, con tiempos distintos — te ayudamos a distinguirlos desde la primera conversación para que planifiques con la información correcta.",
    headingSize: "clamp(44px,12vw,190px)",
  },
  {
    slug: "administracion",
    name: "Administración",
    num: "02",
    intro:
      "El área más flexible para convalidar créditos ya cursados: ADE, MBA, finanzas y gestión, en Madrid o en online.",
    extended:
      "En Administración trabajamos principalmente con UAX (Universidad Alfonso X el Sabio) y con Universidad Nebrija, que cubre en particular el Máster en Business Analytics. Es el área con más programas 100% online del catálogo, pensada para quien quiere seguir trabajando en su país mientras cursa un máster con reconocimiento oficial español. Cubre desde el grado en ADE hasta el MBA online de 9 meses, pasando por másteres específicos en dirección financiera, dirección de proyectos y sistemas integrados de gestión — la mayoría reconoce créditos si ya cursaste materias equivalentes en tu carrera de origen. Muchos estudiantes de esta área ya trabajan en banca, consultoría o empresa familiar en su país de origen, así que el formato online les permite cursar el máster sin pausar su carrera profesional; solo viajarían a Madrid si el programa exige presencialidad puntual para algún examen o la defensa del trabajo de fin de máster, algo que confirmamos programa por programa antes de matricularte.",
    headingSize: "clamp(32px,7.4vw,108px)",
  },
  {
    slug: "ingenieria",
    name: "Ingeniería",
    num: "03",
    intro:
      "La oferta más amplia: informática, aeroespacial, biomédica, IA y robótica, con laboratorios propios y prácticas en empresa.",
    extended:
      "Es el área más grande del catálogo, con UAX como universidad principal (informática, IA, biomédica, aeroespacial y más) y Universidad Camilo José Cela para Robótica. La mayoría de los grados son presenciales con laboratorios propios, mientras que buena parte de los másteres —Big Data, Bioinformática, Energías Renovables— se cursan online.",
    headingSize: "clamp(38px,9.6vw,148px)",
  },
  {
    slug: "salud",
    name: "Salud",
    num: "04",
    intro:
      "Psicología, fisioterapia, deporte y gestión sanitaria: el área con más demanda de titulados latinoamericanos en España.",
    extended:
      "Toda la oferta de Salud se cursa en UAX (Universidad Alfonso X el Sabio), con un mix de programas presenciales (Psicología, Fisioterapia, Odontología Digital) y másteres online orientados a profesionales que ya ejercen, como Dirección y Gestión Sanitaria o Trastornos del Comportamiento Alimentario. Si venís de una carrera relacionada (enfermería, nutrición, medicina), muchos de estos másteres reconocen parte de tu formación previa, y te lo confirmamos antes de que te matricules.",
    headingSize: "clamp(44px,12vw,190px)",
  },
  {
    slug: "educacion",
    name: "Educación",
    num: "05",
    intro:
      "Magisterio, pedagogía y formación de profesorado, con mucha oferta online para seguir trabajando mientras estudias.",
    extended:
      "Educación es, junto con Administración, el área con mayor proporción de programas online del catálogo, casi toda impartida por UAX. Pensada especialmente para docentes en ejercicio que quieren sumar una especialización (educación bilingüe, neuropsicología, tecnología educativa) sin dejar de trabajar mientras estudian, y también para quien recién termina el bachillerato y quiere formarse como maestro de primaria desde cero.",
    headingSize: "clamp(40px,10.6vw,160px)",
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
