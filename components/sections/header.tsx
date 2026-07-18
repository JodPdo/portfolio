import Link from "next/link";
import { GitHubIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/sections/nav-link";

// GitHub handle verified in docs/SPEC.md 4.4 ("GitHub: github.com/JodPdo").
// V2 (card PF-V2-04): numbered mono nav per Design Brief V2 §2
// (`01 — Projects` pattern); hairline border, dark editorial chrome.
const GITHUB_URL = "https://github.com/JodPdo";

const NAV_LINKS = [
  { href: "/projects", label: "Projects", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/resume", label: "Resume", number: "03" },
  { href: "/contact", label: "Contact", number: "04" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <Link
          href="/"
          // WCAG 2.2 SC 2.5.8 (PF-M3-05): >= 44px clickable box. At md+ (single
          // row) a negative vertical margin keeps the desktop header rhythm
          // unchanged; below md the brand sits on its own row above the wrapped
          // nav (container gap-y-2 = 8px), so the margin is dropped — no spill
          // means the brand box cannot bleed into the nav row.
          className="inline-flex min-h-[44px] items-center rounded-sm font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-200 md:-my-2.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
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
