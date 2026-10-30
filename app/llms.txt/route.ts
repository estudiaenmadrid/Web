import { buildLlmsTxt } from "@/lib/llms";

// Required for output:"export" — written once at build time as a static file.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
