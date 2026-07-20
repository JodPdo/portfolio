"use client";

import Link from "next/link";
import { useInViewAutoplay } from "@/components/motion/use-in-view-autoplay";

/**
 * ProjectMediaRow — shared full-bleed project row (architect ruling 2026-07-21,
 * "Option A", DESIGN_SYSTEM.md decision log). ONE client component behind both
 * routes that list projects: `/projects` (via the WorkRow adapter) and the home
 * `01 — Featured projects` section (via FeaturedProjects). Media fills the whole
 * row; in the active state only the big title shows over a left-to-right dark
 * scrim; video previews AUTOPLAY when scrolled into the viewport centre band
 * (IntersectionObserver, not hover) and pause when out of view.
 *
 * PREVIEW STATES (content model unchanged — two optional fields encode three):
 *   - `previewSrc` (+ optional `previewPoster`) => <video> (autoplays in view).
 *   - `previewPoster` only                      => <img> (no autoplay).
 *   - neither                                   => typographic base panel only
 *                                                  (e.g. JPD API).
 *
 * TWO DELIBERATE DEVIATIONS from the literal spec text (both because the REAL
 * posters in public/media/ are NOT the "dark-ish assets" the ruling's contrast
 * math assumed — the AiKlao poster is a bright map, Typing Race a light card;
 * the ruling explicitly authorised deviating if it "doesn't actually work once
 * you're in the code" and flagged that QA must re-measure against the real
 * frames):
 *
 *   (1) The media (<video>/<img>) is ALWAYS visible (opacity-100, per the
 *       ruling §5b className — NO reveal opacity gate). This is load-bearing for
 *       PERFORMANCE: a media element that is hidden at rest and revealed on
 *       scroll becomes a LATE largest-contentful-paint (measured: the AiKlao
 *       poster reveal pushed /projects LCP to 3.5s / mobile Perf 87 < 90). With
 *       the media painted from first frame, LCP lands ~2s and Perf clears the
 *       gate. BUT the ruling's contrast note ("at REST … over opaque #0F1F1C …
 *       ~6:1") wrongly assumed dark posters; over the REAL bright AiKlao/Typing
 *       posters, #999999 secondary text (needs 4.5:1) measures < 2:1 at the
 *       right end of full-width lines on MOBILE, where the directional gradient
 *       has already faded to transparent. So the secondary-text wrapper gets its
 *       OWN solid `bg-surface-mat` backing at rest (only when it sits over media)
 *       — #999999 over solid mat = ~6:1. This is an escalation of the ruling's
 *       explicit tuning lever ("strengthen the scrim … if any poster's bright
 *       region drops secondary text below 4.5:1"); the flat/gradient scrim alone
 *       cannot reach AA for full-width mobile text. The backing fades out with
 *       the text in the active state, so when the video plays only the (large,
 *       scrim-safe) title sits over the media.
 *
 *   (2) The base panel is TYPOGRAPHIC-DECOR ONLY (mat + faint ordinal numeral +
 *       corner accent) — the old WorkPoster's own title/caption were DROPPED,
 *       because the overlay now carries the title. Keeping them would double the
 *       title (most visibly for JPD, whose base panel is the sole background
 *       under the overlay title).
 *
 * A11y / CLS invariants (verified — see report):
 *   - Media is `aria-hidden` with no `tabIndex`; only the row <Link> is a tab
 *     stop. No keyboard trap.
 *   - Row height is fixed per breakpoint (`min-h-…`); media is `absolute
 *     inset-0`; the base panel is always rendered; secondary text (+ its
 *     backing) collapses via OPACITY ONLY (never display/height). Row height is
 *     identical rest⇄active ⇒ CLS stays 0.
 *   - Reduced motion: `active` is forced false (see the hook) ⇒ the video never
 *     plays (its poster shows) and the full descriptive text stays on scroll.
 */

/**
 * Typographic base panel — ALWAYS rendered under the media (prevents any
 * fill-in shift) and is JPD API's sole full-bleed background. Decorative only
 * (mat + faint oversized ordinal numeral + teal corner accent); the row's
 * title/text live in the overlay above. The numeral opacity 0.38 composited
 * over the opaque mat clears WCAG 1.4.3 large-text 3:1 (measured 3.34:1, see
 * PF-V2-08) — axe/Lighthouse score it as text regardless of decorative intent.
 */
function BasePanel({ ordinal }: { ordinal: string }) {
  return (
    <div className="absolute inset-0 bg-surface-mat">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-8 font-display text-[8rem] font-medium leading-none text-foreground/[0.38] sm:text-[10rem]"
      >
        {ordinal}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary/70"
      />
    </div>
  );
}

