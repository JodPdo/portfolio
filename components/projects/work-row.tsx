"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { prefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/**
 * WorkRow — E6 "Work rows + hover video preview" (Design Brief V2 §3, card
 * PF-V2-05). Replaces the /projects card grid with full-bleed typographic
 * rows separated by hairlines (brief §2: "Work list = typographic rows,
 * not cards").
 *
 * PRODUCT-OWNER DECISION 2026-07-13 (SHIP POSTER-ONLY): the repo has no
 * project screenshots and no webm clips yet, so the resting-state "poster"
 * is a designed, token-based duotone/typographic panel (<WorkPoster/>) —
 * NOT a screenshot. The full E6 hover/touch/keyboard mechanism is wired so
 * a real muted-looping webm just drops in later: pass `previewSrc` (and an
 * optional `previewPoster` image) and the <video> renders + loads on first
 * hover automatically. With no `previewSrc` (current state, all 4 projects)
 * the <video> is never rendered — nothing 404s — and hover/focus simply
 * shows the typographic poster (the intended degrade).
 *
 * Mechanism (DoD "hover/touch/keyboard all correct"):
 * - Resting: typographic poster panel is always shown (no layout shift on
 *   reveal — the video, when present, fades IN OVER the poster).
 * - Hover / keyboard focus: identical active treatment (teal title + mat
 *   border) via CSS group-hover + group-focus-within (works with JS off);
 *   if a `previewSrc` exists AND pointer is fine AND motion is allowed, the
 *   <video> is loaded on first activation and played. onFocus/onBlur mirror
 *   onMouseEnter/onMouseLeave so keyboard focus triggers the SAME reveal —
 *   never a mouse-only :hover gate.
 * - Touch: the row is a plain <Link>; a tap navigates straight to the case
 *   study. `activate()` bails on `(hover: none)` pointers, so there is no
 *   video load and no intermediate "preview" tap-state to block navigation.
 * - Reduced motion: `activate()` bails on `prefers-reduced-motion` (no
 *   video autoplay); the poster reveal itself carries no motion, and the
 *   color transitions are collapsed by globals.css + motion-reduce classes.
 * - No keyboard trap: the <video> has no controls and no tabindex, so Tab
 *   moves through the row link normally.
 */

export interface WorkRowProject {
  slug: string;
  title: string;
  /** One-line descriptor (frontmatter `tagline`). */
  tagline?: string;
  summary: string;
  stack: string[];
  /**
   * Optional muted-looping webm preview (<=300KB per brief §3). Undefined =>
   * poster-only (current state for all 4 projects). When a future card
   * supplies this, the <video> renders and loads on first hover/focus.
   */
  previewSrc?: string;
  /**
   * Optional real poster image for the <video> (shown before the clip is
   * ready / for the paused state). When absent the typographic panel is the
   * only poster — the <video> still fades in over it once playing.
   */
  previewPoster?: string;
}

function WorkPoster({
  ordinal,
  title,
  tagline,
}: {
  ordinal: string;
  title: string;
  tagline?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-surface-mat p-5">
      {/* Oversized ordinal — duotone depth, purely decorative (aria-hidden).
          Opacity is 0.38 (not lower) so the composited numeral color over the
          opaque #0f1f1c mat clears WCAG 1.4.3 large-text 3:1 (measured 3.34:1);
          axe/Lighthouse treat this <span> as text regardless of its decorative
          intent, so it must pass contrast. See PF-V2-08. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-8 font-display text-[8rem] font-medium leading-none text-foreground/[0.38] sm:text-[10rem]"
      >
        {ordinal}
      </span>
      {/* Teal corner accent (brief §2 accent teal). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary/70"
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-secondary">
        Fig. {ordinal} — Preview
      </span>
      <div className="relative">
        <p className="font-display text-2xl font-medium uppercase leading-none tracking-tight text-primary sm:text-3xl">
          {title}
        </p>
        {tagline ? (
          <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-foreground-secondary">
            {tagline}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function WorkRow({
  project,
  index,
}: {
  project: WorkRowProject;
  index: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoActive, setVideoActive] = useState(false);

  const activate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !project.previewSrc) return;
    // Reduced motion: never autoplay a hover video.
    if (prefersReducedMotion()) return;
    // Touch / coarse pointers: no hover preview — the tap navigates instead.
    if (window.matchMedia("(hover: none)").matches) return;

    // Load on FIRST activation only (preload="none" + no initial src).
    if (!video.src) {
      video.src = project.previewSrc;
      video.load();
    }
    setVideoActive(true);
    const played = video.play();
    if (played) played.catch(() => {});
  }, [project.previewSrc]);

  const deactivate = useCallback(() => {
    const video = videoRef.current;
    if (video) video.pause();
    setVideoActive(false);
  }, []);

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      className="group block px-4 py-10 transition-colors duration-200 hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:px-8"
    >
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
          <span
            aria-hidden="true"
            className="hidden pt-2 font-mono text-xs tracking-[0.18em] text-foreground-secondary sm:block"
          >
            {ordinal}
          </span>
          <div>
            <h2 className="font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary motion-reduce:transition-none sm:text-5xl">
              {project.title}
            </h2>
            {project.tagline ? (
              <p className="mt-4 max-w-prose text-sm font-medium leading-relaxed text-primary">
                {project.tagline}
              </p>
            ) : null}
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground-secondary">
              {project.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preview panel: fixed aspect box, always occupies its space (no
            reveal-time layout shift). Poster is always shown; the video —
            when a src is later supplied — fades in over it on hover/focus. */}
        <div className="relative aspect-[16/10] overflow-hidden border border-border-strong transition-colors duration-200 group-hover:border-primary group-focus-within:border-primary motion-reduce:transition-none">
          <WorkPoster
            ordinal={ordinal}
            title={project.title}
            tagline={project.tagline}
          />
          {project.previewSrc ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={project.previewPoster}
              aria-hidden="true"
              tabIndex={-1}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 motion-reduce:transition-none ${
                videoActive ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
}
