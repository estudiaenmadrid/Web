import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required for output:"export" (see next.config.ts) — this route has no
// per-request data, so pre-rendering it once at build time is correct.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