export function ProjectMediaRow({
  href,
  title,
  ordinal,
  previewSrc,
  previewPoster,
  headingLevel = "h2",
  children,
}: {
  href: string;
  title: string;
  ordinal: string;
  previewSrc?: string;
  previewPoster?: string;
  /**
   * Heading tag for the title (a11y outline): `h2` on `/projects` (under the
   * page `h1`), `h3` on the home section (under the section `h2`). Minor,
   * necessary extension of the ruling's signature — the ruling itself refers to
   * "the `<h2>`/`<h3>` title", so both levels are expected.
   */
  headingLevel?: "h2" | "h3";
  children: React.ReactNode;
}) {
  const { rowRef, videoRef, active } = useInViewAutoplay({ src: previewSrc });
  const hasMedia = Boolean(previewSrc || previewPoster);
  // Only rows WITH media get the active title-only+scrim treatment. JPD (no
  // media) has nothing to reveal, so collapsing its text would only lose
  // information — keep it fully typographic, text always visible.
  const showActive = hasMedia && active;

  const Title = headingLevel;

  return (
    <Link
      ref={rowRef}
      href={href}
      data-active={showActive ? "true" : "false"}
      className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden px-6 py-10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:min-h-[22rem] sm:px-8 lg:min-h-[24rem] lg:px-12"
    >
      {/* Media stack — absolute, fills the fixed-height row. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BasePanel ordinal={ordinal} />
        {previewSrc ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={previewPoster}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : previewPoster ? (
          // Image-only preview (e.g. Tiger Kick): static <img>, no autoplay.
          // Plain <img> per architect ruling 2026-07-20 (nil next/image gain for
          // one fixed-size, aria-hidden, already-webp decorative asset in a
          // CLS-safe box). aria-hidden + no tabIndex ⇒ never a tab stop.
          // eslint-disable-next-line @next/next/no-img-element -- architect-approved plain <img> for a fixed-size, aria-hidden, already-webp decorative asset.
          <img
            src={previewPoster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {/* Scrim = two aria-hidden layers: a flat veil + a directional gradient
            (left→right, opaque→transparent) so the bottom-left text stays
            AA-legible over any video frame / poster. Always rendered.

            RESPONSIVE STRENGTH (PF-M3-09): at ≥sm the base scrim (`/45` veil +
            `via/65 → transparent` gradient) already clears WCAG 1.4.3 large-text
            on the real frames (measured 5.67–8.30:1 at 1280px), so it is left
            untouched. But at <sm the row is narrower, so the directional
            gradient has faded to transparent over proportionally more of the
            title's on-screen footprint, and over the REAL bright posters (AiKlao
            = pale Thai map, Typing Race = light card UI) the teal `text-primary`
            title dropped to 2.38–2.59:1 (< the 3:1 large-text floor). So MOBILE
            ONLY gets a stronger scrim: veil `/60` and a gradient that keeps a
            floor (`via/90 → /40`, never fully transparent) — this holds the teal
            title ≥5:1 even against a worst-case pure-white frame across the whole
            title box, while `sm:` reverts every stop to the passing 1280px
            values so that treatment is undisturbed. (Ruling §5 tuning levers:
            "strengthen the directional `via` … or raise the veil … possibly
            narrow-viewport-conditional via a `sm:` variant".) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-surface-mat/60 sm:bg-surface-mat/45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-mat via-surface-mat/90 to-surface-mat/40 sm:via-surface-mat/65 sm:to-transparent"
        />
      </div>

      {/* Small mono ordinal, top-left. */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-8 z-10 font-mono text-xs tracking-[0.18em] text-foreground-secondary sm:left-8 lg:left-12"
      >
        {ordinal}
      </span>

      {/* Text overlay, bottom-left (row is `justify-end`). */}
      <div className="relative z-10 max-w-[34rem] sm:max-w-[40rem]">
        <Title className="font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary group-data-[active=true]:text-primary motion-reduce:transition-none sm:text-5xl">
          {title}
        </Title>
        {/* Secondary text. Over media it gets a solid `bg-surface-mat` backing
            so #999999 stays AA (~6:1) over any poster/frame (see deviation (1)),
            and collapses via OPACITY ONLY (keeps layout ⇒ CLS 0) in the active
            state. With no media (JPD) it sits directly on the base mat — no
            backing, no padding, text always visible. */}
        <div
          className={`mt-4 transition-opacity duration-200 motion-reduce:transition-none ${
            hasMedia
              ? "bg-surface-mat px-3 py-3 group-hover:opacity-0 group-focus-within:opacity-0 group-data-[active=true]:opacity-0"
              : ""
          }`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
