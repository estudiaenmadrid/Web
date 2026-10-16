"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const navigatingRef = useRef(false);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Open the curtain once the new page has mounted underneath it.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!navigatingRef.current) return;
    navigatingRef.current = false;
    if (reduced() || !aRef.current || !bRef.current) return;
    import("gsap").then(({ gsap }) => {
      if (wrapRef.current) wrapRef.current.style.pointerEvents = "auto";
      gsap
        .timeline({
          onComplete: () => {
            if (wrapRef.current) wrapRef.current.style.pointerEvents = "none";
          },
        })
        .to(aRef.current, { scaleY: 0, transformOrigin: "bottom", duration: 0.5, ease: "power3.inOut" })
        .to(bRef.current, { scaleY: 0, transformOrigin: "top", duration: 0.5, ease: "power3.inOut" }, "<");
    });
  }, [pathname]);

  // Intercept internal link clicks to play the "close" half first.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (reduced()) return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("data-no-transition")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname) return;

      e.preventDefault();
      navigatingRef.current = true;
      import("gsap").then(({ gsap }) => {
        if (!aRef.current || !bRef.current || !wrapRef.current) {
          router.push(url.pathname + url.search);
          return;
        }
        wrapRef.current.style.pointerEvents = "auto";
        gsap
          .timeline({
            onComplete: () => router.push(url.pathname + url.search),
          })
          .to([aRef.current, bRef.current], { scaleY: 1, duration: 0.45, ease: "power3.inOut", stagger: 0.06 });
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[150] flex pointer-events-none">
      <div ref={aRef} className="flex-1 bg-red-signal" style={{ transform: "scaleY(0)", transformOrigin: "top" }} />
      <div ref={bRef} className="flex-1 bg-red-signal" style={{ transform: "scaleY(0)", transformOrigin: "bottom" }} />
    </div>
  );
}
