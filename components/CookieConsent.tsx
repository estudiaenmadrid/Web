"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_KEY } from "@/lib/analytics";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** The Google tag itself is in app/layout.tsx with analytics storage denied by default; this only flips consent. */
function setAnalyticsConsent(consent: Consent) {
  window.gtag?.("consent", "update", { analytics_storage: consent });
}

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Cookie banner. Also reopenable from the privacy page via the `eem-open-cookies` event. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only, read once after mount.
    if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("eem-open-cookies", reopen);
    return () => window.removeEventListener("eem-open-cookies", reopen);
  }, []);

  const choose = (consent: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {}
    setOpen(false);
    setAnalyticsConsent(consent);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed z-[120] bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-[420px] bg-ink text-off-white p-5 shadow-2xl"
    >
      <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">COOKIES</div>
      <p className="m-0 mt-2.5 text-[14px] leading-[1.55]" style={{ color: "rgba(248,244,235,.85)" }}>
        Usamos Google Analytics para saber cuántas personas visitan la web y qué páginas les sirven. Solo se activa si
        aceptás.{" "}
        <Link href="/privacidad#seccion-04" className="underline text-off-white">
          Más información
        </Link>
      </p>
      <div className="flex gap-2.5 mt-4">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 bg-red-signal text-white px-4 py-3 font-display font-extrabold text-[12px] uppercase tracking-[.04em] hover:bg-red-dark"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 border border-white/30 px-4 py-3 font-display font-extrabold text-[12px] uppercase tracking-[.04em] hover:bg-white/10"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
