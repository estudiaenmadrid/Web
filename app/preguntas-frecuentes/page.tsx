import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import FaqSchema from "@/components/schema/FaqSchema";
import { pageMetadata } from "@/lib/seo";
import { AGENCY_FAQ, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/company";

export const metadata: Metadata = pageMetadata({
  title: "Preguntas frecuentes sobre Estudia en Madrid",
  description:
    "Qué es Estudia en Madrid, con qué universidades trabaja, cuánto cuesta, cómo ayuda con el visado y desde qué países. Respuestas claras antes de escribirnos.",
  path: "/preguntas-frecuentes",
});

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
        ]}
      />
      <FaqSchema items={AGENCY_FAQ} />

      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <Breadcrumb items={[{ name: "Inicio", path: "/" }, { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" }]} />
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mt-6">SOBRE LA AGENCIA</div>
        <h1
          className="font-display font-black uppercase mt-3.5"
          style={{ fontSize: "clamp(32px,6vw,80px)", lineHeight: 0.94, letterSpacing: "-.04em" }}
        >
          Preguntas frecuentes
        </h1>
        <p className="font-serif italic mt-4" style={{ maxWidth: "56ch", fontSize: "clamp(18px,2vw,26px)", lineHeight: 1.3 }}>
          Lo que más nos preguntan antes del primer mensaje: quiénes somos, con qué universidades trabajamos y cómo es
          el proceso.
        </p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[90px] grid gap-9 md:gap-[72px] md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col border-t border-hair min-w-0" style={{ maxWidth: "80ch" }}>
          {AGENCY_FAQ.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i * 0.04, 0.24)}>
              <details className="eem-faq-item group border-b border-hair" open={i < 2}>
                <summary className="flex justify-between items-start gap-4 py-5 cursor-pointer list-none">
                  <h2
                    className="font-display font-extrabold m-0"
                    style={{ fontSize: "clamp(17px,1.6vw,20px)", lineHeight: 1.3, letterSpacing: "-.01em" }}
                  >
                    {item.question}
                  </h2>
                  <span className="eem-faq-icon flex-none font-mono text-[18px] text-red-signal leading-none mt-1">+</span>
                </summary>
                <p className="m-0 text-[16px] leading-[1.65] text-ink-soft pb-5 pr-8">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <aside className="flex flex-col gap-4 md:sticky md:top-24 self-start">
          <div className="bg-ink text-off-white p-6">
            <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">¿TU PREGUNTA NO ESTÁ?</div>
            <p className="m-0 mt-3 text-[15px] leading-[1.55]" style={{ color: "rgba(248,244,235,.85)" }}>
              Escribinos por WhatsApp al <strong className="text-off-white">{WHATSAPP_NUMBER}</strong> y te respondemos en
              horario de Madrid.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="mt-5 flex justify-between items-center bg-red-signal text-white px-5 py-4 font-display font-extrabold text-[13px] uppercase tracking-[.04em] hover:bg-red-dark"
            >
              Habla con un asesor <span className="text-[18px]">↗</span>
            </a>
          </div>
          <nav aria-label="Más información" className="flex flex-col border-t border-hair">
            {[
              { href: "/nosotros", label: "Quiénes somos" },
              { href: "/universidades", label: "Universidades con convenio" },
              { href: "/programas", label: "Todos los programas" },
              { href: "/guias", label: "Guías para estudiar en España" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex justify-between py-3.5 border-b border-hair text-[14px] hover:text-red-signal">
                {l.label} <span className="text-red-signal">↗</span>
              </Link>
            ))}
          </nav>
        </aside>
      </section>
    </>
  );
}
