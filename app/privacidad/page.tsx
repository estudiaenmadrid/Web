import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacidad, cookies y protección de datos",
  description:
    "Política de privacidad, cookies y tratamiento de datos personales de Estudia en Madrid: qué información recogemos, con qué fin, y tus derechos sobre tus datos.",
  path: "/privacidad",
});

const LAST_UPDATED = "18 de septiembre de 2026";

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="border-t border-hair pt-7">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">{num}</div>
        <h2 className="font-display font-black uppercase m-0 mb-3.5" style={{ fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-.03em" }}>
          {title}
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

      <section
        className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[90px] flex flex-col gap-9 sm:gap-11"
        style={{ maxWidth: "72ch" }}
      >
        <Reveal>
          <div className="bg-white border border-hair border-l-4 border-l-red-signal rounded-md p-5.5 sm:p-7">
            <p className="eem-prose m-0">
              Resumen en un párrafo: este sitio no usa cookies de seguimiento ni publicidad, no vende tus datos a
              nadie, y solo recogemos la información que vos mismo/a nos das cuando nos escribís por WhatsApp o
              correo para pedir información sobre un programa. La usamos únicamente para responderte y gestionar tu
              posible admisión — nada más.
            </p>
          </div>
        </Reveal>

        <Section num="01" title="Quién es el responsable del tratamiento">
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

        <Section num="02" title="Qué datos tratamos y de dónde salen">
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
            contacto propios) ni mediante herramientas de analítica o publicidad — ver la sección de Cookies más
            abajo.
          </p>
        </Section>

        <Section num="03" title="Con qué finalidad y con qué base legal">
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

        <Section num="04" title="Política de cookies">
          <p>
            Una cookie es un pequeño archivo que un sitio web guarda en tu navegador para recordar información
            entre visitas — por ejemplo, tus preferencias, si iniciaste sesión, o para rastrear tu actividad con
            fines analíticos o publicitarios.
          </p>
          <p>
            <strong>Este sitio no utiliza ninguna cookie</strong> — ni propia ni de terceros, ni técnica, ni de
            analítica, ni de publicidad. No hay Google Analytics, Meta Pixel, ni ninguna otra herramienta de
            seguimiento instalada.
          </p>
          <p>
            Lo único que se guarda en tu navegador es una marca técnica local, usando{" "}
            <code>sessionStorage</code> (una tecnología distinta de las cookies, que el sitio web controla pero que
            nunca se envía a ningún servidor):
          </p>
          <table>
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
                  <code>eem-loader-shown</code>
                </td>
                <td>sessionStorage (no es una cookie)</td>
                <td>Recordar que ya viste la animación de carga inicial, para no repetirla en cada página durante la misma visita.</td>
                <td>Se borra al cerrar la pestaña o el navegador.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Esta marca no te identifica, no se comparte con nadie, y no tiene ningún propósito de seguimiento o
            analítica — es puramente una preferencia visual de tu sesión actual. No necesita tu consentimiento
            porque no es una cookie ni un dato personal.
          </p>
          <p>
            Como no usamos cookies, no hay nada que necesites desactivar. Si igual querés borrar ese dato local,
            podés hacerlo desde la configuración de tu navegador (Configuración → Privacidad → Borrar datos de
            navegación) o simplemente cerrando la pestaña.
          </p>
          <p>
            Si en el futuro incorporamos cookies o herramientas de analítica o publicidad, vamos a actualizar esta
            página, detallar aquí cada una en la tabla de arriba, y pedir tu consentimiento explícito antes de
            activarlas — como exige la normativa (LSSI-CE y RGPD).
          </p>
        </Section>

        <Section num="05" title="A quién compartimos tus datos">
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

        <Section num="06" title="Cuánto tiempo conservamos tus datos">
          <p>
            Conservamos tu información mientras dure tu consulta o proceso de admisión, y un tiempo razonable
            después por si necesitás retomar el contacto. Plazo exacto de conservación:{" "}
            <Pending>a definir por Estudia en Madrid según su política interna</Pending>. Podés pedirnos en
            cualquier momento que eliminemos tus datos antes de ese plazo (ver la sección de tus derechos).
          </p>
        </Section>

        <Section num="07" title="Tus derechos sobre tus datos">
          <p>
            Tenés derecho a acceder a tus datos, pedir que los corrijamos si están mal, pedir que los eliminemos, y
            oponerte u pedir que limitemos su uso. Para ejercer cualquiera de estos derechos, escribinos a
            hola@estudiaenmadrid.com indicando qué querés hacer con tus datos — te respondemos en el plazo que
            marca la normativa aplicable.
          </p>
          <p>
            Si en algún momento considerás que no gestionamos bien tu solicitud, también tenés derecho a presentar
            una reclamación ante la autoridad de protección de datos que corresponda.
          </p>
        </Section>

        <Section num="08" title="Cambios a esta política">
          <p>
            Podemos actualizar esta página si cambia algo en cómo tratamos tus datos — por ejemplo, si incorporamos
            nuevas herramientas en el sitio. La fecha de la última actualización siempre está indicada arriba.
          </p>
        </Section>
      </section>
    </>
  );
}
