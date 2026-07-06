"use client";

import { useCallback, useEffect, useRef, type ElementType } from "react";

/**
 * <Scramble> — E2 letter-scramble (Design Brief V2 §3, ADR-0003).
 *
 * Progressive left-to-right reveal: unrevealed positions cycle through
 * random charset characters on rAF until the real character locks in.
 * Frames are written directly to the (aria-hidden) visual span's
 * textContent — no per-frame React re-render, no setState in effects.
 *
 * - SSR/no-JS: the server markup already contains the final text in all
 *   three spans, so nothing breaks without JS and there is no hydration
 *   mismatch (mutation happens only after mount).
 * - Reduced motion (brief §5): final text renders immediately; mount and
 *   hover scrambles are both no-ops. Checked live via matchMedia at start
 *   time, so flipping the OS setting mid-session is respected.
 * - No layout shift: an invisible copy of the final text reserves the exact
 *   box; the scrambling copy is absolutely positioned on top of it.
 * - A11y: screen readers only ever see the final text (sr-only copy); the
 *   animated copies are aria-hidden.
 *
 * Duration note: micro-transitions elsewhere stay 150–250 ms (CLAUDE.md);
 * the scramble is a ratified *signature entrance effect* (brief E2) and
 * defaults to 500 ms — tune per usage via `durationMs`.
 */

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ScrambleProps = {
  text: string;
  /** Rendered element. Default: span. */
  as?: ElementType;
  className?: string;
  /** When the scramble runs. Brief E2 = load + hover, so default "both". */
  trigger?: "mount" | "hover" | "both";
  durationMs?: number;
  charset?: string;
  /** Make a hover-triggered scramble keyboard-reachable (focus re-runs it). */
  tabIndex?: number;
};

export function Scramble({
  text,
  as: Tag = "span",
  className,
  trigger = "both",
  durationMs = 500,
  charset = DEFAULT_CHARSET,
  tabIndex,
}: ScrambleProps) {
  const visualRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const start = useCallback(() => {
    const visual = visualRef.current;
    if (!visual) return;
    stop();
    // E2 reduced-motion rule (brief §5): show the final text immediately.
    if (prefersReducedMotion()) {
      visual.textContent = text;
      return;
    }
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const revealed = Math.floor(text.length * progress);
      if (progress < 1) {
        let out = "";
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          out +=
            i < revealed || ch === " "
              ? ch
              : charset[Math.floor(Math.random() * charset.length)];
        }
        visual.textContent = out;
        rafRef.current = requestAnimationFrame(tick);
      } else {
        visual.textContent = text;
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [charset, durationMs, stop, text]);

  useEffect(() => {
    if (trigger === "mount" || trigger === "both") start();
    return stop;
  }, [start, stop, trigger]);

  const hoverProps =
    trigger === "hover" || trigger === "both"
      ? { onMouseEnter: start, onFocus: start }
      : {};

  return (
    <Tag
      className={`relative inline-block ${className ?? ""}`}
      tabIndex={tabIndex}
      {...hoverProps}
    >
      {/* Screen readers: final text only. */}
      <span className="sr-only">{text}</span>
      {/* Layout reserve: exact final box, so scrambling never shifts layout. */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      {/* Visual layer — mutated via ref after mount, never during render. */}
      <span aria-hidden="true" ref={visualRef} className="absolute inset-0">
        {text}
      </span>
    </Tag>
  );
}
