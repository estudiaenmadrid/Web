import Link from "next/link";
import type { Metadata } from "next";
import { getPartnerUniversities } from "@/lib/content";
import { getTestimonials } from "@/lib/testimonials";
import { photoForSlot } from "@/lib/photos";
import { PROCESS_STEPS } from "@/data/process";
import Photo from "@/components/shared/Photo";
import Reveal from "@/components/Reveal";
import Ticket from "@/components/Ticket";
import Stat from "@/components/Stat";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quiénes somos — Estudia en Madrid",
  description:
    "8 años acompañando a más de 500 estudiantes latinoamericanos con convenio directo en universidades privadas españolas. Elección de programa, admisión, visado y becas.",
  path: "/nosotros",
});

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
  const [featuredReview, sideReview] = getTestimonials();
  const teamPhoto = photoForSlot("nosotros");

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Quiénes somos", path: "/nosotros" }]} />
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
        {teamPhoto ? (
          <div
            className="relative mt-6 md:mt-11 overflow-hidden bg-ink w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
            style={{ maxHeight: "min(72vh,640px)" }}
          >
            <Photo photo={teamPhoto} priority sizes="(min-width: 768px) calc(100vw - 88px), calc(100vw - 40px)" />
          </div>
        ) : (
          featuredReview && (
            // No real team photo yet: a real student review stands in, never a generated picture.
            <figure className="relative overflow-hidden m-0 mt-6 md:mt-11 bg-ink text-off-white px-6 sm:px-10 md:px-16 py-10 sm:py-14 md:py-20">
              <div aria-hidden="true" className="eem-plate-grain absolute inset-0" />
              <div className="relative font-mono text-[11px] tracking-[.16em] text-red-signal">LO QUE DICEN NUESTROS ESTUDIANTES</div>
              <blockquote
                className="relative m-0 mt-5 font-serif italic"
                style={{ fontSize: "clamp(26px,3.6vw,56px)", lineHeight: 1.12, maxWidth: "28ch" }}
              >
                &ldquo;{featuredReview.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-6 sm:mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[.14em] uppercase text-off-white/70">
                <span className="block w-2 h-2 bg-red-signal" />
                <span className="text-off-white">
                  {featuredReview.name} · {featuredReview.country}
                </span>
                <span>Reseña en Trustpilot</span>
              </figcaption>
            </figure>
          )
        )}
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        <div className="flex flex-col gap-4.5" style={{ maxWidth: "58ch" }}>
          <Reveal>
            <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(24px,3vw,44px)", letterSpacing: "-.03em" }}>
              Cómo trabajamos
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="m-0 text-[17px] leading-[1.6]">
              Llevamos 8 años acompañando a estudiantes latinoamericanos a estudiar en Madrid, y ya son más de 500 los
              que confiaron en nosotros para dar ese paso. Tenemos convenio directo con universidades privadas
              españolas y trabajamos con estudiantes de todos los países de Latinoamérica. Eso se traduce en tres
              cosas concretas: nuestra asesoría es gratuita, pagas menos que yendo por tu cuenta y tienes a alguien en Madrid resolviendo el
              papeleo contigo, en tu horario y en tu idioma.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="m-0 text-[17px] leading-[1.6] text-ink-soft">
              Revisamos tu título, tus créditos y tu presupuesto antes de recomendarte nada. Si un programa no te
              conviene, te lo decimos — preferimos perder una matrícula que meterte en algo que no vas a terminar.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="m-0 text-[17px] leading-[1.6] text-ink-soft">
              Wilson Pabón es quien atiende la mayoría de las consultas por WhatsApp — nuestros propios estudiantes lo
              nombran directamente en la mayoría de las reseñas que dejan en Trustpilot. La idea es esa: que hables
              siempre con la misma persona, que conozca tu caso desde el primer mensaje hasta que llegues a Madrid, y
              no con un call center que te repite un guion.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-px bg-hair border border-hair mt-2.5">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-off-white p-5">
                  <strong className="font-display text-[16px]">{v.title}</strong>
                  <p className="m-0 mt-1.5 text-[14px] text-ink-soft">{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-2.5">
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">EN LA PRÁCTICA, CUATRO PASOS</div>
              <ol className="list-none p-0 m-0 border-t border-hair">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.num}>
                    <Link
                      href={step.href}
                      className="group grid grid-cols-[40px_minmax(0,1fr)_auto] gap-3 items-baseline py-4 border-b border-hair hover:bg-white"
                    >
                      <span className="font-mono text-[11px] text-red-signal">{step.num}</span>
                      <span>
                        <span className="block font-display font-extrabold text-[17px]" style={{ letterSpacing: "-.01em" }}>
                          {step.title}
                        </span>
                        <span className="block text-[14px] leading-[1.5] text-ink-soft mt-1">{step.body}</span>
                      </span>
                      <span className="text-red-signal transition-transform group-hover:translate-x-1">↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="m-0 text-[15px] leading-[1.6] text-ink-soft">
              Todo esto lo hacemos por WhatsApp, en tu horario, sin formularios eternos ni esperar semanas por una
              respuesta. Si tenés dudas antes de escribirnos, revisá nuestras{" "}
              <Link href="/preguntas-frecuentes" className="underline hover:text-red-signal">
                preguntas frecuentes
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="m-0 text-[15px] leading-[1.6] text-ink-soft">
              El catálogo cubre grados, dobles grados y másteres en cinco áreas — Derecho, Administración, Ingeniería,
              Salud y Educación —, todos en universidades privadas con convenio directo. Antes de recomendarte uno
              comparamos duración, modalidad (presencial u online) y salidas profesionales con tu objetivo real, no con
              la comisión que nos pueda tocar por matricularte.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <Reveal>
            <div className="grid grid-cols-2 gap-px bg-hair border border-hair">
              <Stat value="8" label="años acompañando" className="bg-off-white p-5" />
              <Stat value="500+" label="estudiantes matriculados" className="bg-off-white p-5" />
              <Stat value={String(universities.length).padStart(2, "0")} label="universidades con convenio" className="bg-off-white p-5" />
              <Stat value="Todos" label="los países de Latinoamérica con convenio" className="bg-off-white p-5" />
            </div>
          </Reveal>
          {sideReview && (
            <Reveal delay={0.05}>
              <Ticket quote={sideReview.quote} name={`${sideReview.name} · ${sideReview.country}`} meta="Trustpilot" />
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
