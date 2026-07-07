import type { Metadata } from "next";
import { Marquee } from "@/components/motion/marquee";
import { PinnedHorizontal } from "@/components/motion/pinned-horizontal";
import { Reveal } from "@/components/motion/reveal";
import { Scramble } from "@/components/motion/scramble";
import { ReducedMotionIndicator } from "./reduced-motion-indicator";

/**
 * SCRATCH ROUTE — PF-V2-03 QA demo only. NOT site content.
 *
 * Mounts every motion primitive from components/motion/ so code-reviewer /
 * qa-engineer can verify behavior + reduced-motion degrade in one place.
 * noindexed below; DELETE this route once PF-V2-04/05/06 consume the
 * primitives (at the latest before the M3 SEO card adds a sitemap).
 *
 * Note: the card suggested `app/_scratch/...`, but underscore-prefixed
 * folders are PRIVATE (non-routable) in the App Router — hence /scratch.
 *
 * How to verify reduced motion:
 * - DevTools -> Command Menu (Ctrl+Shift+P) -> "Show Rendering" ->
 *   "Emulate CSS media feature prefers-reduced-motion: reduce", or
 * - Windows Settings -> Accessibility -> Visual effects -> Animation
 *   effects: Off (then reload).
 * Expected: E2 final text instantly (mount + hover), E3 strips static,
 * E8 blocks visible instantly, E7 vertical stack at every width.
 */

export const metadata: Metadata = {
  title: "Motion scratch (PF-V2-03) — do not ship",
  description: "Internal QA demo route for V2 motion primitives.",
  robots: { index: false, follow: false },
};

// NOTE: DESIGN_SYSTEM V2 shows numbered labels in --foreground-muted, but
// #666666 on #0A0A0A is 3.45:1 — below AA (4.5:1) at label sizes. Using
// --foreground-secondary (6.95:1) here; token tension flagged in handoff
// for architect before PF-V2-04 builds real pages.
const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

const STEPS = [
  {
    n: "01",
    title: "Understand",
    body: "Read the spec, the card, and the acceptance criteria before touching code.",
  },
  {
    n: "02",
    title: "Design",
    body: "Smallest structure that satisfies the requirement. No speculative layers.",
  },
  {
    n: "03",
    title: "Build",
    body: "Server components by default; client islands only where an effect lives.",
  },
  {
    n: "04",
    title: "Test",
    body: "Automated where possible, verified claims only. (Tested. Obviously.)",
  },
  {
    n: "05",
    title: "Review",
    body: "A different agent always reviews. The gate is the point.",
  },
];

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="border-t border-border px-4 pt-6 sm:px-6">
      <p className={LABEL_CLASSES}>
        {n} — {title}
      </p>
    </div>
  );
}

