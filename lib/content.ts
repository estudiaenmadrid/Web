import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { AreaSlug } from "@/data/areas";

const PROGRAMS_DIR = path.join(process.cwd(), "content", "programas");

// PROGRAMS-INDEX.md #6: client confirmed UDIT/U-tad are NOT partner
// universities, but "Grado en Animación" still carries the stale UDIT
// attribution in its frontmatter pending the client naming the real
// university. Don't ship a disavowed partner name on the live site.
const UNCONFIRMED_UNIVERSITY_OVERRIDES: Record<string, string> = {
  "ingenieria/grado-animacion": "Pendiente de confirmar",
};

const CATEGORY_TO_SLUG: Record<string, AreaSlug> = {
  "Administración": "administracion",
  "Derecho": "derecho",
  "Ingeniería": "ingenieria",
  "Salud": "salud",
  "Educación": "educacion",
};

export type ProgramLevel =
  | "CONVALIDACIÓN"
  | "DOBLE GRADO"
  | "GRADO"
  | "MÁSTER"
  | "MBA"
  | "POSTGRADO"
  | "PROGRAMA";

export interface Program {
  categorySlug: AreaSlug;
  categoryName: string;
  programSlug: string;
  title: string;
  officialTitle?: string;
  university: string;
  city?: string;
  modality: string;
  ectsTotal?: string | number;
  duration?: string;
  startDate?: string;
  titleSeo?: string;
  metaDescription?: string;
  level: ProgramLevel;
  bodyHtml: string;
  bodyMarkdown: string;
}

function deriveLevel(title: string): ProgramLevel {
  if (/^Convalidaci[oó]n/i.test(title)) return "CONVALIDACIÓN";
  if (/^Doble Grado/i.test(title)) return "DOBLE GRADO";
  if (/^Grado/i.test(title)) return "GRADO";
  if (/^MBA/i.test(title)) return "MBA";
  if (/^M[aá]ster/i.test(title)) return "MÁSTER";
  if (/^Postgrado/i.test(title)) return "POSTGRADO";
  return "PROGRAMA";
}

function firstH1(markdown: string): string | undefined {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim();
}

function stripFirstH1(markdown: string): string {
  return markdown.replace(/^#\s+.+$/m, "").trim();
}

// content/_CONTENT-SPEC.md's template ends every file with an internal
// editorial note ("*Nota interna (no publicar): ...*") — sourcing,
// unconfirmed fields, ambiguities for the client. Explicitly marked
// not for publication, so it must never reach the rendered ficha page.
function stripInternalNote(markdown: string): string {
  return markdown.replace(/\n---\n+\*Nota interna[\s\S]*$/, "").trim();
}

function loadProgram(categoryDir: string, file: string): Program {
  const fullPath = path.join(PROGRAMS_DIR, categoryDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const categoryName: string = data.categoria ?? categoryDir;
  const categorySlug = CATEGORY_TO_SLUG[categoryName] ?? (categoryDir as AreaSlug);
  const programSlug = file.replace(/\.md$/, "");
  const title = firstH1(content) ?? data.nombre_oficial_titulo ?? programSlug;
  const bodyMarkdown = stripInternalNote(stripFirstH1(content));
  const bodyHtml = marked.parse(bodyMarkdown, { async: false }) as string;
  const overrideKey = `${categoryDir}/${programSlug}`;

  return {
    categorySlug,
    categoryName,
    programSlug,
    title,
    officialTitle: data.nombre_oficial_titulo,
    university:
      UNCONFIRMED_UNIVERSITY_OVERRIDES[overrideKey] ?? data.universidad ?? "Pendiente de confirmar",
    city: data.ciudad,
    modality: data.modalidad ?? "Pendiente de confirmar",
    ectsTotal: data.ects_total ?? data.ects,
    duration: data.duracion,
    startDate: data.fecha_inicio,
    titleSeo: data.title_seo,
    metaDescription: data.meta_description,
    level: deriveLevel(title),
    bodyHtml,
    bodyMarkdown,
  };
}

let cache: Program[] | null = null;

export function getAllPrograms(): Program[] {
  if (cache) return cache;
  const categoryDirs = fs
    .readdirSync(PROGRAMS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const programs: Program[] = [];
  for (const dir of categoryDirs) {
    const files = fs
      .readdirSync(path.join(PROGRAMS_DIR, dir))
      .filter((f) => f.endsWith(".md"));
    for (const file of files) {
      programs.push(loadProgram(dir, file));
    }
  }
  cache = programs;
  return programs;
}

export function getProgramsByCategory(categorySlug: AreaSlug): Program[] {
  return getAllPrograms().filter((p) => p.categorySlug === categorySlug);
}

export function getProgram(
  categorySlug: AreaSlug,
  programSlug: string
): Program | undefined {
  return getAllPrograms().find(
    (p) => p.categorySlug === categorySlug && p.programSlug === programSlug
  );
}

// Editorial picks per area, adapted from the design brief's featured
// selections (rawAreas() in the handoff prototype) to programs that
// actually exist in the confirmed content catalog.
const FEATURED_BY_AREA: Record<string, string[]> = {
  derecho: ["master-criminalistica"],
  administracion: ["mba"],
  ingenieria: ["grado-inteligencia-artificial"],
  salud: ["grado-fisioterapia"],
  educacion: ["grado-maestro-educacion-primaria-online"],
};

export function getFeaturedForArea(categorySlug: AreaSlug): Program[] {
  const slugs = FEATURED_BY_AREA[categorySlug] ?? [];
  return slugs
    .map((slug) => getProgram(categorySlug, slug))
    .filter((p): p is Program => Boolean(p));
}

const GROUP_ORDER = ["Convalidaciones", "Grados", "Másteres", "Postgrados", "Otros"] as const;

function groupTitle(level: ProgramLevel): (typeof GROUP_ORDER)[number] {
  switch (level) {
    case "CONVALIDACIÓN":
      return "Convalidaciones";
    case "DOBLE GRADO":
    case "GRADO":
      return "Grados";
    case "MÁSTER":
    case "MBA":
      return "Másteres";
    case "POSTGRADO":
      return "Postgrados";
    default:
      return "Otros";
  }
}

export interface ProgramGroup {
  title: string;
  items: Program[];
}

export function groupPrograms(programs: Program[]): ProgramGroup[] {
  return GROUP_ORDER.map((title) => ({
    title,
    items: programs.filter((p) => groupTitle(p.level) === title),
  })).filter((g) => g.items.length > 0);
}

export function getModalityTags(modality: string): string[] {
  const tags: string[] = [];
  if (/presencial/i.test(modality) && !/semipresencial/i.test(modality)) tags.push("PRESENCIAL");
  if (/semipresencial/i.test(modality)) tags.push("SEMIPRESENCIAL");
  if (/online/i.test(modality)) tags.push("ONLINE");
  if (tags.length === 0) tags.push(modality.split("(")[0].trim().toUpperCase() || "PENDIENTE");
  return tags;
}

export function normalizeUniversityName(university: string): string {
  return university.split("—")[0].trim();
}

export function getPartnerUniversities(): string[] {
  const names = new Set<string>();
  for (const p of getAllPrograms()) {
    if (!p.university || /pendiente/i.test(p.university)) continue;
    names.add(normalizeUniversityName(p.university));
  }
  return Array.from(names);
}

export function countProgramsForUniversity(name: string): number {
  return getAllPrograms().filter((p) => normalizeUniversityName(p.university) === name).length;
}
