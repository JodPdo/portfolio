import Link from "next/link";

// Copy verbatim from docs/copy/home.md §5 (approved, PF-M1-02), including
// the optional supporting line (the "built, tested, and linked" version).
export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="border-t border-border bg-background-subtle"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-foreground">
          Every project on this site is real: built, tested, and linked to
          its code.
        </p>
        <h2
          id="closing-cta-heading"
          className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Career-changer, self-taught, and I finish what I start. Let&apos;s
          talk →
        </h2>
        <Link
          href="/contact"
          className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
