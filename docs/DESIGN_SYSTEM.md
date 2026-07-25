# Design System — tokens & rules

> **2026-07-06 — V2 "Editorial Dark" is now the active direction (ADR-0003, SPEC Appendix B).**
> The **Palette**, **Dark mode**, **Type**, and **Motion** sections below are the *original light+dark
> résumé identity* and are **SUPERSEDED** for V2. Read the **"V2 — Editorial Dark" section at the bottom of
> this file** for the live tokens, typography, and layout language. Sections kept for history only.

## Palette
> **SUPERSEDED by V2 (ADR-0003).** V2 is dark-only; the light `bg`/`ink` values and `gold` are retired.
> See the V2 palette table below.

| Token | Value | Use |
|---|---|---|
| `primary` | `#0F766E` (teal-700) | headings accents, buttons, links |
| `accent` | `#5EEAD4` (teal-300) | highlights, hover, focus decorations |
| `ink` | `#263238` | body text (light mode) |
| `bg` | `#F3FAF9` / `#FFFFFF` | page / card backgrounds (light) |
| `gold` | `#B8860B` | special links / metric highlights (sparingly) |

**Dark mode:** ~~class strategy (`dark:`) + toggle, respect `prefers-color-scheme` on first load, persist choice (no FOUC — inline script in `<head>`). Dark bg ≈ `#0B1B1A`–`#111827` range, text ≈ `#E6F2F0`; keep contrast AA everywhere.~~ **SUPERSEDED by V2 (ADR-0003):** the site is **dark-only** — no toggle, no light theme, no `.dark` class strategy, no no-FOUC script. `:root` carries the single dark palette (see V2 section).

## Type
> **SUPERSEDED by V2 (ADR-0003).** V2 drops the separate UI sans: display = **Archivo** 500 (huge uppercase),
> everything else = **JetBrains Mono**. See the V2 typography rules below.

- UI/body: **Inter** (or Geist) via `next/font` — no layout shift.
- Code/metrics: **JetBrains Mono**.
- Scale: text-sm → text-4xl/5xl for hero; line-height relaxed for prose.

## Layout & spacing

- Max content width ~**1100px**, generous whitespace, **8-pt spacing scale** (Tailwind default fits).
- Breakpoints to verify every card: **375 / 768 / 1280**.

## Motion
> **SUPERSEDED by V2 (ADR-0003).** V2 standardizes on **GSAP + ScrollTrigger** (no Framer Motion) plus a
> lazy `pixi.js` hero effect, in isolated `components/motion/` islands. See the V2 motion notes below and
> brief §3/§5 for the effect list and reduced-motion behavior.

- Framer Motion, subtle only: fade/slide-up `whileInView`, **150–250 ms**.
- Always respect `prefers-reduced-motion` (disable transforms, keep opacity or nothing).

## A11y (non-negotiable)

Semantic landmarks (`header/nav/main/footer`), visible focus rings, alt text on all images, color contrast AA, fully keyboard-navigable, skip-to-content link.

## Decision log

- 2026-07-05 — initial tokens from résumé palette (producer/architect). Append dated entries below; architect approves structural changes.
- 2026-07-05 — **Tailwind v4 (CSS-first) confirmed** for token implementation (architect, ADR-0001 in docs/SPEC.md Appendix B). PF-M0-03 defines the palette above as CSS variables + `@theme` in `app/globals.css` — **no `tailwind.config.js`**. Dark mode stays class-strategy (`dark:`) with the no-FOUC inline `<head>` script; under v4, wire the dark variant via `@custom-variant dark (&:where(.dark, .dark *))` in globals.css.
- 2026-07-05 — **Routes, folder structure & MDX content model defined** (architect, PF-M0-02) in `docs/ARCHITECTURE.md`; MDX pipeline pre-approved in ADR-0002 (SPEC Appendix B). PF-M0-03's structural needs (token file location, `.dark` class strategy, no-FOUC inline script, `ThemeToggle` at `components/ui/theme-toggle.tsx`) are specified in ARCHITECTURE.md section 5 — implement against it.
- 2026-07-06 — **V2 "Editorial Dark" ratified** (architect, ADR-0003, SPEC Appendix B; ratifies `docs/DESIGN_BRIEF_V2.md`). Dark-only; GSAP + lazy pixi.js (no Framer Motion); Archivo + JetBrains Mono via `next/font`; semantic token names kept, values repointed. Light-mode/toggle/Framer sections above marked SUPERSEDED. Full V2 spec in the section below.
- 2026-07-07 — **`--foreground-muted` #666666 restricted to large-text/decorative use; small labels use `--foreground-secondary` #999999** (architect ruling; flagged in PF-V2-02 review + PF-V2-03 handoff). #666666 on #0A0A0A = 3.45:1 fails WCAG AA for normal text (needs 4.5:1); #999999 = 6.95:1 passes. **Usage constraint only — no locked palette values changed**, so no product-owner sign-off required and PF-V2-04/05/06 may proceed. Full rule in the V2 section ("V2 contrast & muted-token usage rule"). Notify producer + implementing frontend-engineer. Option (a) chosen over editing the muted hex (which would touch a PO-locked brief §2 value).
- 2026-07-20 — **WorkRow hover-preview: add a third "image-only" state; keep the two-optional-fields API; render the still with a plain `<img>`** (architect ruling; post-launch content update, no milestone). E6 shipped poster-only (2026-07-13); real media now lives in `public/media/`. `components/projects/work-row.tsx` gates the `<video>` (the only renderer of `previewPoster`, via the `poster` attr) entirely behind `previewSrc`, so Tiger Kick — `previewPoster` set, **no** `previewSrc` (game unfinished, still from `tiger_style_ref.png`) — would render nothing. **Ruling:** (1) keep the existing `{ previewSrc?, previewPoster? }` shape — no discriminated union, no rename; the two optional fields already express three states cleanly: neither = typographic poster only; `previewPoster` only = image-only preview (NEW); `previewSrc` (+ optional poster) = video. (2) For the image state render a plain `<img>` (NOT `next/image` — `next/image` is used elsewhere in the codebase for content imagery, e.g. `components/home/hero-portrait.tsx` and `app/about/page.tsx` via `components/ui/photo-mat.tsx`, but gives nil benefit for one fixed-size, aria-hidden, already-webp decorative asset that loads into a CLS-safe aspect box) inside the same reveal wrapper, gated `previewPoster && !previewSrc`, `aria-hidden`, no tabindex, `object-cover`. (3) Reveal the image via **pure CSS** `group-hover`/`group-focus-within` opacity (+ `motion-reduce:transition-none`) — no JS state, no `activate()` change; the static image has no autoplay/motion/coarse-pointer concerns the `videoActive` machinery exists to solve. (4) No CLS: the `aspect-[16/10]` box already reserves space; the `<img absolute inset-0 h-full w-full>` loads into an already-sized box. (5) `PROJECT_PREVIEWS` type in `app/projects/page.tsx` already supports a poster-only entry ({ poster } with no src) — **no type change**; add entries for aiklao (src+poster), typing-race (src+poster), tiger-kick (poster only); jpd-api stays absent (poster-only via typographic panel). (6) Update the stale JSDoc in work-row.tsx (block + `previewSrc`/`previewPoster` field docs) and the "SHIP POSTER-ONLY / current state, all 4" comments in page.tsx to describe the three-state mechanism and the 2026-07-20 media drop. Minor doc tension: SPEC §3 line lists `next/image` in the quality-bar tooling — non-blocking aspiration; zero images exist yet, plain `<img>` is the consistent + simpler choice here. Frontend-engineer implements; notify producer.

