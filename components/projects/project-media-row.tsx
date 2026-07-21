"use client";

import Link from "next/link";
import { useInViewAutoplay } from "@/components/motion/use-in-view-autoplay";

/**
 * ProjectMediaRow — shared project row, "Option B: side framed thumbnail"
 * (architect ruling 2026-07-22, DESIGN_SYSTEM.md decision log; SUPERSEDES the
 * 2026-07-21 "Option A" full-bleed design after the PO reviewed it live and
 * found the full-bleed media "reads worse — media fills the row and fights the
 * text"). ONE client component behind both routes that list projects:
 * `/projects` (via the WorkRow adapter) and the home `01 — Featured projects`
 * section (via FeaturedProjects). It stays the single shared row so the two
 * routes cannot drift.
 *
 * LAYOUT (revival of the pre-Option-A two-column shape, `1dfc51e`, with the
 * hover/focus play trigger swapped for the in-view-autoplay hook):
 *   - Two-column grid at `lg`: [text | 20rem thumbnail]. Below `lg` it is one
 *     column (text, then thumbnail stacked full-width beneath) — the same
 *     responsive behavior that shipped and passed the M3 gate at 375/768/1280.
 *   - LEFT: ordinal / title / tagline / summary / stack on the PLAIN page
 *     background (`#0A0A0A`). No scrim, no media behind text, no opacity
 *     collapse — the secondary text (#999999 = 6.95:1) is always fully readable.
 *   - RIGHT: a framed `aspect-[16/10]` thumbnail box. Media never covers text.
 *
 * PREVIEW STATES (content model unchanged — two optional fields encode three):
 *   - `previewSrc` (+ optional `previewPoster`) => <video> (autoplays in view).
 *   - `previewPoster` only                      => <img> (no autoplay).
 *   - neither                                   => typographic base panel only
 *                                                  (e.g. JPD API).
 *
 * "SLIDING/FADING IN" (ruling §3): the WHOLE thumbnail BOX animates, NOT a
 * video-over-poster crossfade. The media/poster inside is ALWAYS painted at
 * `opacity-100`; the BOX transitions `opacity-0 translate-x-4` (at rest) →
 * `opacity-100 translate-x-0` when the in-view `active` signal fires
 * (`data-active`), `duration-500 ease-out`. Autoplay start and slide-in share
 * the SAME `active` signal, so the thumbnail glides in from the right and the
 * clip begins playing together. Reduced motion forces the box to its final
 * position instantly (`motion-reduce:*`), showing the static poster/image.
 *
 * A11y / CLS invariants (verified — see report):
 *   - Media is `aria-hidden` with no `tabIndex`; only the row <Link> is a tab
 *     stop. No keyboard trap.
 *   - Height is reserved by the `aspect-[16/10]` box (static, server-rendered)
 *     + the static text; the box entry animates only opacity/transform/
 *     border-color (never layout); the 1px border is present identically at
 *     rest and active ⇒ CLS stays 0.
 *   - Contrast is trivial (text never sits over media): title #F5F5F0 on
 *     #0A0A0A ≈ 19:1, teal #5EEAD4 ≈ 13:1, secondary #999999 = 6.95:1.
 *   - Reduced motion: `active` is forced false (see the hook) ⇒ the video never
 *     plays (its poster shows) and the box appears statically in place.
 */

/**
 * Typographic base panel — ALWAYS rendered as the base layer inside the
 * thumbnail box (prevents any fill-in shift when a video/img paints over it)
 * and is JPD API's sole thumbnail content (its "typographic-only" state, so
 * nothing 404s). Decorative only (mat + faint oversized ordinal numeral + teal
 * corner accent); the row's title/text live in the LEFT column now, so no title
 * lives here — a title in the box would double the left-column one (this is why
 * Option A dropped the old WorkPoster title and why the PF-V2-08 numeral/caption
 * collision does not return). The numeral opacity 0.38 composited over the
 * opaque mat clears WCAG 1.4.3 large-text 3:1 (measured 3.34:1, see PF-V2-08) —
 * axe/Lighthouse score it as text regardless of decorative intent.
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
   * page `h1`), `h3` on the home section (under the section `h2`).
   */
  headingLevel?: "h2" | "h3";
  children: React.ReactNode;
}) {
  const { rowRef, videoRef, active } = useInViewAutoplay({ src: previewSrc });

  const Title = headingLevel;

  return (
    <Link
      ref={rowRef}
      href={href}
      data-active={active ? "true" : "false"}
      className="group block overflow-hidden px-4 py-10 transition-colors duration-200 hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:px-8"
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
        {/* LEFT — text on plain bg, always fully readable (no scrim, no media
            behind it, no opacity collapse). */}
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
          {/* Ordinal as an inline grid cell (not absolute) — hidden below sm
              where the narrow column has no room for the gutter. */}
          <span
            aria-hidden="true"
            className="hidden pt-2 font-mono text-xs tracking-[0.18em] text-foreground-secondary sm:block"
          >
            {ordinal}
          </span>
          <div>
            <Title className="font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary group-data-[active=true]:text-primary motion-reduce:transition-none sm:text-5xl">
              {title}
            </Title>
            {/* Secondary text (route-specific). Plain wrapper — always visible,
                no backing, no collapse; text never sits over media in Option B. */}
            <div className="mt-4">{children}</div>
          </div>
        </div>

        {/* RIGHT — framed thumbnail box. The BOX slides/fades in (opacity +
            translate-x) keyed to the in-view `active` signal; the media inside
            is always painted so reduced-motion users see the static still. A
            thin 1px leading-edge border (top when stacked, left when
            side-by-side) frames it; the border lifts to teal in active/hover/
            focus, echoing the title. */}
        <div className="relative aspect-[16/10] overflow-hidden border-t border-border-strong opacity-0 translate-x-4 transition-[opacity,transform,border-color] duration-500 ease-out group-data-[active=true]:opacity-100 group-data-[active=true]:translate-x-0 group-hover:border-primary group-focus-within:border-primary group-data-[active=true]:border-primary motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none lg:border-t-0 lg:border-l">
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
            // Plain <img> per architect ruling 2026-07-20 (nil next/image gain
            // for one fixed-size, aria-hidden, already-webp decorative asset in
            // a CLS-safe box). aria-hidden + no tabIndex ⇒ never a tab stop.
            // eslint-disable-next-line @next/next/no-img-element -- architect-approved plain <img> for a fixed-size, aria-hidden, already-webp decorative asset.
            <img
              src={previewPoster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
}
