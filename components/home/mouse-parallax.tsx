"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * <MouseParallax> — E5 (Design Brief V2 §3): small translate offsets on
 * mousemove, rAF-throttled with lerp smoothing. Transform-only (never
 * affects layout / no CLS).
 *
 * Disabled on touch (needs `pointer: fine` + `hover: hover`) and under
 * `prefers-reduced-motion` (brief §5: E5 off). Both media queries are
 * watched live, so flipping the OS setting mid-session detaches the effect
 * and resets the transform.
 */
type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Max offset in px at the viewport edges. Negative inverts direction. */
  depth?: number;
};

const ENABLE_QUERY =
  "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

export function MouseParallax({
  children,
  className,
  depth = 10,
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mql = window.matchMedia(ENABLE_QUERY);
    let raf: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2 * depth;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2 * depth;
      schedule();
    };

    const attach = () => window.addEventListener("mousemove", onMove, { passive: true });
    const detach = () => {
      window.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      targetX = targetY = x = y = 0;
      el.style.transform = "";
    };

    if (mql.matches) attach();
    const onChange = () => (mql.matches ? attach() : detach());
    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
      detach();
    };
  }, [depth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