- 2026-07-21 — **Option A full-bleed media + in-view autoplay on BOTH `/` and `/projects`** (architect ruling; direct product-owner instruction, no backlog card). **⚠️ SUPERSEDED 2026-07-22 by the "Option B" entry below (kept intact for history — do not delete).** The PO reviewed Option A live (commit `9a0aa42`) and rejected it: full-bleed media "reads worse — media fills the row and fights the text." Everything in §§(2)(3)(4) below (preview data model, the in-view-autoplay hook, the single-video fallback) SURVIVES unchanged into Option B; only the *presentation* (§§(1) layout, (5) full-bleed visual spec, (6) full-bleed CLS approach) is replaced. **AMENDS the 2026-07-20 entry above** (kept for history — do not delete). The 2026-07-20 model was: side `20rem` `aspect-[16/10]` panel, video 100% hover/focus-gated, `/projects` only. The PO now wants: media fills the whole row; in the active state only the big title shows over a left-to-right dark scrim; **autoplay when scrolled into view** (IntersectionObserver, not hover); and the same treatment brought to the homepage `01 — Featured projects` section. The two-optional-fields content model (`{ previewSrc?, previewPoster? }` ⇒ typographic / image-only / video) is **UNCHANGED and reaffirmed** — this ruling changes *presentation + trigger*, not the data shape. Concrete plan below; a frontend-engineer implements directly from it.

  **(1) Component strategy — extract ONE shared client row; keep two thin route shells (no data-model migration).** Do NOT merge `FeaturedProjects` and `WorkRow` into one shell (their copy/data shapes differ — home has `chips`/`summary`/`href`, no `tagline`/`slug`; projects has full `WorkRowProject`), and do NOT migrate `FeaturedProjects` to `getAllProjects()` (bigger change, risks the verbatim-approved home copy + ordering — out of scope for a fast turnaround). Instead:
    - **`components/projects/project-media-row.tsx`** — NEW, `"use client"`. `export function ProjectMediaRow({ href, title, ordinal, previewSrc?, previewPoster?, children }: { href: string; title: string; ordinal: string; previewSrc?: string; previewPoster?: string; children: React.ReactNode })`. Owns *everything shared*: the `<Link>` group container (with `data-active`, min-height, focus ring), the full-bleed media stack (typographic base + `<video>`/`<img>`/none + scrim), the title overlay, and a collapsing wrapper around `children` (the route-specific secondary text). Contains the internal `WorkPoster` helper (moved here from `work-row.tsx`) as the always-rendered base layer — which is also JPD's sole full-bleed background (its "typographic-only" state). Renders `<video>` when `previewSrc`, else `<img>` when `previewPoster`, else nothing over the base.
    - **`components/projects/work-row.tsx`** — refactor to a thin adapter: keep the `WorkRowProject` interface and the export, compute `ordinal`, and render `<ProjectMediaRow href={`/projects/${slug}`} title ordinal previewSrc previewPoster>` passing `tagline + summary + stack` as `children`. Drop its own `WorkPoster`, the `useState`/`videoRef`/`activate`/`deactivate` machinery, and the `lg:grid-cols-[minmax(0,1fr)_20rem]` split — all superseded.
    - **`components/sections/featured-projects.tsx`** — keep it a server component (section heading, `<Reveal>` entry wrapper, "All projects →" footer). Add an explicit `slug` field to each `FEATURED_PROJECTS` entry (cheapest glue — no fragile `href.split()` parsing; also gives the `PROJECT_PREVIEWS` lookup key). Render `<ProjectMediaRow>` per item, passing `summary + chips` as `children`, `previewSrc`/`previewPoster` from the shared lookup. Drop the decorative `→` glyph (the media+title now carry the row). `<Reveal>` stays as the entry animation (animates the row's opacity/transform; independent of and compatible with the absolute media inside).

  **(2) Preview-data single source of truth.** MOVE `PROJECT_PREVIEWS` out of `app/projects/page.tsx` into **`lib/project-previews.ts`**: `export const PROJECT_PREVIEWS: Record<string, { src?: string; poster?: string } | undefined>` (same 3 entries: aiklao src+poster, typing-race src+poster, tiger-kick poster-only; jpd-api absent) plus `export function getProjectPreview(slug: string): { src?: string; poster?: string } | undefined`. `app/projects/page.tsx` and `featured-projects.tsx` both import from here — one map, both routes.

  **(3) IntersectionObserver hook — `components/motion/use-in-view-autoplay.ts`.** `export function useInViewAutoplay(opts: { src?: string }): { rowRef: RefObject<HTMLAnchorElement | null>; videoRef: RefObject<HTMLVideoElement | null>; active: boolean }`. Called by `ProjectMediaRow`. Behavior:
    - Observe the **row `<Link>`** (`rowRef`), NOT the video, with `new IntersectionObserver(cb, { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" })`. `inView = entry.isIntersecting` under those bounds. This central-band gate means only the row(s) near viewport centre are "in view", so on a normal viewport ~1 row (2 at most) autoplays at once — an inherent throttle, not all rows at load.
    - Video play/pause is driven **only** by `inView` + reduced-motion, never by hover/pointer type: when `inView && src && !prefersReducedMotion()` → lazy-set `video.src` on first activation (`preload="none"`, no initial `src`), `video.load()`, `video.play().catch(()=>{})`; when `!inView` → `video.pause()`. **Remove the old `(hover: none)` coarse-pointer bail** — mobile MUST autoplay in view (muted+`playsInline`+`loop` allow it). Keyboard focus needs no special JS: Tab scrolls the row into view, which trips the observer.
    - **Reduced motion (a11y, mandatory):** use `usePrefersReducedMotion()` (reactive, from `use-prefers-reduced-motion.ts`) so a mid-session OS flip re-renders; when reduced, NEVER play (show `poster`) and force `active = false` so a reduced-motion visitor keeps the full descriptive text on scroll (no auto-collapse). Hover/focus may still collapse text via CSS (instant under `motion-reduce:transition-none`).
    - `active` (returned) = `inView && !prefersReducedMotion()`. Drives the **visual** title-only+scrim state. Per PO instinct (confirmed): the visual active state keys off `(inView || hover || focus)` — `inView` via this `active`→`data-active` attribute; hover/focus via CSS `group-hover`/`group-focus-within`. The underlying `<video>` play/pause keys off `inView` + reduced-motion ONLY (hover/focus do not start/stop playback). SSR-safe: observer + matchMedia only touched in `useEffect`; server `active=false`.

  **(4) "Only one plays at a time" fallback — ship the code path, default OFF.** In the same `use-in-view-autoplay.ts`, a module-level coordinator: `const SINGLE_VIDEO_MODE = false;` + `let currentlyPlaying: HTMLVideoElement | null = null;` + `claimPlayback(v)` (if `SINGLE_VIDEO_MODE` and a different video is current, pause it, then set current) and `releasePlayback(v)` (clear if it is current). The hook calls `claimPlayback(video)` immediately before `play()` and `releasePlayback(video)` on pause/out-of-view/unmount. With the flag `false` it is inert (all in-view videos play). If post-measurement Lighthouse on `/` or `/projects` drops mobile Perf < 90 (or LCP/CLS out of budget), flip `SINGLE_VIDEO_MODE = true` in one line (last row to enter the centre band wins ≈ nearest-centre) — and/or fall back to poster-first with a play trigger; **report the numbers to the PO before shipping the fallback** per the instruction.

  **(5) Option A visual spec (Tailwind, real tokens).** Row `<Link>` (the `group`): `group relative flex min-h-[20rem] flex-col justify-end overflow-hidden px-6 py-10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:min-h-[22rem] sm:px-8 lg:min-h-[24rem] lg:px-12` with `data-active={active ? "true" : "false"}`. Media stack (first child, `absolute inset-0 z-0 overflow-hidden`): (a) `<WorkPoster>` base (always); (b) `<video muted loop playsInline preload="none" poster={previewPoster} aria-hidden tabIndex={-1} className="absolute inset-0 h-full w-full object-cover">` when `previewSrc`, else `<img>` (aria-hidden, `object-cover`) when `previewPoster`; (c) **scrim = two aria-hidden `pointer-events-none absolute inset-0` layers** — a flat veil `bg-surface-mat/45` PLUS a directional `bg-gradient-to-r from-surface-mat via-surface-mat/65 to-transparent`. Text overlay (`relative z-10 max-w-[34rem] sm:max-w-[40rem]`, left-aligned, sits bottom-left via the Link's `justify-end`): the `<h2>`/`<h3>` title `font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary group-data-[active=true]:text-primary motion-reduce:transition-none sm:text-5xl`; the collapsing secondary wrapper around `children`: `mt-4 transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0 group-data-[active=true]:opacity-0 motion-reduce:transition-none` (hide via **opacity only**, keep in layout — see (6)). Ordinal: small mono, `absolute left-6 top-8 z-10 sm:left-8 lg:left-12`.
    - **AA contrast — computed, not assumed, but QA MUST re-measure on the real posters/frames (PO hard constraint).** Title over the far-left scrim: at the `from-surface-mat` (≈full-opacity) left edge the title is over ~`#0F1F1C`; `text-foreground` `#F5F5F0` = ~15:1, `text-primary` `#5EEAD4` = ~13:1. **Worst case** (a fully-white video frame under only the `/45` veil, no gradient help): composite L≈0.06 → `#F5F5F0` ≈ 8.8:1, `#5EEAD4` ≈ 6.4:1 — both still clear AA normal-text (4.5:1) and large-text (3:1). Title is safe in every state. **Secondary text** (`#999999`, 11–14px, needs 4.5:1) is only shown at REST (over the *paused poster*, our own controlled dark-ish assets) and is HIDDEN whenever the video plays (active) — over opaque `#0F1F1C` it is ~6:1. **Because a horizontal gradient weakens the right end of long lines, QA must measure the actual posters:** if any poster's bright region drops secondary text below 4.5:1, strengthen the directional `via` stop from `/65` → `/85` (or raise the veil `/45` → `/60`) — these are the tuning levers; do not weaken below them.

  **(6) CLS / layout — fixed min-height replaces the aspect box.** No more `aspect-[16/10]` side panel. The row reserves space via a **fixed `min-h` per breakpoint** (`min-h-[20rem] sm:min-h-[22rem] lg:min-h-[24rem]`); media is `absolute inset-0` and fills it; the typographic `<WorkPoster>` base is always rendered so video/img fading in causes **no fill-in shift**; secondary text collapses via **opacity (never `display`/`height`)** so row height is identical between rest and active. Text is fully server-rendered (no async) so no reflow. Net: **CLS stays 0**, same as today.

  **(7) Re-measure gate + a note flagged for the PO.** Lighthouse (mobile) MUST be re-run on **both `/` and `/projects`** after implementation; amended gate holds: Perf ≥ 90, A11y/BP/SEO ≥ 95. **Discrepancy flagged:** CLAUDE.md's amended gate says CLS **< 0.1**, the PO's message says CLS **0**; every route has measured exactly **0** to date (CURRENT_PHASE.md), so treat **0** as the target to hold — anything > 0 is a regression to investigate even though it's technically within the < 0.1 gate. If autoplay pushes Perf < 90 or LCP/CLS out of budget, use the (4) fallback and report numbers before shipping. Frontend-engineer implements; then the mandatory chain (code-reviewer → qa-engineer → producer). Notify producer + implementing frontend-engineer.

- 2026-07-21 (2nd entry — a11y bugfix amendment to `<Reveal>`) — **`<Reveal>` must use `opacity` (never GSAP `autoAlpha`) for its from-state, and must fire immediately for content already in view on mount** (architect ruling; fixes QA blocker `PF-M3-10`; owner frontend-engineer). **Scope of the primitive:** `components/motion/reveal.tsx` (the shared E8 entry wrapper) is used in exactly three homepage sections — `components/sections/featured-projects.tsx`, `components/sections/skills.tsx`, `components/sections/cta.tsx`. `/projects` `WorkRow` does **not** use it. So this touches homepage entry reveals only; `/projects` is unaffected.

  **Root cause (confirmed by reading the code).** The tween is `gsap.fromTo(targets, { autoAlpha: 0, y }, { autoAlpha: 1, … scrollTrigger: { trigger: el, start: "top 88%", once: true } })`. GSAP's `autoAlpha` sets `visibility: hidden` whenever opacity hits 0 (its perf convention — hidden elements skip paint/hit-testing). The from-state is applied on mount, before the ScrollTrigger fires. `visibility: hidden` removes elements from **both the tab order and the accessibility tree**. So any Reveal-wrapped content that has not yet crossed `top 88%` — which for below-the-fold rows is permanent until the user manually scrolls — is unreachable by keyboard (Tab skips it entirely, so the browser never auto-scrolls it into view to trip the trigger) and invisible to AT. QA hit this with the 3 featured-project rows on `/`.

  **Ruling — do BOTH, in `components/motion/reveal.tsx` only:**
  1. **Swap `autoAlpha` → plain `opacity` in both the from `{ opacity: 0, y }` and the to `{ opacity: 1, y: 0, … }`.** This drops the `visibility:hidden` micro-optimization deliberately: elements stay `visibility: visible` at `opacity: 0`, so they **always remain in the tab order and AT tree**, even while visually faded. This is the correctness fix. The perf tradeoff is a non-issue here — these are ~3 section-level wrappers (max 4 staggered children each), not thousands of sprites; `autoAlpha`'s benefit is for large animated batches. A keyboard user can now Tab to a below-fold reveal → the browser auto-scrolls it into view → the ScrollTrigger fires → it fades in. A screen-reader user reads the content (semantically present; the fade is purely decorative and must not gate access). **Do not reintroduce `autoAlpha` on this primitive** — leave the JSDoc note below so it isn't "optimized" back.
  2. **On mount, if the wrapper is already within the viewport, run the tween immediately with NO `scrollTrigger`** (deterministic — do not rely on ScrollTrigger's ambiguous already-past-`start`-on-load behavior). Because we now animate `opacity` (not `visibility`), a trigger that fails to fire for an in-view element would leave it *visibly* stuck at `opacity:0`, so this belt-and-suspenders is required, not optional. Compute once in the `mm.add` callback: `const r = el.getBoundingClientRect(); const inView = r.top < window.innerHeight && r.bottom > 0;` then set `scrollTrigger: inView ? undefined : { trigger: el, start: "top 88%", once: true }`. In-view content (incl. the featured rows QA hit) animates on load; only genuinely below-fold content waits on scroll.

  **Reference implementation for the `mm.add` body (implement from this directly):**
  ```ts
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const targets =
      stagger !== undefined && el.children.length > 0
        ? Array.from(el.children)
        : el;

    // Deterministic: content already on-screen at mount animates immediately;
    // only below-the-fold content defers to a ScrollTrigger. (Post-swap to
    // plain `opacity`, a trigger that never fires would leave in-view content
    // visibly stuck at opacity:0 — so we never gate in-view content on scroll.)
    const rect = el.getBoundingClientRect();
    const inViewOnMount = rect.top < window.innerHeight && rect.bottom > 0;

    gsap.fromTo(
      targets,
      { opacity: 0, y }, // opacity, NOT autoAlpha — keeps elements in the
      {                  // tab order + AT tree while faded (a11y; PF-M3-10).
        opacity: 1,
        y: 0,
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: inViewOnMount
          ? undefined
          : { trigger: el, start: "top 88%", once: true },
      },
    );
  });
  ```
  Also update the component JSDoc: the "SSR/no-JS fully VISIBLE / no CLS" bullet stays accurate — keep it — and add a line: *"From-state is plain `opacity` (never `autoAlpha`): faded elements stay `visibility: visible` so they remain keyboard-focusable and in the AT tree (PF-M3-10). Content already in view on mount animates immediately (no ScrollTrigger); only below-the-fold content defers to scroll."*

  **Regression check (I grepped every usage).** (a) **SSR/no-JS + CLS guarantee: preserved.** The from-state is still applied client-side only inside `useEffect`; server markup ships fully visible; `opacity`/`transform` never affect layout → **CLS stays 0**. The `getBoundingClientRect`/`window.innerHeight` reads are `useEffect`-only (client), no hydration mismatch. (b) **Reduced motion: preserved.** The whole tween stays gated behind `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, so reduced-motion users never enter the faded state at all — content is server-visible for them; unchanged. (c) **`featured-projects.tsx`** — Reveal wraps each `ProjectMediaRow`; opacity animates the whole row exactly as before, and the absolute media/scrim inside is unaffected; the row `<Link>` is now keyboard-reachable before scroll. This is the direct fix. (d) **`cta.tsx`** — the Contact `<Link>` button was latently unreachable by keyboard before scroll (same bug); now fixed as a bonus. (e) **`skills.tsx`** (stagger mode, `Array.from(el.children)`) — 4 group divs fade with opacity; no focusable controls inside, but they re-enter the AT tree. No visual change in any of the three beyond removing the hidden-before-trigger window. No other file references `<Reveal>` or `autoAlpha`.

  **DoD reminder:** this is an a11y-correctness fix — QA must re-verify keyboard Tab reaches all 3 featured rows + the CTA button on `/` **before any scroll**, at 375/768/1280, and confirm zero console errors and CLS still 0. Frontend-engineer implements (reveal.tsx only); then code-reviewer → qa-engineer → producer. `PF-M3-09` (mobile title contrast) is a separate, self-contained scrim tweak inside `project-media-row.tsx` per the tuning levers in the 1st 2026-07-21 entry §5 — no architect ruling needed. Notify producer + implementing frontend-engineer.

- 2026-07-22 — **Option B: side framed-thumbnail (media on the right, title on plain bg on the left) — SUPERSEDES the 1st 2026-07-21 "Option A full-bleed" entry** (architect ruling; direct product-owner instruction after a live review of Option A commit `9a0aa42`, no backlog card). **The Option A entry stays in the doc for history; it is superseded, not amended.** PO verdict on full-bleed: *"reads worse — media fills the row and fights the text."* Option B moves the media OFF the text: the project **title stays left on the plain `#0A0A0A` (`bg-background`) page**, always fully readable with **no scrim and no text-over-media**; the **media becomes a framed `aspect-[16/10]` thumbnail in a right-hand `20rem` column** that slides/fades in and never covers text. **Everything from Option A that is NOT about layout is kept verbatim:** in-view autoplay (muted/loop/playsInline, IntersectionObserver play-when-visible/pause-when-not, no hover required), `prefers-reduced-motion` ⇒ static poster only (never autoplay), Tiger Kick = image thumbnail, JPD = typographic-panel only, no CLS, no autoplay sound, keyboard reachable. This is essentially a **revival of the pre-Option-A `WorkRow` two-column layout** (commit `1dfc51e`) with the hover/focus play trigger swapped for the in-view-autoplay hook. **Net file churn: only `components/projects/project-media-row.tsx` changes** (internal restructure); the hook, the previews map, and both route adapters are untouched (details in §6/§7). A frontend-engineer implements directly from the spec below.

  **(1) Component shape — restructure `ProjectMediaRow` IN PLACE; do NOT split back into two components.** `components/projects/project-media-row.tsx` stays the ONE shared client component behind both routes (that was the whole point of the Option A extraction — do not let this reversal cause `/projects` and home to drift). `components/projects/work-row.tsx` (thin adapter for `/projects`, passes `tagline + summary + stack` as `children`) and `components/sections/featured-projects.tsx` (server section, passes `summary + chips` as `children`, `headingLevel="h3"`) both **stay exactly as they are** — their `children` markup already sits on plain bg and needs no change now that the secondary text no longer collapses/scrims. The internal `BasePanel` helper (decorative mat + faint ordinal numeral + teal corner accent) is **reused unchanged** as the always-rendered base layer inside the thumbnail box (and is JPD's sole thumbnail content). Do NOT resurrect the old `WorkPoster` with its own title/caption — the title lives in the left column; a title inside the box would double it (this is why Option A dropped it, and why the PF-V2-08 numeral/caption-collision bug does not return).

  **(2) New internal layout of `ProjectMediaRow` (exact Tailwind).** The row `<Link>` (still `ref={rowRef}`, still `data-active`, still the `group`) becomes a plain block with a two-column grid inside — reviving the `1dfc51e` shape:
    - Row `<Link>`: `group block overflow-hidden px-4 py-10 transition-colors duration-200 hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:px-8` with `data-active={active ? "true" : "false"}`. **Keep `overflow-hidden`** — it clips the thumbnail's `translate-x` slide-in so it can never cause horizontal page scroll on mobile. Drop Option A's `flex min-h-[…] flex-col justify-end` (CLS is now reserved by the aspect box + static text, not a min-height).
    - Grid wrapper: `grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center`. Below `lg` this is ONE column (text first, thumbnail stacked below); at `lg` it is `[text | 20rem thumbnail]`. This matches the pre-Option-A layout that shipped and passed the M3 gate at 375/768/1280, so tablet (768) intentionally shows the thumbnail stacked full-width below the text — a previously-approved behavior, not a regression.
    - **LEFT column (text, plain bg — always fully readable):** `<div className="grid gap-x-6 gap-y-4 sm:grid-cols-[3rem_minmax(0,1fr)]">` containing (a) the ordinal as an inline grid cell (NOT absolute anymore): `<span aria-hidden className="hidden pt-2 font-mono text-xs tracking-[0.18em] text-foreground-secondary sm:block">{ordinal}</span>`; (b) a `<div>` with the title heading then `<div className="mt-4">{children}</div>`. Title = the `<Title>` (h2 on `/projects`, h3 on home): `font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary group-data-[active=true]:text-primary motion-reduce:transition-none sm:text-5xl`. **The `children` wrapper is a plain `mt-4` div — REMOVE Option A's `bg-surface-mat px-3 py-3` backing AND the `group-*:opacity-0` collapse.** On plain `#0A0A0A` the secondary `#999999` text = 6.95:1 and stays visible at all times; nothing hides behind media anymore, so no backing and no collapse. This also removes Option A "deviation (1)" (the mat-backed secondary text) entirely — it was a hack for text-over-bright-media that no longer exists.
    - **RIGHT column (framed thumbnail):** `<div className="relative aspect-[16/10] overflow-hidden border-t border-border-strong opacity-0 translate-x-4 transition-[opacity,transform,border-color] duration-500 ease-out group-data-[active=true]:opacity-100 group-data-[active=true]:translate-x-0 group-hover:border-primary group-focus-within:border-primary group-data-[active=true]:border-primary motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none lg:border-t-0 lg:border-l">`. Children in order: `<BasePanel ordinal={ordinal} />` (always), then `<video …>` when `previewSrc` else `<img …>` when `previewPoster` else nothing — SAME media markup as Option A **except the media is now permanently `opacity-100`** (`className="absolute inset-0 h-full w-full object-cover"`, no opacity gate): the box-level fade below is what animates, and the poster must stay painted so reduced-motion users see the static still (see §5). Video keeps `muted loop playsInline preload="none" poster={previewPoster} aria-hidden tabIndex={-1}`; the image-only branch keeps the architect-approved plain `<img aria-hidden alt="">` (with the existing eslint-disable comment).

  **(3) "Sliding/fading in" — decided: it is the whole thumbnail BOX, keyed to the in-view `data-active` signal (NOT a video-over-poster crossfade).** The media/poster inside the box is always painted (opacity-100); what animates is the **box** entering from `opacity-0 translate-x-4` (1rem to the right, clipped by the row's `overflow-hidden`) to `opacity-100 translate-x-0` when the row reaches the viewport centre band (`group-data-[active=true]`), over `duration-500 ease-out`. This uses the SAME `active` signal that starts autoplay, so the thumbnail glides in and the clip begins playing together — coherent with the central-band throttle (as you scroll, one row's thumbnail slides in + plays while the previous settles). The border color also lifts to `primary` in the same active/hover/focus states, echoing the title. **This is pure CSS on `data-active` + a transition — it needs no hook change.** `translate-x-4` (positive → 0) = "slides in from the right," matching the PO's "media on the right, sliding in."

  **(4) "Thin left border" — exact spec.** A single **1px edge border on the thumbnail box** using the existing frame token `border-border-strong` (`#2a2a2a`, the same token the pre-Option-A box used) — deliberately NOT the old all-around `border`. Because "left" only makes sense in the side-by-side desktop layout, it is breakpoint-translated so it always reads as the divider on the media's *leading edge*: `border-t border-border-strong lg:border-t-0 lg:border-l`. Stacked (<`lg`): a thin **top** rule divides the thumbnail from the text above it. Side-by-side (`lg`+): a thin **left** rule divides the thumbnail from the text on its left — literally the PO's "thin left border." 1px = "thin"; do not use `border-l-2`.

  **(5) Reduced motion + poster-only + JPD — all invariants preserved.** `BasePanel` is ALWAYS rendered (JPD's sole thumbnail content ⇒ nothing 404s; also the base under every video/img so no fill-in shift). The media element is `opacity-100` at all times, so a `prefers-reduced-motion` visitor sees the **static poster/image** (video's `poster` attr for AiKlao/Typing Race; the `<img>` for Tiger Kick; the `BasePanel` for JPD) — never a blank box, never autoplay. The box slide-in is disabled under reduced motion by the unconditional `motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none` utilities (they override the `opacity-0 translate-x-4` base regardless of `data-active`), so the thumbnail is shown statically in its final position. All secondary text is always visible (no collapse), so reduced-motion users lose no information.

  **(6) `components/motion/use-in-view-autoplay.ts` — NO code changes.** It is a layout-agnostic play/pause + `active`-state hook (observe `rowRef`, drive `videoRef` play/pause on `inView && !reducedMotion`, expose `active`). Option B consumes the exact same outputs — `active` now drives (a) video play/pause [unchanged], (b) the box slide-in via `data-active` [same signal, new CSS consumer], (c) the border/title color lift [same signal]. **The `SINGLE_VIDEO_MODE` fallback stays shipped-but-inert (`false`).** Frontend-engineer must NOT touch the hook's logic; only refresh its JSDoc wording ("full-bleed" → "side framed thumbnail", "Option A" → "Option B") for accuracy. Likewise `lib/project-previews.ts` (data model) is unchanged.

  **(7) CLS, contrast, re-measure gate.** **CLS stays 0:** height is reserved by the `aspect-[16/10]` box (static, server-rendered) + the static text; the box entry animates only `opacity`/`transform`/`border-color` (never layout); the 1px border is present identically at rest and active. **Contrast is now trivial** (no scrim math, no QA re-measure of posters needed): title `#F5F5F0` on `#0A0A0A` ≈ 19:1, teal `#5EEAD4` on `#0A0A0A` ≈ 13:1, secondary `#999999` on `#0A0A0A` = 6.95:1 — all clear AA with margin because text never sits over media. **The `group-data-[active=true]:text-primary` in-view title tint is a keep-or-cut judgment lever:** it marks the active/playing row (parity with autoplay); if the PO finds scroll-driven teal distracting, delete that ONE token (hover/focus teal stays) — no other change. **Re-measure gate (unchanged, still binding):** run Lighthouse mobile on BOTH `/` and `/projects` after implementation — Perf ≥ 90, A11y/BP/SEO ≥ 95, CLS 0 (every route has measured exactly 0 to date; treat 0 as the target). Option B should measure *better* than Option A on Perf/LCP because the media paints into a ~20rem side box (small) rather than a full-row LCP element. Report the numbers to the PO. Frontend-engineer implements (`project-media-row.tsx` + its JSDoc, plus the hook's JSDoc wording); then the mandatory chain code-reviewer → qa-engineer → producer. Notify producer + implementing frontend-engineer.

- 2026-07-25 — **JPD API gains a `{ poster }`-only image preview — it leaves the "typographic-panel-only" state. APPROVED; data + comments only, NO API change** (architect ruling; direct product-owner instruction — PO delivered the raw asset, no backlog card). **REVERSES the "jpd-api: intentionally ABSENT" designation in the 2026-07-20 entry above** (kept intact for history — do not delete). That designation was never a *rule*; it was the honest encoding of a content gap — JPD had no visual, so the designed fallback (the typographic `BasePanel`) stood in. The PO has now supplied real content for it (`public/images/jpd_api.png`, a "JPD API FLOW (Backend)" architecture diagram, 1254×1254 PNG, 1.44 MB), so the gap is closed. **This is the exact same move Tiger Kick already made** — Tiger Kick sits in the `{ poster }`-only state because its game is unfinished and a real still stands in for a clip; JPD now sits there because a real diagram stands in for a clip that will never exist (an API has nothing to film). Both are "real static image, no video," which is precisely what state 2 of the three-state model is *for*. Nothing about the model bends to accommodate this.

  **(1) Architecturally sound — confirmed, with no change to type, component, or rendering path.** The three-state model (2026-07-20, reaffirmed 2026-07-21 §2 and 2026-07-22 §6) is unchanged and is not even touched: `no entry` ⇒ typographic base panel only; `{ poster }` ⇒ static `<img>`, no `<video>`, no autoplay; `{ src, poster }` ⇒ video with poster. JPD simply **moves from state 1 to state 2**, the state Tiger Kick already occupies and which shipped, passed code review, passed QA, and is live. Concretely: (a) **no type change** — `PROJECT_PREVIEWS: Record<string, { src?: string; poster?: string } | undefined>` already admits a poster-only entry (both fields optional; this is why the 2026-07-20 ruling rejected a discriminated union); (b) **no new component and no new prop** — `ProjectMediaRow`'s `previewSrc?` / `previewPoster?` signature is untouched; (c) **no new rendering path** — the `previewSrc ? <video> : previewPoster ? <img> : null` ladder in `project-media-row.tsx` already has the branch, so JPD lands on the *identical* `<img>` element Tiger Kick renders (plain `<img>` per the 2026-07-20 §2 ruling, `alt=""`, `aria-hidden`, no `tabIndex`, `absolute inset-0 h-full w-full object-cover`, existing eslint-disable comment unchanged). One data entry, `"jpd-api": { poster: "/media/jpd-api-preview.webp" }` — the same shape as the line above it. **Any implementation that requires a prop, a variant, a `filter` class, a conditional, or a second `<img>` branch is out of scope and NOT approved by this ruling** — it would fork one pattern into two for a single asset. Come back for a fresh ruling instead.

  **(2) Invariants re-checked against the `project-media-row.tsx` JSDoc — all hold, none by luck.** **CLS stays 0:** the `aspect-[16/10]` box is static and server-rendered and the `<img>` is `absolute inset-0` into an already-sized box, so the image cannot reflow anything whatever its intrinsic size (same argument as 2026-07-20 §4). **A11y unchanged:** the image is decorative (`alt=""` + `aria-hidden` + no `tabIndex`), so the row `<Link>` remains the only tab stop and the AT-visible content of the row is unchanged — no new accessible name, no new focus order, no axe surface. **Contrast is a non-issue and this is the key reason a bright asset is safe here:** under Option B text never sits over media (title/tagline/summary live in the LEFT column on plain `#0A0A0A`), so — unlike Option A, where a white-heavy frame would have driven a scrim re-measure — a light diagram cannot degrade any text contrast ratio. **Reduced motion:** state 2 has no video and therefore no autoplay to suppress; the box slide-in is already forced to its final position by the existing `motion-reduce:*` utilities, so a reduced-motion visitor sees the static diagram in place, exactly as they see Tiger Kick's still. **Blast radius is `/projects` only** — JPD is not in `FEATURED_PROJECTS` (home lists aiklao / typing-race / tiger-kick), so the homepage renders zero extra bytes and its Lighthouse numbers are untouched.

  **(3) Asset processing — `public/images/jpd_api.png` (source, PO-delivered) ⇒ `public/media/jpd-api-preview.webp` (shipped).** Frontend-engineer produces it next. Constraints, consistent with the 2026-07-20 media drop: **webp**, sized in line with the existing posters (`aiklao` 640×400, `typing-race` 896×560, `tiger-kick` 896×310), **target ≤ 60 KB, hard cap 300 KB**; live render box is only `20rem × aspect-[16/10]` (≈320×200 CSS px) at `lg`, stacked full-width below `lg`. **Crop at the source, do not lean on `object-cover`:** the asset is square (1254×1254) and `object-cover` into 16:10 would silently guillotine the top and bottom — including the "JPD API FLOW (Backend)" title. A 1254×784 crop off the top (1254 ÷ 1.6 = 783.75, i.e. exactly 16:10) keeps the title, the Spring Boot/Security/JWT subtitle and the first band of layer panels, then downscale to 896×560. **Accepted and intended: at thumbnail size the diagram reads as *texture* — an architecture diagram — not as legible documentation.** That is the correct job for a decorative row preview. **If the PO wants the diagram to be readable content, that is a different deliverable and a different card:** a proper `<figure>` with real `alt` text (and, if needed, a full-size link) inside `content/projects/jpd-api.mdx`. The preview thumbnail must not be quietly promoted into an information channel — it is `aria-hidden` by design and will stay so.

  **(4) Visual treatment is design-system + PO's call, but it must be BAKED INTO THE ASSET.** The source is a bright white-background diagram landing in a dark-only editorial system; whether to tone/tint/duotone it (precedent exists — `jod-hero-duotone.webp`, `jod-working-duotone.webp` are treated at the asset level) is a visual judgment I do not own and do not block on. **The architectural constraint is only this:** any such treatment is baked into the `.webp` during processing — **it must not become a CSS `filter`/`brightness` class, a prop, or a per-slug conditional in `project-media-row.tsx`**, which would fork the shared render path for one project. Asset-level treatment costs zero code and keeps one pattern per problem.

  **(5) Raw source stays OUT of git.** `public/images/jpd_api.png` (1.44 MB) is a working source, not a shipped asset. Everything under `public/` that is committed is deployed and publicly fetchable, so committing an unreferenced 1.44 MB PNG is pure deploy bloat. Precedent is already established and consistent: `player_style_ref.png` and Tiger Kick's `tiger_style_ref.png` were used as sources and never tracked (`git ls-files public/images` lists only `displacement-map.png` + the two duotone webps). **Commit only `public/media/jpd-api-preview.webp`.**

  **(6) Stale comments frontend-engineer MUST update in the same change** (they are the documentation of this content model and will otherwise state the opposite of the code): `lib/project-previews.ts` — the top-of-file "State per project" block (`jpd-api: intentionally ABSENT — stays typographic-base-panel-only`) and the inline `// jpd-api: intentionally absent …` line, both replaced with the poster-only state and a pointer to this entry; `components/projects/project-media-row.tsx` — the `BasePanel` JSDoc ("is JPD API's sole thumbnail content (its 'typographic-only' state)") and the PREVIEW STATES block's `neither ⇒ typographic base panel only (e.g. JPD API)` example, since **no project will occupy state 1 after this change** — say so plainly: the state remains supported as the designed fallback for any future project shipped without media, and `BasePanel` remains always-rendered as the base layer under every video/img (that is what prevents fill-in shift), it just no longer has a sole occupant. Do not delete state 1 from the type, the ladder, or the docs.

  **(7) DoD.** `npm run build` + `npm run lint` green; `/projects` renders four thumbnails with JPD showing the diagram and no `<video>` in its row; the asset 200s at its exact repo byte size; responsive 375/768/1280; reduced-motion shows the static image; zero console errors; **CLS still 0 and mobile Perf ≥ 90 on `/projects`** (one extra ≤ 60 KB below-the-fold image should be noise — if it is not, the approved lever is adding `loading="lazy" decoding="async"` to the SHARED `<img>` branch, applying to Tiger Kick and JPD alike; a per-slug exception is not approved). Homepage needs no re-measure (JPD is not featured) but re-run it anyway if anything shared changes. Then the mandatory chain code-reviewer → qa-engineer → producer. Notify producer + implementing frontend-engineer.

---

## V2 — Editorial Dark (active — 2026-07-06, ADR-0003)

Dark-only editorial system. Big type carries the page; a few signature effects (brief §3). Ratified in
ADR-0003 (SPEC Appendix B); locked product-owner decisions in `docs/DESIGN_BRIEF_V2.md §1`.

### V2 Palette — token table

Single palette on `:root` (no `.dark`, no toggle). Set `color-scheme: dark`.

| Raw value | Role | Semantic token(s) |
|---|---|---|
| `#0A0A0A` | page background | `--background` |
| `#111111` | card / raised surface | `--background-subtle` |
| `#1C1C1C` | hairline / default border | `--border` |
| `#2A2A2A` | strong border | `--border-strong` *(new)* |
| `#F5F5F0` | text primary | `--foreground` |
| `#999999` | text secondary | `--foreground-secondary` *(new)* |
| `#666666` | text muted | `--foreground-muted` *(new)* |
| `#5EEAD4` | accent teal (links, highlights, focus, teal fills) | `--primary`, `--accent`, `--ring` |
| `#04342C` | accent-deep — text/icon color **on** teal fills | `--primary-foreground` |
| `#0F1F1C` | teal-dark image mat (base) | `--surface-mat` *(new)* |
| `#16211F` | teal-dark image mat (raised) | `--surface-mat-strong` *(new)* |

`--accent-foreground` = `--foreground` (`#F5F5F0`) for text sitting *beside* accents on the page. **No gold
in V2** — `--gold` / `--palette-gold` and `text-gold` are retired.

### V2 Typography

- **Display — Archivo, weight 500**, uppercase, **tight leading**, size `clamp(40px, …, 96px)`. Hero name,
  section headlines, big numbers. Tighten tracking on huge sizes; never below ~1.0 line-height at 96px.
- **Labels / metadata — JetBrains Mono**, letter-spacing **.14–.2em**, **10–12px**, often uppercase.
- **Numbered section labels:** `01 — SELECTED WORKS` pattern (mono). At the 10–14px label sizes the
  **informative text (the number and the words) uses `--foreground-secondary` #999999**, not
  `--foreground-muted` — see "V2 contrast & muted-token usage rule" below. The purely decorative connecting
  rule / em-dash may stay `--foreground-muted` to keep the divider quiet.
- **Body — 13–14px / line-height 1.7.** JetBrains Mono for short metadata/captions; body prose may use a
  neutral system/JetBrains stack — no separate UI sans is loaded (display = Archivo, else mono/system).
- **Image captions:** mono, `FIG. 01 — THE ENGINEER` pattern.
- Fonts via `next/font/google` (self-hosted, zero layout shift): `Archivo` → `--font-display`,
  `JetBrains Mono` → `--font-mono`. No Inter/Geist.

### V2 contrast & muted-token usage rule (a11y-binding — 2026-07-07)

`--foreground-muted` **#666666 on the page `#0A0A0A` computes to 3.45:1** (verified). WCAG AA requires
**4.5:1 for normal text** and allows **3:1 only for large text** (≥24px, or ≥18.66px at weight ≥700) and for
purely decorative / non-informational elements. So #666666 is **not** AA-legible at the 10–12px label sizes
brief §2 implies. `--foreground-secondary` **#999999 = 6.95:1** and passes AA at any size. (On the card
surface `#111111`: #666666 = 3.29:1 still fails; #999999 = 6.63:1 still passes — the rule holds on surfaces
too.) This is a **usage constraint only — no ratified/locked palette hex changes** (both #666666 and #999999
stay exactly as ratified in brief §2 / the token table above).

**Binding rule for PF-V2-04/05/06 and all V2 work:**

1. `--foreground-muted` #666666 is permitted **only** on (i) **large text** — ≥24px, or ≥18.66px at weight
   ≥700 (e.g. big display numerals, oversized editorial digits); and (ii) **purely decorative, non-textual
   elements** carrying no information (hairline rules, divider dashes, ornamental glyphs). It **must not**
   style any text below those sizes.
2. **Any informative text at normal sizes (< 24px), including all mono labels, section-number labels,
   metadata, captions, and body — uses `--foreground-secondary` #999999 or lighter** (`--foreground`
   #F5F5F0). This covers the `01 — SELECTED WORKS` number+words and `FIG. 01 — …` caption text.
3. If a design later needs the *dim* look of #666666 on small informative text, the fix is to raise the
   **muted token value** (≥ ~#797979 reaches 4.5:1 on #0A0A0A) — but that edits a **product-owner-locked
   brief §2 value and requires product-owner sign-off**, so it is not done here. This ruling deliberately
   avoids that by leaving values untouched and constraining usage instead.

### V2 Layout language

- **Full-bleed rows** separated by **1px hairlines** (`--border`); generous black negative space.
- **Max-width constraint on prose only** (`--container-content`, case-study body / long text). Structural
  rows and the work list go edge-to-edge.
- **Work list = typographic rows, not cards.** Title (display) + mono meta per row, hairline separators,
  hover state; hover-video preview is a motion enhancement (brief E6), never required to read the row.
- **Images sit in thin-bordered mats** (`--surface-mat` / `--border-strong`) with mono captions; duotone /
  darken treatment so photo backgrounds melt into `#0A0A0A`.

### V2 Motion (summary — full list brief §3, gate §5)

- One engine: **GSAP + ScrollTrigger** (free core). **`pixi.js` lazy** for the hero displacement only
  (`next/dynamic`, desktop + fine pointer, after idle; static duotone `<img>` fallback).
- All `"use client"` effects live in **`components/motion/`**; sections/pages stay server components.
- `prefers-reduced-motion` is mandatory and QA-verified: scramble → final text, marquees paused,
  pixi/parallax off (static image), pinned-horizontal → vertical stack, reveals → instant show.

### V2 token migration rule (binding on PF-V2-02)

**Keep the existing semantic token *names*; repoint their *values*** so component churn is minimal:

| Semantic token | Old (light default) | V2 value |
|---|---|---|
| `--background` | `#ffffff` | `#0A0A0A` |
| `--background-subtle` | `#f3faf9` | `#111111` |
| `--foreground` | `#263238` | `#F5F5F0` |
| `--primary` | `#0f766e` | `#5EEAD4` |
| `--primary-foreground` | `#ffffff` | `#04342C` |
| `--accent` | `#5eead4` | `#5EEAD4` |
| `--accent-foreground` | ink | `#F5F5F0` |
| `--border` | ink@14% | `#1C1C1C` |
| `--ring` | teal-300 | `#5EEAD4` |

Plus **new** tokens: `--foreground-secondary` `#999999`, `--foreground-muted` `#666666`, `--border-strong`
`#2A2A2A`, `--surface-mat` `#0F1F1C`, `--surface-mat-strong` `#16211F`. **Remove (leave no orphan tokens in
`app/globals.css`):** `--gold`/`--palette-gold` (+ every `text-gold`); **`--color-ink` in `@theme` + every
`text-ink` usage** (`#263238` is near-invisible on `#0A0A0A` — do not remap, delete it; use
`--foreground`/`--foreground-secondary`/`--foreground-muted` instead); **the raw `--palette-dark-*` set**
(`--palette-dark-bg`, `--palette-dark-bg-subtle`, `--palette-dark-ink`, `--palette-dark-gold`) — the `.dark`
block that consumed them is gone, so they are dead; and the light raw palette (`--palette-bg`,
`--palette-bg-subtle`, `--palette-ink`) once semantic vars are repointed. Also remove the `.dark` override
block, `@custom-variant dark` (drop `dark:` prefixes — they become unconditional), and `--font-sans`/Geist.
**Add** `--font-display` (Archivo). `:root` becomes the
single dark palette; delete the no-FOUC script and `components/ui/theme-toggle.tsx`.
