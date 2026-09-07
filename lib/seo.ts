import type { Metadata } from "next";

export const SITE_NAME = "Estudia en Madrid";
export const SITE_URL = "https://estudiaenmadrid.com";

/** Truncate at a word boundary, never mid-word — for meta descriptions Google would otherwise cut awkwardly. */
export function truncateMeta(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/** Drop the redundant " - Estudia en Madrid" brand tail when the title alone already runs long. */
export function trimTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  const withoutBrandTail = title.replace(/\s*-\s*Estudia en Madrid\s*$/i, "");
  if (withoutBrandTail.length <= max) return withoutBrandTail;
  // Still long: drop the generic "Universidad " prefix, keeping the proper
  // noun (e.g. "Universidad Nebrija" -> "Nebrija") — still identifies the
  // school, just shorter.
  const withoutUniversityWord = withoutBrandTail.replace(/\bUniversidad\s+/i, "");
  return withoutUniversityWord;
}

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  /** Set false only for pages that should never be indexed (none currently). */
  index?: boolean;
}

/**
 * Every page should build its metadata through this helper: it fixes the
 * title-template double-suffix bug (root layout's "%s | Estudia en Madrid"
 * template was doubling up with title_seo strings that already end in
 * "- Estudia en Madrid"), sets a self-referencing canonical, and adds
 * Open Graph + Twitter tags — all found missing site-wide by the SEO audit.
 */
export function pageMetadata({ title, description, path, index = true }: PageMetaOptions): Metadata {
  const cleanTitle = trimTitle(title);
  const cleanDescription = truncateMeta(description);
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: { absolute: cleanTitle },
    description: cleanDescription,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: false },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
    },
  };
}
