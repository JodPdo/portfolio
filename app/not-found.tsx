import type { Metadata } from "next";
import Link from "next/link";

// Global 404 (docs/ARCHITECTURE.md §1–2). Renders for any unmatched route and
// for an unknown /projects/[slug] (dynamicParams=false + notFound()). V2
// "Editorial Dark" — dark-only, same tokens/type scale as the rest of the site.
export const metadata: Metadata = {
  title: "404 — Page not found",
};

const CTA_LINK_CLASSES =
  "inline-flex items-center gap-1.5 rounded-sm font-mono text-xs uppercase tracking-[0.16em] text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export default function NotFound() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center px-4 py-24 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-6xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-8xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-foreground-secondary">
        That page doesn&apos;t exist — it may have moved, or the link was
        mistyped. Try the work or head back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-8">
        <Link href="/" className={CTA_LINK_CLASSES}>
          ← Home
        </Link>
        <Link href="/projects" className={CTA_LINK_CLASSES}>
          View projects
        </Link>
      </div>
    </div>
  );
}
