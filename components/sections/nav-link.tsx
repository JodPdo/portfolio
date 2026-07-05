"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Header nav item with active-route styling.
 *
 * `aria-current="page"` is the accessible signal; the visual signal
 * (underline + weight) is intentionally *not* color-only, so the active
 * link is still distinguishable without relying on the teal accent color.
 */
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-sm px-1 py-0.5 underline-offset-4 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
        isActive
          ? "font-semibold text-primary underline"
          : "text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