export default function MotionScratchPage() {
  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* ---------------------------------------------------------- intro */}
      <section className="px-4 pt-16 sm:px-6">
        <p className={LABEL_CLASSES}>00 — Scratch / PF-V2-03</p>
        <h1 className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl">
          Motion primitives
        </h1>
        <p className="mt-6 max-w-content text-sm leading-relaxed text-foreground-secondary">
          Internal QA route (noindex) — demos E2 / E3 / E7 / E8 from
          components/motion/. To verify reduced motion: DevTools &gt; Show
          Rendering &gt; Emulate prefers-reduced-motion: reduce (or Windows
          Accessibility &gt; Animation effects: Off). Expected: scramble shows
          final text, marquees freeze, reveals are instant, the pinned section
          becomes a vertical stack. The badge below reads the shared
          reduced-motion plumbing (usePrefersReducedMotion) and updates live
          when the setting flips — use it to confirm emulation took effect.
        </p>
        <ReducedMotionIndicator />
      </section>

      {/* ------------------------------------------------- E2: Scramble */}
      <section aria-labelledby="e2-heading">
        <SectionHeading n="E2" title="Scramble" />
        <div className="px-4 py-10 sm:px-6">
          <h2 id="e2-heading" className="sr-only">
            E2 — Scramble
          </h2>
          <Scramble
            text="AEKKARAT FONTONG"
            as="p"
            trigger="both"
            className="font-display text-4xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl"
          />
          <p className="mt-6 text-sm text-foreground-secondary">
            Scrambles on load and again on hover/focus. Hover-only variant
            (tab to it to test keyboard focus):
          </p>
          <p className="mt-3">
            <Scramble
              text="QA AUTOMATION ENGINEER"
              trigger="hover"
              tabIndex={0}
              className="font-mono text-sm uppercase tracking-[0.18em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- E3: Marquee */}
      <section aria-labelledby="e3-heading">
        <SectionHeading n="E3" title="Marquee (pure CSS)" />
        <h2 id="e3-heading" className="sr-only">
          E3 — Marquee
        </h2>
        <div className="mt-10 flex flex-col gap-6">
          {/* Welcome strip — hairline borders, fixed height (no CLS). */}
          <Marquee
            durationS={24}
            className="h-12 border-y border-border text-foreground-secondary"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="px-8 font-mono text-xs uppercase tracking-[0.18em] whitespace-nowrap"
              >
                Welcome — Software / QA Automation Engineer *
              </span>
            ))}
          </Marquee>
          {/* Teal stats strip — accent fill, reversed, fixed height. */}
          <Marquee
            durationS={28}
            reverse
            className="h-12 bg-primary text-primary-foreground"
          >
            {Array.from({ length: 4 }, (_, i) => (
              <span
                key={i}
                className="px-8 font-mono text-xs uppercase tracking-[0.18em] whitespace-nowrap"
              >
                505 automated tests * 4 shipped projects * career-changer *
                same discipline, better coffee *
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* --------------------------------------------------- E8: Reveal */}
      <section aria-labelledby="e8-heading">
        <SectionHeading n="E8" title="Reveal (scroll down)" />
        <h2 id="e8-heading" className="sr-only">
          E8 — Reveal
        </h2>
        <div className="flex flex-col gap-10 px-4 py-10 sm:px-6">
          <Reveal>
            <div className="border border-border bg-background-subtle p-6">
              <p className={LABEL_CLASSES}>Single reveal</p>
              <p className="mt-3 max-w-content text-sm leading-relaxed text-foreground">
                This block fades and slides up (250 ms, transform + opacity
                only) the first time it enters the viewport. With reduced
                motion it is simply visible — no animation at all.
              </p>
            </div>
          </Reveal>
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-3">
            {["Alpha", "Bravo", "Charlie"].map((name, i) => (
              <div
                key={name}
                className="border border-border bg-background-subtle p-6"
              >
                <p className={LABEL_CLASSES}>
                  Stagger {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm text-foreground">{name} card —
                  direct children animate as a staggered batch.</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------- E7: Pinned horizontal */}
      <section aria-labelledby="e7-heading">
        <SectionHeading n="E7" title="Pinned horizontal (keep scrolling)" />
        <h2 id="e7-heading" className="sr-only">
          E7 — Pinned horizontal
        </h2>
        <p className="px-4 pt-4 text-sm text-foreground-secondary sm:px-6">
          Desktop (&ge; 768px): the section pins and vertical scroll travels
          horizontally through 5 steps. Mobile or reduced motion: vertical
          stack.
        </p>
        <PinnedHorizontal
          className="mt-10 border-y border-border bg-background"
          panelClassName="flex min-h-[70vh] items-center border-b border-border px-4 py-12 last:border-b-0 sm:px-6 motion-safe:md:border-b-0 motion-safe:md:border-r motion-safe:md:border-border"
        >
          {STEPS.map((step) => (
            <div key={step.n} className="max-w-xl">
              <p className={LABEL_CLASSES}>Step {step.n} / 05</p>
              <h3 className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl">
                {step.title}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-foreground-secondary">
                {step.body}
              </p>
            </div>
          ))}
        </PinnedHorizontal>
      </section>

      {/* ---------------------------------------------------- after E7 */}
      <section className="px-4 sm:px-6">
        <p className="max-w-content text-sm leading-relaxed text-foreground-secondary">
          Content after the pinned section — verifies the pin releases
          correctly and normal scrolling resumes with no dead zone.
        </p>
      </section>
    </div>
  );
}
