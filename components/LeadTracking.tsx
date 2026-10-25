"use client";

import { useEffect } from "react";

/**
 * Sends a GA4 `generate_lead` event whenever someone clicks a WhatsApp or
 * email link, anywhere on the site. One delegated listener instead of an
 * onClick on each of the ~20 contact links. Mark `generate_lead` as a key
 * event in GA to count it as a conversion. Consent is still respected: the
 * Google tag in app/layout.tsx decides what it may store.
 */
export default function LeadTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const method = href.includes("wa.me/") ? "whatsapp" : href.startsWith("mailto:") ? "email" : null;
      if (!method) return;
      window.gtag?.("event", "generate_lead", {
        method,
        page_path: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 80),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
