"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared reduced-motion plumbing (Design Brief V2 §5, ADR-0003).
 *
 * `usePrefersReducedMotion()` — reactive `prefers-reduced-motion: reduce`
 * check for motion islands in `components/motion/`.
 *
 * SSR-safe: the server snapshot is `false` (motion-safe). That is fine
 * because every primitive here renders its FINAL / static state in the
 * server markup and only *starts* an animation from a client effect —
 * so a reduced-motion visitor never sees motion regardless of the
 * first-paint snapshot, and there is no hydration mismatch.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
