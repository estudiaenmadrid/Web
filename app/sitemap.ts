import type { MetadataRoute } from "next";
import { AREAS } from "@/data/areas";
import { getAllPrograms } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/universidades`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    // /guias intentionally excluded: noindex until it has real published guides (see app/guias/page.tsx).
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

  return [...staticRoutes, ...areaRoutes, ...programRoutes];
}
