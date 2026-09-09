import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content", "guias");

export interface Guide {
  slug: string;
  title: string;
  titleSeo?: string;
  metaDescription?: string;
  category: string;
  summary: string;
  publishedDate?: string;
  lastUpdated?: string;
  bodyMarkdown: string;
}

function firstH1(markdown: string): string | undefined {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim();
}

function stripFirstH1(markdown: string): string {
  return markdown.replace(/^#\s+.+$/m, "").trim();
}

function stripInternalNote(markdown: string): string {
  return markdown.replace(/\n---\n+\*Nota interna[\s\S]*$/, "").trim();
}

function loadGuide(file: string): Guide {
  const fullPath = path.join(GUIDES_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const title = firstH1(content) ?? slug;
  const bodyMarkdown = stripInternalNote(stripFirstH1(content));

  return {
    slug,
    title,
    titleSeo: data.title_seo,
    metaDescription: data.meta_description,
    category: data.categoria ?? "General",
    summary: data.resumen ?? "",
    publishedDate: data.fecha_publicacion,
    lastUpdated: data.ultima_actualizacion,
    bodyMarkdown,
  };
}

let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (cache) return cache;
  if (!fs.existsSync(GUIDES_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  cache = files.map(loadGuide).sort((a, b) => (b.publishedDate ?? "").localeCompare(a.publishedDate ?? ""));
  return cache;
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getGuideCategories(): string[] {
  return Array.from(new Set(getAllGuides().map((g) => g.category)));
}

export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter((g) => g.category === category);
}
