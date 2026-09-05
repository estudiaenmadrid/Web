import type { Metadata } from "next";
import { getPartnerUniversities } from "@/lib/content";
import { getTestimonials } from "@/lib/testimonials";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import Ticket from "@/components/Ticket";
import Stat from "@/components/Stat";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Estudia en Madrid: agencia con convenio directo con universidades privadas españolas. Acompañamiento personalizado en admisión, visado y becas.",
};

const VALUES = [
  {
    title: "Personalización real",
    body: "Un asesor por estudiante, del primer mensaje al empadronamiento.",
  },
  {
    title: "Visado y becas incluidos",
    body: "Cita consular, seguro, solvencia y las becas a las que sí calificas.",
  },
  {
    title: "Alianzas directas",
    body: "Hablamos con admisiones, no con intermediarios.",
  },
];

export default function NosotrosPage() {
  const universities = getPartnerUniversities();
  const testimonial = getTestimonials()[0];

  return (
    <>
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">QUIÉNES SOMOS</div>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(38px,8.4vw,132px)", lineHeight: 0.86, letterSpacing: "-.045em" }}
        >
          No vendemos
          <br />
          cupos.
          <br />
          <span className="text-red-signal">Abrimos puertas.</span>
        </h1>
        <div className="relative mt-5.5 md:mt-11" style={{ height: "clamp(260px,46vh,500px)", filter: "grayscale(1) contrast(1.06)" }}>
          <PlaceholderImage label="Equipo EEM atendiendo a un estudiante" className="w-full h-full" />
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        <div className="flex flex-col gap-4.5" style={{ maxWidth: "58ch" }}>
          <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(24px,3vw,44px)", letterSpacing: "-.03em" }}>
            Cómo trabajamos
          </h2>
          <p className="m-0 text-[17px] leading-[1.6]">
            Tenemos convenio directo con universidades privadas españolas. Eso se traduce en dos cosas concretas:
            pagas menos que yendo por tu cuenta y tienes a alguien en Madrid resolviendo el papeleo contigo, en tu
            horario y en tu idioma.
          </p>
          <p className="m-0 text-[17px] leading-[1.6] text-ink-soft">
            Revisamos tu título, tus créditos y tu presupuesto antes de recomendarte nada. Si un programa no te
            conviene, te lo decimos — preferimos perder una matrícula que meterte en algo que no vas a terminar.
          </p>
          <div className="flex flex-col gap-px bg-hair border border-hair mt-2.5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-off-white p-5">
                <strong className="font-display text-[16px]">{v.title}</strong>
                <p className="m-0 mt-1.5 text-[14px] text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-px bg-hair border border-hair">
            <Stat confirm label="años acompañando" className="bg-off-white p-5" />
            <Stat confirm label="estudiantes matriculados" className="bg-off-white p-5" />
            <Stat value={String(universities.length).padStart(2, "0")} label="universidades con convenio" className="bg-off-white p-5" />
            <Stat confirm label="países de operación" className="bg-off-white p-5" />
          </div>
          {testimonial && (
            <Reveal>
              <Ticket quote={testimonial.quote} name={`${testimonial.name} · ${testimonial.country}`} meta="Trustpilot" />
            </Reveal>
          )}
          <a
            href="https://wa.me/34677055769"
            target="_blank"
            rel="noopener"
            className="flex justify-between items-center bg-red-signal text-white px-5 py-4.5 font-display font-extrabold text-[14px] uppercase tracking-[.04em] hover:bg-red-dark"
          >
            Habla con un asesor <span className="text-[18px]">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
