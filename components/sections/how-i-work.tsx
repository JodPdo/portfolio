import { PinnedHorizontal } from "@/components/motion/pinned-horizontal";

/**
 * <HowIWork> — About §2 as the E7 pinned-horizontal section
 * (Design Brief V2 §3, ADR-0003). Desktop + motion-safe: pins and scrubs
 * horizontally through the panels; mobile + prefers-reduced-motion: plain
 * vertical stack (behavior owned by <PinnedHorizontal>).
 *
 * Content note (approved copy): docs/copy/about.md §2 has an intro line + 4
 * principles. E7 ships 5 panels = 1 opener panel (the approved heading +
 * proof line) followed by the 4 approved principles. No invented content —
 * every word is from about.md §2.
 *
 * No-JS fallback (PF-V2-06 forward-condition #1 / global "content not lost
 * if JS fails" DoD): <PinnedHorizontal> lays panels out in a 100vw flex-row
 * with overflow hidden on a motion-safe desktop; that layout is pure CSS
 * (motion-safe:md:*) and applies even when the pin JS never runs, clipping
 * panels 2+. The <noscript> <style> below (scoped to `.howiwork-pin`)
 * reverts the section to a readable vertical stack whenever scripting is
 * disabled, so all 5 panels stay reachable. When JS is enabled the noscript
 * content is inert, so it never fights the live GSAP layout.
 *
 * Forward-condition #2 (transform-pin = containing block): no position:
 * sticky/fixed element is placed inside any panel here.
 */

const PROOF_LINE =
  "Career-changers don’t get the benefit of the doubt, so I built my habits around proof.";

const PRINCIPLES: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "I own the full lifecycle.",
    body: "Design, code, tests, CI/CD, deploy, and production on a self-managed VPS. On AiKlao and Typing Race I was the mobile developer, the backend developer, and the ops person — there was no one else to hand off to.",
  },
  {
    n: "02",
    title: "Tests gate my releases.",
    body: "500+ automated tests across six repositories (Jest, JUnit, Supertest, Playwright, GUT). On my projects, a CI gate blocks the release build on any red test — not as policy theater, but because I’ve seen what slips through without it.",
  },
  {
    n: "03",
    title: "I think in edge cases.",
    body: "What happens when two SOS requests arrive at the same instant? When a player pastes the whole passage instead of typing it? Finding the failure mode before the user does is the job.",
  },
  {
    n: "04",
    title: "I use AI as a tool — and own every decision.",
    body: "For Tiger Kick I designed a review-gated development process: role-scoped agents, mandatory code review, QA exit gates. The AI executed; the architecture, the quality bar, and every accepted line were mine.",
  },
];

const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

// Panels: fixed min-height (no CLS), centered content. In the stacked
// fallback (mobile / reduced-motion / no-JS) they read top-to-bottom with a
// hairline between; on a motion-safe desktop they become 100vw pinned panels
// separated by a vertical hairline (border-r).
const PANEL_CLASSES =
  "flex min-h-[70vh] items-center border-b border-border px-4 py-16 last:border-b-0 sm:px-6 lg:px-8 motion-safe:md:min-h-screen motion-safe:md:border-b-0 motion-safe:md:border-r motion-safe:md:border-border";

// Reverts the pinned flex-row layout to a vertical stack when JS is disabled
// (see component doc). Scoped to `.howiwork-pin` so it only touches this
// section. Emitted verbatim inside <noscript>, so it is active only when
// scripting is off.
const NO_JS_FALLBACK_CSS = `.howiwork-pin{overflow-x:visible!important}
.howiwork-pin>div{flex-direction:column!important}
.howiwork-pin>div>div{width:100%!important;min-height:auto!important;border-right-width:0!important;border-bottom-width:1px!important}
.howiwork-pin>div>div:last-child{border-bottom-width:0!important}`;

export function HowIWork() {
  return (
    <section
      aria-labelledby="how-i-work-heading"
      className="border-t border-border"
    >
      <noscript
        // Static string; never hydrated. Reverts E7 to a readable stack when
        // JS is off so all 5 panels stay reachable (forward-condition #1).
        dangerouslySetInnerHTML={{
          __html: `<style>${NO_JS_FALLBACK_CSS}</style>`,
        }}
      />
      <div className="px-4 pt-16 sm:px-6 lg:px-8">
        <p className={LABEL_CLASSES}>02 — How I work</p>
      </div>
      <PinnedHorizontal
        className="howiwork-pin mt-10 bg-background"
        panelClassName={PANEL_CLASSES}
      >
        {/* Panel 1 — opener: heading + proof line (approved copy). */}
        <div className="max-w-xl">
          <h2
            id="how-i-work-heading"
            className="font-display text-4xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-6xl"
          >
            How I work
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground">
            {PROOF_LINE}
          </p>
          <p
            aria-hidden="true"
            className="mt-10 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary motion-safe:md:block"
          >
            Keep scrolling →
          </p>
        </div>

        {/* Panels 2–5 — the four approved principles. */}
        {PRINCIPLES.map((p) => (
          <div key={p.n} className="max-w-xl">
            <p className={LABEL_CLASSES}>
              {p.n} / 04
            </p>
            <h3 className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl">
              {p.title}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-foreground-secondary">
              {p.body}
            </p>
          </div>
        ))}
      </PinnedHorizontal>
    </section>
  );
}
