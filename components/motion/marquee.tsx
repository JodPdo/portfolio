import type { ReactNode } from "react";

/**
 * <Marquee> — E3 marquee strip (Design Brief V2 §3, ADR-0003).
 *
 * Pure CSS keyframes — no GSAP, no JS, no "use client": this is a server
 * component. The track holds two copies of the content and translates
 * -50%, which loops seamlessly as long as the content is at least as wide
 * as the container (repeat items enough times when composing).
 *
 * - Keyframes + reduced-motion rule live in app/globals.css
 *   (`.motion-marquee-track`): `animation-play-state: paused` under
 *   `prefers-reduced-motion: reduce` (brief §5 — E3 pauses).
 * - No layout shift (brief §5): give the strip a FIXED HEIGHT via
 *   `className` at the call site.
 * - A11y: the duplicate copy is aria-hidden, so content is announced once.
 */

type MarqueeProps = {
  /** One sequence of items; the component duplicates it for the loop. */
  children: ReactNode;
  /** Seconds per full loop (half the track). Bigger = slower. */
  durationS?: number;
  /** Scroll right-to-left by default; `reverse` flips it. */
  reverse?: boolean;
  /** Outer strip — set the fixed height, borders, background here. */
  className?: string;
};

export function Marquee({
  children,
  durationS = 30,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className="motion-marquee-track flex w-max items-center"
        style={{
          animationDuration: `${durationS}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
