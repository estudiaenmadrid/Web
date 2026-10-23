"use client";

/** Reopens the cookie banner (components/CookieConsent.tsx) so a visitor can change or withdraw consent. */
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("eem-open-cookies"))}
      className="bg-red-signal text-white px-4 py-3 font-display font-extrabold text-[12px] uppercase tracking-[.04em] hover:bg-red-dark"
    >
      Cambiar mis preferencias de cookies
    </button>
  );
}
