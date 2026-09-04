import Link from "next/link";
import { getAllPrograms, getPartnerUniversities, getProgram } from "@/lib/content";
import { getTestimonials } from "@/lib/testimonials";
import { AREAS } from "@/data/areas";
import Reveal from "@/components/Reveal";
import Stat from "@/components/Stat";
import Ticket from "@/components/Ticket";
import PlaceholderImage from "@/components/PlaceholderImage";
import SplitHeadline from "@/components/SplitHeadline";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";

const FEATURED_SLUGS: [string, string][] = [
  ["salud", "grado-psicologia"],
  ["derecho", "master-criminalistica"],
  ["ingenieria", "grado-inteligencia-artificial"],
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Orientación",
    body: "Analizamos tu expediente y te decimos con honestidad qué opciones tienes.",
    h: "clamp(200px,26vh,260px)",
  },
  {
    num: "02",
    title: "Postulación",
    body: "Preparamos documentos, apostillas y solicitud de reconocimiento de créditos.",
    h: "clamp(240px,32vh,320px)",
  },
  {
    num: "03",
    title: "Visado y becas",
    body: "Cita consular, seguro médico, solvencia y las becas a las que sí calificas.",
    h: "clamp(280px,38vh,380px)",
  },
  {
    num: "04",
    title: "Llegada a Madrid",
    body: "Alojamiento, TIE, empadronamiento y una red de estudiantes que ya pasó por esto.",
    h: "clamp(320px,44vh,440px)",
    red: true,
  },
];

