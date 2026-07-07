"use client";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/**
 * Scratch-route QA aid (PF-V2-03) — exercises the REACTIVE half of the
 * reduced-motion plumbing (`usePrefersReducedMotion()`; the imperative
 * `prefersReducedMotion()` is exercised by <Scramble> above it).
 *
 * The badge updates LIVE when the setting flips (DevTools emulation or OS
 * toggle — no reload needed), so QA gets in-page proof that their
 * emulation actually took effect before judging the effects. This is the
 * same hook PF-V2-04 will use to swap the pixi hero / parallax for the
 * static image (E4/E5). Deleted together with the scratch route.
 */

export function ReducedMotionIndicator() {
  const reduced = usePrefersReducedMotion();
  return (
    <p className="mt-6 inline-flex items-center gap-3 border border-border-strong bg-background-subtle px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${reduced ? "bg-primary" : "bg-border-strong"}`}
      />
      usePrefersReducedMotion():{" "}
      <span className="text-primary">
        {reduced ? "reduce" : "no-preference"}
      </span>
      <span className="normal-case tracking-normal text-foreground-secondary">
        — updates live, no reload
      </span>
    </p>
  );
}
