"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * useInViewAutoplay — Option B in-view autoplay (architect ruling 2026-07-22,
 * DESIGN_SYSTEM.md decision log; the hook is layout-agnostic, so the 2026-07-21
 * "Option A" → "Option B" presentation change needed NO code change here — only
 * this wording). Drives the side framed-thumbnail project preview media on BOTH
 * `/projects` and the home `01 — Featured projects` section.
 *
 * Behavior (see the ruling for the full rationale):
 * - Observe the ROW <Link> (`rowRef`), not the video, with a central-band
 *   gate (`threshold: 0.5, rootMargin: "-10% 0px -10% 0px"`). Only the row(s)
 *   near viewport centre count as "in view", so ~1 (2 at most) autoplay at a
 *   time — an inherent throttle, NOT all rows at load.
 * - Video play/pause is driven ONLY by in-view + reduced-motion (never by
 *   hover/pointer type). No `(hover: none)` coarse-pointer bail — mobile MUST
 *   autoplay in view (muted + playsInline + loop allow it). This is the PO's
 *   hard requirement.
 * - Reduced motion (mandatory a11y): `usePrefersReducedMotion()` is reactive,
 *   so a mid-session OS flip re-renders. When reduced, `active` is forced
 *   false and the video NEVER plays (its `poster` shows instead).
 * - `active` (returned) = inView && !reducedMotion. In Option B it drives (a)
 *   video play/pause, (b) the thumbnail BOX slide-in via a `data-active` attr
 *   on the row, and (c) the border/title color lift — all off the SAME signal.
 *   Hover/focus contribute to the visual state via CSS (`group-hover`/
 *   `group-focus-within`) in the component — they do NOT start/stop playback.
 * - SSR-safe: IntersectionObserver + the reactive media query are only touched
 *   in effects; the server render is `active = false` (box at its rest state,
 *   full descriptive text always shown regardless).
 * - Lazy src: the <video> ships `preload="none"` with no initial `src`; the
 *   src is set + loaded on first activation only.
 */

/**
 * "Only one plays at a time" coordinator — SHIPPED BUT INERT by default
 * (architect ruling §4). With `SINGLE_VIDEO_MODE = false` every in-view video
 * plays (the central-band observer already throttles to ~1–2). If post-launch
 * Lighthouse on `/` or `/projects` drops mobile Perf < 90 (or LCP/CLS out of
 * budget), flip this to `true` in one line so only the newest in-view video
 * plays (nearest-centre ≈ last to enter the band). Report the numbers to the
 * PO before shipping the fallback, per the instruction.
 */
const SINGLE_VIDEO_MODE = false;
let currentlyPlaying: HTMLVideoElement | null = null;

function claimPlayback(video: HTMLVideoElement): void {
  if (SINGLE_VIDEO_MODE && currentlyPlaying && currentlyPlaying !== video) {
    currentlyPlaying.pause();
  }
  currentlyPlaying = video;
}

function releasePlayback(video: HTMLVideoElement): void {
  if (currentlyPlaying === video) currentlyPlaying = null;
}

export function useInViewAutoplay({ src }: { src?: string }): {
  rowRef: RefObject<HTMLAnchorElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  active: boolean;
} {
  const rowRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  // Observe the row's central-band intersection. Runs once; independent of
  // reduced motion so the visual state is always tracked.
  useEffect(() => {
    const el = rowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = inView && !reducedMotion;

  // Play/pause driven ONLY by `active` (inView + !reducedMotion) + src.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (active) {
      if (!video.src) {
        video.src = src; // lazy-load on first activation only
        video.load();
      }
      claimPlayback(video);
      const played = video.play();
      if (played) played.catch(() => {});
    } else {
      video.pause();
      releasePlayback(video);
    }
  }, [active, src]);

  // Release the coordinator slot on unmount.
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) releasePlayback(video);
    };
  }, []);

  return { rowRef, videoRef, active };
}
