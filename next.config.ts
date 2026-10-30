import type { NextConfig } from "next";

// Static export: this site is hosted on Hostinger shared hosting, which
// serves plain files via Apache — there's no Node.js process to run
// `next start`, so Next.js can't do on-request rendering, redirects,
// headers, or image optimization. `next build` instead emits a fully
// static `out/` directory (one .html file per route, already covered
// since every dynamic route already uses generateStaticParams()).
// Apache-equivalent redirects and security headers live in public/.htaccess
// (copied into `out/` by the export) since next.config's redirects()/
// headers() are not supported with output:"export".
const nextConfig: NextConfig = {
  output: "export",

  images: {
    // No Image Optimization server exists on static hosting — images are
    // served as-is. University photos ship pre-sized by scripts/fotos.mjs
    // (see lib/photos.ts); this covers the logo/favicon images too.
    unoptimized: true,
  },
};

export default nextConfig;
