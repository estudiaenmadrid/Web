import { SITE_URL } from "@/lib/seo";
import { ORGANIZATION_ID } from "@/components/schema/OrganizationSchema";

interface ArticleSchemaProps {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
}

/**
 * Article schema for the guides: dates and publisher are the freshness and
 * authorship signals both Google and AI answer engines weigh when choosing
 * which source to cite.
 */
export default function ArticleSchema({ title, description, path, datePublished, dateModified, section }: ArticleSchemaProps) {
  const url = `${SITE_URL}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "es",
    ...(section ? { articleSection: section } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ?? datePublished ? { dateModified: dateModified ?? datePublished } : {}),
    image: `${url}/opengraph-image`,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
