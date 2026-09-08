import Reveal from "@/components/Reveal";
import {
  parseFaqPairs,
  sectionKind,
  splitProgramSections,
  type ProgramSection,
} from "@/lib/programSections";

const WHATSAPP_HREF = "https://wa.me/34677055769";

function SectionKicker({ index, heading }: { index: number; heading: string }) {
  return (
    <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">
      {String(index).padStart(2, "0")} — {heading.toUpperCase()}
    </div>
  );
}

function IntroSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div>
        <SectionKicker index={index} heading={section.heading} />
        <div
          className="eem-prose eem-sec-intro"
          style={{ fontSize: "18px" }}
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </Reveal>
  );
}

function DatosSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div>
        <SectionKicker index={index} heading={section.heading} />
        <div
          className="eem-prose eem-sec-datos bg-white border border-hair rounded-md p-1.5 sm:p-2"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </Reveal>
  );
}

function CardSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div>
        <SectionKicker index={index} heading={section.heading} />
        <div
          className="eem-prose bg-white border border-hair border-l-4 border-l-red-signal rounded-md p-5.5 sm:p-7"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </Reveal>
  );
}

function ChecklistSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div>
        <SectionKicker index={index} heading={section.heading} />
        <div
          className="eem-prose eem-sec-checklist"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </Reveal>
  );
}

function PorQueSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div>
        <SectionKicker index={index} heading={section.heading} />
        <div
          className="eem-prose eem-sec-porque"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </Reveal>
  );
}

function FaqSection({ section, index }: { section: ProgramSection; index: number }) {
  const items = parseFaqPairs(section.markdown);
  if (items.length === 0) return null;
  return (
    <div>
      <Reveal>
        <SectionKicker index={index} heading={section.heading} />
      </Reveal>
      <div className="flex flex-col border-t border-hair">
        {items.map((item, i) => (
          <Reveal key={item.question} delay={Math.min(i * 0.04, 0.24)}>
            <details className="eem-faq-item group border-b border-hair">
              <summary className="flex justify-between items-start gap-4 py-4.5 cursor-pointer list-none">
                <span
                  className="font-display font-extrabold"
                  style={{ fontSize: "16px", lineHeight: 1.3, letterSpacing: "-.01em" }}
                >
                  {item.question}
                </span>
                <span className="eem-faq-icon flex-none font-mono text-[18px] text-red-signal leading-none mt-0.5">
                  +
                </span>
              </summary>
              <div
                className="text-[15px] leading-[1.6] text-ink-soft pb-4.5 pr-8"
                dangerouslySetInnerHTML={{ __html: item.answerHtml }}
              />
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function CtaSection({ section, index }: { section: ProgramSection; index: number }) {
  return (
    <Reveal>
      <div className="bg-ink text-off-white rounded-md p-6 sm:p-8">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">
          {String(index).padStart(2, "0")} — SIGUIENTE PASO
        </div>
        <div
          className="eem-prose eem-sec-cta font-serif italic"
          style={{ fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.3 }}
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 mt-5.5 bg-red-signal text-white px-5 py-3.5 font-display font-extrabold text-[13px] uppercase tracking-[.04em] hover:bg-red-dark"
        >
          Escríbenos por WhatsApp <span>↗</span>
        </a>
      </div>
    </Reveal>
  );
}

export default function ProgramSections({ bodyMarkdown }: { bodyMarkdown: string }) {
  const sections = splitProgramSections(bodyMarkdown);

  return (
    <div className="flex flex-col gap-9 sm:gap-11" style={{ maxWidth: "62ch" }}>
      {sections.map((section, i) => {
        const kind = sectionKind(section.heading);
        const index = i + 1;
        switch (kind) {
          case "intro":
            return <IntroSection key={section.heading} section={section} index={index} />;
          case "datos":
            return <DatosSection key={section.heading} section={section} index={index} />;
          case "checklist":
            return <ChecklistSection key={section.heading} section={section} index={index} />;
          case "porque":
            return <PorQueSection key={section.heading} section={section} index={index} />;
          case "faq":
            return <FaqSection key={section.heading} section={section} index={index} />;
          case "cta":
            return <CtaSection key={section.heading} section={section} index={index} />;
          default:
            return <CardSection key={section.heading} section={section} index={index} />;
        }
      })}
    </div>
  );
}
