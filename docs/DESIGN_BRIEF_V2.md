# Design Brief V2 — "Editorial Dark" (Spatzek-inspired)

**Status:** Product-owner approved direction, 2026-07-06. Supersedes the visual direction in docs/DESIGN_SYSTEM.md (tokens there remain the color source; layout/motion language changes). Architect must ratify as ADR-0003 before implementation.

**Origin:** Product owner selected danielspatzek.com as the reference. Effects below were reverse-engineered from that site's live code (GSAP + ScrollTrigger, PIXI.js, Three.js, Nuxt 2, native scroll — verified via bundle inspection and runtime probing on 2026-07-05). We adapt the techniques, not the content.

---

## 1. Design direction

Dark-only editorial site. Big type does the talking; effects are few but signature. The site must still read as an engineer's portfolio (verifiable claims, fast, accessible) — not a design agency clone.

**Locked product-owner decisions (do not re-litigate):**
1. Dark-only theme. Remove the light theme and the theme toggle. (Simplifies tokens; the reference aesthetic is black.)
2. NO police-uniform imagery anywhere on the site. The career-change story is told in text only.
3. Voice: confident with light humor. Examples already approved: "Same discipline, better coffee." / "(Tested. Obviously.)" Facts stay verifiable — humor never at the cost of accuracy.
4. Photos: exactly two — `docs/assets/jod-hero.png` (formal headshot → hero + OG) and `docs/assets/jod-working.png` (dark keyboard shot → About/How-I-work). **Delivered 2026-07-07 (1254×1254 RGB each).** These are source files — PF-V2-04/06 convert/resize into optimized web assets under `public/` (`next/image`); do not serve the ~1–1.8MB sources directly.
5. Keep all existing content facts and case-study order (AiKlao → Typing Race → Tiger Kick → JPD).
6. **Contact email confirmed by product owner (2026-07-07): `fontong.jod.aekkarut@gmail.com`** — this is the email that ships on the Contact page and in mailto links (spelling "aekkarut" confirmed as-is). This closes the M1 exit-gate item "contact email verified".

## 2. Visual language

- **Palette:** page `#0A0A0A`; card/surface `#111111`; hairline `#1C1C1C`; strong border `#2A2A2A`; text primary `#F5F5F0`; text secondary `#999999`; text muted `#666666`; accent teal `#5EEAD4`; accent-deep `#04342C` (text on teal fills); teal-dark surface `#0F1F1C`/`#16211F` for image mats.
- **Typography:** display = huge uppercase, tight leading (clamp ~40–96px), weight 500; labels/metadata = mono (JetBrains Mono), letter-spacing .14–.2em, 10–12px; body 13–14px/1.7. Numbered section labels: `01 — SELECTED WORKS` pattern.
- **Layout:** full-bleed rows separated by 1px hairlines; generous black space; max-width constraint only on prose. Work list = typographic rows, not cards.
- **Imagery:** photos sit in thin-bordered mats with mono captions (`FIG. 01 — THE ENGINEER`). Duotone/darken treatment so backgrounds melt into the page.

## 3. Signature effects (all verified against the reference implementation)

| # | Effect | Reference technique | Our implementation | Cost |
|---|---|---|---|---|
| E1 | Preloader "L O A D I N G /route" | Nuxt loading screen | Minimal overlay, ≤1s, first visit per session only | ~0 |
| E2 | Name letter-scramble (load + hover) | text shuffle interval | ~20-line util, respects reduced-motion (render final instantly) | ~0 |
| E3 | Marquee strips (welcome strip; teal stats strip) | GSAP xPercent loop | Pure CSS keyframes, `animation-play-state: paused` on reduced-motion | ~0 |
| E4 | Hero photo displacement on mousemove | PIXI DisplacementFilter (canvas in `.pixi-box`) | pixi.js via `next/dynamic`, loaded only on `/` after idle, desktop + fine pointer only; static duotone `<img>` fallback | ~60KB gzip, lazy |
| E5 | Mouse parallax on hero layers | small translate offsets on mousemove | rAF-throttled transform, disabled on touch/reduced-motion | ~0 |
| E6 | Work rows + hover video preview | 21 eager Vimeo iframes (their mistake — do NOT copy) | muted looping `<video>` webm ≤300KB each, `preload="none"`, load on first hover, poster image fallback; tap = navigate on touch | tiny, on-demand |
| ~~E7~~ | ~~Pinned horizontal "How I work" (5 steps)~~ | ~~ScrollTrigger pin + scrub (`.pin-spacer`, `process-slider`)~~ | ~~GSAP ScrollTrigger pin+scrub; on mobile/reduced-motion degrade to vertical stack~~ **REMOVED — SUPERSEDED by ADR-0003b (2026-07-20):** pinned-horizontal is cut entirely (HR/recruiter feedback against scroll-hijacking). The former vertical-stack fallback is now the **universal** "How I work" layout for all users/breakpoints. GSAP/ScrollTrigger stays in the stack (still used by E8). | — |
| E8 | Scroll reveals + stagger | ScrollTrigger, scrub x11, stagger x12 | ScrollTrigger batch reveals; IntersectionObserver fallback | shared |

