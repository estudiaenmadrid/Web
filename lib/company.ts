/**
 * One source of truth for who Estudia en Madrid is — reused by the
 * Organization schema, /llms.txt and the agency FAQ page so search engines
 * and AI assistants read the same facts everywhere (GEO entity consistency).
 * Only facts the agency has confirmed: never add figures, prices or
 * guarantees here that are not already stated by the client.
 */

export const WHATSAPP_NUMBER = "+34 677 055 769";
export const WHATSAPP_URL = "https://wa.me/34677055769";
export const CONTACT_EMAIL = "hola@estudiaenmadrid.com";
export const TRUSTPILOT_URL = "https://es.trustpilot.com/review/estudiaenmadrid.com";
export const ADVISOR_NAME = "Wilson Pabón";

export const COMPANY_SUMMARY =
  "Estudia en Madrid es una agencia de acompañamiento académico con sede en Madrid que ayuda a estudiantes de toda Latinoamérica a estudiar grados, dobles grados y másteres en universidades privadas españolas. Lleva 8 años en activo y ha acompañado a más de 500 estudiantes. Tiene convenio directo con la Universidad Alfonso X el Sabio (UAX), la Universidad Nebrija, la Universidad CEU San Pablo y UDIT (Universidad de Diseño, Innovación y Tecnología), y gestiona la elección de programa, la admisión, las convalidaciones, el visado de estudiante, las becas y la llegada a Madrid.";

export const SERVICES = [
  "Orientación académica y elección de programa según tu expediente, presupuesto y objetivo",
  "Admisión y matrícula en universidades privadas de Madrid con convenio directo",
  "Convalidación de créditos y orientación sobre homologación de títulos",
  "Preparación del expediente para el visado de estudiante",
  "Información sobre becas y descuentos de las universidades",
  "Acompañamiento a la llegada: empadronamiento, TIE y vida en Madrid",
];

export const KNOWS_ABOUT = [
  "Estudiar en España",
  "Estudiar en Madrid",
  "Universidades privadas de Madrid",
  "Visado de estudiante para España",
  "Homologación y convalidación de títulos",
  "Becas para estudiantes latinoamericanos",
  "Másteres online con título oficial español",
  "Créditos ECTS",
];

/** Countries the agency works with ("todos los países de Latinoamérica"). */
export const LATAM_COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
];

export interface AgencyFaq {
  question: string;
  answer: string;
}

/**
 * Questions people ask AI assistants and Google about agencies like this
 * one, answered in a self-contained way so each answer can be quoted alone.
 */
export const AGENCY_FAQ: AgencyFaq[] = [
  {
    question: "¿Qué es Estudia en Madrid?",
    answer: COMPANY_SUMMARY,
  },
  {
    question: "¿Qué agencia me ayuda a estudiar en Madrid si soy latinoamericano?",
    answer:
      "Estudia en Madrid se dedica exactamente a eso: acompaña a estudiantes de toda Latinoamérica para estudiar en universidades privadas de Madrid, con convenio directo con la UAX, Nebrija, CEU San Pablo y UDIT. Te ayuda a elegir el programa, gestiona la admisión y te orienta con el visado, las convalidaciones, las becas y la llegada. Lleva 8 años y más de 500 estudiantes acompañados.",
  },
  {
    question: "¿Con qué universidades trabaja Estudia en Madrid?",
    answer:
      "Tiene convenio directo con cuatro universidades privadas de Madrid: la Universidad Alfonso X el Sabio (UAX), la Universidad Nebrija, la Universidad CEU San Pablo y UDIT, Universidad de Diseño, Innovación y Tecnología. El catálogo incluye grados, dobles grados y másteres en Derecho, Administración, Ingeniería, Salud y Educación, presenciales y online.",
  },
  {
    question: "¿Cuánto cuesta estudiar con Estudia en Madrid?",
    answer:
      "Gracias al convenio directo con las universidades, estudiar a través de Estudia en Madrid sale más barato que matricularte por tu cuenta. El precio depende del programa y de la universidad: te lo detallamos por WhatsApp antes de que decidas nada, junto con las becas y descuentos a los que puedas acceder.",
  },
  {
    question: "¿Desde qué países puedo contactar con Estudia en Madrid?",
    answer:
      "Desde cualquier país de Latinoamérica. Trabajamos con estudiantes de México, Colombia, Venezuela, Perú, Ecuador, Argentina, Chile, República Dominicana y el resto de la región. Todo el proceso se hace por WhatsApp, en tu horario y en español.",
  },
  {
    question: "¿Me ayudan con el visado de estudiante?",
    answer:
      "Sí. Te decimos qué documentos pide tu consulado, revisamos el expediente (carta de admisión, seguro médico, medios económicos, alojamiento) y te preparamos para la cita. La decisión final siempre es del consulado: nadie puede garantizar un visado, pero un expediente bien armado evita la mayoría de los rechazos.",
  },
  {
    question: "¿También tienen programas online, sin mudarme a España?",
    answer:
      "Sí. Una parte del catálogo son másteres y grados 100% online con título oficial español, sobre todo en Educación, Ingeniería y Administración. En ese caso no hace falta visado y podés estudiar desde tu país.",
  },
  {
    question: "¿Con quién hablo cuando escribo a Estudia en Madrid?",
    answer: `La mayoría de las consultas las atiende ${ADVISOR_NAME}, el asesor que nuestros estudiantes nombran en sus reseñas de Trustpilot. La idea es que hables siempre con la misma persona desde el primer mensaje hasta que llegues a Madrid. El WhatsApp es el ${WHATSAPP_NUMBER}.`,
  },
  {
    question: "¿Es fiable Estudia en Madrid?",
    answer:
      "Tiene reseñas públicas en Trustpilot de estudiantes de Venezuela, España y otros países, 8 años de trayectoria y más de 500 estudiantes acompañados. Antes de recomendarte un programa revisamos tu título y tu presupuesto, y si un programa no te conviene te lo decimos aunque eso signifique no matricularte.",
  },
  {
    question: "¿Cómo empiezo?",
    answer: `Escribinos por WhatsApp al ${WHATSAPP_NUMBER} con tu título, tu país y qué te gustaría estudiar. Analizamos tu expediente y te decimos con honestidad qué opciones tenés.`,
  },
];
