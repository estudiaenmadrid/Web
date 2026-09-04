"use client";

import { useCallback, useRef } from "react";

/**
 * Recreates the brand's signature nav hover effect: a trail of small red
 * squares snapped to a grid, following the cursor and fading out.
 * Attach the returned handlers to any `position:relative; overflow:hidden`
 * element.
 */
export function usePixelTrail() {
  const reducedRef = useRef<boolean | null>(null);

  const reduced = () => {
    if (reducedRef.current === null) {
      reducedRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return reducedRef.current;
  };

  const lastRef = useRef(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduced()) return;
    const now = Date.now();
    if (now - lastRef.current < 34) return;
    lastRef.current = now;

    const host = e.currentTarget;
    const rect = host.getBoundingClientRect();
    const g = 9;
    const x = Math.floor((e.clientX - rect.left) / g) * g;
    const y = Math.floor((e.clientY - rect.top) / g) * g;

    for (let i = 0; i < 3; i++) {
      const d = document.createElement("div");
      d.className = "eem-px";
      d.style.left = x + (Math.floor(Math.random() * 5) - 2) * g + "px";
      d.style.top = y + (Math.floor(Math.random() * 5) - 2) * g + "px";
      d.style.opacity = String(0.25 + Math.random() * 0.6);
      host.appendChild(d);
      requestAnimationFrame(() => {
        d.style.opacity = "0";
      });
      setTimeout(() => d.remove(), 520);
    }
  }, []);

  return { onMouseMove };
}
