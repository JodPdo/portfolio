"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared reduced-motion plumbing (Design Brief V2 §5, ADR-0003) — the ONE
 * place that owns the `prefers-reduced-motion` media query. Three code
 * paths, one source of truth:
 *
 * 1. `prefersReducedMotion()` — imperative LIVE read, for checks at
 *    animation-start time (<Scramble> on mount/hover). Always current,
 *    even if the OS setting flipped mid-session, and immune to the
 *    hydration race where a hook value can lag the first client effects
 *    by one render pass.
 * 2. `usePrefersReducedMotion()` — reactive hook for components that must
 *    RE-RENDER when the setting changes (PF-V2-04: E4/E5 swap the pixi
 *    canvas / parallax for the static duotone image live). SSR-safe: the
 *    server snapshot is `false` (motion-safe), which is fine because every
 *    primitive renders its FINAL/static state in server markup and only
 *    starts animating from client effects — no hydration mismatch, and a
 *    reduced-motion visitor never sees motion.
 * 3. GSAP components (<Reveal>, <PinnedHorizontal>) intentionally use
 *    NEITHER: they gate via gsap.matchMedia on the same query, which also
 *    auto-reverts their tweens/ScrollTriggers when the setting changes.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

/** Live check — call at animation-start time. Client only. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return prefersReducedMotion();
}

function getServerSnapshot(): boolean {
  return false;
}

/** Reactive check — re-renders the consumer when the OS setting changes. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
