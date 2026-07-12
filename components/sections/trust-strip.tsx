import Link from "next/link";

// Copy verbatim from docs/copy/home.md §2 (approved, PF-M1-02).
//
// Items 2 and 4 are [NEEDS-VERIFICATION] in the copy doc — their real
// external targets aren't confirmed yet, so both use the doc's stated
// interim target (`/projects`, internal) instead of a guessed URL.
//
// V2 (card PF-V2-04): full-bleed hairline row, mono labels per brief §2.
const TRUST_ITEMS: { label: string; href: string; external: boolean }[] = [
  {
    label: "Live demo: race.aiklaotrip.com",
    href: "https://race.aiklaotrip.com",
    external: true,
  },
  {
    label: "Public Android APK",
    href: "/projects",
    external: false,
  },
  {
    label: "500+ automated tests",
    href: "/projects",
    external: false,
  },
  {
    label: "CI/CD on a self-managed VPS",
    href: "/projects",
    external: false,
  },
];

const ITEM_CLASSES =
  "rounded-sm px-1 py-0.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export function TrustStrip() {
  return (
    <section
      aria-label="Trust indicators"
      className="border-b border-border"
    >
      <ul className="flex w-full flex-wrap items-center gap-x-10 gap-y-3 px-4 py-6 sm:px-8">
        {TRUST_ITEMS.map((item) =>
          item.external ? (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ITEM_CLASSES}
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.label}>
              <Link href={item.href} className={ITEM_CLASSES}>
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
