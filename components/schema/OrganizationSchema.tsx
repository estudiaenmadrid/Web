import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Site-wide Organization schema — the entity clarity signal the SEO audit
 * flagged as missing everywhere ("Who" for E-E-A-T, GEO entity grounding).
 * Estudia en Madrid is the placement agency, not a university, so this is
 * Organization rather than EducationalOrganization (that type would
 * misrepresent it as the degree-granting institution).
 */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/eem-horizontal-black.png`,
    description:
      "Agencia de acompañamiento académico con 8 años de experiencia y más de 500 estudiantes latinoamericanos acompañados. Conecta a estudiantes de toda Latinoamérica con universidades privadas de Madrid: elección de programa, convalidaciones, visado y becas.",
    areaServed: ["ES", "Latinoamérica"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+34-677-055-769",
      areaServed: ["ES", "Latinoamérica"],
      availableLanguage: ["es"],
    },
    sameAs: ["https://wa.me/34677055769"],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
