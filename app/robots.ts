import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required for output:"export" (see next.config.ts) — this route has no
// per-request data, so pre-rendering it once at build time is correct.
export const dynamic = "force-static";

/**
 * AI search and assistant crawlers, named explicitly so the welcome is
 * unambiguous (GEO: we want ChatGPT, Claude, Perplexity, Gemini & co. to read
 * and cite the site). "*" already allows them; listing them guards against a
 * host or CDN default that blocks unknown AI bots.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
