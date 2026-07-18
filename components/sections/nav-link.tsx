"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Header nav item — V2 numbered pattern (`01 — Projects`, Design Brief V2
 * §2, card PF-V2-04). The number + em-dash prefix is decorative
 * (aria-hidden), so the accessible name stays just the label.
 *
 * `aria-current="page"` is the accessible signal; the visual signal
 * (underline + brighter text) is intentionally *not* color-only, so the
 * active link is still distinguishable without relying on the teal accent.
 *
 * Tokens (DESIGN_SYSTEM V2 contrast rule): the informative label at this
 * small mono size uses --foreground-secondary (#999999, AA) at rest —
 * never --foreground-muted.
 */
export function NavLink({
  href,
  number,
  children,
}: {
  href: string;
  /** Two-digit index, e.g. "01". */
  number: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      // WCAG 2.2 SC 2.5.8 (PF-M3-05): the *clickable* box is >= 44px tall via
      // inline-flex + min-h; the negative vertical margin collapses the extra
      // height back out of the flow so the visible row keeps its tight V2
      // rhythm (invisible hit-area expansion, not bigger text/spacing).
      className={`-my-2.5 inline-flex min-h-[44px] items-center rounded-sm px-1 font-mono text-[11px] uppercase tracking-[0.16em] underline-offset-4 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
        isActive
          ? "font-semibold text-primary underline"
          : "text-foreground-secondary"
      }`}
    >
      <span aria-hidden="true">{number} — </span>
      {children}
    </Link>
  );
}
