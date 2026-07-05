import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GitHubIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/sections/nav-link";

// GitHub handle verified in docs/SPEC.md 4.4 ("GitHub: github.com/JodPdo").
const GITHUB_URL = "https://github.com/JodPdo";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="rounded-sm text-base font-semibold tracking-tight text-primary transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:text-lg"
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
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium sm:justify-start">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <GitHubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
