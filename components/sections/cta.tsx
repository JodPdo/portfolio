import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

// Copy verbatim from docs/copy/home.md §5 (approved, PF-M1-02), including
// the optional supporting line (the "built, tested, and linked" version).
//
// V2 (card PF-V2-04, brief §2): big display statement on a full-bleed
// hairline row; E8 reveal. No email/phone here — contact lives on /contact.
export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="w-full border-t border-border"
    >
      <Reveal className="flex flex-col gap-8 px-4 py-20 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
          03 — Contact
        </p>
        <p className="max-w-prose font-mono text-xs uppercase tracking-[0.14em] text-foreground-secondary">
          Every project on this site is real: built, tested, and linked to its
          code.
        </p>
        <h2
          id="closing-cta-heading"
          className="max-w-5xl font-display text-[clamp(28px,4.5vw,64px)] font-medium uppercase leading-[1.1] tracking-tight text-foreground"
        >
          Career-changer, self-taught, and I finish what I start. Let&apos;s
          talk →
        </h2>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-primary px-8 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Contact
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
