import type { ReactNode } from "react";

/**
 * <PhotoMat> — V2 image mat (Design Brief V2 §2, DESIGN_SYSTEM V2 layout
 * language): photos sit in thin-bordered mats on the teal-dark mat surface,
 * with a mono `FIG. 01 — THE ENGINEER`-pattern caption.
 *
 * Server component, zero JS. Reusable: PF-V2-04 wraps the hero portrait
 * (jod-hero), PF-V2-06 reuses it for jod-working on /about — pass any
 * media (next/image, or an interactive wrapper around one) as children.
 *
 * A11y/tokens: caption is informative small mono text ->
 * --foreground-secondary (#999999), per the DESIGN_SYSTEM V2 contrast rule
 * (2026-07-07); the mat surfaces/borders use the ratified mat tokens.
 */
type PhotoMatProps = {
  /** Mono caption, e.g. "FIG. 01 — THE ENGINEER". Rendered as figcaption. */
  caption: string;
  /** The media: a next/image or a client wrapper that renders one. */
  children: ReactNode;
  className?: string;
};

export function PhotoMat({ caption, children, className }: PhotoMatProps) {
  return (
    <figure
      className={`border border-border-strong bg-surface-mat p-3 sm:p-4 ${className ?? ""}`}
    >
      <div className="overflow-hidden border border-border bg-surface-mat-strong">
        {children}
      </div>
      <figcaption className="pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
