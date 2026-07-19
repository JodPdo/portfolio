"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "./gsap";

/**
 * <PinnedHorizontal> — E7 pinned horizontal scroll section
 * (Design Brief V2 §3, ADR-0003). GSAP ScrollTrigger pin + scrub.
 *
 * Each DIRECT CHILD becomes one full-width panel. On desktop
 * (min-width: 768px) with motion allowed, the section pins to the viewport
 * and vertical scroll is scrubbed into horizontal travel across the panels.
 *
 * Degrade (brief §5 — E7 becomes a vertical stack):
 * - Mobile (< 768px): plain vertical stack — pure CSS, no GSAP runs.
 * - Reduced motion: same vertical stack at EVERY width. Both the layout
 *   classes (`motion-safe:md:*`) and the GSAP context
 *   (gsap.matchMedia on the same compound query) share the one gate, so
 *   layout and behavior can never disagree; flipping the OS setting
 *   mid-session reverts cleanly.
 *
 * Keyboard/a11y: the effect is driven by normal page scroll (native
 * scrolling stays — no scroll hijack), so Space/PageDown/arrow keys travel
 * through the panels exactly like any other section. Panels are 100vw with
 * horizontal overflow hidden on the section; only transform animates.
 * (Trade-off, documented: on a motion-safe desktop with JS failed,
 * panels 2+ are clipped — server markup still exists for SEO/reader mode.)
 *
 * CLS (brief §5 budget, QA finding 2026-07-12): ScrollTrigger's default
 * `pinType: "fixed"` swaps the section to `position: fixed` at pin
 * engagement; Chrome's Layout Instability API scores that swap as the
 * element disappearing + reappearing (previousRect [0,0,0,0] → full rect),
 * ~0.70 per engage/disengage even though nothing visually moves. We pin
 * with `pinType: "transform"` instead: the section stays in normal flow
 * and is held in place by a per-frame counter-translate — transform-only
 * movement is excluded from layout-shift scoring by spec, so phased CLS
 * across the whole pin lifecycle measures 0. (`anticipatePin` is a
 * fixed-pin lag workaround and must NOT be combined with transform pinning
 * — it would pre-skew the counter-translate and cause a real visual jump.)
 */

const E7_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * How much vertical scroll the pin consumes, as a fraction of the horizontal
 * travel distance. `1` = the classic 1:1 scroll-to-travel ratio (the pin holds
 * for the full horizontal distance in px); `0.3` releases the pin after ~30% of
 * that scroll while the `x` tween still travels the FULL `-distance()`, i.e. the
 * same panels/total horizontal travel compressed into a much shorter scroll span
 * (~70% less vertical scroll held). Tuning knob — adjust here, not inline.
 */
const PIN_SCROLL_RATIO = 0.3;

/**
 * ScrollTrigger `scrub` catch-up, in seconds. A small numeric lag (vs `true`,
 * which maps 1:1 to scroll position with zero smoothing) adds a touch of inertia
 * so the compressed travel — more transform per scroll input under
 * PIN_SCROLL_RATIO — reads as continuous on a fast wheel/trackpad flick instead
 * of teleporting between panels. Kept small to avoid a floaty/laggy feel.
 */
const PIN_SCRUB_SECONDS = 0.3;

type PinnedHorizontalProps = {
  /** Each direct child = one panel/step. */
  children: ReactNode;
  className?: string;
  /** Applied to every panel wrapper (padding, min-height, borders...). */
  panelClassName?: string;
};

export function PinnedHorizontal({
  children,
  className,
  panelClassName,
}: PinnedHorizontalProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(E7_QUERY, () => {
      const distance = () =>
        Math.max(track.scrollWidth - section.clientWidth, 0);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() * PIN_SCROLL_RATIO}`,
          pin: true,
          pinType: "transform",
          scrub: PIN_SCRUB_SECONDS,
          invalidateOnRefresh: true,
        },
      });
      // Auto-reverted by gsap.matchMedia when the query stops matching.
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`motion-safe:md:overflow-x-hidden ${className ?? ""}`}
    >
      <div ref={trackRef} className="flex flex-col motion-safe:md:flex-row">
        {Children.map(children, (child) => (
          <div
            className={`motion-safe:md:w-screen motion-safe:md:shrink-0 ${panelClassName ?? ""}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
