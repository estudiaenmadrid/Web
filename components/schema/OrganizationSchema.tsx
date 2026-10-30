import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { UNIVERSITIES } from "@/data/universities";
import {
  ADVISOR_NAME,
  COMPANY_SUMMARY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  KNOWS_ABOUT,
  LATAM_COUNTRIES,
  SERVICES,
  TRUSTPILOT_URL,
} from "@/lib/company";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Site-wide Organization + WebSite schema — the entity GEO grounding that
 * lets search engines and AI assistants know who Estudia en Madrid is.
 * Estudia en Madrid is the placement agency, not a university, so this is
 * Organization rather than EducationalOrganization (that type would
 * misrepresent it as the degree-granting institution). Partner universities
 * are linked as `knowsAbout` entities with their official sites, not as
 * members or parents. No aggregateRating: Google treats self-published
 * ratings of your own business as self-serving.
 */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: ["EstudiaEnMadrid", "estudiaenmadrid.com"],
        url: SITE_URL,
        logo: `${SITE_URL}/assets/eem-horizontal-black.png`,
        description: COMPANY_SUMMARY,
        slogan: "Tu carrera sigue en Madrid",
        email: CONTACT_EMAIL,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        areaServed: [{ "@type": "Country", name: "España" }, ...LATAM_COUNTRIES.map((name) => ({ "@type": "Country", name }))],
        knowsAbout: [
          ...KNOWS_ABOUT,
          ...UNIVERSITIES.map((u) => ({ "@type": "CollegeOrUniversity", name: u.displayName, url: u.officialUrl })),
        ],
        knowsLanguage: "es",
        employee: { "@type": "Person", name: ADVISOR_NAME, jobTitle: "Asesor académico" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de acompañamiento para estudiar en Madrid",
          itemListElement: SERVICES.map((name) => ({
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            description: "Asesoría gratuita para el estudiante",
            itemOffered: { "@type": "Service", name, provider: { "@id": ORGANIZATION_ID } },
          })),
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+34-677-055-769",
          email: CONTACT_EMAIL,
          areaServed: ["ES", "AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE"],
          availableLanguage: ["es"],
        },
        sameAs: [INSTAGRAM_URL, TRUSTPILOT_URL, "https://wa.me/34677055769"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
