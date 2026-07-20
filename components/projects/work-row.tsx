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
 * THREE PREVIEW STATES (architect ruling 2026-07-20; media dropped into
 * public/media/ same day). The two optional fields on WorkRowProject encode
 * all three with no discriminated union:
 *
 *   (a) Typographic poster only — neither `previewSrc` nor `previewPoster`.
 *       The resting-state panel is a designed, token-based duotone/
 *       typographic <WorkPoster/> (NOT a screenshot). Nothing else renders;
 *       nothing 404s. This is the intended degrade (e.g. JPD API).
 *   (b) Image-only preview — `previewPoster` set, `previewSrc` NOT set.
 *       A plain <img> (a webp still) fades IN OVER the typographic poster on
 *       hover/keyboard-focus via PURE CSS (group-hover / group-focus-within
 *       opacity, no JS). A static image carries none of the autoplay / motion
 *       / coarse-pointer concerns the videoActive machinery exists to solve,
 *       so it deliberately skips that JS path entirely (e.g. Tiger Kick — the
 *       game is unfinished, so a still stands in for a clip).
 *   (c) Video preview — `previewSrc` set (+ optional `previewPoster`). The
 *       <video> renders and, on first hover/focus, is loaded and played by
 *       the JS below (reduced-motion + coarse-pointer bail); the poster image
 *       is shown via the video's own `poster` attribute (e.g. AiKlao, Typing
 *       Race).
 *
 * Mechanism (DoD "hover/touch/keyboard all correct"):
 * - Resting: typographic poster panel is always shown (no layout shift on
 *   reveal — the image or video, when present, fades IN OVER the poster).
 * - Hover / keyboard focus: identical active treatment (teal title + mat
 *   border) via CSS group-hover + group-focus-within (works with JS off).
 *   State (b): the <img> opacity is driven by the SAME CSS group-hover /
 *   group-focus-within — no JS. State (c): if a `previewSrc` exists AND
 *   pointer is fine AND motion is allowed, the <video> is loaded on first
 *   activation and played; onFocus/onBlur mirror onMouseEnter/onMouseLeave so
 *   keyboard focus triggers the SAME reveal — never a mouse-only :hover gate.
 * - Touch: the row is a plain <Link>; a tap navigates straight to the case
 *   study. For (c) `activate()` bails on `(hover: none)` pointers, so there
 *   is no video load and no intermediate "preview" tap-state. For (b) the CSS
 *   reveal behaves exactly like the existing title-color / border hover
 *   treatments on touch (no hover state fires; a brief :focus on tap is fine)
 *   — consistent, not special-cased.
 * - Reduced motion: (c) `activate()` bails on `prefers-reduced-motion` (no
 *   video autoplay). (b) the <img> reveal is opacity only, not "motion" in
 *   the prefers-reduced-motion sense (no autoplay / parallax); the fade is
 *   still guarded with motion-reduce:transition-none so it swaps instantly
 *   rather than animating. Title/border color transitions are collapsed by
 *   globals.css + motion-reduce classes.
 * - No keyboard trap: the <video> and <img> have no controls and no tabindex
 *   (aria-hidden), so Tab moves through the row link normally.
 */

export interface WorkRowProject {
  slug: string;
  title: string;
  /** One-line descriptor (frontmatter `tagline`). */
  tagline?: string;
  summary: string;
  stack: string[];
  /**
   * Optional muted-looping webm preview (<=300KB per brief §3). When set, the
   * <video> renders and loads on first hover/focus (state (c)). When unset,
   * no <video> renders and `previewPoster` (if present) drives the image-only
   * preview instead (state (b)), or the typographic poster stands alone (a).
   */
  previewSrc?: string;
  /**
   * Optional real still image (webp). Its meaning depends on `previewSrc`:
   * with a `previewSrc` it is the <video>'s `poster` (shown before the clip
   * is ready / paused); WITHOUT a `previewSrc` it is the image-only preview
   * (state (b)) — a plain <img> that fades in over the typographic poster on
   * hover/focus. When both are absent the typographic panel is the only
   * poster (state (a)).
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
      {/* Caption block sits ABOVE the ordinal (z-10) with its own opaque
          bg-surface-mat bled to the panel's left/right/bottom edges (-mx-5
          -mb-5 + px-5/pb-5). This masks the numeral wherever the caption
          physically reaches it, so a long title that wraps to 3 lines (JPD —
          the longest) can no longer collide with the numeral's glyphs. Short
          titles (AiKlao/Typing Race/Tiger Kick) never reach up into the
          numeral, so the mask is inert and those posters are unchanged — the
          numeral stays fully visible for the duotone-depth look. The masked
          numeral still composites over the same opaque mat wherever it shows,
          so the WCAG 3:1 fix (PF-V2-08) is unaffected. See PF-V2-08 qa_gate. */}
      <div className="relative z-10 -mx-5 -mb-5 bg-surface-mat px-5 pb-5 pt-3">
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
            reveal-time layout shift). The typographic poster is always shown;
            the image (state b) or video (state c) — when supplied — fades in
            over it on hover/focus. */}
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
          ) : project.previewPoster ? (
            // Image-only preview (state b): pure-CSS reveal on hover/focus —
            // no JS, no autoplay. Plain <img> (architect ruling 2026-07-20):
            // no next/image gain for a fixed-size, decorative, already-webp
            // still; aria-hidden + no tabIndex (never a tab stop).
            // motion-reduce:transition-none => instant swap
            // under reduced motion instead of an animated fade.
            // eslint-disable-next-line @next/next/no-img-element -- plain <img> is the architect-approved choice (2026-07-20): nil benefit from next/image for one fixed-size, aria-hidden, already-webp decorative asset that loads into a CLS-safe aspect box.
            <img
              src={project.previewPoster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
}
