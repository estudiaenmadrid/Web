import fs from "node:fs";
import path from "node:path";

export interface Testimonial {
  name: string;
  country: string;
  date: string;
  quote: string;
}

const FILE = path.join(process.cwd(), "content", "testimonios.md");

let cache: Testimonial[] | null = null;

export function getTestimonials(): Testimonial[] {
  if (cache) return cache;

  const raw = fs.readFileSync(FILE, "utf8");
  const section = raw.split("## Selección curada para la web")[1]?.split("\n## ")[0] ?? "";

  const lines = section.split("\n");
  const testimonials: Testimonial[] = [];
  const headerRe = /^\d+\.\s+\*\*(.+?)\*\*\s+—\s+(.+?)\s+—\s+(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const headerMatch = lines[i].match(headerRe);
    if (!headerMatch) continue;
    const [, name, country, date] = headerMatch;
    let quote = "";
    for (let j = i + 1; j < lines.length; j++) {
      const quoteMatch = lines[j].match(/^\s*>\s*"?(.*?)"?\s*$/);
      if (quoteMatch && lines[j].trim().startsWith(">")) {
        quote += (quote ? " " : "") + quoteMatch[1].replace(/"$/, "");
      } else if (lines[j].trim() === "" && quote) {
        break;
      } else if (lines[j].trim() !== "" && !lines[j].trim().startsWith(">")) {
        break;
      }
    }
    testimonials.push({ name, country, date, quote: quote.trim() });
  }

  cache = testimonials;
  return testimonials;
}