export default function Home() {
  const featured = FEATURED_SLUGS.map(([cat, slug]) => getProgram(cat as never, slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const universities = getPartnerUniversities();
  const testimonials = getTestimonials().slice(0, 2);
  const totalPrograms = getAllPrograms().length;

  return (
    <>
      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-[72px]">
        <div className="flex justify-between items-baseline gap-5 font-mono text-[11px] tracking-[.18em] uppercase text-ink-soft">
          <span>Agencia de acompañamiento académico</span>
          <span className="hidden sm:inline">Latinoamérica → España</span>
        </div>

        <SplitHeadline
          className="mt-3.5 sm:mt-5 md:mt-6 font-display font-black uppercase text-ink"
          lines={[
            { text: "Tu carrera" },
            { text: "sigue en" },
            { text: "Madrid", className: "text-red-signal" },
          ]}
        />
        <p
          className="font-serif italic mt-4 md:mt-7 text-ink"
          style={{ maxWidth: "20ch", fontSize: "clamp(22px,2.6vw,40px)", lineHeight: 1.14 }}
        >
          sin empezar de cero, y sin pelear sola con el papeleo
        </p>

        <div className="grid gap-px bg-hair border-y border-hair mt-7 sm:mt-9 md:mt-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}>
          <Stat confirm label="años acompañando estudiantes" className="bg-off-white py-5 pr-5 pl-0" />
          <Stat confirm label="estudiantes ya matriculados" className="bg-off-white p-5" />
          <Stat value={String(universities.length).padStart(2, "0")} label="universidades con convenio directo" className="bg-off-white p-5" />
          <div className="bg-off-white p-5 flex items-center">
            <a
              href="https://wa.me/34677055769"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 font-display font-extrabold text-[14px] uppercase tracking-[.04em] border-b-2 border-red-signal pb-[3px]"
            >
              Valorar mi expediente <span>↗</span>
            </a>
          </div>
        </div>

        <div className="relative mt-6 md:mt-10" style={{ height: "clamp(300px,52vh,620px)", filter: "grayscale(1) contrast(1.06)" }}>
          <PlaceholderImage label="Foto de portada: estudiantes o skyline de Madrid (B/N)" className="w-full h-full" />
        </div>
      </section>

      {/* Programas destacados */}
      <section className="px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[140px]">
        <div className="flex flex-wrap justify-between items-end gap-5 border-b border-hair pb-4.5">
          <h2
            className="font-display font-black uppercase m-0"
            style={{ fontSize: "clamp(28px,4.4vw,72px)", letterSpacing: "-.035em" }}
          >
            Programas destacados
          </h2>
          <Link href="/programas" className="font-mono text-[11px] tracking-[.16em] text-red-signal py-1">
            VER LAS {AREAS.length} ÁREAS ↗
          </Link>
        </div>
        <FeaturedPrograms programs={featured} />
      </section>

      {/* Proceso */}
      <section className="relative overflow-hidden bg-ink text-off-white px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[150px]">
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            right: "-6%",
            top: "12%",
            width: "min(46vw,560px)",
            height: "min(46vw,560px)",
            border: "1px solid rgba(248,244,235,.16)",
            animation: "eem-spin 40s linear infinite",
          }}
        >
          <div className="absolute" style={{ inset: "14%", border: "1px solid rgba(248,244,235,.16)", transform: "rotate(45deg)" }} />
        </div>

        <p
          className="font-serif italic m-0 relative"
          style={{ maxWidth: "26ch", fontSize: "clamp(24px,3.6vw,56px)", lineHeight: 1.1 }}
        >
          El camino puede ponerse <span className="text-red-signal">cuesta arriba</span>. Te acompañamos paso a paso.
        </p>

        <div
          className="grid gap-3.5 sm:gap-5 md:gap-6 items-end mt-8 sm:mt-12 md:mt-[86px] relative"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px,1fr))" }}
        >
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.num}>
              <div
                className={`border p-5.5 flex flex-col justify-between ${
                  step.red ? "bg-red-signal text-white border-white/18" : "border-white/18"
                }`}
                style={{ height: step.h }}
              >
                <span className="font-mono text-[11px] tracking-[.16em] text-red-signal" style={step.red ? { color: "#fff" } : undefined}>
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display font-extrabold m-0 mb-2" style={{ fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em" }}>
                    {step.title}
                  </h3>
                  <p className="m-0 text-[14px] leading-[1.5]" style={{ color: step.red ? "rgba(255,255,255,.85)" : "rgba(248,244,235,.7)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full mt-6 block" style={{ height: "clamp(30px,5vw,60px)" }} aria-hidden="true">
          <path d="M0 40 C 100 8, 200 8, 300 40 S 500 72, 600 40 S 800 8, 900 40 S 1100 72, 1200 40" fill="none" stroke="#FD0100" strokeWidth="2" />
          <path d="M0 52 H1200" fill="none" stroke="rgba(248,244,235,.35)" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      </section>

      {/* Quiénes somos */}
      <section id="nosotros" className="px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[140px]">
        <div className="grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
          <div>
            <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">02 — QUIÉNES SOMOS</span>
            <Reveal>
              <h2
                className="font-display font-black uppercase mt-3.5"
                style={{ fontSize: "clamp(30px,5vw,84px)", lineHeight: 0.92, letterSpacing: "-.04em" }}
              >
                No vendemos
                <br />
                cupos.
                <br />
                <span className="text-red-signal">Abrimos puertas.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-5" style={{ maxWidth: "56ch" }}>
            <Reveal>
              <p className="m-0" style={{ fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.6 }}>
                Somos una agencia con convenio directo con universidades privadas españolas. Eso significa dos cosas
                concretas: pagas menos que yendo por tu cuenta y tienes a alguien del otro lado del Atlántico
                resolviendo el papeleo contigo.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="m-0 text-ink-soft" style={{ fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.6 }}>
                Trabajamos caso por caso. Revisamos tu título, tus créditos y tu presupuesto antes de recomendarte
                nada — si no te conviene, te lo decimos.
              </p>
            </Reveal>
            <div className="grid gap-3.5 mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))" }}>
              {testimonials.map((t) => (
                <Reveal key={t.name}>
                  <Ticket quote={t.quote} name={`${t.name} · ${t.country}`} meta="Trustpilot" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universidades */}
      <section id="universidades" className="border-y border-hair py-9 sm:py-12 md:py-[72px]">
        <div className="flex justify-between gap-5 px-5 sm:px-8 md:px-11 mb-6.5">
          <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">CONVENIOS DIRECTOS</span>
          <span className="font-mono text-[11px] tracking-[.16em] text-ink-soft">
            {String(universities.length).padStart(2, "0")} UNIVERSIDAD{universities.length === 1 ? "" : "ES"}
          </span>
        </div>
        <div className="grid gap-px bg-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))" }}>
          {universities.map((u) => (
            <Reveal key={u} className="bg-off-white px-4.5 py-6.5 grid place-items-center">
              <div className="w-full h-16 flex items-center justify-center">
                <span className="font-display font-extrabold text-[15px] uppercase text-ink-soft text-center">{u}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cierre */}
      <section className="relative px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[150px] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ filter: "grayscale(1) blur(9px) contrast(1.1)", opacity: 0.5 }}
        >
          <PlaceholderImage label="Madrid desenfocada (fondo)" className="w-full h-full" />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 text-center pointer-events-none hidden md:block font-display font-black uppercase"
          style={{
            top: "24%",
            fontSize: "clamp(60px,16vw,280px)",
            letterSpacing: "-.05em",
            color: "rgba(22,19,17,.1)",
            filter: "blur(3px)",
          }}
        >
          Madrid
        </div>
        <div
          className="relative grid gap-3.5 sm:gap-5 md:gap-6.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", maxWidth: 1100, margin: "0 auto" }}
        >
          <Reveal>
            <div className="bg-white border border-hair rounded-md p-6">
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">AHORRO</div>
              <p className="font-display font-extrabold mt-3 mb-0 text-[22px]" style={{ letterSpacing: "-.02em" }}>
                Matrícula con convenio
              </p>
              <p className="text-[14px] leading-[1.5] text-ink-soft mt-2 mb-0">
                Pagas la tarifa acordada con la universidad, no la de lista.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="bg-white border border-hair rounded-md p-6">
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">TRANQUILIDAD</div>
              <p className="font-display font-extrabold mt-3 mb-0 text-[22px]" style={{ letterSpacing: "-.02em" }}>
                Un asesor, todo el proceso
              </p>
              <p className="text-[14px] leading-[1.5] text-ink-soft mt-2 mb-0">
                La misma persona desde la primera consulta hasta tu TIE.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-red-signal text-white rounded-md p-6 flex flex-col justify-between gap-4.5">
              <div>
                <div className="font-mono text-[10px] tracking-[.16em]">SIGUIENTE PASO</div>
                <p className="font-display font-extrabold mt-3 mb-0 text-[22px]" style={{ letterSpacing: "-.02em" }}>
                  Escríbenos por WhatsApp
                </p>
              </div>
              <a
                href="https://wa.me/34677055769"
                target="_blank"
                rel="noopener"
                className="text-white font-display font-extrabold text-[14px] uppercase tracking-[.04em] border-b-2 border-white pb-[3px] self-start"
              >
                +34 677 055 769 ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <p className="sr-only">{totalPrograms} programas en catálogo.</p>
    </>
  );
}
