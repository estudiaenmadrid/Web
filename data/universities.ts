// Facts (founding year, campuses, accreditation) researched via WebSearch
// against each university's official site, Wikipedia, and educaweb.com —
// not fabricated. UDIT's come from its recognition law (Ley 2/2022 de la
// Comunidad de Madrid, BOCM 4/3/2022, BOE 27/4/2022) and Decreto 133/2022. `about`/`whyEEM` copy is original, written from Estudia en
// Madrid's own perspective as the placement agency, not copied marketing text.

export interface UniversityProfile {
  slug: string;
  /** Must match normalizeUniversityName()'s output exactly — used to join against the program catalog. */
  displayName: string;
  shortName: string;
  /** Display word for the typographic photo stand-in (components/shared/TypePlate.tsx). */
  monogram: string;
  founded: string;
  foundedNote: string;
  campuses: { name: string; note: string }[];
  accreditation: string;
  about: string[];
  whyEEM: string;
  officialUrl: string;
}

export const UNIVERSITIES: UniversityProfile[] = [
  {
    slug: "uax",
    displayName: "Universidad Alfonso X el Sabio (UAX)",
    shortName: "UAX",
    monogram: "UAX",
    founded: "1994",
    foundedNote: "aprobada por la Ley 9/1993 del Congreso de los Diputados",
    campuses: [
      {
        name: "Villanueva de la Cañada",
        note: "el campus principal, a 25 km de Madrid, con más de 1.000.000 m² y capacidad para 15.000 alumnos — incluye una Ciudad Sanitaria con hospital de simulación",
      },
      { name: "Madrid-Chamartín", note: "campus urbano dentro de la ciudad de Madrid" },
    ],
    accreditation:
      "Calificación QS Stars de 5 estrellas, con distintivo \"Excellent\" en Empleabilidad, Enseñanza, Desarrollo Académico, Instalaciones, Enseñanza Online y Buen Gobierno. Reconocida como la segunda universidad más innovadora de España — la única privada entre las tres primeras del ranking.",
    about: [
      "\"La Universidad de la Empresa\": así nació la UAX en 1994, como un proyecto orientado explícitamente a la inserción laboral de sus egresados, y ese enfoque práctico sigue marcando su identidad más de tres décadas después.",
      "Es, con diferencia, la universidad con más oferta dentro de nuestro catálogo: cubre Ingeniería, Salud, Administración y Educación, con un campus propio de más de un millón de metros cuadrados que incluye desde un túnel de viento para Ingeniería Aeroespacial hasta un hospital de simulación para las carreras de Salud.",
    ],
    whyEEM:
      "Es la universidad con la que gestionamos más admisiones, precisamente porque su oferta es la más amplia del catálogo y porque su modelo — orientado a la empleabilidad, con instalaciones propias para prácticas — encaja bien con estudiantes que buscan un título con salida laboral concreta, no solo teoría.",
    officialUrl: "https://www.uax.com",
  },
  {
    slug: "nebrija",
    displayName: "Universidad Nebrija",
    shortName: "Nebrija",
    monogram: "Nebrija",
    founded: "1995",
    foundedNote: "reconocida oficialmente como universidad privada; su origen como Centro de Estudios Hispánicos data de 1985",
    campuses: [
      { name: "La Berzosa", note: "campus principal en el noroeste de la Comunidad de Madrid" },
      { name: "Dehesa de la Villa y Princesa", note: "dos sedes urbanas dentro de Madrid capital" },
    ],
    accreditation:
      "Acreditada oficialmente por el Ministerio de Educación y por la agencia de evaluación de la calidad ANECA. Más de 30 años de trayectoria en docencia, empleabilidad, investigación e internacionalización.",
    about: [
      "Su nombre rinde homenaje a Elio Antonio de Nebrija, autor de la primera gramática castellana (1492) — un guiño a su fuerte tradición en Humanidades e idiomas, aunque hoy su oferta va mucho más allá de eso.",
      "Dentro de nuestro catálogo, Nebrija concentra la mayor parte del área de Derecho (el grado, el doble grado con ADE y la mayoría de los másteres) y aporta el Máster en Business Analytics dentro de Administración.",
    ],
    whyEEM:
      "La recomendamos sobre todo a estudiantes de Derecho: es la universidad con la que tenemos convenio más específico para esa área, con programas que van desde el grado hasta másteres de especialización como Ciberseguridad o Derecho Internacional Humanitario.",
    officialUrl: "https://www.nebrija.com",
  },
  {
    slug: "ceu-san-pablo",
    displayName: "Universidad CEU San Pablo",
    shortName: "CEU San Pablo",
    monogram: "CEU",
    founded: "1993",
    foundedNote: "aprobada por ley del 20 de abril de 1993 e inaugurada oficialmente en febrero de 1994",
    campuses: [
      {
        name: "Moncloa (Madrid)",
        note: "sede de las facultades de Ciencias Económicas y Empresariales, Derecho y Humanidades y Ciencias de la Comunicación",
      },
    ],
    accreditation:
      "Antes de su reconocimiento como universidad independiente, funcionó como centro adscrito a la Universidad Complutense de Madrid. Forma parte de la Fundación Universitaria San Pablo CEU, con raíces que se remontan a la Asociación Católica de Propagandistas fundada en 1908.",
    about: [
      "Es una de las universidades privadas con más historia de Madrid: su fundación institucional data de 1933, aunque como universidad independiente opera desde 1993, tras años funcionando como centro adscrito a la Complutense.",
      "Dentro de nuestro catálogo, CEU San Pablo aporta programas más especializados que complementan la oferta de Derecho de Nebrija — el caso más claro es su Máster en Criminalística.",
    ],
    whyEEM:
      "La recomendamos para especializaciones puntuales dentro de Derecho que no cubre nuestra otra universidad convenida del área — es el caso del Máster en Criminalística, uno de los programas que más consultas recibe en esa área.",
    officialUrl: "https://www.uspceu.com",
  },
  {
    slug: "udit",
    displayName: "Universidad de Diseño, Innovación y Tecnología (UDIT)",
    shortName: "UDIT",
    monogram: "UDIT",
    founded: "2022",
    foundedNote:
      "reconocida como universidad privada por la Ley 2/2022 de la Comunidad de Madrid; nace de ESNE, escuela universitaria de diseño con más de 20 años de trayectoria",
    campuses: [
      {
        name: "Madrid",
        note: "campus propio en Madrid capital, dedicado al diseño, la tecnología y las industrias creativas",
      },
    ],
    accreditation:
      "Universidad privada reconocida por la Ley 2/2022, de 1 de marzo, de la Comunidad de Madrid, con inicio de actividades autorizado en diciembre de 2022. Sus grados son títulos oficiales verificados por el Consejo de Universidades.",
    about: [
      "UDIT es la evolución de ESNE, la escuela universitaria de diseño que durante más de dos décadas formó en Madrid a diseñadores, animadores y desarrolladores. En 2022 la Comunidad de Madrid la reconoció como universidad propia, especializada en diseño, innovación y tecnología.",
      "Su oferta gira alrededor de las industrias creativas — animación, videojuegos, diseño gráfico y multimedia, diseño de producto, interiores, moda y publicidad. Dentro de nuestro catálogo aporta el Grado en Animación.",
    ],
    whyEEM:
      "La recomendamos para perfiles creativos que quieren dedicarse a la animación: es la universidad del convenio especializada en industrias creativas, un terreno que no cubren las demás universidades con las que trabajamos.",
    officialUrl: "https://www.udit.es",
  },
];

export function getUniversityBySlug(slug: string): UniversityProfile | undefined {
  return UNIVERSITIES.find((u) => u.slug === slug);
}

export function getUniversityByDisplayName(displayName: string): UniversityProfile | undefined {
  return UNIVERSITIES.find((u) => u.displayName === displayName);
}
