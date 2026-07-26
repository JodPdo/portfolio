import Link from "next/link";
import { GitHubIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/sections/nav-link";
import { GITHUB_URL } from "@/lib/site";

// GitHub URL comes from lib/site.ts — the single source of truth
// (ARCHITECTURE.md §7). V2 (card PF-V2-04): numbered mono nav per Design
// Brief V2 §2 (`01 — Projects` pattern); hairline border, dark editorial
// chrome.

// This array is the ONLY place the nav ordinals exist (ARCHITECTURE.md §8).
//
// "Certs", not "Certifications" — a MEASURED constraint, not a preference
// (architect ruling 2026-07-26 §2). At 375px the nav wraps to 2 rows: with
// "Certs" the header stays at its current 168px with 28.1px of slack on row 1;
// "Certifications" forces a 3rd row and a 216px sticky header, eating a third
// of a 375x667 viewport on every page. The URL keeps the full word
// (/certifications) — the abbreviation is nav chrome only. That 28.1px is the
// entire margin: any longer label or a 6th item re-opens the measurement.
const NAV_LINKS = [
  { href: "/projects", label: "Projects", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/certifications", label: "Certs", number: "03" },
  { href: "/resume", label: "Resume", number: "04" },
  { href: "/contact", label: "Contact", number: "05" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <Link
          href="/"
          // WCAG 2.2 SC 2.5.8 (PF-M3-05): >= 44px clickable box. Where the
          // header is provably a SINGLE row, a negative vertical margin
          // collapses the extra height out of the flow so the desktop rhythm is
          // unchanged; wherever the container can wrap, the margin is dropped —
          // no spill means the brand box cannot bleed into the nav row.
          //
          // Breakpoint is `lg`, not `md` (PF-CERT-02): the 5th nav item pushed
          // the single-row threshold from ~741px to ~845px, so between md
          // (768px) and ~855px the container wraps to [brand] / [nav + GitHub]
          // with only an 8px gap-y-2 between rows. Measured at 768px, the old
          // `md:-my-2.5` spilled the 44px brand box 5.8px into the Projects and
          // About hit boxes — the exact overlap PF-M3-05 was filed for. `lg`
          // (1024px) sits comfortably above the 845px threshold.
          //
          // A tighter arbitrary variant (`min-[860px]:`) would claw back 8px of
          // header height in the 860-1023px band, but it hard-codes a magic
          // number only ~15px above a threshold that MOVES with the nav labels
          // and with fallback font metrics. The standard `lg` breakpoint is the
          // safe choice; the cost is 61px -> 69px in that band only.
          className="inline-flex min-h-[44px] items-center rounded-sm font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-200 lg:-my-2.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          Aekkarat Fontong
        </Link>

        {/* On narrow viewports this wraps to its own full-width row below
            the name/actions row (basis-full), instead of a hamburger menu —
            keeps this a server component with zero extra client JS. */}
        <nav
          aria-label="Main"
          className="order-3 basis-full sm:order-none sm:basis-auto"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:justify-start">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} number={link.number}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aekkarat Fontong on GitHub (opens in a new tab)"
            // WCAG 2.2 SC 2.5.8 (PF-M3-05): the visible bordered box stays 36px
            // (already >= the 24px minimum) to keep the tight V2 chrome; the
            // transparent `::after` extends the clickable area to 44px (the
            // preferred touch target) without changing the visible size.
            className="relative inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors duration-200 after:absolute after:-inset-1 after:content-[''] hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
