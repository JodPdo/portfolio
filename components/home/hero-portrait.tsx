"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import heroPortrait from "@/public/images/jod-hero-duotone.webp";

/**
 * <HeroPortrait> — the E4 gate (Design Brief V2 §3/§5, ADR-0003).
 *
 * The static duotone next/image IS the component: it's what the server
 * renders, what no-JS / mobile / touch / reduced-motion users keep, and
 * the LCP candidate (priority + blur placeholder, fixed aspect -> no CLS).
 *
 * The pixi displacement canvas is a pure enhancement layered on top, and
 * only ever loads when ALL of these hold (checked live, not just at mount):
 *   1. desktop viewport + fine pointer + hover (media query below),
 *   2. `prefers-reduced-motion: no-preference` (reactive — flipping the OS
 *      setting mid-session unmounts the canvas),
 *   3. the browser is idle (requestIdleCallback, setTimeout fallback).
 * `next/dynamic(..., { ssr: false })` keeps pixi.js in its own lazy chunk,
 * excluded from the initial-JS budget (brief §5).
 */
const PixiDisplacement = dynamic(() => import("./pixi-displacement"), {
  ssr: false,
});

const DESKTOP_FINE_POINTER =
  "(min-width: 1024px) and (pointer: fine) and (hover: hover)";

const PHOTO_SRC = "/images/jod-hero-duotone.webp";
const MAP_SRC = "/images/displacement-map.png";

// Live desktop/fine-pointer tracking (resize or input change re-renders;
// SSR snapshot is false, so the server always renders the static fallback).
function subscribeDesktop(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(DESKTOP_FINE_POINTER);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function useDesktopFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_FINE_POINTER).matches,
    () => false,
  );
}

export function HeroPortrait() {
  const reducedMotion = usePrefersReducedMotion();
  const desktop = useDesktopFinePointer();
  const [idle, setIdle] = useState(false);

  // Only arm the pixi chunk after idle, and only when it could ever mount.
  useEffect(() => {
    if (!desktop || reducedMotion || idle) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setIdle(true), {
        timeout: 3000,
      });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setIdle(true), 1500);
    return () => window.clearTimeout(id);
  }, [desktop, reducedMotion, idle]);

  const pixiActive = desktop && idle && !reducedMotion;

  return (
    <div className="relative aspect-square w-full">
      <Image
        src={heroPortrait}
        alt="Aekkarat Fontong — portrait"
        priority
        placeholder="blur"
        sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 100vw"
        className="h-full w-full object-cover"
      />
      {pixiActive ? (
        <PixiDisplacement
          src={PHOTO_SRC}
          mapSrc={MAP_SRC}
          className="absolute inset-0"
        />
      ) : null}
    </div>
  );
}
