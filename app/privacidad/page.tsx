import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacidad, cookies y protección de datos",
  description:
    "Política de privacidad, cookies y tratamiento de datos personales de Estudia en Madrid: qué información recogemos, con qué fin, y tus derechos sobre tus datos.",
  path: "/privacidad",
});

const LAST_UPDATED = "23 de octubre de 2026";

const SECTION_TITLES: Record<string, string> = {
  "01": "Quién es el responsable del tratamiento",
  "02": "Qué datos tratamos y de dónde salen",
  "03": "Con qué finalidad y con qué base legal",
  "04": "Política de cookies",
  "05": "A quién compartimos tus datos",
  "06": "Cuánto tiempo conservamos tus datos",
  "07": "Tus derechos sobre tus datos",
  "08": "Cambios a esta política",
};

function Section({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div id={`seccion-${num}`} className="border-t border-hair pt-7" style={{ scrollMarginTop: "100px" }}>
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">{num}</div>
        <h2 className="font-display font-black uppercase m-0 mb-3.5" style={{ fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-.03em" }}>
          {SECTION_TITLES[num]}
        </h2>
        <div className="eem-prose">{children}</div>
      </div>
    </Reveal>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ color: "var(--red-signal)" }}>
      [ a confirmar por Estudia en Madrid: {children} ]
    </strong>
  );
}

