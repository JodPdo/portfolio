"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "./gsap";

/**
 * <Reveal> — E8 scroll/entry reveal (Design Brief V2 §3, ADR-0003).
 *
 * GSAP + ScrollTrigger fade/slide-up, fired once when the element enters
 * the viewport. Duration defaults to 250 ms (CLAUDE.md: 150–250 ms).
 *
 * - SSR/no-JS: the server markup is fully VISIBLE (we never ship
 *   `opacity: 0` in HTML). The hidden-from state is applied client-side by
 *   the tween itself, so content can never be lost if JS fails — and there
 *   is no hydration mismatch and no CLS (only transform/opacity animate).
 * - Reduced motion (brief §5): E8 shows instantly — the whole tween is
 *   gated behind gsap.matchMedia("(prefers-reduced-motion: no-preference)"),
 *   which also auto-reverts if the OS setting flips mid-session.
 * - `stagger`: when set (seconds), the DIRECT CHILDREN of the wrapper are
 *   animated as a staggered batch instead of the wrapper itself.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Slide-up distance in px. Transform-only — never affects layout. */
  y?: number;
  /** 150–250 ms per CLAUDE.md. */
  durationMs?: number;
  delayMs?: number;
  /** Seconds between direct children; enables batch/stagger mode. */
  stagger?: number;
};

export function Reveal({
  children,
  className,
  y = 24,
  durationMs = 250,
  delayMs = 0,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets =
        stagger !== undefined && el.children.length > 0
          ? Array.from(el.children)
          : el;
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: durationMs / 1000,
          delay: delayMs / 1000,
          ease: "power2.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
      // Tweens/ScrollTriggers created inside mm.add are auto-reverted.
    });
    return () => mm.revert();
  }, [delayMs, durationMs, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
