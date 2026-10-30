/**
 * FAQPage schema from the same Q&A pairs the page shows. Google now only
 * shows FAQ rich results for a few site types, but AI assistants and answer
 * engines still read this markup to pull clean question/answer pairs.
 */
export default function FaqSchema({ items }: { items: { question: string; answer: string }[] }) {
  if (items.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Plain text from the inline HTML parseFaqPairs produces. */
export function faqHtmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