export default function PrivacidadPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Privacidad", path: "/privacidad" }]} />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">LEGAL</div>
        <h1
          className="font-display font-black uppercase mt-3.5"
          style={{ fontSize: "clamp(32px,6vw,80px)", lineHeight: 0.94, letterSpacing: "-.04em" }}
        >
          Privacidad, cookies y protección de datos
        </h1>
        <p className="font-serif italic mt-4" style={{ maxWidth: "56ch", fontSize: "clamp(18px,2vw,26px)", lineHeight: 1.3 }}>
          Qué información recogemos cuando nos escribís, para qué la usamos, y qué derechos tenés sobre tus datos.
        </p>
        <p className="font-mono text-[11px] tracking-[.08em] text-ink-soft mt-4">Última actualización: {LAST_UPDATED}</p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[90px] grid gap-9 md:gap-[72px] md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden md:block sticky top-24 self-start">
          <div className="font-mono text-[10px] tracking-[.16em] text-red-signal mb-3">ÍNDICE</div>
          <nav aria-label="Secciones de esta política" className="flex flex-col border-l border-hair pl-4">
            {Object.entries(SECTION_TITLES).map(([num, title]) => (
              <a key={num} href={`#seccion-${num}`} className="py-1.5 text-[13px] leading-[1.35] text-ink-soft hover:text-red-signal">
                <span className="font-mono text-[10px] text-red-signal mr-2">{num}</span>
                {title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col gap-9 sm:gap-11 min-w-0" style={{ maxWidth: "72ch" }}>
          <Reveal>
            <div className="bg-white border border-hair border-l-4 border-l-red-signal rounded-md p-5.5 sm:p-7">
              <p className="eem-prose m-0">
                Resumen en un párrafo: este sitio solo usa cookies de analítica (Google Analytics) si las aceptás, no usa publicidad, no vende tus datos a
                nadie, y solo recogemos la información que vos mismo/a nos das cuando nos escribís por WhatsApp o
                correo para pedir información sobre un programa. La usamos únicamente para responderte y gestionar tu
                posible admisión — nada más.
              </p>
            </div>
          </Reveal>

          <Section num="01">
            <p>
              Estudia en Madrid es la agencia de acompañamiento académico responsable del tratamiento de los datos que
              se describen en esta página. Datos de contacto:
            </p>
            <ul>
              <li>Correo electrónico: hola@estudiaenmadrid.com</li>
              <li>WhatsApp: +34 677 055 769</li>
              <li>
                Razón social, NIF/CIF y domicilio fiscal: <Pending>pendiente de incorporar la identificación legal
                completa de la empresa</Pending>.
              </li>
            </ul>
          </Section>

          <Section num="02">
            <p>Solo tratamos los datos que nos proporcionás directamente vos, en estos casos concretos:</p>
            <ul>
              <li>
                Cuando nos escribís por WhatsApp o correo electrónico: tu nombre, número de teléfono o dirección de
                correo, y el contenido de tu consulta (por ejemplo, tu expediente académico o país de origen, si
                decidís compartirlo para que te orientemos mejor).
              </li>
              <li>
                Si avanzamos con tu proceso de admisión: la documentación académica y personal necesaria para
                gestionarla ante la universidad correspondiente (título, notas, pasaporte, y similares), siempre que
                nos la compartas para ese fin específico.
              </li>
            </ul>
            <p>
              No recogemos datos automáticamente a través de formularios en el sitio (no tenemos formularios de
              contacto propios). Si aceptás las cookies de analítica, Google Analytics registra de forma estadística
              cómo navegás el sitio — ver la sección de Cookies más abajo.
            </p>
          </Section>

          <Section num="03">
            <p>Tratamos tus datos para:</p>
            <ul>
              <li>Responder tu consulta y orientarte sobre programas y universidades.</li>
              <li>
                Gestionar tu proceso de admisión, visado o convalidación, si decidís avanzar con nuestro
                acompañamiento.
              </li>
            </ul>
            <p>
              La base legal es tu consentimiento, que nos das al escribirnos voluntariamente, y — si avanzás con una
              admisión — la ejecución de la relación de gestión que nos encargás.
            </p>
          </Section>

          <Section num="04">
            <p>
              Una cookie es un pequeño archivo que un sitio web guarda en tu navegador para recordar información
              entre visitas — por ejemplo, tus preferencias, si iniciaste sesión, o para rastrear tu actividad con
              fines analíticos o publicitarios.
            </p>
            <p>
              Este sitio <strong>solo usa cookies de analítica, y únicamente si las aceptás</strong> en el aviso que
              aparece en tu primera visita. Usamos <strong>Google Analytics 4</strong> (Google Ireland Limited) para
              saber, de forma estadística, cuántas personas visitan la web, desde qué país y qué páginas les resultan
              útiles. No usamos cookies de publicidad ni Meta Pixel. Mientras no aceptes (o si rechazás), Google
              Analytics funciona en modo de consentimiento denegado: no instala ninguna cookie ni guarda
              identificadores en tu navegador.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[560px]">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Finalidad</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>_ga</code>
                    </td>
                    <td>Cookie de analítica de Google (terceros), solo con tu consentimiento</td>
                    <td>Distinguir visitantes de forma anónima para las estadísticas de Google Analytics.</td>
                    <td>2 años</td>
                  </tr>
                  <tr>
                    <td>
                      <code>_ga_V6X4XTWVTB</code>
                    </td>
                    <td>Cookie de analítica de Google (terceros), solo con tu consentimiento</td>
                    <td>Mantener el estado de la sesión de Google Analytics.</td>
                    <td>2 años</td>
                  </tr>
                  <tr>
                    <td>
                      <code>eem-cookie-consent</code>
                    </td>
                    <td>localStorage (técnico, no es una cookie)</td>
                    <td>Recordar si aceptaste o rechazaste las cookies de analítica, para no volver a preguntarte.</td>
                    <td>Hasta que borres los datos del navegador.</td>
                  </tr>
                  <tr>
                    <td>
                      <code>eem-loader-shown</code>
                    </td>
                    <td>sessionStorage (técnico, no es una cookie)</td>
                    <td>Recordar que ya viste la animación de carga inicial, para no repetirla en cada página durante la misma visita.</td>
                    <td>Se borra al cerrar la pestaña o el navegador.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Los datos de Google Analytics se tratan de forma agregada y con la IP anonimizada. Google puede tratarlos
              fuera del Espacio Económico Europeo con las garantías previstas en su{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">política de privacidad</a>.
            </p>
            <p>Podés cambiar o retirar tu consentimiento en cualquier momento:</p>
            <div>
              <CookieSettingsButton />
            </div>
            <p>
              Si incorporamos otras cookies o herramientas, vamos a actualizar esta página y pedir tu consentimiento
              antes de activarlas — como exige la normativa (LSSI-CE y RGPD).
            </p>
          </Section>

          <Section num="05">
            <p>
              No vendemos ni cedemos tus datos a terceros con fines comerciales. Solo los compartimos cuando es
              necesario para el servicio que nos pediste — por ejemplo, con la universidad correspondiente como parte
              de la gestión de tu admisión — y únicamente los datos necesarios para ese trámite concreto.
            </p>
            <p>
              Cuando nos escribís por WhatsApp, esa conversación pasa por la infraestructura de WhatsApp (Meta
              Platforms Ireland Limited), que trata esos mensajes según su propia política de privacidad — te
              recomendamos revisarla si te interesa el detalle de cómo procesan ellos la conversación.
            </p>
          </Section>

          <Section num="06">
            <p>
              Conservamos tu información mientras dure tu consulta o proceso de admisión, y un tiempo razonable
              después por si necesitás retomar el contacto. Plazo exacto de conservación:{" "}
              <Pending>a definir por Estudia en Madrid según su política interna</Pending>. Podés pedirnos en
              cualquier momento que eliminemos tus datos antes de ese plazo (ver la sección de tus derechos).
            </p>
          </Section>

          <Section num="07">
            <p>
              Tenés derecho a acceder a tus datos, pedir que los corrijamos si están mal, pedir que los eliminemos, y
              oponerte o pedir que limitemos su uso. Para ejercer cualquiera de estos derechos, escribinos a
              hola@estudiaenmadrid.com indicando qué querés hacer con tus datos — te respondemos en el plazo que
              marca la normativa aplicable.
            </p>
            <p>
              Si en algún momento considerás que no gestionamos bien tu solicitud, también tenés derecho a presentar
              una reclamación ante la autoridad de protección de datos que corresponda.
            </p>
          </Section>

          <Section num="08">
            <p>
              Podemos actualizar esta página si cambia algo en cómo tratamos tus datos — por ejemplo, si incorporamos
              nuevas herramientas en el sitio. La fecha de la última actualización siempre está indicada arriba.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
