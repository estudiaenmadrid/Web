import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AI-generated placeholder photography (see lib/photos.ts) is hosted on
    // Higgsfield's asset CDN pending real, client-approved photography.
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Preserve search ranking and inbound-link equity from the old WordPress
  // site's flat URL structure by mapping its highest-value pages to their
  // nearest equivalent in this site's /programas/{categoria}/{programa}/
  // taxonomy. Scope limited to the 14 URLs the SEO audit's content-swap-bug
  // finding actually enumerated — that's the only old-URL list available;
  // a full legacy-URL migration map would need a crawl of all ~125
  // old sitemap URLs, not just these.
  async redirects() {
    return [
      // Exact program matches.
      { source: "/estudiar-mba-en-espana", destination: "/programas/administracion/mba", permanent: true },
      {
        source: "/estudiar-master-marketing-madrid",
        destination: "/programas/ingenieria/master-marketing-digital-online",
        permanent: true,
      },
      {
        source: "/grado-marketing-espana",
        destination: "/programas/ingenieria/master-marketing-digital-online",
        permanent: true,
      },
      {
        source: "/grado-administracion-empresas-espana",
        destination: "/programas/administracion/grado-administracion-empresas-uax",
        permanent: true,
      },
      {
        source: "/grado-ingenieria-biomedica-espana",
        destination: "/programas/ingenieria/grado-ingenieria-biomedica",
        permanent: true,
      },
      // University profile pages -> the universities overview (no
      // per-university route exists in this taxonomy).
      { source: "/la-universidad-alfonso-x-el-sabio", destination: "/universidades", permanent: true },
      { source: "/universidad-nebrija", destination: "/universidades", permanent: true },
      // "Quiénes somos" / process-adjacent content.
      { source: "/experiencia-universitaria", destination: "/nosotros", permanent: true },
      // Visa-guide and general "study in Spain" content: no equivalent
      // guide content exists yet on this site (/guias is an intentional
      // empty, noindexed placeholder) — route to the program catalog as
      // the closest useful next step rather than 404 or an empty page.
      { source: "/visa-de-estudiante-espana", destination: "/programas", permanent: true },
      { source: "/rechazo-visa-de-estudiante-espana", destination: "/programas", permanent: true },
      { source: "/puedo-trabajar-con-visa-de-estudiante-en-espana", destination: "/programas", permanent: true },
      { source: "/que-master-permite-quedarse-a-trabajar-en-espana", destination: "/programas", permanent: true },
      { source: "/estudiar-un-master-en-espana", destination: "/programas", permanent: true },
      // No vocational/FP content exists in this catalog (university
      // grados/másteres only) — same fallback.
      { source: "/formacion-profesional-en-espana", destination: "/programas", permanent: true },
    ];
  },
};

export default nextConfig;
