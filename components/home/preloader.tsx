"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/**
 * <Preloader> — E1 (Design Brief V2 §3): minimal "L O A D I N G /route"
 * overlay, <= 1s, FIRST VISIT PER SESSION only (sessionStorage flag).
 *
 * - Server markup renders the overlay visible, so the very first paint of a
 *   new session shows it with no flash-of-content. The tiny inline script
 *   hides it during HTML parse when the session flag is already set, so
 *   repeat in-session navigations never see it (even before hydration).
 * - No-JS: the <noscript> style removes it entirely — content is never
 *   blocked without JS.
 * - Reduced motion: dismissed immediately on mount (no hold, and the global
 *   reduced-motion CSS collapses the fade anyway).
 * - pointer-events-none + aria-hidden: purely visual; it never traps focus
 *   or blocks clicks/keyboard.
 */

const SESSION_KEY = "pf-preloader-shown";
const HOLD_MS = 650; // visible hold; fade adds ~200ms -> well under 1s
const FADE_MS = 200;

export function Preloader({ route = "/" }: { route?: string }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // storage unavailable (privacy mode): treat as shown, skip overlay
      shown = true;
    }
    if (shown) {
      // Already hidden pre-hydration by the inline script; unmount on the
      // next tick (setState in a timer callback, not the effect body).
      const t = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(t);
    }
    const reduced = prefersReducedMotion();
    const hold = reduced ? 0 : HOLD_MS;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const holdTimer = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      el.style.opacity = "0";
      fadeTimer = setTimeout(() => setGone(true), reduced ? 0 : FADE_MS);
    }, hold);
    return () => {
      clearTimeout(holdTimer);
      if (fadeTimer !== undefined) clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      id="pf-preloader"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background transition-opacity duration-200 motion-reduce:transition-none"
    >
      {/* Hide pre-hydration on repeat in-session visits (runs during parse). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${SESSION_KEY}")==="1"){document.getElementById("pf-preloader").style.display="none"}}catch(e){}`,
        }}
      />
      <noscript>
        <style>{`#pf-preloader{display:none}`}</style>
      </noscript>
      <p className="font-mono text-xs uppercase tracking-[0.5em] text-foreground">
        Loading
      </p>
      <p className="font-mono text-[11px] tracking-[0.18em] text-foreground-secondary">
        {route}
      </p>
    </div>
  );
}
