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
    headingSize: "clamp(44px,12vw,190px)",
  },
  {
    slug: "administracion",
    name: "Administración",
    num: "02",
    intro:
      "El área más flexible para convalidar créditos ya cursados: ADE, MBA, finanzas y gestión, en Madrid o en online.",
    headingSize: "clamp(32px,7.4vw,108px)",
  },
  {
    slug: "ingenieria",
    name: "Ingeniería",
    num: "03",
    intro:
      "La oferta más amplia: informática, aeroespacial, biomédica, IA y robótica, con laboratorios propios y prácticas en empresa.",
    headingSize: "clamp(38px,9.6vw,148px)",
  },
  {
    slug: "salud",
    name: "Salud",
    num: "04",
    intro:
      "Psicología, fisioterapia, deporte y gestión sanitaria: el área con más demanda de titulados latinoamericanos en España.",
    headingSize: "clamp(44px,12vw,190px)",
  },
  {
    slug: "educacion",
    name: "Educación",
    num: "05",
    intro:
      "Magisterio, pedagogía y formación de profesorado, con mucha oferta online para seguir trabajando mientras estudias.",
    headingSize: "clamp(40px,10.6vw,160px)",
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
