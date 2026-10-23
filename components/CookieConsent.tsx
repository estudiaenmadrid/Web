"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const GA_MEASUREMENT_ID = "G-V6X4XTWVTB";
export const CONSENT_KEY = "eem-cookie-consent";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Loads Google Analytics only after the visitor accepts — nothing is requested from Google before that (RGPD / LSSI-CE). */
function loadAnalytics() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
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
    if (consent === "granted") loadAnalytics();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only, read once after mount.
    else if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("eem-open-cookies", reopen);
    return () => window.removeEventListener("eem-open-cookies", reopen);
  }, []);

  const choose = (consent: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {}
    setOpen(false);
    if (consent === "granted") loadAnalytics();
    // Withdrawing consent after GA loaded: the next page load won't load it again.
    else if (window.gtag) window.location.reload();
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
