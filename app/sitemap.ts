import type { MetadataRoute } from "next";
import { AREAS } from "@/data/areas";
import { UNIVERSITIES } from "@/data/universities";
import { getAllPrograms } from "@/lib/content";
import { getAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

// Required for output:"export" (see next.config.ts) — pre-render once at
// build time; the `now` timestamp below just becomes "whenever we built".
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/universidades`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/guias`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${SITE_URL}/programas/${area.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const programRoutes: MetadataRoute.Sitemap = getAllPrograms().map((p) => ({
    url: `${SITE_URL}/programas/${p.categorySlug}/${p.programSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const universityRoutes: MetadataRoute.Sitemap = UNIVERSITIES.map((u) => ({
    url: `${SITE_URL}/universidades/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: g.lastUpdated ? new Date(g.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...areaRoutes, ...programRoutes, ...universityRoutes, ...guideRoutes];
}
