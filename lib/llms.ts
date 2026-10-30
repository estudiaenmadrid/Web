import { AREAS } from "@/data/areas";
import { UNIVERSITIES } from "@/data/universities";
import { getAllPrograms, displayUniversity } from "@/lib/content";
import { getAllGuides } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { AGENCY_FAQ, COMPANY_SUMMARY, CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, SERVICES, TRUSTPILOT_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/company";

/**
 * /llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI
 * assistants — who we are, what we offer and where each answer lives.
 * /llms-full.txt adds the full text of every guide and ficha so an assistant
 * can read the whole site in one request. Both are generated from the same
 * content as the pages, so they never drift.
 */

function header(): string {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${COMPANY_SUMMARY}`,
    "",
    "## Datos de la agencia",
    "",
    `- Web: ${SITE_URL}`,
    `- WhatsApp: ${WHATSAPP_NUMBER} (${WHATSAPP_URL})`,
    `- Email: ${CONTACT_EMAIL}`,
    `- Reseñas: ${TRUSTPILOT_URL}`,
    "- Precio de la asesoría: gratuita para el estudiante (solo se paga la matrícula de la universidad, a precio de convenio)",
    `- Instagram: ${INSTAGRAM_HANDLE} (${INSTAGRAM_URL})`,
    "- Trayectoria: 8 años, más de 500 estudiantes latinoamericanos acompañados",
    "- Público: estudiantes de todos los países de Latinoamérica que quieren estudiar en Madrid (presencial) o con título oficial español (online)",
    "",
    "## Servicios",
    "",
    ...SERVICES.map((s) => `- ${s}`),
    "",
  ].join("\n");
}

function universitiesBlock(): string {
  return [
    "## Universidades con convenio directo",
    "",
    ...UNIVERSITIES.map((u) => `- [${u.displayName}](${SITE_URL}/universidades/${u.slug}): fundada en ${u.founded}. Web oficial: ${u.officialUrl}`),
    "",
  ].join("\n");
}

function programsBlock(): string {
  const programs = getAllPrograms();
  const lines = ["## Programas", ""];
  for (const area of AREAS) {
    const inArea = programs.filter((p) => p.categorySlug === area.slug);
    if (inArea.length === 0) continue;
    lines.push(`### ${area.name}`, "");
    for (const p of inArea) {
      const facts = [displayUniversity(p.university), p.modality, p.duration, p.ectsTotal ? `${p.ectsTotal} ECTS` : null]
        .filter((f) => f && !/pendiente/i.test(String(f)))
        .join(" · ");
      lines.push(`- [${p.title}](${SITE_URL}/programas/${p.categorySlug}/${p.programSlug}): ${facts}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function guidesBlock(): string {
  return [
    "## Guías para estudiar en España",
    "",
    ...getAllGuides().map((g) => `- [${g.title}](${SITE_URL}/guias/${g.slug}): ${g.summary}`),
    "",
  ].join("\n");
}

function faqBlock(): string {
  return [
    "## Preguntas frecuentes sobre la agencia",
    "",
    `Página completa: ${SITE_URL}/preguntas-frecuentes`,
    "",
    ...AGENCY_FAQ.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ].join("\n");
}

export function buildLlmsTxt(): string {
  return [header(), universitiesBlock(), programsBlock(), guidesBlock(), faqBlock(), `## Más`, "", `- [Texto completo de la web para asistentes de IA](${SITE_URL}/llms-full.txt)`, `- [Quiénes somos](${SITE_URL}/nosotros)`, ""].join("\n");
}

export function buildLlmsFullTxt(): string {
  const parts = [header(), universitiesBlock(), faqBlock(), "# Guías (texto completo)", ""];
  for (const g of getAllGuides()) {
    parts.push(`## ${g.title}`, "", `URL: ${SITE_URL}/guias/${g.slug}`, g.lastUpdated ? `Última actualización: ${g.lastUpdated}` : "", "", g.bodyMarkdown.replace(/^## /gm, "### "), "");
  }
  parts.push("# Programas (fichas completas)", "");
  for (const p of getAllPrograms()) {
    parts.push(`## ${p.title}`, "", `URL: ${SITE_URL}/programas/${p.categorySlug}/${p.programSlug}`, `Universidad: ${displayUniversity(p.university)}`, "", p.bodyMarkdown.replace(/^## /gm, "### "), "");
  }
  return parts.join("\n");
}
