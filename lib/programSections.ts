import { marked } from "marked";

export interface ProgramSection {
  heading: string;
  markdown: string;
  html: string;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
}

/** Split a program's body markdown into its `## ` sections, each rendered to HTML individually so the ficha page can give every section its own visual treatment instead of one flat prose blob. */
export function splitProgramSections(bodyMarkdown: string): ProgramSection[] {
  const chunks = bodyMarkdown.split(/\n(?=## )/);
  const sections: ProgramSection[] = [];
  for (const chunk of chunks) {
    const headingMatch = chunk.match(/^##\s+(.+)$/m);
    if (!headingMatch) continue;
    const heading = headingMatch[1].trim();
    const contentMarkdown = chunk.slice(headingMatch.index! + headingMatch[0].length).trim();
    sections.push({
      heading,
      markdown: contentMarkdown,
      html: marked.parse(contentMarkdown, { async: false }) as string,
    });
  }
  return sections;
}

/** Parse the FAQ section's `**Question?**\nAnswer.` blocks (the fixed shape every ficha's FAQ was generated in — bold question line immediately followed by its answer, blank lines only between pairs) into structured Q&A items for an accordion. */
export function parseFaqPairs(markdown: string): FaqItem[] {
  const blocks = markdown
    .trim()
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const items: FaqItem[] = [];
  for (const block of blocks) {
    const match = block.match(/^\*\*(.+?)\*\*\n([\s\S]+)$/);
    if (!match) continue;
    items.push({
      question: match[1].trim(),
      answerHtml: marked.parseInline(match[2].trim(), { async: false }) as string,
    });
  }
  return items;
}

/** Deterministic heading -> anchor id, shared between MarkdownSections (sets the id) and any in-page table of contents (links to it). */
export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Section headings + anchor ids for a body's table of contents — the CTA section is excluded, it's a call to action, not a navigable topic. */
export function getTocItems(bodyMarkdown: string): { id: string; heading: string }[] {
  return splitProgramSections(bodyMarkdown)
    .filter((s) => sectionKind(s.heading) !== "cta")
    .map((s) => ({ id: slugifyHeading(s.heading), heading: s.heading }));
}

export type SectionKind = "intro" | "datos" | "faq" | "porque" | "checklist" | "cta" | "card";

export function sectionKind(heading: string): SectionKind {
  if (/^qué es/i.test(heading)) return "intro";
  if (/^datos generales/i.test(heading)) return "datos";
  if (/^preguntas frecuentes/i.test(heading)) return "faq";
  if (/^por qué elegir/i.test(heading)) return "porque";
  if (/^(salidas profesionales|requisitos de acceso)/i.test(heading)) return "checklist";
  if (/^llamada a la acción/i.test(heading)) return "cta";
  return "card";
}

/** The "Preguntas frecuentes" Q&A pairs of a guide or ficha body, for FAQPage schema. */
export function getFaqItems(bodyMarkdown: string): FaqItem[] {
  const faq = splitProgramSections(bodyMarkdown).find((s) => sectionKind(s.heading) === "faq");
  return faq ? parseFaqPairs(faq.markdown) : [];
}