**Explicitly out of scope (cut):** Three.js/3D object, custom cursor, smooth-scroll library (reference uses native scroll too), sound, page-transition library.

## 4. Tech decisions for architect (ADR-0003)

- Add deps: `gsap` (+ ScrollTrigger, free core) and `pixi.js` (dynamic import only). Recommendation: standardize on GSAP for all motion and do NOT add framer-motion — one animation system, less JS.
- All effects live in isolated client components under `components/motion/`; server components stay server.
- Remove theme toggle + light-mode tokens (dark-only), delete no-FOUC script complexity.
- `next/font` for JetBrains Mono + display face.

## 5. Performance & accessibility budget (QA gate — blocks the V2 milestone)

- Initial JS on `/` < 250KB gzip excluding lazy pixi chunk; pixi chunk loads only after interaction/idle on desktop.
- Lighthouse mobile: Performance ≥ 90 (target 95), A11y/BP/SEO ≥ 95. The Lighthouse ≥ 95-all M3 gate is amended: Perf ≥ 90 is acceptable IF the a11y/BP/SEO trio stays ≥ 95 and CLS < 0.1.
- `prefers-reduced-motion`: E2 renders final text, E3 pauses, E4/E5 disabled (static image), ~~E7 becomes vertical stack~~ (E7 removed — the "How I work" section is now a universal vertical stack for everyone; see §3 / ADR-0003b), E8 instant-show. QA must test this mode explicitly.
- Keyboard: work rows fully focusable, preview never keyboard-trapping; skip link, landmarks, AA contrast all preserved (existing checklist applies).
- No layout shift from fonts/marquees (fixed heights on strips).

## 6. Impacted existing work

- `docs/DESIGN_SYSTEM.md` — architect appends V2 token/motion section (dated decision-log entry), light-mode section marked superseded.
- M1 pages (layout, Home, About) — rework to V2. Resume/Contact restyle only. Approved copy in `docs/copy/` stays the factual base; content-writer may do a tone pass (confident + light humor) with normal review.
- M2 (case studies) — build directly on V2; do not start MDX layout on the old theme.

## 7. Suggested cards (producer to formalize as milestone "M1.5 — Design V2", before M2)

- `PF-V2-01` architect — ADR-0003: direction, deps (gsap, pixi), dark-only, framer-motion decision. *dod: documented, no contradiction*
- `PF-V2-02` frontend — tokens v2 + remove light mode/toggle + fonts. *dod: build green, all routes render V2 base*
- `PF-V2-03` frontend — motion primitives: `<Scramble>`, `<Marquee>`, `<Reveal>`, `<PinnedHorizontal>` + reduced-motion plumbing. *dod: each demoed on a scratch route, reduced-motion verified*
- `PF-V2-04` frontend — Home rework: preloader, hero (scramble name, photo mat, E4/E5), teal stats marquee, numbered header nav. *dod: matches brief §2–3, budget §5*
- `PF-V2-05` frontend — work rows + hover video previews (E6); needs 4 webm clips ≤300KB (producer sources with product owner; poster-only acceptable to pass card). *dod: hover/touch/keyboard all correct*
- `PF-V2-06` frontend — About/How-I-work rework: pinned horizontal 5-step (E7), jod-working.jpg mat, timeline restyle. *dod: mobile degrade correct*
- `PF-V2-07` qa — full V2 gate: §5 budget, reduced-motion pass, a11y AA, Lighthouse, link-check. *dod: all pass or bug cards filed*

Dependency: 01 → 02 → 03 → (04, 05, 06 parallel) → 07. M2 unblocks after 07.
